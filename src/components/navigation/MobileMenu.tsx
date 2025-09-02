import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { 
  Sun, 
  Moon, 
  LogOut, 
  Shield,
  Home,
  Github,
  Link as LinkIcon,
  FileText,
  Linkedin
} from "lucide-react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  isAdminArea: boolean;
  currentNavItems: Array<{ to: string; label: string }>;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onLogout: () => void;
}

const MobileMenu = ({
  isOpen,
  onClose,
  isAuthenticated,
  isAdminArea,
  currentNavItems,
  isDarkMode,
  onToggleTheme,
  onLogout
}: MobileMenuProps) => {
  const socialLinks = [
    {
      label: "GitHub",
      url: "https://github.com/websolutionseti/",
      icon: Github
    },
    {
      label: "FullStackLovable",
      url: "https://ds.websolutions.eti.br",
      icon: LinkIcon
    },
    {
      label: "Figma",
      url: "https://www.figma.com/@gpuentes",
      icon: FileText
    },
    {
      label: "LinkedIn",
      url: "https://linkedin.com/company/websolutionseti",
      icon: Linkedin
    }
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right" className="w-80 bg-background/95 backdrop-blur-md">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span>Menu</span>
              {isAuthenticated && (
                <Badge variant="secondary" className="text-xs">
                  {isAdminArea ? "Admin" : "Usuário"}
                </Badge>
              )}
            </div>
          </SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full mt-6">
          {/* Theme Toggle */}
          <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg mb-6">
            <span className="text-sm font-medium">Tema</span>
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4 text-muted-foreground" />
              <Switch
                checked={isDarkMode}
                onCheckedChange={onToggleTheme}
                className="data-[state=checked]:bg-primary"
              />
              <Moon className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-6 flex-1">
            {/* Main Navigation */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                {isAdminArea ? "Administração" : "Navegação"}
              </h3>
              <div className="space-y-1">
                {currentNavItems.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={onClose}
                    className="flex items-center p-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Area Toggle */}
            <div className="border-t border-border pt-6">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                Alternar Área
              </h3>
              {isAuthenticated ? (
                <Link
                  to={isAdminArea ? "/" : "/admin"}
                  onClick={onClose}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 text-primary border border-primary/20 transition-colors"
                >
                  {isAdminArea ? (
                    <>
                      <Home className="h-5 w-5" />
                      <span>Área Pública</span>
                    </>
                  ) : (
                    <>
                      <Shield className="h-5 w-5" />
                      <span>Área Admin</span>
                    </>
                  )}
                </Link>
              ) : (
                <Link
                  to="/login"
                  onClick={onClose}
                  className="flex items-center space-x-3 p-3 rounded-lg bg-primary/5 hover:bg-primary/10 text-primary border border-primary/20 transition-colors"
                >
                  <Shield className="h-5 w-5" />
                  <span>Fazer Login</span>
                </Link>
              )}
            </div>

            {/* Social Links */}
            <div className="border-t border-border pt-6">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3">
                Links Oficiais
              </h3>
              <div className="space-y-1">
                {socialLinks.map((link) => {
                  const IconComponent = link.icon;
                  return (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3 p-3 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                    >
                      <IconComponent className="h-5 w-5" />
                      <span>{link.label}</span>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-border pt-6 space-y-3">
            {isAuthenticated && (
              <Button
                onClick={() => {
                  onLogout();
                  onClose();
                }}
                variant="outline"
                size="sm"
                className="w-full"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Sair
              </Button>
            )}
            <p className="text-xs text-muted-foreground text-center">
              WebSolutions ETI © 2025
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export { MobileMenu };