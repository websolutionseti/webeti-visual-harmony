// Persona Card Component for UX Reference
import { PersonaProfile, PERSONA_CONFIGS } from '@/models';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  MessageSquare, 
  Target, 
  Palette,
  ExternalLink,
  Copy,
  Eye
} from "lucide-react";
import { useState } from 'react';
import { toast } from '@/hooks/use-toast';

interface PersonaCardProps {
  persona: PersonaProfile;
  onView?: (persona: PersonaProfile) => void;
  onEdit?: (persona: PersonaProfile) => void;
  compact?: boolean;
}

export const PersonaCard = ({ 
  persona, 
  onView, 
  onEdit, 
  compact = false 
}: PersonaCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const config = PERSONA_CONFIGS[persona.persona];

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copiado!",
      description: `${label} copiado para a área de transferência.`,
    });
  };

  const generatePrompt = () => {
    const prompt = `Você é ${config.name} (${config.role}) da WebSolutions ETI.

Personalidade: ${config.description}
Voz: ${persona.voiceAndTone.voice}
Tom: ${persona.voiceAndTone.tone}

Público-alvo: ${persona.targetAudience.join(', ')}
Canais: ${persona.preferredChannels.join(', ')}
Mensagens-chave: ${persona.keyMessages.join(', ')}

Exemplos do seu estilo:
${persona.voiceAndTone.examples.map(ex => `- ${ex}`).join('\n')}

Agora escreva sobre:`;
    
    copyToClipboard(prompt, 'Prompt da persona');
  };

  if (compact) {
    return (
      <Card className="w-full hover:shadow-md transition-all cursor-pointer" 
            onClick={() => onView?.(persona)}>
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <Avatar className="h-12 w-12">
              <AvatarImage src={persona.avatar} alt={persona.name} />
              <AvatarFallback style={{ backgroundColor: config.color + '20', color: config.color }}>
                {persona.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-sm">{persona.name}</h3>
                <Badge variant="secondary" className="text-xs">{config.role}</Badge>
              </div>
              <p className="text-xs text-muted-foreground truncate">
                {persona.voiceAndTone.voice} • {persona.voiceAndTone.tone}
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={(e) => {
              e.stopPropagation();
              generatePrompt();
            }}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full hover:shadow-lg transition-all">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={persona.avatar} alt={persona.name} />
              <AvatarFallback 
                style={{ 
                  backgroundColor: config.color + '20', 
                  color: config.color,
                  fontSize: '1.2rem',
                  fontWeight: 'bold'
                }}
              >
                {persona.name.substring(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
              <div>
                <CardTitle className="text-xl flex items-center gap-2">
                  {persona.name}
                  <Badge 
                    variant="secondary" 
                    style={{ backgroundColor: config.color + '20', color: config.color }}
                  >
                    {config.role}
                  </Badge>
                </CardTitle>
                <CardDescription className="mt-1">
                  {persona.description}
                </CardDescription>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            {onView && (
              <Button variant="outline" size="sm" onClick={() => onView(persona)}>
                <Eye className="h-4 w-4" />
              </Button>
            )}
            {onEdit && (
              <Button variant="outline" size="sm" onClick={() => onEdit(persona)}>
                <MessageSquare className="h-4 w-4" />
              </Button>
            )}
            <Button variant="outline" size="sm" onClick={generatePrompt}>
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Voice & Tone */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-sm flex items-center gap-2 mb-2">
              <Palette className="h-4 w-4" />
              Voz & Tom
            </h4>
            <div className="space-y-1">
              <div className="text-sm">
                <span className="font-medium">Voz:</span> {persona.voiceAndTone.voice}
              </div>
              <div className="text-sm">
                <span className="font-medium">Tom:</span> {persona.voiceAndTone.tone}
              </div>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-sm flex items-center gap-2 mb-2">
              <Target className="h-4 w-4" />
              Público-Alvo
            </h4>
            <div className="flex flex-wrap gap-1">
              {persona.targetAudience.slice(0, 3).map((audience, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {audience}
                </Badge>
              ))}
              {persona.targetAudience.length > 3 && (
                <Badge variant="outline" className="text-xs">
                  +{persona.targetAudience.length - 3}
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Writing Styles */}
        <div>
          <h4 className="font-semibold text-sm mb-2">Estilos de Escrita</h4>
          <div className="flex flex-wrap gap-1">
            {persona.voiceAndTone.writingStyle.map((style, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {style}
              </Badge>
            ))}
          </div>
        </div>

        {/* Examples */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-sm">Exemplos</h4>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Menos' : 'Mais'} exemplos
            </Button>
          </div>
          <div className="space-y-2">
            {(isExpanded ? persona.voiceAndTone.examples : persona.voiceAndTone.examples.slice(0, 2))
              .map((example, index) => (
              <div key={index} className="p-2 bg-muted/50 rounded text-sm italic">
                "{example}"
              </div>
            ))}
          </div>
        </div>

        {/* Channels */}
        <div>
          <h4 className="font-semibold text-sm flex items-center gap-2 mb-2">
            <Users className="h-4 w-4" />
            Canais Preferenciais
          </h4>
          <div className="flex flex-wrap gap-1">
            {persona.preferredChannels.map((channel, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {channel}
              </Badge>
            ))}
          </div>
        </div>

        {/* Key Messages */}
        <div>
          <h4 className="font-semibold text-sm mb-2">Mensagens-Chave</h4>
          <div className="flex flex-wrap gap-1">
            {persona.keyMessages.map((message, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {message}
              </Badge>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t">
          <div className="flex justify-between items-center">
            <div className="text-xs text-muted-foreground">
              Criado em: {new Date(persona.createdAt).toLocaleDateString('pt-BR')}
            </div>
            <Button 
              variant="default" 
              size="sm" 
              onClick={generatePrompt}
              className="flex items-center gap-2"
            >
              <Copy className="h-4 w-4" />
              Copiar Prompt AI
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};