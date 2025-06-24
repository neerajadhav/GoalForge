#!/bin/bash

# GoalForge - Start Both Frontend and Backend Servers
# This script starts both the FastAPI backend and React frontend servers

echo "Starting GoalForge Application..."
echo "=================================="

# Function to cleanup background processes on exit
cleanup() {
    echo ""
    echo "Shutting down servers..."
    kill $(jobs -p) 2>/dev/null
    exit 0
}

# Trap Ctrl+C to cleanup
trap cleanup SIGINT

# Start Backend Server
echo "Starting Backend Server..."
cd Backend

# Check if virtual environment exists
if [ -d ".venv" ]; then
    echo "   Activating virtual environment..."
    source ./.venv/bin/activate
fi

# Install backend dependencies if needed
if [ -f "requirements.txt" ]; then
    echo "   Installing backend dependencies..."
    pip install -r requirements.txt > /dev/null 2>&1
fi

# Start backend in background
echo "   Backend starting on http://127.0.0.1:8000"
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload > ../backend.log 2>&1 &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start Frontend Server
echo "Starting Frontend Server..."
cd ../Frontend

# Install frontend dependencies if needed
if [ -f "package.json" ]; then
    echo "   Installing frontend dependencies..."
    npm install > /dev/null 2>&1
fi

# Start frontend in background
echo "   Frontend starting on http://localhost:5173"
npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!

echo ""
echo "Both servers are starting up!"
echo "=================================="
echo "Frontend: http://localhost:5173"
echo "Backend:  http://127.0.0.1:8000"
echo "API Docs: http://127.0.0.1:8000/docs"
echo ""
echo "Logs are saved to backend.log and frontend.log"
echo "Press Ctrl+C to stop both servers"
echo ""

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
