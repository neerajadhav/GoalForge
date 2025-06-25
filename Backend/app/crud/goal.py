from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import Optional, List
from app.models.goal import Goal
from app.schemas.goal import GoalCreate, GoalUpdate


def create_goal(db: Session, goal: GoalCreate, user_id: int) -> Goal:
    """Create a new goal for a specific user."""
    goal_data = goal.model_dump()
    goal_data['user_id'] = user_id
    db_goal = Goal(**goal_data)
    db.add(db_goal)
    db.commit()
    db.refresh(db_goal)
    return db_goal


def get_goal(db: Session, goal_id: int, user_id: int) -> Optional[Goal]:
    """Get a goal by ID for a specific user."""
    return db.query(Goal).filter(Goal.id == goal_id, Goal.user_id == user_id).first()


def get_goals(
    db: Session, 
    user_id: int,
    skip: int = 0, 
    limit: int = 100,
    category: Optional[str] = None,
    status: Optional[str] = None,
    priority: Optional[str] = None,
    search: Optional[str] = None
) -> tuple[List[Goal], int]:
    """Get goals for a specific user with optional filtering and pagination."""
    query = db.query(Goal).filter(Goal.user_id == user_id)
    
    # Apply filters
    if category:
        query = query.filter(Goal.category.ilike(f"%{category}%"))
    if status:
        query = query.filter(Goal.status == status)
    if priority:
        query = query.filter(Goal.priority == priority)
    if search:
        query = query.filter(
            Goal.title.ilike(f"%{search}%") | 
            Goal.description.ilike(f"%{search}%")
        )
    
    # Get total count before pagination
    total = query.count()
    
    # Apply pagination and ordering
    goals = query.order_by(Goal.updated_at.desc()).offset(skip).limit(limit).all()
    
    return goals, total


def update_goal(db: Session, goal_id: int, user_id: int, goal_update: GoalUpdate) -> Optional[Goal]:
    """Update a goal for a specific user."""
    db_goal = db.query(Goal).filter(Goal.id == goal_id, Goal.user_id == user_id).first()
    if not db_goal:
        return None
    
    update_data = goal_update.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_goal, field, value)
    
    db.commit()
    db.refresh(db_goal)
    return db_goal


def delete_goal(db: Session, goal_id: int, user_id: int) -> bool:
    """Delete a goal for a specific user."""
    db_goal = db.query(Goal).filter(Goal.id == goal_id, Goal.user_id == user_id).first()
    if not db_goal:
        return False
    
    db.delete(db_goal)
    db.commit()
    return True


def get_goal_stats(db: Session, user_id: int) -> dict:
    """Get goal statistics for a specific user."""
    user_goals = db.query(Goal).filter(Goal.user_id == user_id)
    
    total_goals = user_goals.count()
    completed_goals = user_goals.filter(Goal.status == "completed").count()
    in_progress_goals = user_goals.filter(Goal.status == "in-progress").count()
    overdue_goals = user_goals.filter(Goal.status == "overdue").count()
    
    return {
        "total_goals": total_goals,
        "completed_goals": completed_goals,
        "in_progress_goals": in_progress_goals,
        "overdue_goals": overdue_goals,
    }
