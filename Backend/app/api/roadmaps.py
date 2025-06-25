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
import re
from datetime import date

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

    today_str = date.today().isoformat()
    deadline_str = str(goal.deadline) if goal.deadline else 'No deadline specified'
    # Prepare prompt for Gemini
    prompt = f"""
    You are an expert productivity and learning coach.

    Given the following goal details, generate a detailed and actionable step-by-step roadmap to achieve the goal. 
    Your response should be a JSON array where each item is an object with the following keys:
    - 'title': a short, clear summary of the step
    - 'description': a concise but helpful explanation of what needs to be done in that step

    Instructions for roadmap generation:
        1. Break down the goal into logical, progressive steps.
        2. Ensure each step builds on the previous one and leads toward the final outcome.
        3. Incorporate best practices from the relevant field (e.g., programming, design, writing).
        4. Strictly design the roadmap so that all steps are distributed within the date range from today ({today_str}) to the deadline ({deadline_str}). Do not exceed the deadline.
        5. If a deadline is provided, distribute the steps realistically and evenly across the available time.
        6. Include milestones and checkpoints where applicable.
        7. Focus on practical execution—suggest resources, tools, or actions that help achieve each step.

    Formatting instructions:
    - The 'description' field supports markdown formatting. You may use *italic*, **bold**, and line breaks (blank lines) for clarity.
    - You can also combine **bold and *italic* together**.
    - Line breaks in your response will be preserved.

    Example description:
    This is a step description.

    It supports *italic* and **bold** text.

    You can also combine **bold and *italic* together**.

    Line breaks

    are preserved.

    Goal Details:
    - Goal Title: {goal.title}
    - Description: {goal.description or 'No additional description provided.'}
    - Category: {goal.category}
    - Priority Level: {goal.priority}
    - Today's Date: {today_str}
    - Deadline: {deadline_str}

    Return the output in the following format (as JSON):
    [
    {{
        "title": "Step 1 Title",
        "description": "Step 1 detailed description"
    }},
    ...
    ]
    """

    # Call Gemini API
    import traceback
    import re
    try:
        result = generate_text(prompt, db, current_user.id)
        print("Gemini raw result:", repr(result['text']))  # Debug Gemini output
        # Clean Gemini response: robustly strip markdown code fences and language tags
        raw = result['text']
        print(f"Gemini raw result: {repr(raw)}")
        cleaned = raw.strip()
        # Remove code fences if present
        if cleaned.startswith('```'):
            # Remove the first line (``` or ```json) and the last line (```)
            lines = cleaned.splitlines()
            if len(lines) >= 3 and lines[0].startswith('```') and lines[-1].startswith('```'):
                cleaned = '\n'.join(lines[1:-1])
            else:
                # fallback: remove all code fences using regex
                cleaned = re.sub(r'^```[a-zA-Z]*\n|\n```$', '', cleaned)
        print(f"Gemini cleaned result: {repr(cleaned)}")
        try:
            steps_data = json.loads(cleaned)
        except Exception as e:
            print(f"Gemini generation failed: {type(e).__name__}({repr(e)})")
            raise
    except Exception as e:
        print("Gemini generation failed:", repr(e))
        print(traceback.format_exc())
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
