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
from app.schemas.goal import GoalCreate
from app.auth.security import get_password_hash

# Mock data based on the frontend mockGoals.ts
mock_goals_data = [
    {
        "title": "Complete React Certification",
        "description": "Finish the advanced React course and pass the certification exam",
        "progress": 75.0,
        "status": "in-progress",
        "category": "Learning",
        "deadline": "2025-08-15",
        "priority": "high",
    },
    {
        "title": "Read 12 Books This Year",
        "description": "Read one book per month to expand knowledge and vocabulary",
        "progress": 45.0,
        "status": "in-progress",
        "category": "Personal",
        "deadline": "2025-12-31",
        "priority": "medium",
    },
    {
        "title": "Launch Side Project",
        "description": "Build and deploy a full-stack web application",
        "progress": 30.0,
        "status": "in-progress",
        "category": "Career",
        "deadline": "2025-09-30",
        "priority": "high",
    },
    {
        "title": "Exercise Regularly",
        "description": "Work out at least 3 times per week",
        "progress": 90.0,
        "status": "on-track",
        "category": "Health",
        "deadline": "2025-12-31",
        "priority": "medium",
    },
]


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
        for goal_data in mock_goals_data:
            goal_data['user_id'] = test_user.id
            goal = Goal(**goal_data)
            db.add(goal)
        
        db.commit()
        print(f"Successfully populated database with {len(mock_goals_data)} goals for user {test_user.username}.")
        
        # Print created goals
        goals = db.query(Goal).filter(Goal.user_id == test_user.id).all()
        print(f"\nCreated goals for user {test_user.username}:")
        for goal in goals:
            print(f"- {goal.id}: {goal.title} ({goal.status}) - {goal.progress}%")
            
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
