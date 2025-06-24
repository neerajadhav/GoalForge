import { Outlet } from 'react-router-dom';
import { RedirectIfAuthenticated } from '../components/RedirectIfAuthenticated';

function AuthLayout() {
  return (
    <RedirectIfAuthenticated>
      <div className="min-h-screen bg-background">
        <main className="relative">
          <Outlet />
        </main>
      </div>
    </RedirectIfAuthenticated>
  );
}

export default AuthLayout;
