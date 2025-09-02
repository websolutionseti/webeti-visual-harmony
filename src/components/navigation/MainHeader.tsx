import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { 
  Menu, 
  Sun, 
  Moon, 
  User, 
  LogOut, 
  Shield,
  Home,
  ChevronDown
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { MobileMenu } from "./MobileMenu";

const MainHeader = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if user is authenticated
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const isAuthenticated = !!user;
  const isAdminArea = location.pathname.startsWith('/admin');

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('light-theme');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const publicNavItems = [
    { to: "/", label: "Início" },
    { to: "/gallery", label: "Galeria" },
    { to: "/briefings", label: "Briefings" },
    { to: "/a11y", label: "Acessibilidade" }
  ];

  const adminNavItems = [
    { to: "/admin", label: "Dashboard" },
    { to: "/admin/equipe", label: "Equipe" },
    { to: "/admin/config", label: "Configurações" },
    { to: "/admin/logs", label: "Logs" },
    { to: "/admin/api-docs", label: "API Docs" }
  ];

  const currentNavItems = isAdminArea ? adminNavItems : publicNavItems;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 bg-background/95 backdrop-blur-md border-b border-border z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand */}
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <div className="text-xl font-light text-foreground">
                  WebSolutions{" "}
                  <span className="font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                    ETI
                  </span>
                </div>
              </Link>
              
              {isAuthenticated && (
                <Badge variant="secondary" className="hidden sm:inline-flex">
                  {isAdminArea ? "Admin" : "Usuário"}
                </Badge>
              )}
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {currentNavItems.map((item) => {
                const isActive = location.pathname === item.to;
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-3">
              {/* Theme Toggle */}
              <div className="hidden sm:flex items-center space-x-2">
                <Sun className="h-4 w-4 text-muted-foreground" />
                <Switch
                  checked={isDarkMode}
                  onCheckedChange={toggleTheme}
                  className="data-[state=checked]:bg-primary"
                />
                <Moon className="h-4 w-4 text-muted-foreground" />
              </div>

              {/* User Menu */}
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="hidden sm:flex">
                      <User className="h-4 w-4 mr-2" />
                      Admin
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuItem asChild>
                      <Link to={isAdminArea ? "/" : "/admin"}>
                        {isAdminArea ? (
                          <>
                            <Home className="h-4 w-4 mr-2" />
                            Área Pública
                          </>
                        ) : (
                          <>
                            <Shield className="h-4 w-4 mr-2" />
                            Área Admin
                          </>
                        )}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button asChild variant="default" size="sm" className="hidden sm:flex">
                  <Link to="/login">
                    <Shield className="h-4 w-4 mr-2" />
                    Login
                  </Link>
                </Button>
              )}

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        isAuthenticated={isAuthenticated}
        isAdminArea={isAdminArea}
        currentNavItems={currentNavItems}
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        onLogout={handleLogout}
      />
    </>
  );
};

export default MainHeader;