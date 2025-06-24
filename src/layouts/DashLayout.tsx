import Navigation from './DashNav';
import { Outlet } from 'react-router-dom';

function DashLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="relative">
        <Outlet />
      </main>
    </div>
  );
}

export default DashLayout;
