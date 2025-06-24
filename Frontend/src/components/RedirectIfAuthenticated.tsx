import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface RedirectIfAuthenticatedProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export const RedirectIfAuthenticated = ({ 
  children, 
  redirectTo = '/app' 
}: RedirectIfAuthenticatedProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};
