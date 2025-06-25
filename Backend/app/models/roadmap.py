from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.database import Base


class Roadmap(Base):
    __tablename__ = "roadmaps"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    goal_id = Column(Integer, ForeignKey("goals.id"), nullable=False, unique=True, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # Relationships
    goal = relationship("Goal", back_populates="roadmap")
    steps = relationship("RoadmapStep", back_populates="roadmap", cascade="all, delete-orphan")

    @property
    def progress_percentage(self) -> float:
        """Calculate progress percentage based on completed steps."""
        if not self.steps:
            return 0.0
        
        completed_steps = sum(1 for step in self.steps if step.is_completed)
        return (completed_steps / len(self.steps)) * 100


class RoadmapStep(Base):
    __tablename__ = "roadmap_steps"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=True)
    is_completed = Column(Boolean, default=False, nullable=False)
    order_index = Column(Integer, nullable=False, default=0)
    roadmap_id = Column(Integer, ForeignKey("roadmaps.id"), nullable=False, index=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())
    
    # Relationships
    roadmap = relationship("Roadmap", back_populates="steps")
