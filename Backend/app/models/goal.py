from sqlalchemy import Column, Integer, String, Text, Float, DateTime, Enum as SQLEnum, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base
import enum


class GoalStatus(str, enum.Enum):
    in_progress = "in-progress"
    on_track = "on-track"
    completed = "completed"
    overdue = "overdue"
    paused = "paused"


class GoalPriority(str, enum.Enum):
    low = "low"
    medium = "medium"
    high = "high"


class Goal(Base):
    __tablename__ = "goals"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False, index=True)
    description = Column(Text, nullable=True)
    status = Column(SQLEnum(GoalStatus), default=GoalStatus.in_progress)
    category = Column(String(50), nullable=False, index=True)
    deadline = Column(String(10), nullable=True)  # ISO date string format
    priority = Column(SQLEnum(GoalPriority), default=GoalPriority.medium)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # Relationship to User
    user = relationship("User", back_populates="goals")
