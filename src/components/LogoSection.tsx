
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const LogoSection = () => {
  return (
    <section id="logo" className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-slate-800 mb-8 text-center">Logo & Identidade</h2>
        
        {/* Main Logo Display */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-12 shadow-lg mb-8 text-center">
          <div className="mb-8">
            <h1 className="text-6xl font-thin text-slate-800 mb-2">
              WebSolutions <span className="font-semibold text-[#3498DB]">ETI</span>
            </h1>
            <p className="text-lg text-slate-600">Logotipo Principal</p>
          </div>
        </div>

        {/* Logo Variations */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white shadow-lg">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-thin text-slate-800 mb-1">
                WebSolutions <span className="font-semibold text-[#3498DB]">ETI</span>
              </h3>
              <p className="text-xs text-slate-500">Versão Completa</p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900 shadow-lg">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-thin text-white mb-1">
                WebSolutions <span className="font-semibold text-[#3498DB]">ETI</span>
              </h3>
              <p className="text-xs text-slate-400">Fundo Escuro</p>
            </CardContent>
          </Card>

          <Card className="bg-[#3498DB] shadow-lg">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-semibold text-white mb-1">ETI</h3>
              <p className="text-xs text-blue-200">Símbolo</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-2 border-slate-300 shadow-lg">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-thin text-slate-800 mb-1">
                <span className="font-semibold text-[#3498DB]">ETI</span>
              </h3>
              <p className="text-xs text-slate-500">Monocromático</p>
            </CardContent>
          </Card>
        </div>

        {/* Usage Guidelines */}
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-[#2ECC71] flex items-center">
                ✓ Uso Correto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="text-lg font-thin text-slate-800 mb-1">
                  WebSolutions <span className="font-semibold text-[#3498DB]">ETI</span>
                </h4>
                <p className="text-xs text-slate-600">Proporções originais mantidas</p>
              </div>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Manter proporções originais</li>
                <li>• Usar arquivos vetoriais quando possível</li>
                <li>• Respeitar área de proteção</li>
                <li>• Usar cores oficiais da paleta</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-red-500 flex items-center">
                ✗ Uso Incorreto
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-red-50 rounded-lg">
                <h4 className="text-lg font-thin text-slate-800 mb-1 transform skew-x-12">
                  WebSolutions <span className="font-semibold text-purple-500">ETI</span>
                </h4>
                <p className="text-xs text-slate-600">Distorcido e cores alteradas</p>
              </div>
              <ul className="space-y-2 text-sm text-slate-600">
                <li>• Não distorcer ou inclinar</li>
                <li>• Não alterar cores</li>
                <li>• Não adicionar efeitos ou sombras</li>
                <li>• Não usar em fundos inadequados</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* File Formats */}
        <div className="mt-8 bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg">
          <h3 className="text-xl font-semibold text-slate-800 mb-6">Formatos Disponíveis</h3>
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { format: 'SVG', use: 'Web/Vetorial', color: '#3498DB' },
              { format: 'PDF', use: 'Impressão', color: '#e74c3c' },
              { format: 'PNG', use: 'Digital/Web', color: '#2ECC71' },
              { format: 'ICO', use: 'Favicon', color: '#f39c12' },
              { format: 'AI', use: 'Edição', color: '#9b59b6' },
              { format: 'EPS', use: 'Gráfica', color: '#34495e' }
            ].map((item) => (
              <div key={item.format} className="text-center">
                <Badge 
                  variant="outline" 
                  className="w-full py-2 text-white border-0 font-semibold"
                  style={{ backgroundColor: item.color }}
                >
                  {item.format}
                </Badge>
                <p className="text-xs text-slate-500 mt-1">{item.use}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoSection;
