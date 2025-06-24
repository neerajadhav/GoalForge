import Navigation from './LandingNav';
import { Outlet } from 'react-router-dom';

function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="relative">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
