
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl font-thin text-slate-800 mb-4">
            WebSolutions <span className="font-semibold text-[#3498DB]">ETI</span>
          </h1>
          <p className="text-xl text-slate-600 mb-8 max-w-3xl mx-auto">
            Guia de Estilo & Identidade Visual
          </p>
          <Badge variant="outline" className="text-lg px-6 py-2 bg-white/80 backdrop-blur-sm">
            Versão 1.0 - Junho 2025
          </Badge>
        </div>
      </section>

      {/* Overview Section */}
      <section id="overview" className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-slate-800 mb-8 text-center">Visão Geral</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-[#3498DB]">Nossa Missão</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600 leading-relaxed">
                  A WebSolutions ETI é uma empresa de soluções digitais para pequenas empresas e autônomos, 
                  com atuação técnica e estratégica. Nossa identidade visual equilibra tecnologia com acolhimento, 
                  estratégia com execução.
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl text-[#2ECC71]">Nossos Pilares</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex items-center"><span className="w-2 h-2 bg-[#2ECC71] rounded-full mr-3"></span>Acolhimento e profissionalismo</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-[#2ECC71] rounded-full mr-3"></span>Confiança e inovação</li>
                  <li className="flex items-center"><span className="w-2 h-2 bg-[#2ECC71] rounded-full mr-3"></span>Clareza e impacto visual</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Separator className="mx-6" />

      {/* Color Palette Section */}
      <ColorPalette />

      <Separator className="mx-6" />

      {/* Typography Section */}
      <Typography />

      <Separator className="mx-6" />

      {/* Logo Section */}
      <LogoSection />

      <Separator className="mx-6" />

      {/* Character Gallery */}
      <CharacterGallery />

      <Separator className="mx-6" />

      {/* Applications */}
      <Applications />

      {/* Export Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-[#3498DB] to-[#2ECC71]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-white mb-6">Pronto para exportar?</h2>
          <p className="text-white/90 mb-8 text-lg">
            Este guia de estilo está pronto para ser convertido em PDF para impressão e compartilhamento.
          </p>
          <Button 
            size="lg" 
            variant="secondary" 
            className="bg-white text-[#3498DB] hover:bg-white/90 font-semibold px-8 py-3"
          >
            Exportar PDF
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-slate-300">
            Documento criado por <span className="font-semibold">Guilherme Puentes</span> - Product Designer & Webmaster
          </p>
          <p className="text-slate-400 text-sm mt-2">WebSolutions ETI - Junho 2025</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
