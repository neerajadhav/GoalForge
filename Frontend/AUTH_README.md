# Authentication System Documentation

## Overview

This authentication system provides a complete solution for user authentication in the GoalForge React frontend, integrating with the FastAPI backend. It follows modern best practices with modular, DRY code architecture.

## Architecture

### Core Components

1. **AuthContext** (`src/contexts/AuthContext.tsx`)
   - Manages global authentication state
   - Provides authentication methods (login, register, logout)
   - Handles token storage and retrieval
   - Auto-initializes authentication state on app load

2. **AuthService** (`src/services/authService.ts`)
   - Handles all API communication with the backend
   - Manages JWT token storage and validation
   - Provides methods for login, register, and user profile retrieval

3. **HttpClient** (`src/services/httpClient.ts`)
   - Generic HTTP client for API requests
   - Automatically adds authentication headers
   - Handles errors and response parsing

4. **Form Handling** (`src/hooks/useForm.ts`)
   - Custom hook for form state management
   - Handles validation and submission
   - Provides error handling and loading states

5. **Validation** (`src/utils/validation.ts`)
   - Centralized validation logic
   - Reusable validation functions
   - Form-specific validation schemas

## Protected Routes

The system implements route protection through:

- **ProtectedRoute** component that wraps protected pages
- **DashLayout** automatically protects all `/app/*` routes
- **RedirectIfAuthenticated** component prevents authenticated users from accessing auth pages

## Key Features

### 🔐 Authentication Flow
- User registration with email verification ready
- Secure login with JWT tokens
- Automatic token refresh and validation
- Logout functionality with token cleanup

### 🛡️ Security
- JWT token validation on each request
- Secure token storage in localStorage
- Automatic token expiration handling
- Protected route access control

### 🎨 User Experience
- Loading states during authentication
- Comprehensive error handling
- Form validation with helpful messages
- Responsive design for all devices

### 🔧 Development Features
- TypeScript support with proper types
- Modular architecture for easy maintenance
- Environment-based configuration
- Proper error boundaries

## Usage Examples

### Using Authentication in Components

```tsx
import { useAuth } from '../contexts/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return <div>Please log in</div>;
  }

  return (
    <div>
      <h1>Welcome, {user?.username}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Making Authenticated API Requests

```tsx
import { httpClient } from '../services/httpClient';

async function fetchUserData() {
  try {
    const response = await httpClient.get('/api/user/profile');
    return response.data;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
  }
}
```

### Custom Form with Validation

```tsx
import { useForm } from '../hooks/useForm';
import { validateLoginForm } from '../utils/validation';

function LoginForm() {
  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
  } = useForm({
    initialValues: { email: '', password: '' },
    validate: validateLoginForm,
    onSubmit: async (values) => {
      // Handle login
    },
  });

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="email"
        value={values.email}
        onChange={handleChange}
        disabled={isSubmitting}
      />
      {errors.email && <span>{errors.email}</span>}
      {/* More form fields */}
    </form>
  );
}
```

## Configuration

### Environment Variables

Create a `.env` file in the Frontend directory:

```env
VITE_API_BASE_URL=http://localhost:8000
VITE_API_TIMEOUT=30000
VITE_APP_NAME=GoalForge
```

### Backend Integration

The system expects the following backend endpoints:

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/me` - Get current user profile
- `POST /auth/token` - OAuth2 compatible token endpoint

## File Structure

```
src/
├── components/
│   ├── ProtectedRoute.tsx
│   ├── RedirectIfAuthenticated.tsx
│   ├── login-form.tsx
│   ├── register-form.tsx
│   └── Loading.tsx
├── contexts/
│   ├── AuthContext.tsx
│   └── ToastContext.tsx
├── hooks/
│   └── useForm.ts
├── services/
│   ├── authService.ts
│   └── httpClient.ts
├── types/
│   └── auth.ts
├── utils/
│   └── validation.ts
├── config/
│   └── env.ts
└── layouts/
    ├── AuthLayout.tsx
    └── DashLayout.tsx
```

## Error Handling

The system provides comprehensive error handling:

- **Network errors** - Handled by HttpClient
- **Validation errors** - Handled by form validation
- **Authentication errors** - Handled by AuthContext
- **API errors** - Parsed and displayed to users

## Best Practices Implemented

1. **Separation of Concerns** - Each component has a single responsibility
2. **DRY Principle** - Reusable components and utilities
3. **Type Safety** - Full TypeScript support
4. **Error Boundaries** - Proper error handling at all levels
5. **Loading States** - Consistent loading indicators
6. **Responsive Design** - Mobile-first approach
7. **Security** - Secure token handling and validation

## Testing

The authentication system is designed to be easily testable:

- Services can be mocked for unit tests
- Context providers can be wrapped for component testing
- API calls can be intercepted for integration tests

## Future Enhancements

- Email verification flow
- Password reset functionality
- Social authentication (Google, GitHub)
- Remember me functionality
- Session management
- Multi-factor authentication
- Role-based access control

## Troubleshooting

### Common Issues

1. **Token Expired** - Tokens are automatically validated, expired tokens trigger logout
2. **CORS Issues** - Ensure backend CORS is configured for your frontend domain
3. **Network Errors** - Check API_BASE_URL in environment variables
4. **Validation Errors** - Check form validation schemas in `utils/validation.ts`

### Debug Mode

Set `NODE_ENV=development` to enable debug logging in the console.

## Contributing

When adding new authentication features:

1. Update types in `types/auth.ts`
2. Add new API methods to `authService.ts`
3. Update validation schemas if needed
4. Add proper error handling
5. Update this documentation

## Security Considerations

- Never log sensitive information (passwords, tokens)
- Use HTTPS in production
- Implement proper CORS policies
- Validate all inputs on both client and server
- Use secure token storage practices
- Implement proper session management
