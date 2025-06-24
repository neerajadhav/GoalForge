import { RouterProvider, createBrowserRouter } from "react-router-dom";

import About from "./pages/landing/About";
import AppHome from "./pages/app/Home";
import AuthLayout from "./layouts/AuthLayout";
import { AuthProvider } from "./contexts/AuthContext";
import DashLayout from "./layouts/DashLayout";
import Home from "./pages/landing/Home";
import Layout from "./layouts/LandingLayout";
import LoginPage from "./pages/auth/Login";
import NotFound from "./pages/NotFound";
import Profile from "./pages/app/Profile";
import RegisterPage from "./pages/auth/Register";
import { ThemeProvider } from "./components/theme-provider";

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
        <RouterProvider router={router} />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
