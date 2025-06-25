from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database import get_db
from app.auth.dependencies import get_current_user
from app.models.auth import User
from app.schemas.roadmap import (
    Roadmap, RoadmapCreate, RoadmapUpdate,
    RoadmapStep, RoadmapStepCreate, RoadmapStepUpdate
)
from app.crud.roadmap import roadmap_crud, roadmap_step_crud

router = APIRouter(prefix="/roadmaps", tags=["roadmaps"])


@router.post("/goal/{goal_id}", response_model=Roadmap, status_code=status.HTTP_201_CREATED)
def create_roadmap_for_goal(
    goal_id: int,
    roadmap: RoadmapCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new roadmap for a specific goal."""
    db_roadmap = roadmap_crud.create_roadmap(db, roadmap, goal_id, current_user.id)
    if not db_roadmap:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Goal not found, roadmap already exists, or access denied"
        )
    return db_roadmap


@router.get("/goal/{goal_id}", response_model=Roadmap)
def get_roadmap_by_goal(
    goal_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get roadmap for a specific goal."""
    roadmap = roadmap_crud.get_roadmap_by_goal(db, goal_id, current_user.id)
    if not roadmap:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Roadmap not found"
        )
    return roadmap


@router.get("/{roadmap_id}", response_model=Roadmap)
def get_roadmap(
    roadmap_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a specific roadmap by ID."""
    roadmap = roadmap_crud.get_roadmap(db, roadmap_id, current_user.id)
    if not roadmap:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Roadmap not found"
        )
    return roadmap


@router.put("/{roadmap_id}", response_model=Roadmap)
def update_roadmap(
    roadmap_id: int,
    roadmap_update: RoadmapUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update a roadmap."""
    roadmap = roadmap_crud.update_roadmap(db, roadmap_id, roadmap_update, current_user.id)
    if not roadmap:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Roadmap not found"
        )
    return roadmap


@router.delete("/{roadmap_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_roadmap(
    roadmap_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete a roadmap."""
    success = roadmap_crud.delete_roadmap(db, roadmap_id, current_user.id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Roadmap not found"
        )


# Roadmap Steps endpoints
@router.post("/{roadmap_id}/steps", response_model=RoadmapStep, status_code=status.HTTP_201_CREATED)
def create_roadmap_step(
    roadmap_id: int,
    step: RoadmapStepCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new step for a roadmap."""
    db_step = roadmap_step_crud.create_step(db, step, roadmap_id, current_user.id)
    if not db_step:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Roadmap not found or access denied"
        )
    return db_step


@router.get("/{roadmap_id}/steps", response_model=List[RoadmapStep])
def get_roadmap_steps(
    roadmap_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get all steps for a roadmap."""
    steps = roadmap_step_crud.get_steps_by_roadmap(db, roadmap_id, current_user.id)
    return steps


@router.get("/steps/{step_id}", response_model=RoadmapStep)
def get_roadmap_step(
    step_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Get a specific roadmap step."""
    step = roadmap_step_crud.get_step(db, step_id, current_user.id)
    if not step:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Roadmap step not found"
        )
    return step


@router.put("/steps/{step_id}", response_model=RoadmapStep)
def update_roadmap_step(
    step_id: int,
    step_update: RoadmapStepUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Update a roadmap step."""
    step = roadmap_step_crud.update_step(db, step_id, step_update, current_user.id)
    if not step:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Roadmap step not found"
        )
    return step


@router.patch("/steps/{step_id}/toggle", response_model=RoadmapStep)
def toggle_step_completion(
    step_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Toggle the completion status of a roadmap step."""
    step = roadmap_step_crud.toggle_step_completion(db, step_id, current_user.id)
    if not step:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Roadmap step not found"
        )
    return step


@router.delete("/steps/{step_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_roadmap_step(
    step_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Delete a roadmap step."""
    success = roadmap_step_crud.delete_step(db, step_id, current_user.id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Roadmap step not found"
        )


@router.post("/{roadmap_id}/steps/reorder", status_code=status.HTTP_200_OK)
def reorder_roadmap_steps(
    roadmap_id: int,
    step_orders: List[dict],
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Reorder steps in a roadmap. Expects [{'id': step_id, 'order_index': new_index}, ...]"""
    success = roadmap_step_crud.reorder_steps(db, roadmap_id, step_orders, current_user.id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to reorder steps or roadmap not found"
        )
    return {"message": "Steps reordered successfully"}
