# Goals API Documentation

## Overview
The Goals API provides CRUD operations for managing user goals. All endpoints require authentication via JWT tokens.

## Authentication
All endpoints require a valid JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

To get a token, use the `/auth/token` endpoint with your credentials.

## Base URL
```
http://localhost:8000/api/goals
```

## Endpoints

### 1. Create Goal
**POST** `/api/goals`

Create a new goal for the authenticated user.

**Request Body:**
```json
{
  "title": "Complete React Certification",
  "description": "Finish the advanced React course and pass the certification exam",
  "status": "in-progress",
  "category": "Learning",
  "deadline": "2025-08-15",
  "priority": "high"
}
```

**Response (201):**
```json
{
  "data": {
    "id": 1,
    "title": "Complete React Certification",
    "description": "Finish the advanced React course and pass the certification exam",
    "status": "in-progress",
    "category": "Learning",
    "deadline": "2025-08-15",
    "priority": "high",
    "created_at": "2025-06-24T10:00:00Z",
    "updated_at": "2025-06-24T10:00:00Z"
  },
  "message": "Goal created successfully"
}
```

### 2. List Goals
**GET** `/api/goals`

Get all goals for the authenticated user with optional filtering and pagination.

**Query Parameters:**
- `page` (int, default: 1): Page number
- `page_size` (int, default: 10, max: 100): Number of items per page
- `category` (string, optional): Filter by category
- `status` (string, optional): Filter by status
- `priority` (string, optional): Filter by priority
- `search` (string, optional): Search in title and description

**Response (200):**
```json
{
  "data": [...],
  "total": 10,
  "page": 1,
  "page_size": 10,
  "message": "Goals retrieved successfully"
}
```

### 3. Get Goal by ID
**GET** `/api/goals/{goal_id}`

Get a specific goal by ID for the authenticated user.

**Response (200):**
```json
{
  "data": {
    "id": 1,
    "title": "Complete React Certification",
    ...
  },
  "message": "Goal retrieved successfully"
}
```

### 4. Update Goal
**PUT** `/api/goals/{goal_id}`

Update a specific goal for the authenticated user.

**Request Body:** (All fields optional)
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "status": "in-progress",
  "category": "Learning",
  "deadline": "2025-08-15",
  "priority": "medium"
}
```

### 5. Delete Goal
**DELETE** `/api/goals/{goal_id}`

Delete a specific goal for the authenticated user.

**Response (200):**
```json
{
  "message": "Goal deleted successfully"
}
```

### 6. Update Goal Status
**PATCH** `/api/goals/{goal_id}/status`

Update only the status of a specific goal.

**Query Parameters:**
- `status` (string, required): New status

### 7. Get Goal Statistics
**GET** `/api/goals/stats`

Get goal statistics for the authenticated user.

**Response (200):**
```json
{
  "data": {
    "total_goals": 10,
    "completed_goals": 3,
    "in_progress_goals": 5,
    "overdue_goals": 1
  },
  "message": "Stats retrieved successfully"
}
```

## Data Models

### Goal Status
- `in-progress`
- `on-track`
- `completed` 
- `overdue`
- `paused`

### Goal Priority
- `low`
- `medium`
- `high`

## Error Responses

### 401 Unauthorized
```json
{
  "detail": "Could not validate credentials"
}
```

### 404 Not Found
```json
{
  "detail": "Goal not found"
}
```

### 400 Bad Request
```json
{
  "detail": "Error creating goal: <error_message>"
}
```

## Example Usage

### 1. Login and get token
```bash
curl -X POST "http://localhost:8000/auth/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=testuser&password=testpassword123"
```

### 2. Create a goal
```bash
curl -X POST "http://localhost:8000/api/goals" \
  -H "Authorization: Bearer <your_token>" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Learn Python",
    "description": "Master Python programming",
    "category": "Learning",
    "priority": "high"
  }'
```

### 3. Get all goals
```bash
curl -X GET "http://localhost:8000/api/goals" \
  -H "Authorization: Bearer <your_token>"
```

## Test User Credentials
For testing purposes, you can use:
- **Email:** test@example.com
- **Username:** testuser
- **Password:** testpassword123
