import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import About from './pages/About';
import AuthLayout from './components/AuthLayout';
import Goals from './pages/Goals';
import Home from './pages/Home';
import Layout from './components/Layout';
import LoginPage from './pages/Login';
import NotFound from './pages/NotFound';
import RegisterPage from './pages/Register';
import { ThemeProvider } from './components/theme-provider';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'goals',
        element: <Goals />,
      },
      {
        path: 'about',
        element: <About />,
      },
    ],
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
