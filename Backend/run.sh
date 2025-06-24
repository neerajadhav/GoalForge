#!/bin/bash

# GoalForge Backend Server Runner
# Simple script to start the FastAPI server

echo "Starting GoalForge Backend Server..."

# Check if virtual environment exists
if [ -d ".venv" ]; then
    echo "Activating virtual environment..."
    source ./.venv/bin/activate
fi

# Install dependencies if requirements.txt exists
if [ -f "requirements.txt" ]; then
    echo "Installing dependencies..."
    pip install -r requirements.txt
fi

# Start the server
echo "Starting server on http://127.0.0.1:8000"
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
