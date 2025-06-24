import Navigation from './DashNav';
import { Outlet } from 'react-router-dom';
import { ProtectedRoute } from '../components/ProtectedRoute';

function DashLayout() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="relative">
          <Outlet />
        </main>
      </div>
    </ProtectedRoute>
  );
}

export default DashLayout;
