from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from typing import Optional, List
from app.models.roadmap import Roadmap, RoadmapStep
from app.models.goal import Goal
from app.schemas.roadmap import RoadmapCreate, RoadmapUpdate, RoadmapStepCreate, RoadmapStepUpdate


class RoadmapCRUD:
    """CRUD operations for roadmaps with proper error handling and validation."""
    
    @staticmethod
    def create_roadmap(db: Session, roadmap: RoadmapCreate, goal_id: int, user_id: int) -> Optional[Roadmap]:
        """Create a new roadmap for a specific goal."""
        # First verify the goal exists and belongs to the user
        goal = db.query(Goal).filter(Goal.id == goal_id, Goal.user_id == user_id).first()
        if not goal:
            return None
        
        # Check if roadmap already exists for this goal
        existing_roadmap = db.query(Roadmap).filter(Roadmap.goal_id == goal_id).first()
        if existing_roadmap:
            return None
        
        try:
            # Create roadmap
            roadmap_data = roadmap.model_dump(exclude={"steps"})
            roadmap_data['goal_id'] = goal_id
            db_roadmap = Roadmap(**roadmap_data)
            db.add(db_roadmap)
            db.flush()  # Get the ID without committing
            
            # Create steps if provided
            if roadmap.steps:
                for i, step_data in enumerate(roadmap.steps):
                    step_dict = step_data.model_dump()
                    step_dict['roadmap_id'] = db_roadmap.id
                    step_dict['order_index'] = i  # Ensure proper ordering
                    db_step = RoadmapStep(**step_dict)
                    db.add(db_step)
            
            db.commit()
            db.refresh(db_roadmap)
            return db_roadmap
            
        except IntegrityError:
            db.rollback()
            return None
    
    @staticmethod
    def get_roadmap_by_goal(db: Session, goal_id: int, user_id: int) -> Optional[Roadmap]:
        """Get roadmap by goal ID, ensuring user owns the goal."""
        return db.query(Roadmap).join(Goal).filter(
            Roadmap.goal_id == goal_id,
            Goal.user_id == user_id
        ).first()
    
    @staticmethod
    def get_roadmap(db: Session, roadmap_id: int, user_id: int) -> Optional[Roadmap]:
        """Get roadmap by ID, ensuring user owns the associated goal."""
        return db.query(Roadmap).join(Goal).filter(
            Roadmap.id == roadmap_id,
            Goal.user_id == user_id
        ).first()
    
    @staticmethod
    def update_roadmap(db: Session, roadmap_id: int, roadmap_update: RoadmapUpdate, user_id: int) -> Optional[Roadmap]:
        """Update a roadmap."""
        db_roadmap = RoadmapCRUD.get_roadmap(db, roadmap_id, user_id)
        if not db_roadmap:
            return None
        
        update_data = roadmap_update.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_roadmap, field, value)
        
        db.commit()
        db.refresh(db_roadmap)
        return db_roadmap
    
    @staticmethod
    def delete_roadmap(db: Session, roadmap_id: int, user_id: int) -> bool:
        """Delete a roadmap and all its steps."""
        db_roadmap = RoadmapCRUD.get_roadmap(db, roadmap_id, user_id)
        if not db_roadmap:
            return False
        
        db.delete(db_roadmap)
        db.commit()
        return True


class RoadmapStepCRUD:
    """CRUD operations for roadmap steps."""
    
    @staticmethod
    def create_step(db: Session, step: RoadmapStepCreate, roadmap_id: int, user_id: int) -> Optional[RoadmapStep]:
        """Create a new step for a roadmap."""
        # Verify roadmap exists and user owns it
        roadmap = RoadmapCRUD.get_roadmap(db, roadmap_id, user_id)
        if not roadmap:
            return None
        
        # Set order_index if not provided
        if not hasattr(step, 'order_index') or step.order_index is None:
            max_order = db.query(RoadmapStep).filter(
                RoadmapStep.roadmap_id == roadmap_id
            ).count()
            step.order_index = max_order
        
        step_data = step.model_dump()
        step_data['roadmap_id'] = roadmap_id
        db_step = RoadmapStep(**step_data)
        db.add(db_step)
        db.commit()
        db.refresh(db_step)
        return db_step
    
    @staticmethod
    def get_step(db: Session, step_id: int, user_id: int) -> Optional[RoadmapStep]:
        """Get a step by ID, ensuring user owns the associated roadmap."""
        return db.query(RoadmapStep).join(Roadmap).join(Goal).filter(
            RoadmapStep.id == step_id,
            Goal.user_id == user_id
        ).first()
    
    @staticmethod
    def get_steps_by_roadmap(db: Session, roadmap_id: int, user_id: int) -> List[RoadmapStep]:
        """Get all steps for a roadmap, ordered by order_index."""
        roadmap = RoadmapCRUD.get_roadmap(db, roadmap_id, user_id)
        if not roadmap:
            return []
        
        return db.query(RoadmapStep).filter(
            RoadmapStep.roadmap_id == roadmap_id
        ).order_by(RoadmapStep.order_index).all()
    
    @staticmethod
    def update_step(db: Session, step_id: int, step_update: RoadmapStepUpdate, user_id: int) -> Optional[RoadmapStep]:
        """Update a roadmap step."""
        db_step = RoadmapStepCRUD.get_step(db, step_id, user_id)
        if not db_step:
            return None
        
        update_data = step_update.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_step, field, value)
        
        db.commit()
        db.refresh(db_step)
        return db_step
    
    @staticmethod
    def delete_step(db: Session, step_id: int, user_id: int) -> bool:
        """Delete a roadmap step."""
        db_step = RoadmapStepCRUD.get_step(db, step_id, user_id)
        if not db_step:
            return False
        
        db.delete(db_step)
        db.commit()
        return True
    
    @staticmethod
    def toggle_step_completion(db: Session, step_id: int, user_id: int) -> Optional[RoadmapStep]:
        """Toggle the completion status of a step."""
        db_step = RoadmapStepCRUD.get_step(db, step_id, user_id)
        if not db_step:
            return None
        
        db_step.is_completed = not db_step.is_completed
        db.commit()
        db.refresh(db_step)
        return db_step
    
    @staticmethod
    def reorder_steps(db: Session, roadmap_id: int, step_orders: List[dict], user_id: int) -> bool:
        """Reorder steps in a roadmap. step_orders should be [{'id': step_id, 'order_index': new_index}, ...]"""
        roadmap = RoadmapCRUD.get_roadmap(db, roadmap_id, user_id)
        if not roadmap:
            return False
        
        try:
            for step_order in step_orders:
                step_id = step_order.get('id')
                new_order = step_order.get('order_index')
                
                if step_id is None or new_order is None:
                    continue
                
                db_step = db.query(RoadmapStep).filter(
                    RoadmapStep.id == step_id,
                    RoadmapStep.roadmap_id == roadmap_id
                ).first()
                
                if db_step:
                    db_step.order_index = new_order
            
            db.commit()
            return True
        except Exception:
            db.rollback()
            return False


# Convenience instances
roadmap_crud = RoadmapCRUD()
roadmap_step_crud = RoadmapStepCRUD()
