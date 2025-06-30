
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Typography = () => {
  return (
    <section id="typography" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-light text-slate-200 mb-12 text-center">Sistema Tipográfico</h2>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Primary Font */}
          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-800 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl text-blue-400 font-semibold">Raleway - Fonte Corporativa</CardTitle>
              <p className="text-slate-400 text-lg">Elegância e modernidade para comunicação premium</p>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <p className="text-sm text-slate-500 mb-3 uppercase tracking-wide">Thin (100-200) - Grandes Títulos Corporativos</p>
                <h1 className="text-5xl font-thin text-slate-300 leading-tight">WebSolutions ETI</h1>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-3 uppercase tracking-wide">Light (300) - Subtítulos Estratégicos</p>
                <p className="text-2xl font-light text-slate-300 leading-relaxed">
                  Tecnologia que entende o seu negócio
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-3 uppercase tracking-wide">SemiBold (600) - CTAs e Destaques</p>
                <p className="text-xl font-semibold text-yellow-500 leading-relaxed">
                  Transformação Digital de Alto Nível
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Secondary Font */}
          <Card className="bg-slate-900/50 backdrop-blur-sm border-slate-800 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl text-yellow-500 font-semibold">Source Code Pro - Técnica</CardTitle>
              <p className="text-slate-400 text-lg">Precisão técnica e credibilidade especializada</p>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <p className="text-sm text-slate-500 mb-3 uppercase tracking-wide">Regular (400) - Especificações Técnicas</p>
                <code className="text-base bg-slate-800 p-4 rounded-lg block font-mono text-slate-300 border border-slate-700">
                  function optimizePerformance() {'{'}
                  <br />
                  &nbsp;&nbsp;return 'B.eti Engine: 99.7% uptime';
                  <br />
                  {'}'}
                </code>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-3 uppercase tracking-wide">Bold (700) - Métricas de Resultado</p>
                <code className="text-lg font-mono font-bold text-green-400 bg-slate-800 px-3 py-2 rounded">
                  PERFORMANCE: +340% ↗
                </code>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Typography Scale */}
        <div className="mt-16 bg-slate-900/30 backdrop-blur-sm rounded-2xl p-10 border border-slate-800">
          <h3 className="text-2xl font-semibold text-slate-200 mb-8 text-center">Hierarquia Premium</h3>
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-slate-700 pb-4">
              <span className="text-5xl font-thin text-slate-300">Display Title</span>
              <span className="text-sm text-slate-500 font-mono">48px / 3rem - Thin (100)</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-700 pb-4">
              <span className="text-4xl font-light text-slate-300">Hero Heading</span>
              <span className="text-sm text-slate-500 font-mono">36px / 2.25rem - Light (300)</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-700 pb-4">
              <span className="text-3xl font-normal text-slate-300">Section Title</span>
              <span className="text-sm text-slate-500 font-mono">30px / 1.875rem - Regular (400)</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-700 pb-4">
              <span className="text-2xl font-medium text-slate-300">Content Header</span>
              <span className="text-sm text-slate-500 font-mono">24px / 1.5rem - Medium (500)</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-700 pb-4">
              <span className="text-xl font-semibold text-slate-300">Call to Action</span>
              <span className="text-sm text-slate-500 font-mono">20px / 1.25rem - SemiBold (600)</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-normal text-slate-300">Body Premium</span>
              <span className="text-sm text-slate-500 font-mono">18px / 1.125rem - Regular (400)</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Typography;
