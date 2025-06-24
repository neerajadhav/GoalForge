import { RouterProvider, createBrowserRouter } from "react-router-dom";

import About from "./pages/landing/About";
import AppHome from "./pages/app/Home";
import AuthLayout from "./layouts/AuthLayout";
import { AuthProvider } from "./contexts/AuthContext";
import DashLayout from "./layouts/DashLayout";
import GoalDetails from "./pages/app/GoalDetails";
import Home from "./pages/landing/Home";
import Layout from "./layouts/LandingLayout";
import LoginPage from "./pages/auth/Login";
import NotFound from "./pages/NotFound";
import Profile from "./pages/app/Profile";
import RegisterPage from "./pages/auth/Register";
import { ThemeProvider } from "./components/theme-provider";
import { ToastProvider } from "./contexts/ToastContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
  {
    path: "/app",
    element: <DashLayout />,
    children: [
      {
        index: true,
        element: <AppHome />,
      },
      {
        path: "goal/:id",
        element: <GoalDetails />,
      },
      {
        path: "profile",
        element: <Profile />,
      }
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AuthProvider>
        <ToastProvider>
          <RouterProvider router={router} />
        </ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
