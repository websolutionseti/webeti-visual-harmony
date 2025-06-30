
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CharacterGallery = () => {
  return (
    <section id="characters" className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-slate-800 mb-8 text-center">Galeria de Personagens</h2>
        
        {/* Character Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* B.eti */}
          <Card className="bg-gradient-to-br from-blue-50 to-white shadow-lg overflow-hidden">
            <CardHeader className="text-center pb-4">
              <div className="w-32 h-32 bg-gradient-to-r from-[#3498DB] to-[#2ECC71] rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">B.eti</span>
              </div>
              <CardTitle className="text-2xl text-[#3498DB]">B.eti</CardTitle>
              <Badge variant="outline" className="w-fit mx-auto">Agente Virtual IA</Badge>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="bg-white/80 rounded-lg p-4">
                <h4 className="font-semibold text-slate-800 mb-2">Características Visuais</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Jovem, feminina</li>
                  <li>• Cabelo liso castanho</li>
                  <li>• Camiseta da marca</li>
                  <li>• Expressão amigável e confiante</li>
                </ul>
              </div>
              
              <div className="bg-white/80 rounded-lg p-4">
                <h4 className="font-semibold text-slate-800 mb-2">Personalidade</h4>
                <p className="text-sm text-slate-600">
                  Inteligente, eficiente e acolhedora. Representa a automação que facilita a vida dos clientes.
                </p>
              </div>

              <div className="bg-[#3498DB]/10 rounded-lg p-4">
                <h4 className="font-semibold text-[#3498DB] mb-2">Frase Marca</h4>
                <p className="text-lg font-medium text-slate-800">"Com B.eti, tudo flui"</p>
              </div>
            </CardContent>
          </Card>

          {/* Gepto */}
          <Card className="bg-gradient-to-br from-green-50 to-white shadow-lg overflow-hidden">
            <CardHeader className="text-center pb-4">
              <div className="w-32 h-32 bg-gradient-to-r from-[#2ECC71] to-[#27ae60] rounded-full mx-auto mb-4 flex items-center justify-center">
                <span className="text-white text-2xl font-bold">Gepto</span>
              </div>
              <CardTitle className="text-2xl text-[#2ECC71]">Gepto</CardTitle>
              <Badge variant="outline" className="w-fit mx-auto">Especialista Técnico</Badge>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <div className="bg-white/80 rounded-lg p-4">
                <h4 className="font-semibold text-slate-800 mb-2">Características Visuais</h4>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Homem adulto</li>
                  <li>• Postura profissional</li>
                  <li>• Aparência confiável</li>
                  <li>• Vestimenta executiva casual</li>
                </ul>
              </div>
              
              <div className="bg-white/80 rounded-lg p-4">
                <h4 className="font-semibold text-slate-800 mb-2">Personalidade</h4>
                <p className="text-sm text-slate-600">
                  Experiente, confiável e estratégico. Representa a expertise técnica e humana da empresa.
                </p>
              </div>

              <div className="bg-[#2ECC71]/10 rounded-lg p-4">
                <h4 className="font-semibold text-[#2ECC71] mb-2">Especialidades</h4>
                <p className="text-sm text-slate-600">
                  Consultoria técnica, estratégia digital, liderança de projetos
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Gallery Placeholder */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg">
          <h3 className="text-xl font-semibold text-slate-800 mb-6 text-center">Galeria de Imagens</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Placeholder for B.eti photos */}
            <div className="aspect-square bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center border-2 border-dashed border-blue-300">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#3498DB] rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white font-bold">B.eti</span>
                </div>
                <p className="text-sm text-slate-600">Foto Principal</p>
              </div>
            </div>

            <div className="aspect-square bg-gradient-to-br from-blue-100 to-blue-50 rounded-lg flex items-center justify-center border-2 border-dashed border-blue-300">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#3498DB] rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white font-bold">B.eti</span>
                </div>
                <p className="text-sm text-slate-600">Variação 1</p>
              </div>
            </div>

            {/* Placeholder for Gepto photos */}
            <div className="aspect-square bg-gradient-to-br from-green-100 to-green-50 rounded-lg flex items-center justify-center border-2 border-dashed border-green-300">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#2ECC71] rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white font-bold">G</span>
                </div>
                <p className="text-sm text-slate-600">Gepto Principal</p>
              </div>
            </div>

            <div className="aspect-square bg-gradient-to-br from-green-100 to-green-50 rounded-lg flex items-center justify-center border-2 border-dashed border-green-300">
              <div className="text-center">
                <div className="w-16 h-16 bg-[#2ECC71] rounded-full mx-auto mb-2 flex items-center justify-center">
                  <span className="text-white font-bold">G</span>
                </div>
                <p className="text-sm text-slate-600">Gepto Variação</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-slate-500 text-sm">
              📸 Espaço reservado para as fotos dos personagens e demais membros da equipe
            </p>
          </div>
        </div>

        {/* Usage Guidelines for Characters */}
        <div className="mt-8 grid lg:grid-cols-2 gap-8">
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-[#3498DB]">Diretrizes de Uso - B.eti</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Sempre associar à tecnologia e automação</li>
                <li>• Usar em contextos de atendimento digital</li>
                <li>• Manter expressão amigável e profissional</li>
                <li>• Aplicar em materiais de divulgação de IA</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-[#2ECC71]">Diretrizes de Uso - Gepto</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Representar autoridade técnica</li>
                <li>• Usar em materiais de consultoria</li>
                <li>• Associar à experiência e confiança</li>
                <li>• Aplicar em contextos B2B e estratégicos</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CharacterGallery;
