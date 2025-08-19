import React from 'react';
import Navigation from '@/components/Navigation';
import { A11yMenu } from '@/modules/a11y';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Code, Palette, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const A11yDemo = () => {
  const handleLanguageChange = (lang: string) => {
    console.log('Idioma alterado para:', lang);
  };

  const handleToggleContrast = () => {
    console.log('Alto contraste alternado');
  };

  const handleToggleTheme = () => {
    console.log('Tema alternado');
  };

  const handleToggleSound = () => {
    console.log('Som alternado');
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar ao Design System
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Menu A11y</h1>
              <p className="text-muted-foreground">
                Componente modular de acessibilidade reutilizável entre projetos
              </p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Como usar
                </CardTitle>
                <CardDescription>
                  Importe e use o componente em qualquer projeto
                </CardDescription>
              </CardHeader>
              <CardContent>
                <pre className="bg-muted p-4 rounded-lg text-sm overflow-x-auto">
{`import { A11yMenu } from '@/modules/a11y';

<A11yMenu 
  fontSize={18}
  language="pt"
  onChangeLanguage={handleLanguageChange}
  onToggleContrast={toggleContrast}
  onToggleTheme={toggleTheme}
  onToggleSound={toggleSound}
/>`}
                </pre>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Recursos
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Ajuste de tamanho da fonte (12px - 24px)</li>
                  <li>• Alternância de alto contraste</li>
                  <li>• Tema claro/escuro</li>
                  <li>• Controle de som</li>
                  <li>• Suporte a múltiplos idiomas</li>
                  <li>• Persistência de preferências</li>
                  <li>• Compatível com WCAG 2.1 AA</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Integração
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  Este componente será integrado em todos os projetos da WebSolutions ETI, 
                  incluindo o menu principal de beti.websolutions.eti.br
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://beti.websolutions.eti.br" target="_blank" rel="noopener noreferrer">
                      Ver B.eti A11y
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <a href="https://websolutions.eti.br" target="_blank" rel="noopener noreferrer">
                      WebSolutions ETI
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Demonstração Interativa</h2>
            <A11yMenu
              fontSize={16}
              language="pt"
              onChangeLanguage={handleLanguageChange}
              onToggleContrast={handleToggleContrast}
              onToggleTheme={handleToggleTheme}
              onToggleSound={handleToggleSound}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default A11yDemo;