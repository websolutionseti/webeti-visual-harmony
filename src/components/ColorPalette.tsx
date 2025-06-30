
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ColorPalette = () => {
  const colors = [
    {
      name: "Grafite Corporativo",
      hex: "#1C1C1C",
      rgb: "28, 28, 28",
      cmyk: "0, 0, 0, 89",
      application: "Fundo principal, autoridade, sofisticação premium"
    },
    {
      name: "Azul Profundo",
      hex: "#002B5B",
      rgb: "0, 43, 91",
      cmyk: "100, 53, 0, 64",
      application: "CTAs primários, confiança, tecnologia de ponta"
    },
    {
      name: "Dourado Suave",
      hex: "#D4AF37",
      rgb: "212, 175, 55",
      cmyk: "0, 17, 74, 17",
      application: "Acentos premium, excelência, diferenciação"
    },
    {
      name: "Prata Metálico",
      hex: "#C0C0C0",
      rgb: "192, 192, 192",
      cmyk: "0, 0, 0, 25",
      application: "Elementos secundários, elegância, neutralidade"
    },
    {
      name: "Bege Quente",
      hex: "#E5D8C0",
      rgb: "229, 216, 192",
      cmyk: "0, 6, 16, 10",
      application: "Fundos suaves, acolhimento, humanização"
    },
    {
      name: "Azul Acinzentado",
      hex: "#CBD5E1",
      rgb: "203, 213, 225",
      cmyk: "10, 5, 0, 12",
      application: "Textos auxiliares, informações técnicas"
    }
  ];

  return (
    <section id="colors" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-light text-slate-200 mb-12 text-center">Paleta Premium</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {colors.map((color) => (
            <Card key={color.name} className="bg-slate-900/50 backdrop-blur-sm border-slate-800 shadow-2xl overflow-hidden">
              <div 
                className="h-40 w-full relative"
                style={{ backgroundColor: color.hex }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/20"></div>
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="text-xl text-slate-200 font-semibold">{color.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Badge variant="outline" className="font-mono text-sm bg-slate-800 border-slate-700 text-slate-300">{color.hex}</Badge>
                  <p className="text-sm text-slate-400">RGB: {color.rgb}</p>
                  <p className="text-sm text-slate-400">CMYK: {color.cmyk}</p>
                </div>
                <p className="text-sm text-slate-300 leading-relaxed font-medium">{color.application}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-slate-900/30 backdrop-blur-sm rounded-2xl p-10 border border-slate-800">
          <h3 className="text-2xl font-semibold text-slate-200 mb-8 text-center">Combinações Estratégicas</h3>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="flex h-20 rounded-xl overflow-hidden mb-4 shadow-lg">
                <div className="flex-1 bg-[#1C1C1C]"></div>
                <div className="flex-1 bg-[#002B5B]"></div>
              </div>
              <p className="text-lg font-semibold text-slate-200">Grafite + Azul Profundo</p>
              <p className="text-sm text-slate-400 mt-1">Autoridade e confiança corporativa</p>
            </div>
            <div className="text-center">
              <div className="flex h-20 rounded-xl overflow-hidden mb-4 shadow-lg">
                <div className="flex-1 bg-[#D4AF37]"></div>
                <div className="flex-1 bg-[#1C1C1C]"></div>
              </div>
              <p className="text-lg font-semibold text-slate-200">Dourado + Grafite</p>
              <p className="text-sm text-slate-400 mt-1">Excelência e sofisticação premium</p>
            </div>
            <div className="text-center">
              <div className="flex h-20 rounded-xl overflow-hidden mb-4 shadow-lg">
                <div className="flex-1 bg-[#C0C0C0]"></div>
                <div className="flex-1 bg-[#E5D8C0]"></div>
              </div>
              <p className="text-lg font-semibold text-slate-200">Prata + Bege Quente</p>
              <p className="text-sm text-slate-400 mt-1">Elegância e acolhimento humano</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ColorPalette;
