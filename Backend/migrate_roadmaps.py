#!/usr/bin/env python3
"""
Migration script to update database schema for roadmaps
This recreates the database with the new roadmap tables
"""
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy.orm import Session
from app.database import SessionLocal, engine, Base
from app.models.goal import Goal
from app.models.auth import User
from app.models.roadmap import Roadmap, RoadmapStep


def migrate_database():
    """Recreate database with roadmap tables"""
    print("Migrating database to include roadmap tables...")
    
    # Drop all tables and recreate them
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    
    print("Database migration completed successfully!")
    print("All tables have been recreated with the new schema.")
    print("Note: All existing data has been lost. Run populate_goals.py to add sample data.")


if __name__ == "__main__":
    migrate_database()
