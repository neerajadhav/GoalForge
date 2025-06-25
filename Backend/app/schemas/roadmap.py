from pydantic import BaseModel, Field
from typing import Optional, List
from datetime import datetime


class RoadmapStepBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = None
    is_completed: bool = False
    order_index: int = Field(default=0, ge=0)


class RoadmapStepCreate(RoadmapStepBase):
    pass


class RoadmapStepUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = None
    is_completed: Optional[bool] = None
    order_index: Optional[int] = Field(None, ge=0)


class RoadmapStep(RoadmapStepBase):
    id: int
    roadmap_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


class RoadmapBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = None


class RoadmapCreate(RoadmapBase):
    steps: Optional[List[RoadmapStepCreate]] = []


class RoadmapUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=200)
    description: Optional[str] = None


class Roadmap(RoadmapBase):
    id: int
    goal_id: int
    progress_percentage: float
    steps: List[RoadmapStep] = []
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
