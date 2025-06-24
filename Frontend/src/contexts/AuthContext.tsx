import { createContext, useContext, useEffect, useReducer, type ReactNode } from 'react';
import type { AuthContextType, AuthState, LoginCredentials, RegisterCredentials } from '../types/auth';
import { authService } from '../services/authService';

// Auth reducer
type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: { user: any; tokens: any } }
  | { type: 'AUTH_FAILURE' }
  | { type: 'LOGOUT' }
  | { type: 'SET_USER'; payload: any };

const initialState: AuthState = {
  user: null,
  tokens: null,
  isLoading: true,
  isAuthenticated: false,
};

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, isLoading: true };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        tokens: action.payload.tokens,
        isLoading: false,
        isAuthenticated: true,
      };
    case 'AUTH_FAILURE':
      return {
        ...state,
        user: null,
        tokens: null,
        isLoading: false,
        isAuthenticated: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        tokens: null,
        isLoading: false,
        isAuthenticated: false,
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isLoading: false,
      };
    default:
      return state;
  }
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize auth state on app load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const tokens = authService.getStoredTokens();
        if (tokens && authService.isAuthenticated()) {
          const user = await authService.getCurrentUser();
          dispatch({ type: 'AUTH_SUCCESS', payload: { user, tokens } });
        } else {
          dispatch({ type: 'AUTH_FAILURE' });
        }
      } catch (error) {
        console.error('Auth initialization failed:', error);
        authService.clearTokens();
        dispatch({ type: 'AUTH_FAILURE' });
      }
    };

    initializeAuth();
  }, []);

  const login = async (credentials: LoginCredentials): Promise<void> => {
    try {
      dispatch({ type: 'AUTH_START' });
      const tokens = await authService.login(credentials);
      const user = await authService.getCurrentUser();
      dispatch({ type: 'AUTH_SUCCESS', payload: { user, tokens } });
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE' });
      throw error;
    }
  };

  const register = async (credentials: RegisterCredentials): Promise<void> => {
    try {
      dispatch({ type: 'AUTH_START' });
      await authService.register(credentials);
      // After registration, automatically log the user in
      const tokens = await authService.login({
        email: credentials.email,
        password: credentials.password,
      });
      const user = await authService.getCurrentUser();
      dispatch({ type: 'AUTH_SUCCESS', payload: { user, tokens } });
    } catch (error) {
      dispatch({ type: 'AUTH_FAILURE' });
      throw error;
    }
  };

  const logout = (): void => {
    authService.logout();
    dispatch({ type: 'LOGOUT' });
  };

  const refreshUser = async (): Promise<void> => {
    try {
      if (state.isAuthenticated) {
        const user = await authService.getCurrentUser();
        dispatch({ type: 'SET_USER', payload: user });
      }
    } catch (error) {
      console.error('Failed to refresh user:', error);
      logout();
    }
  };

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    refreshUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
