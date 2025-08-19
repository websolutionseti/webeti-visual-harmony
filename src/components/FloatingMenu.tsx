
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Menu, Github, Link, Moon, Sun, FileText, Linkedin, Image, Accessibility } from "lucide-react";

const FloatingMenu = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('light-theme');
  };

  const socialLinks = [
    {
      label: "GitHub Organizacional",
      url: "https://github.com/websolutionseti/",
      icon: Github
    },
    {
      label: "Site Oficial",
      url: "https://websolutions.eti.br/",
      icon: Link
    },
    {
      label: "Figma - Documentos",
      url: "https://www.figma.com/@gpuentes",
      icon: FileText
    },
    {
      label: "LinkedIn Perfil",
      url: "https://www.linkedin.com/in/websolutionseti/",
      icon: Linkedin
    },
    {
      label: "LinkedIn Empresa",
      url: "https://linkedin.com/company/websolutionseti",
      icon: Linkedin
    }
  ];

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="icon"
            className="h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-2xl border-2 border-blue-400/20"
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-80 bg-slate-900/95 backdrop-blur-md border-slate-800">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-semibold text-slate-200">Menu Rápido</h3>
              <div className="flex items-center space-x-2">
                <Sun className="h-4 w-4 text-slate-400" />
                <Switch
                  checked={isDarkMode}
                  onCheckedChange={toggleTheme}
                  className="data-[state=checked]:bg-blue-600"
                />
                <Moon className="h-4 w-4 text-slate-400" />
              </div>
            </div>

            <div className="space-y-4 flex-1">
              <div className="mb-6">
                <p className="text-sm text-slate-400 mb-4 uppercase tracking-wide">Links Oficiais</p>
                <div className="space-y-3">
                  {socialLinks.map((link) => {
                    const IconComponent = link.icon;
                    return (
                      <a
                        key={link.label}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 p-3 rounded-lg bg-slate-800/50 hover:bg-slate-800 transition-colors group"
                      >
                        <IconComponent className="h-5 w-5 text-slate-400 group-hover:text-blue-400" />
                        <span className="text-slate-300 group-hover:text-slate-200">{link.label}</span>
                      </a>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-slate-700 pt-6">
                <p className="text-sm text-slate-400 mb-4 uppercase tracking-wide">Navegação</p>
                <div className="space-y-2">
                  <a href="/" className="flex items-center space-x-3 p-2 text-slate-300 hover:text-blue-400 transition-colors">
                    <span>🏠 Início</span>
                  </a>
                  <a href="/gallery" className="flex items-center space-x-3 p-2 text-slate-300 hover:text-blue-400 transition-colors">
                    <Image className="h-4 w-4" />
                    <span>Galeria de Assets</span>
                  </a>
                  <a href="/a11y" className="flex items-center space-x-3 p-2 text-slate-300 hover:text-blue-400 transition-colors">
                    <Accessibility className="h-4 w-4" />
                    <span>Menu A11y</span>
                  </a>
                </div>
              </div>

              <div className="border-t border-slate-700 pt-6">
                <p className="text-sm text-slate-400 mb-4 uppercase tracking-wide">Navegação Rápida</p>
                <div className="space-y-2">
                  {['#overview', '#colors', '#typography', '#logo', '#characters', '#applications'].map((anchor) => (
                    <a
                      key={anchor}
                      href={anchor}
                      className="block p-2 text-slate-300 hover:text-blue-400 transition-colors capitalize"
                    >
                      {anchor.replace('#', '').replace(/([A-Z])/g, ' $1')}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="border-t border-slate-700 pt-4">
              <p className="text-xs text-slate-500 text-center">
                WebSolutions ETI © 2025
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default FloatingMenu;
