
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import ColorPalette from "@/components/ColorPalette";
import Typography from "@/components/Typography";
import LogoSection from "@/components/LogoSection";
import CharacterGallery from "@/components/CharacterGallery";
import Applications from "@/components/Applications";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-slate-950 to-slate-900">
      <Navigation />
      
      {/* Hero Section - Premium */}
      <section className="pt-24 pb-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-6xl font-thin text-slate-300 mb-6">
            WebSolutions <span className="font-semibold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">ETI</span>
          </h1>
          <p className="text-2xl text-slate-400 mb-4 max-w-4xl mx-auto font-light">
            Sistema de Identidade Visual Premium
          </p>
          <p className="text-lg text-slate-500 mb-12 max-w-3xl mx-auto">
            Tecnologia que entende o seu negócio. Soluções digitais inteligentes para empresas que buscam excelência.
          </p>
          <Badge variant="outline" className="text-lg px-8 py-3 bg-slate-900/50 backdrop-blur-sm border-slate-700 text-slate-300">
            Versão 2.0 Premium - Junho 2025
          </Badge>
        </div>
      </section>

      {/* Overview Section - Reformulado */}
      <section id="overview" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-light text-slate-200 mb-12 text-center">Visão Estratégica</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-800 shadow-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl text-blue-400 font-semibold">Nossa Essência</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-300 leading-relaxed text-lg">
                  A WebSolutions ETI representa a convergência entre expertise técnica e visão estratégica. 
                  Nossa identidade visual reflete sophisticação, confiança e inovação, posicionando-nos como 
                  parceiros preferenciais para empresas que buscam transformação digital de alto nível.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-800 shadow-2xl">
              <CardHeader className="pb-4">
                <CardTitle className="text-2xl text-yellow-500 font-semibold">Pilares de Excelência</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4 text-slate-300 text-lg">
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full mr-4"></span>
                    Sofisticação e credibilidade técnica
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full mr-4"></span>
                    Inovação com propósito estratégico
                  </li>
                  <li className="flex items-center">
                    <span className="w-3 h-3 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full mr-4"></span>
                    Comunicação clara e impactante
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Separator className="mx-6 bg-slate-800" />

      {/* Color Palette Section */}
      <ColorPalette />

      <Separator className="mx-6 bg-slate-800" />

      {/* Typography Section */}
      <Typography />

      <Separator className="mx-6 bg-slate-800" />

      {/* Logo Section */}
      <LogoSection />

      <Separator className="mx-6 bg-slate-800" />

      {/* Character Gallery */}
      <CharacterGallery />

      <Separator className="mx-6 bg-slate-800" />

      {/* Applications */}
      <Applications />

      {/* Export Section - Premium */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-900/30 via-slate-900/50 to-blue-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-light text-slate-200 mb-8">Documentação Profissional</h2>
          <p className="text-slate-300 mb-12 text-xl leading-relaxed">
            Sistema completo pronto para implementação corporativa, com especificações técnicas 
            para impressão offset e aplicações digitais de alta qualidade.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button 
              size="lg" 
              className="btn-premium btn-premium-primary text-lg px-8 py-4 font-semibold"
            >
              Exportar PDF Premium
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="btn-premium btn-premium-secondary text-lg px-8 py-4 font-semibold"
            >
              Especificações CMYK
            </Button>
          </div>
        </div>
      </section>

      {/* Footer - Premium */}
      <footer className="py-12 px-6 bg-slate-950 border-t border-slate-800">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-400 text-lg">
            Sistema de Design criado por <span className="font-semibold text-slate-300">Guilherme Puentes</span> 
            <span className="text-slate-500"> - Product Designer & Webmaster</span>
          </p>
          <p className="text-slate-500 text-sm mt-3">WebSolutions ETI - Versão 2.0 Premium - Junho 2025</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
