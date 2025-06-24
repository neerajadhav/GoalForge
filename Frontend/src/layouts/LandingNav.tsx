import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useLocation } from "react-router-dom";
import { Menu, Target, X } from "lucide-react";

import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { ModeToggle } from "../components/mode-toggle";
import { useAuth } from "../contexts/AuthContext";
import { useState } from "react";

function LandingNav() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
  ];

  const handleMobileNavClick = () => {
    setIsMenuOpen(false);
  };

  const handleNavClick = () => {
    // Navigation handled by ScrollToTop component
  };

  return (
    <nav className="bg-background/80 backdrop-blur-md shadow-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-chart-1 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
              <Target className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-chart-1 bg-clip-text text-transparent">
              GoalForge
            </span>
            <Badge
              variant="secondary"
              className="text-xs hidden sm:inline-flex"
            >
              Beta
            </Badge>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link to={item.path} key={item.path}>
                <Button
                  variant={
                    location.pathname === item.path ? "default" : "ghost"
                  }
                  size="default"
                  className="relative"
                  onClick={handleNavClick}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-3">
            {/* Desktop CTA */}
            <div className="hidden md:flex items-center space-x-2">
              {isAuthenticated ? (
                <Link to="/app">
                  <Button variant="outline" size="default" onClick={handleNavClick}>
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <>
                  <Link to="/auth/login">
                    <Button variant="ghost" size="default" onClick={handleNavClick}>
                      Login
                    </Button>
                  </Link>
                  <Link to="/auth/register">
                    <Button variant="default" size="default" onClick={handleNavClick}>
                      Register
                    </Button>
                  </Link>
                </>
              )}
            </div>

            <ModeToggle />

            {/* Mobile Menu Dropdown */}
            <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  {isMenuOpen ? (
                    <X className="h-4 w-4" />
                  ) : (
                    <Menu className="h-4 w-4" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="flex flex-col gap-1 w-48 mt-2">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <DropdownMenuItem key={item.path} asChild>
                      <Link
                        to={item.path}
                        onClick={handleMobileNavClick}
                        className={`w-full block px-2 py-1.5 rounded-md text-sm font-medium ${
                          isActive
                            ? "bg-muted text-primary"
                            : "hover:bg-accent hover:text-accent-foreground"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </DropdownMenuItem>
                  );
                })}

                <div className="border-t border-border my-2" />

                {isAuthenticated ? (
                  <DropdownMenuItem asChild>
                    <Link
                      to="/app"
                      onClick={handleMobileNavClick}
                      className="w-full block px-2 py-1.5 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link
                        to="/auth/login"
                        onClick={handleMobileNavClick}
                        className="w-full block px-2 py-1.5 rounded-md text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                      >
                        Login
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                        to="/auth/register"
                        onClick={handleMobileNavClick}
                        className="w-full block px-2 py-1.5 rounded-md text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        Register
                      </Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default LandingNav;
