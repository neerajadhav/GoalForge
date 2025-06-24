import { Outlet } from 'react-router-dom';

function AuthLayout() {
  return (
    <div className="min-h-screen bg-background">
      <main className="relative">
        <Outlet />
      </main>
    </div>
  );
}

export default AuthLayout;
