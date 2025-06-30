
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const ColorPalette = () => {
  const colors = [
    {
      name: "Azul Tecnológico",
      hex: "#3498DB",
      rgb: "52, 152, 219",
      cmyk: "76, 31, 0, 14",
      application: "Fundo, confiança, IA, tecnologia"
    },
    {
      name: "Verde Inovação",
      hex: "#2ECC71",
      rgb: "46, 204, 113",
      cmyk: "77, 0, 45, 20",
      application: "CTAs, crescimento, eficiência"
    },
    {
      name: "Preto",
      hex: "#000000",
      rgb: "0, 0, 0",
      cmyk: "0, 0, 0, 100",
      application: "Fundo escuro, contraste forte"
    },
    {
      name: "Branco",
      hex: "#FFFFFF",
      rgb: "255, 255, 255",
      cmyk: "0, 0, 0, 0",
      application: "Tipografia clara, áreas de respiro"
    }
  ];

  return (
    <section id="colors" className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-slate-800 mb-8 text-center">Paleta de Cores</h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {colors.map((color) => (
            <Card key={color.name} className="bg-white/80 backdrop-blur-sm shadow-lg overflow-hidden">
              <div 
                className="h-32 w-full"
                style={{ backgroundColor: color.hex }}
              ></div>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg text-slate-800">{color.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-1">
                  <Badge variant="outline" className="font-mono text-xs">{color.hex}</Badge>
                  <p className="text-xs text-slate-500">RGB: {color.rgb}</p>
                  <p className="text-xs text-slate-500">CMYK: {color.cmyk}</p>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">{color.application}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Combinações Recomendadas</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="flex h-16 rounded-lg overflow-hidden mb-3">
                <div className="flex-1 bg-[#3498DB]"></div>
                <div className="flex-1 bg-white"></div>
              </div>
              <p className="text-sm font-medium">Azul + Branco</p>
              <p className="text-xs text-slate-500">Confiança e clareza</p>
            </div>
            <div className="text-center">
              <div className="flex h-16 rounded-lg overflow-hidden mb-3">
                <div className="flex-1 bg-[#2ECC71]"></div>
                <div className="flex-1 bg-black"></div>
              </div>
              <p className="text-sm font-medium">Verde + Preto</p>
              <p className="text-xs text-slate-500">Inovação e contraste</p>
            </div>
            <div className="text-center">
              <div className="flex h-16 rounded-lg overflow-hidden mb-3">
                <div className="flex-1 bg-[#3498DB]"></div>
                <div className="flex-1 bg-[#2ECC71]"></div>
              </div>
              <p className="text-sm font-medium">Azul + Verde</p>
              <p className="text-xs text-slate-500">Gradiente principal</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ColorPalette;
