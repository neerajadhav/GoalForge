from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import Optional, List
from app.database import get_db
from app.auth.dependencies import get_current_active_user
from app.models.auth import User
from app.crud.goal import (
    create_goal, get_goal, get_goals, update_goal, delete_goal, get_goal_stats
)
from app.schemas.goal import (
    Goal, GoalCreate, GoalUpdate, GoalResponse, GoalsListResponse
)

router = APIRouter(prefix="/api/goals", tags=["goals"])


@router.post("/", response_model=GoalResponse, status_code=201)
def create_new_goal(
    goal: GoalCreate, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Create a new goal for the authenticated user."""
    try:
        db_goal = create_goal(db=db, goal=goal, user_id=current_user.id)
        return GoalResponse(data=db_goal, message="Goal created successfully")
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error creating goal: {str(e)}")


@router.get("/", response_model=GoalsListResponse)
def list_goals(
    page: int = Query(1, ge=1, description="Page number"),
    page_size: int = Query(10, ge=1, le=100, description="Number of items per page"),
    category: Optional[str] = Query(None, description="Filter by category"),
    status: Optional[str] = Query(None, description="Filter by status"),
    priority: Optional[str] = Query(None, description="Filter by priority"),
    search: Optional[str] = Query(None, description="Search in title and description"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Get all goals for the authenticated user with optional filtering and pagination."""
    skip = (page - 1) * page_size
    goals, total = get_goals(
        db=db, 
        user_id=current_user.id,
        skip=skip, 
        limit=page_size,
        category=category,
        status=status,
        priority=priority,
        search=search
    )
    
    return GoalsListResponse(
        data=goals,
        total=total,
        page=page,
        page_size=page_size,
        message="Goals retrieved successfully"
    )


@router.get("/stats")
def get_stats(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Get goal statistics for the authenticated user."""
    stats = get_goal_stats(db=db, user_id=current_user.id)
    return {"data": stats, "message": "Stats retrieved successfully"}


@router.get("/{goal_id}", response_model=GoalResponse)
def get_goal_by_id(
    goal_id: int, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Get a specific goal by ID for the authenticated user."""
    db_goal = get_goal(db=db, goal_id=goal_id, user_id=current_user.id)
    if not db_goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    
    return GoalResponse(data=db_goal, message="Goal retrieved successfully")


@router.put("/{goal_id}", response_model=GoalResponse)
def update_goal_by_id(
    goal_id: int, 
    goal_update: GoalUpdate, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Update a specific goal for the authenticated user."""
    db_goal = update_goal(db=db, goal_id=goal_id, user_id=current_user.id, goal_update=goal_update)
    if not db_goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    
    return GoalResponse(data=db_goal, message="Goal updated successfully")


@router.delete("/{goal_id}")
def delete_goal_by_id(
    goal_id: int, 
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Delete a specific goal for the authenticated user."""
    success = delete_goal(db=db, goal_id=goal_id, user_id=current_user.id)
    if not success:
        raise HTTPException(status_code=404, detail="Goal not found")
    
    return {"message": "Goal deleted successfully"}


@router.patch("/{goal_id}/progress")
def update_goal_progress(
    goal_id: int, 
    progress: float = Query(..., ge=0.0, le=100.0, description="Progress percentage"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Update only the progress of a specific goal for the authenticated user."""
    goal_update = GoalUpdate(progress=progress)
    db_goal = update_goal(db=db, goal_id=goal_id, user_id=current_user.id, goal_update=goal_update)
    if not db_goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    
    return GoalResponse(data=db_goal, message="Goal progress updated successfully")


@router.patch("/{goal_id}/status")
def update_goal_status(
    goal_id: int,
    status: str = Query(..., description="New status"),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_active_user)
):
    """Update only the status of a specific goal for the authenticated user."""
    goal_update = GoalUpdate(status=status)
    db_goal = update_goal(db=db, goal_id=goal_id, user_id=current_user.id, goal_update=goal_update)
    if not db_goal:
        raise HTTPException(status_code=404, detail="Goal not found")
    
    return GoalResponse(data=db_goal, message="Goal status updated successfully")
