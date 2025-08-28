// Team Controller - Business Logic for Team Management
import { TeamMember, CreateTeamMemberSchema, UpdateTeamMemberSchema, ApiResponse } from '@/models';
import { toast } from '@/hooks/use-toast';

class TeamController {
  private static instance: TeamController;
  private baseUrl = '/api/v1/team'; // Future Supabase Function endpoint

  public static getInstance(): TeamController {
    if (!TeamController.instance) {
      TeamController.instance = new TeamController();
    }
    return TeamController.instance;
  }

  // Mock data - will be replaced with Supabase calls
  private mockTeamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'Guilherme Puentes',
      position: 'Full Stack Developer',
      email: 'guilherme@websolutions.eti.br',
      phone: '+55 11 99999-9999',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      name: 'Maria Silva',
      position: 'UI/UX Designer',
      email: 'maria@websolutions.eti.br',
      phone: '+55 11 88888-8888',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ];

  async getAllMembers(): Promise<ApiResponse<TeamMember[]>> {
    try {
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
      // Validate input
      const validatedData = CreateTeamMemberSchema.parse(memberData);
      
      // Future: Replace with Supabase insert
      // const { data, error } = await supabase.from('team_members').insert(validatedData).select().single();
      
      const newMember: TeamMember = {
        ...validatedData,
        id: Math.random().toString(36).substr(2, 9),
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