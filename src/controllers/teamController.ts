// Team Controller - Business Logic for Team Management
import { TeamMember, CreateTeamMemberSchema, UpdateTeamMemberSchema, ApiResponse } from '@/models';
import { toast } from '@/hooks/use-toast';
import { userController } from './userController';

class TeamController {
  private static instance: TeamController;
  private baseUrl = '/api/v1/team'; // Future Supabase Function endpoint

  public static getInstance(): TeamController {
    if (!TeamController.instance) {
      TeamController.instance = new TeamController();
    }
    return TeamController.instance;
  }

  // Enhanced mock data with personas and additional fields
  private mockTeamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Guilherme Puentes',
      position: 'CTO & Full Stack Developer',
      email: 'guilherme@online.des.br',
      phone: '+55 11 99999-9999',
      avatar: '/assets/team/guilherme.jpg',
      persona: 'ESTRATEGISTA',
      department: 'Tecnologia',
      skills: ['React', 'Node.js', 'TypeScript', 'Docker', 'AWS'],
      bio: 'CTO visionário especializado em arquitetura de software e inovação tecnológica. Apaixonado por criar soluções escaláveis e liderar times de alta performance.',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/guilhermepuentes',
        github: 'https://github.com/guilhermepuentes',
        twitter: 'https://twitter.com/guilhermepuentes'
      },
      isActive: true,
      userId: '1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Ana Silva',
      position: 'UI/UX Designer & CMO',
      email: 'ana@online.des.br',
      phone: '+55 11 88888-8888',
      avatar: '/assets/team/ana.jpg',
      persona: 'B_ETI',
      department: 'Marketing',
      skills: ['Figma', 'Adobe Creative Suite', 'Design Systems', 'User Research', 'Brand Strategy'],
      bio: 'CMO focada em criar experiências acolhedoras e inspiradoras. Especialista em design centrado no usuário e estratégia de marca.',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/anasilva',
        twitter: 'https://twitter.com/anasilva'
      },
      isActive: true,
      userId: '2',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '3',
      name: 'Carlos Santos',
      position: 'DevOps Engineer & CIO',
      email: 'carlos@online.des.br',
      phone: '+55 11 77777-7777',
      avatar: '/assets/team/carlos.jpg',
      persona: 'GEPTO',
      department: 'Tecnologia',
      skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD', 'Infrastructure as Code'],
      bio: 'CIO estratégico especializado em infraestrutura e transformação digital. Foco em soluções técnicas confiáveis e escaláveis.',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/carlossantos',
        github: 'https://github.com/carlossantos'
      },
      isActive: true,
      userId: '3',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '4',
      name: 'Marina Costa',
      position: 'Product Manager & CPO',
      email: 'marina@online.des.br',
      phone: '+55 11 66666-6666',
      avatar: '/assets/team/marina.jpg',
      persona: 'ARQUITETO',
      department: 'Produto',
      skills: ['Product Strategy', 'Data Analysis', 'UX Research', 'Agile', 'Design Thinking'],
      bio: 'CPO estratégica que combina criatividade e análise para criar produtos excepcionais. Especialista em design thinking e estratégia de produto.',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/marinacosta'
      },
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '5',
      name: 'Roberto Lima',
      position: 'Operations Manager & COO',
      email: 'roberto@online.des.br',
      phone: '+55 11 55555-5555',
      avatar: '/assets/team/roberto.jpg',
      persona: 'EXECUTOR',
      department: 'Operações',
      skills: ['Process Optimization', 'Project Management', 'Data Analysis', 'Team Leadership'],
      bio: 'COO prático focado em eficiência operacional e execução. Especialista em otimizar processos e entregar resultados consistentes.',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/robertolima'
      },
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '6',
      name: 'Erika Carolina',
      position: 'Financial Analyst & CFO',
      email: 'erika@online.des.br',
      phone: '+55 11 44444-4444',
      avatar: '/assets/team/erika.jpg',
      persona: 'GUARDIA',
      department: 'Financeiro',
      skills: ['Financial Analysis', 'Budget Planning', 'ROI Analysis', 'Risk Management'],
      bio: 'CFO analítica especializada em análise financeira e planejamento estratégico. Foco em precisão e segurança nas decisões financeiras.',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/erikacarolina'
      },
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ];

  async getAllMembers(): Promise<ApiResponse<TeamMember[]>> {
    try {
      // Check permissions
      if (!userController.hasPermission('TEAM_VIEW')) {
        return {
          success: false,
          error: 'Acesso negado',
          timestamp: new Date().toISOString(),
        };
      }

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Future: Replace with Supabase query
      // const { data, error } = await supabase.from('team_members').select('*');
      
      return {
        success: true,
        data: this.mockTeamMembers,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      return {
        success: false,
        error: `Erro ao buscar membros: ${errorMessage}`,
        timestamp: new Date().toISOString(),
      };
    }
  }

  async getMemberById(id: string): Promise<ApiResponse<TeamMember>> {
    try {
      // Future: Replace with Supabase query
      // const { data, error } = await supabase.from('team_members').select('*').eq('id', id).single();
      
      const member = this.mockTeamMembers.find(m => m.id === id);
      
      if (!member) {
        return {
          success: false,
          error: 'Membro não encontrado',
          timestamp: new Date().toISOString(),
        };
      }

      return {
        success: true,
        data: member,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      return {
        success: false,
        error: `Erro ao buscar membro: ${errorMessage}`,
        timestamp: new Date().toISOString(),
      };
    }
  }

  async createMember(memberData: unknown): Promise<ApiResponse<TeamMember>> {
    try {
      // Check permissions
      if (!userController.hasPermission('TEAM_CREATE')) {
        return {
          success: false,
          error: 'Acesso negado',
          timestamp: new Date().toISOString(),
        };
      }

      // Validate input
      const validatedData = CreateTeamMemberSchema.parse(memberData);
      
      // Future: Replace with Supabase insert
      // const { data, error } = await supabase.from('team_members').insert(validatedData).select().single();
      
      const newMember: TeamMember = {
        ...validatedData,
        id: Math.random().toString(36).substr(2, 9),
        skills: validatedData.skills || [],
        isActive: validatedData.isActive ?? true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      this.mockTeamMembers.push(newMember);

      toast({
        title: "Sucesso!",
        description: "Membro da equipe criado com sucesso.",
      });

      return {
        success: true,
        data: newMember,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      
      toast({
        title: "Erro",
        description: `Erro ao criar membro: ${errorMessage}`,
        variant: "destructive",
      });

      return {
        success: false,
        error: `Erro ao criar membro: ${errorMessage}`,
        timestamp: new Date().toISOString(),
      };
    }
  }

  async updateMember(id: string, memberData: unknown): Promise<ApiResponse<TeamMember>> {
    try {
      // Check permissions
      if (!userController.hasPermission('TEAM_EDIT')) {
        return {
          success: false,
          error: 'Acesso negado',
          timestamp: new Date().toISOString(),
        };
      }

      // Validate input
      const validatedData = UpdateTeamMemberSchema.parse(memberData);
      
      // Future: Replace with Supabase update
      // const { data, error } = await supabase.from('team_members').update(validatedData).eq('id', id).select().single();
      
      const memberIndex = this.mockTeamMembers.findIndex(m => m.id === id);
      
      if (memberIndex === -1) {
        return {
          success: false,
          error: 'Membro não encontrado',
          timestamp: new Date().toISOString(),
        };
      }

      const updatedMember = {
        ...this.mockTeamMembers[memberIndex],
        ...validatedData,
        updatedAt: new Date().toISOString(),
      };

      this.mockTeamMembers[memberIndex] = updatedMember;

      toast({
        title: "Sucesso!",
        description: "Membro da equipe atualizado com sucesso.",
      });

      return {
        success: true,
        data: updatedMember,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      
      toast({
        title: "Erro",
        description: `Erro ao atualizar membro: ${errorMessage}`,
        variant: "destructive",
      });

      return {
        success: false,
        error: `Erro ao atualizar membro: ${errorMessage}`,
        timestamp: new Date().toISOString(),
      };
    }
  }

  async deleteMember(id: string): Promise<ApiResponse<boolean>> {
    try {
      // Check permissions
      if (!userController.hasPermission('TEAM_DELETE')) {
        return {
          success: false,
          error: 'Acesso negado',
          timestamp: new Date().toISOString(),
        };
      }

      // Future: Replace with Supabase delete
      // const { error } = await supabase.from('team_members').delete().eq('id', id);
      
      const memberIndex = this.mockTeamMembers.findIndex(m => m.id === id);
      
      if (memberIndex === -1) {
        return {
          success: false,
          error: 'Membro não encontrado',
          timestamp: new Date().toISOString(),
        };
      }

      this.mockTeamMembers.splice(memberIndex, 1);

      toast({
        title: "Sucesso!",
        description: "Membro da equipe removido com sucesso.",
      });

      return {
        success: true,
        data: true,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      
      toast({
        title: "Erro",
        description: `Erro ao remover membro: ${errorMessage}`,
        variant: "destructive",
      });

      return {
        success: false,
        error: `Erro ao remover membro: ${errorMessage}`,
        timestamp: new Date().toISOString(),
      };
    }
  }

  // Get members by persona
  async getMembersByPersona(persona: string): Promise<ApiResponse<TeamMember[]>> {
    try {
      const members = this.mockTeamMembers.filter(m => m.persona === persona);
      
      return {
        success: true,
        data: members,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      return {
        success: false,
        error: `Erro ao buscar membros por persona: ${errorMessage}`,
        timestamp: new Date().toISOString(),
      };
    }
  }

  // Get active members only
  async getActiveMembers(): Promise<ApiResponse<TeamMember[]>> {
    try {
      const activeMembers = this.mockTeamMembers.filter(m => m.isActive);
      
      return {
        success: true,
        data: activeMembers,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      return {
        success: false,
        error: `Erro ao buscar membros ativos: ${errorMessage}`,
        timestamp: new Date().toISOString(),
      };
    }
  }

  // External API endpoint for consumption by other WebSolutions domains
  async getApiEndpoint(): Promise<string> {
    return `${window.location.origin}${this.baseUrl}`;
  }

  // Get OpenAPI schema for Swagger documentation
  getOpenApiSchema() {
    return {
      "/api/v1/team": {
        get: {
          summary: "Get all team members",
          responses: {
            200: {
              description: "List of team members",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      data: {
                        type: "array",
                        items: { $ref: "#/components/schemas/TeamMember" }
                      }
                    }
                  }
                }
              }
            }
          }
        },
        post: {
          summary: "Create new team member",
          requestBody: {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/CreateTeamMember" }
              }
            }
          },
          responses: {
            201: {
              description: "Team member created",
              content: {
                "application/json": {
                  schema: { $ref: "#/components/schemas/TeamMember" }
                }
              }
            }
          }
        }
      }
    };
  }
}

export const teamController = TeamController.getInstance();