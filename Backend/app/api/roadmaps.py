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
from app.crud.goal import get_goal
from app.models.generative import generate_text
from app.schemas.roadmap import RoadmapStepCreate
import json

router = APIRouter(prefix="/roadmaps", tags=["roadmaps"])


@router.post("/goal/{goal_id}", response_model=Roadmap, status_code=status.HTTP_201_CREATED)
def create_roadmap_for_goal(
    goal_id: int,
    roadmap: RoadmapCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Create a new roadmap for a specific goal."""
    db_roadmap = roadmap_crud.create_roadmap(
        db, roadmap, goal_id, current_user.id)
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
    roadmap = roadmap_crud.update_roadmap(
        db, roadmap_id, roadmap_update, current_user.id)
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
    db_step = roadmap_step_crud.create_step(
        db, step, roadmap_id, current_user.id)
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
    steps = roadmap_step_crud.get_steps_by_roadmap(
        db, roadmap_id, current_user.id)
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
    step = roadmap_step_crud.update_step(
        db, step_id, step_update, current_user.id)
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
    step = roadmap_step_crud.toggle_step_completion(
        db, step_id, current_user.id)
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
    success = roadmap_step_crud.reorder_steps(
        db, roadmap_id, step_orders, current_user.id)
    if not success:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to reorder steps or roadmap not found"
        )
    return {"message": "Steps reordered successfully"}


@router.post("/generate/{goal_id}", response_model=Roadmap, status_code=status.HTTP_201_CREATED)
def generate_roadmap_for_goal(
    goal_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Generate a roadmap for a goal using Gemini API and user's API key."""
    # Fetch the goal for the user
    goal = get_goal(db, goal_id, current_user.id)
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")

    # Prepare prompt for Gemini
    prompt = f"""
    You are an expert productivity and learning coach.\n\nGiven the following goal details, generate a detailed and actionable step-by-step roadmap to achieve the goal. \nYour response should be a JSON array where each item is an object with the following keys:\n- 'title': a short, clear summary of the step\n- 'description': a concise but helpful explanation of what needs to be done in that step\n\nInstructions for roadmap generation:\n    1. Break down the goal into logical, progressive steps.\n    2. Ensure each step builds on the previous one and leads toward the final outcome.\n    3. Incorporate best practices from the relevant field (e.g., programming, design, writing).\n    4. Tailor the roadmap according to the user's priority and deadline. If a deadline is provided, distribute the steps realistically across the available time.\n    5. Include milestones and checkpoints where applicable.\n    6. Focus on practical execution—suggest resources, tools, or actions that help achieve each step.\n\nGoal Details:\n- Goal Title: {goal.title}\n- Description: {goal.description or 'No additional description provided.'}\n- Category: {goal.category}\n- Priority Level: {goal.priority}\n- Deadline: {goal.deadline or 'No deadline specified'}\n\nReturn the output in the following format (as JSON):\n[\n{{\n    "title": "Step 1 Title",\n    "description": "Step 1 detailed description"\n}},\n...\n]\n"""

    # Call Gemini API
    try:
        result = generate_text(prompt, db, current_user.id)
        # Expecting result['text'] to be a JSON array of steps
        steps_data = json.loads(result['text'])
        if not isinstance(steps_data, list):
            raise ValueError("Gemini response is not a list")
    except Exception as e:
        raise HTTPException(
            status_code=500, detail=f"Gemini generation failed: {str(e)}")

    # Build RoadmapCreate and steps
    roadmap_in = RoadmapCreate(
        title=f"Roadmap for: {goal.title}",
        description=f"Auto-generated roadmap for goal '{goal.title}'",
        steps=[RoadmapStepCreate(**step) for step in steps_data]
    )

    # Use existing CRUD to create roadmap
    db_roadmap = roadmap_crud.create_roadmap(
        db, roadmap_in, goal_id, current_user.id)
    if not db_roadmap:
        raise HTTPException(
            status_code=400, detail="Roadmap already exists or failed to create")
    return db_roadmap
