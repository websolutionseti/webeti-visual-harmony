
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Visão Estratégica", href: "#overview" },
    { label: "Paleta Premium", href: "#colors" },
    { label: "Sistema Tipográfico", href: "#typography" },
    { label: "Identidade Visual", href: "#logo" },
    { label: "Galeria", href: "/gallery" },
    { label: "A11y", href: "/a11y" },
    { label: "Equipe", href: "#characters" },
    { label: "Aplicações", href: "#applications" },
  ];

  return (
    <nav className="bg-background/95 backdrop-blur-md border-b border-border mt-16">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-light text-foreground">
            Design System <span className="font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Premium</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-muted-foreground hover:text-primary transition-colors font-medium text-sm tracking-wide"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-6 pb-6 border-t border-border">
            <div className="flex flex-col space-y-4 pt-6">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-muted-foreground hover:text-primary transition-colors font-medium text-sm tracking-wide"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
