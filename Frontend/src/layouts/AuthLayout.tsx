import { Outlet } from 'react-router-dom';
import { RedirectIfAuthenticated } from '../components/RedirectIfAuthenticated';
import ScrollToTop from '../components/ScrollToTop';

function AuthLayout() {
  return (
    <RedirectIfAuthenticated>
      <div className="min-h-screen bg-background">
        <ScrollToTop />
        <main className="relative">
          <Outlet />
        </main>
      </div>
    </RedirectIfAuthenticated>
  );
}

export default AuthLayout;
