// Persona Controller - UX Persona Management
import { PersonaProfile, CreatePersonaProfileSchema, UpdatePersonaProfileSchema, ApiResponse, PERSONA_CONFIGS } from '@/models';
import { toast } from '@/hooks/use-toast';
import { userController } from './userController';

class PersonaController {
  private static instance: PersonaController;
  private baseUrl = '/api/v1/personas';

  public static getInstance(): PersonaController {
    if (!PersonaController.instance) {
      PersonaController.instance = new PersonaController();
    }
    return PersonaController.instance;
  }

  // Mock personas data based on PRD
  private mockPersonas: PersonaProfile[] = [
    {
      id: '1',
      persona: 'B_ETI',
      name: 'B.eti',
      role: 'CMO',
      description: 'Chief Marketing Officer focada em comunicação acolhedora e inspiradora para gerar conexão emocional com o público.',
      voiceAndTone: {
        voice: 'Acolhedora e empática',
        tone: 'Leve, inspiradora, com emojis quando adequado',
        writingStyle: ['Copy persuasivo', 'UX Writing simples'],
        examples: [
          '🌱 Cresça de forma simples com a gente!',
          'Transforme sua ideia em realidade ✨',
          'Vamos juntos nessa jornada de sucesso? 💪'
        ]
      },
      targetAudience: ['Pequenos empresários', 'Startups', 'Empreendedores iniciantes'],
      preferredChannels: ['Instagram', 'Facebook', 'Stories'],
      keyMessages: ['Acolhimento', 'Crescimento simples', 'Parceria', 'Inspiração'],
      avatar: '/assets/personas/b-eti.png',
      color: '#FF6B9D',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2', 
      persona: 'GEPTO',
      name: 'Gepto',
      role: 'CIO',
      description: 'Chief Information Officer que comunica soluções técnicas de forma estratégica e confiável para decisores.',
      voiceAndTone: {
        voice: 'Estratégica e técnica',
        tone: 'Confiável, autoridade no assunto', 
        writingStyle: ['Content educacional', 'Copy técnico'],
        examples: [
          'Leia o estudo completo sobre arquitetura de dados →',
          'Análise técnica: Como otimizar sua infraestrutura',
          'Dados que comprovam o ROI da transformação digital'
        ]
      },
      targetAudience: ['CTOs', 'CIOs', 'Arquitetos de Software', 'Tech Leads'],
      preferredChannels: ['LinkedIn', 'Blog corporativo', 'Webinars'],
      keyMessages: ['Expertise técnica', 'Dados comprovados', 'Estratégia digital', 'Inovação'],
      avatar: '/assets/personas/gepto.png',
      color: '#4ECDC4',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '3',
      persona: 'EXECUTOR', 
      name: 'Executor',
      role: 'COO',
      description: 'Chief Operating Officer focado em eficiência operacional e execução prática de soluções.',
      voiceAndTone: {
        voice: 'Prática e objetiva',
        tone: 'Organizadora, foco em resultados',
        writingStyle: ['UX Writing claro', 'Copy orientado a ação'],
        examples: [
          'Veja como funciona na prática',
          'Implemente em 3 passos simples',
          'Resultados em 30 dias ou menos'
        ]
      },
      targetAudience: ['COOs', 'Gerentes de Operações', 'Diretores Executivos'],
      preferredChannels: ['Email marketing', 'LinkedIn', 'Apresentações'],
      keyMessages: ['Eficiência', 'Resultados práticos', 'Organização', 'Execução'],
      avatar: '/assets/personas/executor.png',
      color: '#45B7D1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '4',
      persona: 'GUARDIA',
      name: 'Guardiã',
      role: 'CFO', 
      description: 'Chief Financial Officer que analisa custos e ROI com precisão para decisões financeiras estratégicas.',
      voiceAndTone: {
        voice: 'Analítica e precisa',
        tone: 'Confiável, baseada em dados',
        writingStyle: ['Content analítico', 'Relatórios técnicos'],
        examples: [
          'Baixe o relatório financeiro completo',
          'ROI comprovado: 340% em 12 meses',
          'Análise de custos e benefícios detalhada'
        ]
      },
      targetAudience: ['CFOs', 'Controllers', 'Analistas Financeiros', 'Investidores'],
      preferredChannels: ['Relatórios', 'Email corporativo', 'Apresentações executivas'],
      keyMessages: ['ROI comprovado', 'Redução de custos', 'Precisão', 'Segurança financeira'],
      avatar: '/assets/personas/guardia.png',
      color: '#96CEB4',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '5',
      persona: 'ESTRATEGISTA',
      name: 'Estrategista', 
      role: 'CTO',
      description: 'Chief Technology Officer visionário que inspira através de inovação técnica e tendências de mercado.',
      voiceAndTone: {
        voice: 'Visionária e técnica',
        tone: 'Inspiradora, futuro-orientada',
        writingStyle: ['Content técnico avançado', 'Artigos de opinião'],
        examples: [
          'Veja o código no GitHub →',
          'O futuro da arquitetura de software',
          'Tendências que vão transformar a tecnologia'
        ]
      },
      targetAudience: ['CTOs', 'Arquitetos de Software', 'Desenvolvedores Sênior', 'Tech Communities'],
      preferredChannels: ['GitHub', 'Medium', 'Tech conferences', 'LinkedIn'],
      keyMessages: ['Inovação', 'Visão de futuro', 'Excelência técnica', 'Open source'],
      avatar: '/assets/personas/estrategista.png',
      color: '#FECA57',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '6',
      persona: 'ARQUITETO',
      name: 'Arquiteto',
      role: 'CPO',
      description: 'Chief Product Officer que combina estratégia, criatividade e análise para produtos excepcionais.',
      voiceAndTone: {
        voice: 'Estratégica e criativa', 
        tone: 'Analítica, design-thinking oriented',
        writingStyle: ['Content estratégico', 'Case studies', 'Design thinking'],
        examples: [
          'Entenda a lógica por trás da estratégia',
          'Case study: Como redesenhamos a experiência',
          'A psicologia por trás do design de produtos'
        ]
      },
      targetAudience: ['CPOs', 'Product Managers', 'UX Designers', 'Design Leaders'],
      preferredChannels: ['Medium', 'Dribbble', 'Product Hunt', 'Design conferences'],
      keyMessages: ['Design thinking', 'Estratégia de produto', 'User experience', 'Inovação'],
      avatar: '/assets/personas/arquiteto.png',
      color: '#A29BFE',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ];

  async getAllPersonas(): Promise<ApiResponse<PersonaProfile[]>> {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      
      return {
        success: true,
        data: this.mockPersonas,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      return {
        success: false,
        error: `Erro ao buscar personas: ${errorMessage}`,
        timestamp: new Date().toISOString(),
      };
    }
  }

  async getPersonaById(id: string): Promise<ApiResponse<PersonaProfile>> {
    try {
      const persona = this.mockPersonas.find(p => p.id === id);
      
      if (!persona) {
        return {
          success: false,
          error: 'Persona não encontrada',
          timestamp: new Date().toISOString(),
        };
      }

      return {
        success: true,
        data: persona,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      return {
        success: false,
        error: `Erro ao buscar persona: ${errorMessage}`,
        timestamp: new Date().toISOString(),
      };
    }
  }

  async createPersona(personaData: unknown): Promise<ApiResponse<PersonaProfile>> {
    try {
      // Check permissions
      if (!userController.hasPermission('TEAM_CREATE')) {
        return {
          success: false,
          error: 'Acesso negado',
          timestamp: new Date().toISOString(),
        };
      }

      const validatedData = CreatePersonaProfileSchema.parse(personaData);
      
      const newPersona: PersonaProfile = {
        ...validatedData,
        id: Math.random().toString(36).substr(2, 9),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      this.mockPersonas.push(newPersona);

      toast({
        title: "Sucesso!",
        description: "Persona criada com sucesso.",
      });

      return {
        success: true,
        data: newPersona,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      
      toast({
        title: "Erro",
        description: `Erro ao criar persona: ${errorMessage}`,
        variant: "destructive",
      });

      return {
        success: false,
        error: `Erro ao criar persona: ${errorMessage}`,
        timestamp: new Date().toISOString(),
      };
    }
  }

  async updatePersona(id: string, personaData: unknown): Promise<ApiResponse<PersonaProfile>> {
    try {
      // Check permissions
      if (!userController.hasPermission('TEAM_EDIT')) {
        return {
          success: false,
          error: 'Acesso negado',
          timestamp: new Date().toISOString(),
        };
      }

      const validatedData = UpdatePersonaProfileSchema.parse(personaData);
      const personaIndex = this.mockPersonas.findIndex(p => p.id === id);
      
      if (personaIndex === -1) {
        return {
          success: false,
          error: 'Persona não encontrada',
          timestamp: new Date().toISOString(),
        };
      }

      const updatedPersona = {
        ...this.mockPersonas[personaIndex],
        ...validatedData,
        updatedAt: new Date().toISOString(),
      };

      this.mockPersonas[personaIndex] = updatedPersona;

      toast({
        title: "Sucesso!",
        description: "Persona atualizada com sucesso.",
      });

      return {
        success: true,
        data: updatedPersona,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      
      toast({
        title: "Erro",
        description: `Erro ao atualizar persona: ${errorMessage}`,
        variant: "destructive",
      });

      return {
        success: false,
        error: `Erro ao atualizar persona: ${errorMessage}`,
        timestamp: new Date().toISOString(),
      };
    }
  }

  // Get persona configuration
  getPersonaConfig(persona: keyof typeof PERSONA_CONFIGS) {
    return PERSONA_CONFIGS[persona];
  }

  // Generate AI prompt for persona
  generatePersonaPrompt(persona: keyof typeof PERSONA_CONFIGS, contentType: 'copy' | 'content' | 'ux'): string {
    const config = PERSONA_CONFIGS[persona];
    const personaProfile = this.mockPersonas.find(p => p.persona === persona);
    
    if (!personaProfile) return '';

    const basePrompt = `Você é ${config.name} (${config.role}) da WebSolutions ETI. 
    
Sua personalidade: ${config.description}
Sua voz: ${config.voice}
Seu tom: ${config.tone}
    
Escreva um ${contentType} seguindo estas diretrizes:
- ${personaProfile.voiceAndTone.writingStyle.join(' e ')}
- Público-alvo: ${personaProfile.targetAudience.join(', ')}
- Mensagens-chave: ${personaProfile.keyMessages.join(', ')}
- Canais preferenciais: ${personaProfile.preferredChannels.join(', ')}

Exemplos do seu estilo:
${personaProfile.voiceAndTone.examples.map(ex => `- ${ex}`).join('\n')}

Agora escreva sobre o tema solicitado:`;

    return basePrompt;
  }
}

export const personaController = PersonaController.getInstance();