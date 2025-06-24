# JWT Authentication Setup

This document explains the JWT authentication system implemented in the GoalForge backend.

## Features

- JWT-based authentication
- User registration and login
- Password hashing with bcrypt
- SQLite database (easily switchable to PostgreSQL)
- Protected routes
- Bearer token authentication

## Installation

1. Install the required dependencies:
```bash
pip install -r requirements.txt
```

2. Set up environment variables by copying the example file:
```bash
cp .env.example .env
```

3. Edit the `.env` file and set your own `SECRET_KEY`:
```bash
SECRET_KEY=your-super-secret-key-change-this-in-production-please
```

4. Initialize the database:
```bash
python init_db.py
```

## API Endpoints

### Authentication Endpoints

#### Register a new user
```http
POST /auth/register
Content-Type: application/json

{
    "email": "user@example.com",
    "username": "testuser",
    "password": "securepassword"
}
```

#### Login (Get JWT token)
```http
POST /auth/login
Content-Type: application/json

{
    "email": "user@example.com",
    "password": "securepassword"
}
```

Response:
```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "token_type": "bearer"
}
```

#### Get current user info
```http
GET /auth/me
Authorization: Bearer <your_jwt_token>
```

#### OAuth2 compatible token endpoint
```http
POST /auth/token
Content-Type: application/x-www-form-urlencoded

username=user@example.com&password=securepassword
```

### Protected Routes

To access protected routes, include the JWT token in the Authorization header:

```http
GET /auth/protected
Authorization: Bearer <your_jwt_token>
```

## Using Authentication in Your Routes

To protect any route, add the `get_current_active_user` dependency:

```python
from fastapi import APIRouter, Depends
from app.auth.dependencies import get_current_active_user
from app.schemas.auth import UserResponse

router = APIRouter()

@router.get("/protected-endpoint")
async def protected_endpoint(current_user: UserResponse = Depends(get_current_active_user)):
    return {"message": f"Hello {current_user.username}!"}
```

## Database Configuration

### SQLite (Default)
The system uses SQLite by default. The database file will be created as `goalforge.db` in the backend directory.

### Switching to PostgreSQL

1. Install PostgreSQL driver:
```bash
pip install psycopg2-binary
```

2. Update your `.env` file:
```bash
DATABASE_URL=postgresql://username:password@localhost/goalforge
```

3. The system will automatically use PostgreSQL connection settings.

## Security Notes

1. **Change the SECRET_KEY**: Always use a strong, unique secret key in production.
2. **HTTPS**: Use HTTPS in production to protect JWT tokens in transit.
3. **Token Expiration**: Tokens expire after 30 minutes by default. Adjust `ACCESS_TOKEN_EXPIRE_MINUTES` as needed.
4. **Password Requirements**: Consider implementing password strength requirements.

## Testing the Authentication

You can test the authentication using curl:

1. Register a user:
```bash
curl -X POST "http://localhost:8000/auth/register" \
     -H "Content-Type: application/json" \
     -d '{"email": "test@example.com", "username": "testuser", "password": "testpassword"}'
```

2. Login to get a token:
```bash
curl -X POST "http://localhost:8000/auth/login" \
     -H "Content-Type: application/json" \
     -d '{"email": "test@example.com", "password": "testpassword"}'
```

3. Use the token to access protected routes:
```bash
curl -X GET "http://localhost:8000/auth/me" \
     -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Database Schema

The `users` table contains:
- `id`: Primary key
- `email`: Unique email address
- `username`: Unique username
- `hashed_password`: Bcrypt hashed password
- `is_active`: Boolean flag for account status
- `is_verified`: Boolean flag for email verification
- `created_at`: Account creation timestamp
- `updated_at`: Last update timestamp
