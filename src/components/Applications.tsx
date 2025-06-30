
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Applications = () => {
  const physicalItems = [
    { name: "Cartão de Visita", description: "Frente com contatos, verso com símbolo da B.eti", size: "9x5cm" },
    { name: "Folheto", description: "Apresentação da B.eti e serviços", size: "10x14cm" },
    { name: "Banner Vertical", description: "Frase de impacto + B.eti", size: "60x90cm" },
    { name: "Caneca", description: "Símbolo de um lado, B.eti do outro", size: "325ml" },
    { name: "Camiseta", description: "Frente com logo, verso com frase", size: "Variados" },
    { name: "Mousepad", description: "B.eti + ícones de automação + logo", size: "25x20cm" },
    { name: "Adesivo Carro", description: "Recorte branco com logo", size: "15x10cm" },
    { name: "Placa Atendimento", description: "Fale com a B.eti + QR Code", size: "30x20cm" },
    { name: "Agenda", description: "Capa institucional com B.eti", size: "A5" },
    { name: "Mini Agenda", description: "Versão compacta", size: "A6" }
  ];

  const digitalItems = [
    { name: "Favicon", description: "Símbolo 'eti' para navegadores", format: ".ico/.svg/.png" },
    { name: "WhatsApp Business", description: "B.eti e CTA", format: "1080x1080px" },
    { name: "Post Redes Sociais", description: "B.eti explicando soluções", format: "1080x1080px" },
    { name: "Slide Institucional", description: "Layout para apresentações", format: "16:9 - 1920x1080px" }
  ];

  return (
    <section id="applications" className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-slate-800 mb-8 text-center">Aplicações da Marca</h2>
        
        {/* Physical Applications */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-[#3498DB] mb-6">Materiais Físicos</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {physicalItems.map((item, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-slate-800">{item.name}</CardTitle>
                  <Badge variant="outline" className="w-fit text-xs">{item.size}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Digital Applications */}
        <div className="mb-12">
          <h3 className="text-2xl font-semibold text-[#2ECC71] mb-6">Materiais Digitais</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {digitalItems.map((item, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-slate-800">{item.name}</CardTitle>
                  <Badge variant="outline" className="w-fit text-xs">{item.format}</Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Application Examples */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg">
          <h3 className="text-xl font-semibold text-slate-800 mb-6 text-center">Exemplos de Aplicação</h3>
          
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Business Card Mockup */}
            <div className="text-center">
              <div className="bg-gradient-to-r from-[#3498DB] to-[#2ECC71] rounded-lg p-6 mb-4 shadow-lg">
                <div className="bg-white rounded p-4 transform rotate-3 hover:rotate-0 transition-transform">
                  <h4 className="text-lg font-thin text-slate-800">
                    WebSolutions <span className="font-semibold text-[#3498DB]">ETI</span>
                  </h4>
                  <p className="text-xs text-slate-600 mt-2">Guilherme Puentes</p>
                  <p className="text-xs text-slate-500">Product Designer</p>
                </div>
              </div>
              <h4 className="font-semibold text-slate-800">Cartão de Visita</h4>
              <p className="text-sm text-slate-600">Frente profissional, verso com B.eti</p>
            </div>

            {/* T-shirt Mockup */}
            <div className="text-center">
              <div className="bg-slate-100 rounded-lg p-6 mb-4 shadow-lg">
                <div className="bg-[#3498DB] rounded-lg p-6 text-white">
                  <h4 className="text-lg font-thin">
                    WebSolutions <span className="font-semibold">ETI</span>
                  </h4>
                  <div className="mt-4 text-xs bg-white/20 rounded p-2">
                    Verso: "Com B.eti, tudo flui"
                  </div>
                </div>
              </div>
              <h4 className="font-semibold text-slate-800">Camiseta</h4>
              <p className="text-sm text-slate-600">Logo frente, frase verso</p>
            </div>

            {/* Digital Post Mockup */}
            <div className="text-center">
              <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-lg p-6 mb-4 shadow-lg">
                <div className="bg-white rounded-lg p-4">
                  <div className="w-12 h-12 bg-[#3498DB] rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-white text-sm font-bold">B.eti</span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-800 mb-1">Automação Inteligente</h4>
                  <p className="text-xs text-slate-600">Soluções que facilitam seu dia</p>
                </div>
              </div>
              <h4 className="font-semibold text-slate-800">Post Social</h4>
              <p className="text-sm text-slate-600">B.eti apresentando soluções</p>
            </div>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg">
          <h3 className="text-xl font-semibold text-slate-800 mb-6">Especificações Técnicas</h3>
          <div className="grid lg:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-[#3498DB] mb-4">Para Impressão</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• <strong>Resolução:</strong> Mínimo 300 DPI</li>
                <li>• <strong>Cores:</strong> CMYK para materiais gráficos</li>
                <li>• <strong>Formato:</strong> PDF/X-1a para gráficas</li>
                <li>• <strong>Sangria:</strong> 3mm quando necessário</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-[#2ECC71] mb-4">Para Digital</h4>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• <strong>Cores:</strong> RGB para telas</li>
                <li>• <strong>Formato:</strong> PNG para transparência</li>
                <li>• <strong>SVG:</strong> Para escalabilidade web</li>
                <li>• <strong>Responsivo:</strong> Adaptar para diferentes telas</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Applications;
