import { Link, useLocation } from "react-router-dom";
import { Menu, Target, X } from "lucide-react";

import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { ModeToggle } from "../components/mode-toggle";
import { useState } from "react";

function LandingNav() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About" },
  ];

  const handleMobileNavClick = () => {
    setIsMenuOpen(false);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 100);
  };

  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
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

          {/* Desktop LandingNav */}
          <div className="hidden md:flex items-center space-x-2">
            {navItems.map((item) => (
              <Link to={item.path}>
                <Button
                  key={item.path}
                  variant={
                    location.pathname === item.path ? "default" : "ghost"
                  }
                  size="sm"
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
            {/* CTA Buttons - Desktop */}
            <div className="hidden md:flex items-center space-x-2">
              <Link to="/auth/login">
                <Button variant="ghost" size="sm" onClick={handleNavClick}>
                  Login
                </Button>
              </Link>
              <Link to="/auth/register">
                <Button variant="default" size="sm" onClick={handleNavClick}>
                  Register
                </Button>
              </Link>
            </div>

            <ModeToggle />

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile LandingNav */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Link to={item.path}>
                  <Button
                    key={item.path}
                    variant={
                      location.pathname === item.path ? "default" : "ghost"
                    }
                    size="sm"
                    className="justify-start"
                    onClick={handleMobileNavClick}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}

              {/* Mobile CTA Buttons */}
              <div className="pt-2 border-t border-border mt-2">
                <Link to="/auth/login">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="justify-start w-full"
                    onClick={handleMobileNavClick}
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/auth/register">
                  <Button
                    variant="default"
                    size="sm"
                    className="justify-start w-full mt-2"
                    onClick={handleMobileNavClick}
                  >
                    Register
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default LandingNav;
