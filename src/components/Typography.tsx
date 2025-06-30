
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Typography = () => {
  return (
    <section id="typography" className="py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold text-slate-800 mb-8 text-center">Tipografia</h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Primary Font */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-[#3498DB]">Fonte Principal - Raleway</CardTitle>
              <p className="text-slate-600">Google Fonts - Versátil e moderna</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-sm text-slate-500 mb-2">Thin (100-200) - Logo e headers grandes</p>
                <h1 className="text-4xl font-thin text-slate-800">WebSolutions ETI</h1>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-2">Regular (400) - Corpo de texto</p>
                <p className="text-lg font-normal text-slate-700">
                  Soluções digitais inteligentes para pequenas empresas e autônomos.
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-2">SemiBold (600) - CTAs e destaques</p>
                <p className="text-lg font-semibold text-[#2ECC71]">
                  Fale com a B.eti agora mesmo!
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Secondary Font */}
          <Card className="bg-white/80 backdrop-blur-sm shadow-lg">
            <CardHeader>
              <CardTitle className="text-xl text-[#2ECC71]">Fonte Secundária - Source Code Pro</CardTitle>
              <p className="text-slate-600">Aplicações técnicas e códigos</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <p className="text-sm text-slate-500 mb-2">Regular (400) - Códigos e dados técnicos</p>
                <code className="text-sm bg-slate-100 p-3 rounded block font-mono text-slate-800">
                  function automateProcess() {'{'}
                  <br />
                  &nbsp;&nbsp;return 'B.eti em ação!';
                  <br />
                  {'}'}
                </code>
              </div>
              <div>
                <p className="text-sm text-slate-500 mb-2">Bold (700) - Dados importantes</p>
                <code className="text-lg font-mono font-bold text-slate-800">
                  STATUS: ONLINE ✓
                </code>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Typography Scale */}
        <div className="mt-12 bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg">
          <h3 className="text-xl font-semibold text-slate-800 mb-6">Escala Tipográfica</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-4xl font-thin text-slate-800">Heading 1</span>
              <span className="text-sm text-slate-500">36px / 2.25rem - Thin</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-3xl font-light text-slate-800">Heading 2</span>
              <span className="text-sm text-slate-500">30px / 1.875rem - Light</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-2xl font-normal text-slate-800">Heading 3</span>
              <span className="text-sm text-slate-500">24px / 1.5rem - Regular</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-xl font-medium text-slate-800">Heading 4</span>
              <span className="text-sm text-slate-500">20px / 1.25rem - Medium</span>
            </div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-2">
              <span className="text-lg font-normal text-slate-800">Body Large</span>
              <span className="text-sm text-slate-500">18px / 1.125rem - Regular</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-base font-normal text-slate-800">Body Regular</span>
              <span className="text-sm text-slate-500">16px / 1rem - Regular</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Typography;
