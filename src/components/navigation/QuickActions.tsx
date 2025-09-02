import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { 
  Zap, 
  Plus, 
  Download, 
  Share, 
  Bookmark,
  Search,
  Settings,
  HelpCircle
} from "lucide-react";

const QuickActions = () => {
  const location = useLocation();
  const isAdminArea = location.pathname.startsWith('/admin');
  
  const [isVisible, setIsVisible] = useState(false);

  // Show quick actions after scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      setIsVisible(scrollTop > 200);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  const handleQuickAction = (action: string) => {
    console.log(`Quick action: ${action}`);
    // Implementar ações específicas aqui
  };

  return (
    <div className="fixed bottom-6 left-6 z-40">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            size="icon"
            className="h-12 w-12 rounded-full bg-primary hover:bg-primary/90 shadow-lg"
          >
            <Zap className="h-5 w-5" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="top" align="start" className="w-48">
          {isAdminArea ? (
            <>
              <DropdownMenuItem onClick={() => handleQuickAction('add-user')}>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Usuário
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleQuickAction('export-data')}>
                <Download className="h-4 w-4 mr-2" />
                Exportar Dados
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleQuickAction('system-settings')}>
                <Settings className="h-4 w-4 mr-2" />
                Configurações
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleQuickAction('search')}>
                <Search className="h-4 w-4 mr-2" />
                Busca Global
              </DropdownMenuItem>
            </>
          ) : (
            <>
              <DropdownMenuItem onClick={() => handleQuickAction('bookmark')}>
                <Bookmark className="h-4 w-4 mr-2" />
                Salvar Página
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleQuickAction('share')}>
                <Share className="h-4 w-4 mr-2" />
                Compartilhar
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleQuickAction('download')}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleQuickAction('help')}>
                <HelpCircle className="h-4 w-4 mr-2" />
                Ajuda
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export { QuickActions };