import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Menu, 
  Github, 
  Link as LinkIcon, 
  Moon, 
  Sun, 
  FileText, 
  Linkedin, 
  Image, 
  Accessibility,
  Users,
  Settings,
  ScrollText,
  Book,
  Home,
  LogOut,
  Shield,
  HelpCircle
} from "lucide-react";

// Keeping this as a fallback quick menu for specific pages
const GlobalNavigation = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Check if user is authenticated
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const isAuthenticated = !!user;
  const isAdminArea = location.pathname.startsWith('/admin') || location.pathname === '/login';
  
  // Only show on specific pages where quick access is needed
  const showOnPages = ['/', '/gallery', '/a11y'];
  const shouldShow = showOnPages.includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 400 && shouldShow);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [shouldShow]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('light-theme');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const socialLinks = [
    {
      label: "GitHub Organizacional",
      url: "https://github.com/websolutionseti/",
      icon: Github
    },
    {
      label: "FullStackLovable",
      url: "https://ds.websolutions.eti.br",
      icon: LinkIcon
    },
    {
      label: "Figma - Documentos",
      url: "https://www.figma.com/@gpuentes",
      icon: FileText
    },
    {
      label: "LinkedIn Empresa",
      url: "https://linkedin.com/company/websolutionseti",
      icon: Linkedin
    }
  ];

  const publicNavItems = [
    { to: "/", label: "Início", icon: Home },
    { to: "/gallery", label: "Galeria de Assets", icon: Image },
    { to: "/a11y", label: "Menu A11y", icon: Accessibility }
  ];

  const adminNavItems = [
    { to: "/admin", label: "Dashboard", icon: Shield },
    { to: "/admin/equipe", label: "Equipe", icon: Users },
    { to: "/admin/config", label: "Configurações", icon: Settings },
    { to: "/admin/logs", label: "Logs", icon: ScrollText },
    { to: "/admin/api-docs", label: "Documentação", icon: Book }
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-40">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className="h-12 w-12 rounded-full bg-primary/90 hover:bg-primary shadow-xl border border-primary/20"
            title="Menu Rápido"
          >
            <HelpCircle className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-80 bg-background/95 backdrop-blur-md border-border">
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-2">
                <h3 className="text-xl font-semibold text-foreground">Menu Rápido</h3>
                {isAuthenticated && (
                  <Badge variant="secondary" className="text-xs">
                    Admin
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Sun className="h-4 w-4 text-muted-foreground" />
                <Switch
                  checked={isDarkMode}
                  onCheckedChange={toggleTheme}
                  className="data-[state=checked]:bg-primary"
                />
                <Moon className="h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            <div className="space-y-4 flex-1">
              {/* Navigation Section */}
              <div className="mb-6">
                <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wide">
                  {isAdminArea ? "Área Administrativa" : "Navegação Principal"}
                </p>
                <div className="space-y-2">
                  {isAdminArea ? (
                    <>
                      {adminNavItems.map((item) => {
                        const IconComponent = item.icon;
                        const isActive = location.pathname === item.to;
                        return (
                          <Link
                            key={item.to}
                            to={item.to}
                            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors group ${
                              isActive 
                                ? "bg-primary/10 text-primary border border-primary/20" 
                                : "bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            <IconComponent className="h-5 w-5" />
                            <span>{item.label}</span>
                          </Link>
                        );
                      })}
                    </>
                  ) : (
                    <>
                      {publicNavItems.map((item) => {
                        const IconComponent = item.icon;
                        const isActive = location.pathname === item.to;
                        return (
                          <Link
                            key={item.to}
                            to={item.to}
                            className={`flex items-center space-x-3 p-3 rounded-lg transition-colors group ${
                              isActive 
                                ? "bg-primary/10 text-primary border border-primary/20" 
                                : "bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            <IconComponent className="h-5 w-5" />
                            <span>{item.label}</span>
                          </Link>
                        );
                      })}
                    </>
                  )}
                </div>
              </div>

              {/* Area Toggle */}
              <div className="border-t border-border pt-6">
                <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wide">
                  Alternar Área
                </p>
                <div className="space-y-2">
                  {isAuthenticated ? (
                    <>
                      {!isAdminArea && (
                        <Link
                          to="/admin"
                          className="flex items-center space-x-3 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 text-primary border border-primary/20 transition-colors"
                        >
                          <Shield className="h-5 w-5" />
                          <span>Área Administrativa</span>
                        </Link>
                      )}
                      {isAdminArea && (
                        <Link
                          to="/"
                          className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                        >
                          <Home className="h-5 w-5" />
                          <span>Área Pública</span>
                        </Link>
                      )}
                    </>
                  ) : (
                    <Link
                      to="/login"
                      className="flex items-center space-x-3 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 text-primary border border-primary/20 transition-colors"
                    >
                      <Shield className="h-5 w-5" />
                      <span>Fazer Login</span>
                    </Link>
                  )}
                </div>
              </div>

              {/* Social Links */}
              <div className="border-t border-border pt-6">
                <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wide">Links Oficiais</p>
                <div className="space-y-2">
                  {socialLinks.map((link) => {
                    const IconComponent = link.icon;
                    return (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
                      >
                        <IconComponent className="h-5 w-5 text-muted-foreground group-hover:text-primary" />
                        <span className="text-muted-foreground group-hover:text-foreground">{link.label}</span>
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Quick Anchors (only on home page) */}
              {location.pathname === "/" && (
                <div className="border-t border-border pt-6">
                  <p className="text-sm text-muted-foreground mb-4 uppercase tracking-wide">Navegação Rápida</p>
                  <div className="space-y-2">
                    {['#overview', '#colors', '#typography', '#logo', '#characters', '#applications'].map((anchor) => (
                      <a
                        key={anchor}
                        href={anchor}
                        className="block p-2 text-muted-foreground hover:text-primary transition-colors capitalize"
                      >
                        {anchor.replace('#', '').replace(/([A-Z])/g, ' $1')}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-border pt-4 space-y-3">
              {isAuthenticated && (
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  size="sm"
                  className="w-full"
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sair
                </Button>
              )}
              <p className="text-xs text-muted-foreground text-center">
                FullStackLovable © 2025
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default GlobalNavigation;