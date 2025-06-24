import Navigation from './LandingNav';
import { Outlet } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop';

function Layout() {
  return (
    <div className="min-h-screen bg-background">
      <ScrollToTop />
      <Navigation />
      <main className="relative">
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
