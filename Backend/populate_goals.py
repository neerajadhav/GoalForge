#!/usr/bin/env python3
"""
Script to populate the database with mock goal data
"""
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy.orm import Session
from app.database import SessionLocal, engine, Base
from app.models.goal import Goal
from app.models.auth import User
from app.models.roadmap import Roadmap, RoadmapStep
from app.schemas.goal import GoalCreate
from app.auth.security import get_password_hash

# Mock data based on the frontend mockGoals.ts
mock_goals_data = [
    {
        "title": "Complete React Certification",
        "description": "Finish the advanced React course and pass the certification exam",
        "status": "in-progress",
        "category": "Learning",
        "deadline": "2025-08-15",
        "priority": "high",
    },
    {
        "title": "Read 12 Books This Year",
        "description": "Read one book per month to expand knowledge and vocabulary",
        "status": "in-progress",
        "category": "Personal",
        "deadline": "2025-12-31",
        "priority": "medium",
    },
    {
        "title": "Launch Side Project",
        "description": "Build and deploy a full-stack web application",
        "status": "in-progress",
        "category": "Career",
        "deadline": "2025-09-30",
        "priority": "high",
    },
    {
        "title": "Exercise Regularly",
        "description": "Work out at least 3 times per week",
        "status": "on-track",
        "category": "Health",
        "deadline": "2025-12-31",
        "priority": "medium",
    },
]


# Mock roadmap data for each goal
mock_roadmaps_data = {
    "Complete React Certification": [
        {"title": "Complete React Basics Course", "description": "Learn JSX, components, and state management", "is_completed": True},
        {"title": "Build First React Project", "description": "Create a simple todo app", "is_completed": True},
        {"title": "Learn React Hooks", "description": "Master useState, useEffect, and custom hooks", "is_completed": False},
        {"title": "Study Advanced Patterns", "description": "Context API, HOCs, and render props", "is_completed": False},
        {"title": "Take Certification Exam", "description": "Pass the official React certification", "is_completed": False},
    ],
    "Read 12 Books This Year": [
        {"title": "Select Book List", "description": "Choose 12 books across different genres", "is_completed": True},
        {"title": "Read Books 1-3", "description": "Complete first quarter books", "is_completed": True},
        {"title": "Read Books 4-6", "description": "Complete second quarter books", "is_completed": False},
        {"title": "Read Books 7-9", "description": "Complete third quarter books", "is_completed": False},
        {"title": "Read Books 10-12", "description": "Complete final quarter books", "is_completed": False},
    ],
    "Launch Side Project": [
        {"title": "Define Project Requirements", "description": "Create detailed project specification", "is_completed": True},
        {"title": "Design UI/UX", "description": "Create mockups and user flow", "is_completed": False},
        {"title": "Set Up Development Environment", "description": "Configure tools and frameworks", "is_completed": False},
        {"title": "Develop MVP Features", "description": "Build core functionality", "is_completed": False},
        {"title": "Deploy to Production", "description": "Launch and monitor application", "is_completed": False},
    ],
    "Exercise Regularly": [
        {"title": "Create Workout Schedule", "description": "Plan 3 workouts per week", "is_completed": True},
        {"title": "Week 1-4 Consistency", "description": "Establish routine for first month", "is_completed": True},
        {"title": "Week 5-12 Progress", "description": "Increase intensity and track progress", "is_completed": False},
        {"title": "Week 13-26 Advanced", "description": "Add new exercises and challenges", "is_completed": False},
        {"title": "Full Year Achievement", "description": "Maintain consistency for entire year", "is_completed": False},
    ],
}


def populate_database():
    """Populate the database with a test user and mock goal data."""
    # Create tables
    Base.metadata.create_all(bind=engine)
    
    # Create database session
    db: Session = SessionLocal()
    
    try:
        # Check if user already exists
        existing_user = db.query(User).filter(User.email == "test@example.com").first()
        if not existing_user:
            # Create a test user
            test_user = User(
                email="test@example.com",
                username="testuser",
                hashed_password=get_password_hash("testpassword123"),
                is_active=True,
                is_verified=True
            )
            db.add(test_user)
            db.commit()
            db.refresh(test_user)
            print(f"Created test user: {test_user.username} (ID: {test_user.id})")
        else:
            test_user = existing_user
            print(f"Using existing test user: {test_user.username} (ID: {test_user.id})")
        
        # Check if goals already exist for this user
        existing_goals = db.query(Goal).filter(Goal.user_id == test_user.id).count()
        if existing_goals > 0:
            print(f"User already has {existing_goals} goals. Skipping goal population.")
            return
        
        # Create goals from mock data for the test user
        created_goals = []
        for goal_data in mock_goals_data:
            goal_data['user_id'] = test_user.id
            goal = Goal(**goal_data)
            db.add(goal)
            created_goals.append(goal)
        
        db.commit()
        
        # Refresh goals to get their IDs
        for goal in created_goals:
            db.refresh(goal)
        
        # Create roadmaps for each goal
        for goal in created_goals:
            if goal.title in mock_roadmaps_data:
                # Create roadmap
                roadmap = Roadmap(
                    title=f"{goal.title} Roadmap",
                    description=f"Step-by-step roadmap to achieve: {goal.title}",
                    goal_id=goal.id
                )
                db.add(roadmap)
                db.flush()  # Get roadmap ID without committing
                
                # Create roadmap steps
                steps_data = mock_roadmaps_data[goal.title]
                for i, step_data in enumerate(steps_data):
                    step = RoadmapStep(
                        title=step_data["title"],
                        description=step_data["description"],
                        is_completed=step_data["is_completed"],
                        order_index=i,
                        roadmap_id=roadmap.id
                    )
                    db.add(step)
        
        db.commit()
        print(f"Successfully populated database with {len(mock_goals_data)} goals and their roadmaps for user {test_user.username}.")
        
        # Print created goals
        goals = db.query(Goal).filter(Goal.user_id == test_user.id).all()
        print(f"\nCreated goals for user {test_user.username}:")
        for goal in goals:
            roadmap = db.query(Roadmap).filter(Roadmap.goal_id == goal.id).first()
            if roadmap:
                completed_steps = db.query(RoadmapStep).filter(
                    RoadmapStep.roadmap_id == roadmap.id,
                    RoadmapStep.is_completed == True
                ).count()
                total_steps = db.query(RoadmapStep).filter(RoadmapStep.roadmap_id == roadmap.id).count()
                progress = (completed_steps / total_steps * 100) if total_steps > 0 else 0
                print(f"- {goal.id}: {goal.title} ({goal.status}) - Progress: {progress:.1f}% ({completed_steps}/{total_steps} steps)")
            else:
                print(f"- {goal.id}: {goal.title} ({goal.status}) - No roadmap")
            
        print(f"\nTest user credentials:")
        print(f"Email: test@example.com")
        print(f"Password: testpassword123")
            
    except Exception as e:
        print(f"Error populating database: {e}")
        db.rollback()
    finally:
        db.close()


if __name__ == "__main__":
    populate_database()
