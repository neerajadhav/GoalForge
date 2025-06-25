from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime
from enum import Enum


class GoalStatus(str, Enum):
    in_progress = "in-progress"
    on_track = "on-track"
    completed = "completed"
    overdue = "overdue"
    paused = "paused"


class GoalPriority(str, Enum):
    low = "low"
    medium = "medium"
    high = "high"


class GoalBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = None
    status: GoalStatus = GoalStatus.in_progress
    category: str = Field(..., min_length=1, max_length=50)
    deadline: Optional[str] = None  # ISO date string format
    priority: GoalPriority = GoalPriority.medium


class GoalCreate(GoalBase):
    pass


class GoalUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = None
    status: Optional[GoalStatus] = None
    category: Optional[str] = Field(None, min_length=1, max_length=50)
    deadline: Optional[str] = None
    priority: Optional[GoalPriority] = None


class Goal(GoalBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class GoalResponse(BaseModel):
    data: Goal
    message: str = "Success"


class GoalsListResponse(BaseModel):
    data: list[Goal]
    total: int
    page: int
    page_size: int
    message: str = "Success"
