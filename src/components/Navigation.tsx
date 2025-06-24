import { Link, useLocation } from "react-router-dom";
import { Menu, Target, X } from "lucide-react";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { ModeToggle } from "./mode-toggle";
import { useState } from "react";

function Navigation() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/goals", label: "Goals" },
    { path: "/about", label: "About" },
  ];

  const handleMobileNavClick = () => {
    setIsMenuOpen(false);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  };

  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
            <Badge variant="secondary" className="text-xs hidden sm:inline-flex">
              Beta
            </Badge>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant={location.pathname === item.path ? "default" : "ghost"}
                size="sm"
                className="relative"
                onClick={handleNavClick}
              >
                <Link to={item.path}>
                  {item.label}
                </Link>
              </Button>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center space-x-3">
            {/* CTA Buttons - Desktop */}
            <div className="hidden md:flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleNavClick}
              >
                <Link to="/auth/login">
                  Login
                </Link>
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={handleNavClick}
              >
                <Link to="/auth/register">
                  Register
                </Link>
              </Button>
            </div>
            
            <ModeToggle />
            
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col space-y-2">
              {navItems.map((item) => (
                <Button
                  key={item.path}
                  variant={location.pathname === item.path ? "default" : "ghost"}
                  size="sm"
                  className="justify-start"
                  onClick={handleMobileNavClick}
                >
                  <Link to={item.path}>
                    {item.label}
                  </Link>
                </Button>
              ))}
              
              {/* Mobile CTA Buttons */}
              <div className="pt-2 border-t border-border mt-2">
                <Button
                  variant="ghost"
                  size="sm"
                  className="justify-start w-full"
                  onClick={handleMobileNavClick}
                >
                  <Link to="/auth/login">
                    Login
                  </Link>
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  className="justify-start w-full mt-2"
                  onClick={handleMobileNavClick}
                >
                  <Link to="/auth/register">
                    Register
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navigation;
