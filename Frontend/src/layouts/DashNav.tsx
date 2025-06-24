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
import { useState } from "react";

function DashNav() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { path: "/app", label: "Home" },
    { path: "/app/profile", label: "Profile" },
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
          <Link to="/app" className="flex items-center space-x-2 group">
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

          {/* Right Side */}
          <div className="flex items-center space-x-3">
            {/* Desktop DashNav */}
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
            <ModeToggle />

            {/* Mobile Menu Button */}
            <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  {isMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="mt-2 flex gap-1 flex-col">
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
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default DashNav;
