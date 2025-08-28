// Auth Controller - Authentication Business Logic
import { User, LoginSchema, ApiResponse } from '@/models';
import { toast } from '@/hooks/use-toast';

class AuthController {
  private static instance: AuthController;
  private baseUrl = '/api/v1/auth'; // Future Supabase Auth endpoint

  public static getInstance(): AuthController {
    if (!AuthController.instance) {
      AuthController.instance = new AuthController();
    }
    return AuthController.instance;
  }

  // Mock user data - will be replaced with Supabase Auth
  private mockUsers: User[] = [
    {
      id: '1',
      email: 'guilherme@online.des.br',
      password: 'Senha2011!', // In real app, this would be hashed
      role: 'ADMIN',
      name: 'Guilherme Puentes',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ];

  async login(credentials: unknown): Promise<ApiResponse<User>> {
    try {
      // Validate input
      const validatedCredentials = LoginSchema.parse(credentials);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Future: Replace with Supabase Auth
      // const { data, error } = await supabase.auth.signInWithPassword({
      //   email: validatedCredentials.email,
      //   password: validatedCredentials.password,
      // });
      
      const user = this.mockUsers.find(
        u => u.email === validatedCredentials.email && u.password === validatedCredentials.password
      );

      if (!user) {
        toast({
          title: "Erro de autenticação",
          description: "Email ou senha inválidos.",
          variant: "destructive",
        });

        return {
          success: false,
          error: 'Credenciais inválidas',
          timestamp: new Date().toISOString(),
        };
      }

      // Store user in localStorage (will be replaced with Supabase session)
      const userSession = { ...user };
      delete (userSession as any).password; // Remove password from session
      localStorage.setItem('user', JSON.stringify(userSession));

      toast({
        title: "Login realizado!",
        description: `Bem-vindo(a), ${user.name || user.email}!`,
      });

      return {
        success: true,
        data: userSession,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      
      toast({
        title: "Erro",
        description: `Erro ao fazer login: ${errorMessage}`,
        variant: "destructive",
      });

      return {
        success: false,
        error: `Erro ao fazer login: ${errorMessage}`,
        timestamp: new Date().toISOString(),
      };
    }
  }

  async logout(): Promise<ApiResponse<boolean>> {
    try {
      // Future: Replace with Supabase Auth
      // const { error } = await supabase.auth.signOut();
      
      localStorage.removeItem('user');

      toast({
        title: "Logout realizado!",
        description: "Você foi desconectado com sucesso.",
      });

      return {
        success: true,
        data: true,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      
      return {
        success: false,
        error: `Erro ao fazer logout: ${errorMessage}`,
        timestamp: new Date().toISOString(),
      };
    }
  }

  getCurrentUser(): User | null {
    try {
      const userStr = localStorage.getItem('user');
      if (!userStr) return null;
      
      const user = JSON.parse(userStr);
      return user;
    } catch {
      return null;
    }
  }

  isAuthenticated(): boolean {
    return !!this.getCurrentUser();
  }

  hasRole(role: string): boolean {
    const user = this.getCurrentUser();
    return user?.role === role;
  }

  async validateToken(token: string): Promise<ApiResponse<User>> {
    try {
      // Future: Replace with Supabase token validation
      // const { data, error } = await supabase.auth.getUser(token);
      
      // Mock validation
      const user = this.getCurrentUser();
      
      if (!user) {
        return {
          success: false,
          error: 'Token inválido ou expirado',
          timestamp: new Date().toISOString(),
        };
      }

      return {
        success: true,
        data: user,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      
      return {
        success: false,
        error: `Erro ao validar token: ${errorMessage}`,
        timestamp: new Date().toISOString(),
      };
    }
  }

  // External API endpoints for consumption by other WebSolutions domains
  async getApiEndpoint(): Promise<string> {
    return `${window.location.origin}${this.baseUrl}`;
  }

  // Get OpenAPI schema for Swagger documentation
  getOpenApiSchema() {
    return {
      "/api/v1/auth/login": {
        post: {
          summary: "User authentication",
          requestBody: {
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/LoginRequest" }
              }
            }
          },
          responses: {
            200: {
              description: "Authentication successful",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      data: { $ref: "#/components/schemas/User" },
                      timestamp: { type: "string", format: "date-time" }
                    }
                  }
                }
              }
            },
            401: {
              description: "Authentication failed",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      error: { type: "string" },
                      timestamp: { type: "string", format: "date-time" }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/auth/logout": {
        post: {
          summary: "User logout",
          responses: {
            200: {
              description: "Logout successful",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      data: { type: "boolean" },
                      timestamp: { type: "string", format: "date-time" }
                    }
                  }
                }
              }
            }
          }
        }
      },
      "/api/v1/auth/validate": {
        post: {
          summary: "Validate authentication token",
          requestBody: {
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    token: { type: "string" }
                  }
                }
              }
            }
          },
          responses: {
            200: {
              description: "Token validation result",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      success: { type: "boolean" },
                      data: { $ref: "#/components/schemas/User" },
                      timestamp: { type: "string", format: "date-time" }
                    }
                  }
                }
              }
            }
          }
        }
      }
    };
  }
}

export const authController = AuthController.getInstance();