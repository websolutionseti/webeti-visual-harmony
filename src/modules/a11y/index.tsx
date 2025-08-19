import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Accessibility, 
  Type, 
  Palette, 
  Globe, 
  Sun, 
  Moon,
  Volume2,
  VolumeX
} from 'lucide-react';

interface A11yMenuProps {
  fontSize?: number;
  language?: 'pt' | 'en' | 'es';
  onChangeLanguage?: (lang: string) => void;
  onToggleContrast?: () => void;
  onToggleTheme?: () => void;
  onToggleSound?: () => void;
  className?: string;
}

export const A11yMenu: React.FC<A11yMenuProps> = ({
  fontSize = 16,
  language = 'pt',
  onChangeLanguage,
  onToggleContrast,
  onToggleTheme,
  onToggleSound,
  className = ''
}) => {
  const [currentFontSize, setCurrentFontSize] = useState(fontSize);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [currentLanguage, setCurrentLanguage] = useState(language);

  useEffect(() => {
    // Aplicar tamanho da fonte
    document.documentElement.style.fontSize = `${currentFontSize}px`;
  }, [currentFontSize]);

  const increaseFontSize = () => {
    const newSize = Math.min(currentFontSize + 2, 24);
    setCurrentFontSize(newSize);
  };

  const decreaseFontSize = () => {
    const newSize = Math.max(currentFontSize - 2, 12);
    setCurrentFontSize(newSize);
  };

  const resetFontSize = () => {
    setCurrentFontSize(16);
  };

  const toggleContrast = () => {
    setIsHighContrast(!isHighContrast);
    if (onToggleContrast) {
      onToggleContrast();
    }
    // Aplicar classe de alto contraste
    document.documentElement.classList.toggle('high-contrast', !isHighContrast);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (onToggleTheme) {
      onToggleTheme();
    }
    document.documentElement.classList.toggle('dark', !isDarkMode);
  };

  const toggleSound = () => {
    setIsSoundEnabled(!isSoundEnabled);
    if (onToggleSound) {
      onToggleSound();
    }
  };

  const changeLanguage = (lang: string) => {
    const validLang = lang as 'pt' | 'en' | 'es';
    setCurrentLanguage(validLang);
    if (onChangeLanguage) {
      onChangeLanguage(lang);
    }
  };

  const languages = {
    pt: { name: 'Português', flag: '🇧🇷' },
    en: { name: 'English', flag: '🇺🇸' },
    es: { name: 'Español', flag: '🇪🇸' }
  };

  const texts = {
    pt: {
      title: 'Menu de Acessibilidade',
      fontSize: 'Tamanho da Fonte',
      increase: 'Aumentar',
      decrease: 'Diminuir',
      reset: 'Resetar',
      contrast: 'Alto Contraste',
      theme: 'Tema',
      sound: 'Som',
      language: 'Idioma',
      current: 'Atual'
    },
    en: {
      title: 'Accessibility Menu',
      fontSize: 'Font Size',
      increase: 'Increase',
      decrease: 'Decrease',
      reset: 'Reset',
      contrast: 'High Contrast',
      theme: 'Theme',
      sound: 'Sound',
      language: 'Language',
      current: 'Current'
    },
    es: {
      title: 'Menú de Accesibilidad',
      fontSize: 'Tamaño de Fuente',
      increase: 'Aumentar',
      decrease: 'Disminuir',
      reset: 'Resetear',
      contrast: 'Alto Contraste',
      theme: 'Tema',
      sound: 'Sonido',
      language: 'Idioma',
      current: 'Actual'
    }
  };

  const t = texts[currentLanguage as keyof typeof texts];

  return (
    <Card className={`p-6 max-w-md mx-auto ${className}`}>
      <div className="flex items-center gap-2 mb-6">
        <Accessibility className="h-6 w-6 text-primary" />
        <h2 className="text-xl font-semibold">{t.title}</h2>
      </div>

      <div className="space-y-6">
        {/* Tamanho da Fonte */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Type className="h-5 w-5" />
            <span className="font-medium">{t.fontSize}</span>
            <Badge variant="secondary">{currentFontSize}px</Badge>
          </div>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={decreaseFontSize}
              disabled={currentFontSize <= 12}
            >
              A-
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={resetFontSize}
            >
              {t.reset}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={increaseFontSize}
              disabled={currentFontSize >= 24}
            >
              A+
            </Button>
          </div>
        </div>

        {/* Alto Contraste */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Palette className="h-5 w-5" />
            <span className="font-medium">{t.contrast}</span>
          </div>
          <Button 
            variant={isHighContrast ? "default" : "outline"} 
            size="sm" 
            onClick={toggleContrast}
          >
            {isHighContrast ? 'Ativado' : 'Desativado'}
          </Button>
        </div>

        {/* Tema */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            {isDarkMode ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            <span className="font-medium">{t.theme}</span>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={toggleTheme}
          >
            {isDarkMode ? 'Escuro' : 'Claro'}
          </Button>
        </div>

        {/* Som */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            {isSoundEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
            <span className="font-medium">{t.sound}</span>
          </div>
          <Button 
            variant={isSoundEnabled ? "default" : "outline"} 
            size="sm" 
            onClick={toggleSound}
          >
            {isSoundEnabled ? 'Ativado' : 'Desativado'}
          </Button>
        </div>

        {/* Idioma */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Globe className="h-5 w-5" />
            <span className="font-medium">{t.language}</span>
          </div>
          <div className="flex gap-2 flex-wrap">
            {Object.entries(languages).map(([code, info]) => (
              <Button
                key={code}
                variant={currentLanguage === code ? "default" : "outline"}
                size="sm"
                onClick={() => changeLanguage(code)}
                className="flex items-center gap-1"
              >
                <span>{info.flag}</span>
                <span className="text-xs">{code.toUpperCase()}</span>
              </Button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 pt-4 border-t text-xs text-muted-foreground text-center">
        WebSolutions ETI - Acessibilidade Universal
      </div>
    </Card>
  );
};

export default A11yMenu;