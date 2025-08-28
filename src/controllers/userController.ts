// User Controller - Authentication and User Management
import { User, CreateUserSchema, UpdateUserSchema, ApiResponse, isSuperAdmin, hasPermission } from '@/models';
import { toast } from '@/hooks/use-toast';

class UserController {
  private static instance: UserController;
  private baseUrl = '/api/v1/users';

  public static getInstance(): UserController {
    if (!UserController.instance) {
      UserController.instance = new UserController();
    }
    return UserController.instance;
  }

  // Mock current user - will be replaced with Supabase Auth
  private currentUser: User | null = {
    id: '1',
    email: 'guilherme@online.des.br',
    password: 'hashed_password',
    role: 'SUPER_ADMIN',
    permissions: [],
    name: 'Guilherme Puentes',
    avatar: '/assets/brand/webeti-logo-1.png',
    isActive: true,
    lastLogin: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  // Mock users data
  private mockUsers: User[] = [
    this.currentUser!,
    {
      id: '2',
      email: 'ana@online.des.br',
      password: 'hashed_password',
      role: 'ADMIN',
      permissions: ['TEAM_VIEW', 'TEAM_CREATE', 'TEAM_EDIT', 'CONFIG_VIEW'],
      name: 'Ana Silva',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '3',
      email: 'carlos@online.des.br',
      password: 'hashed_password',
      role: 'EDITOR',
      permissions: ['TEAM_VIEW', 'A11Y_VIEW', 'A11Y_EDIT', 'GALLERY_VIEW'],
      name: 'Carlos Santos',
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  ];

  async getCurrentUser(): Promise<ApiResponse<User>> {
    try {
      // Future: Replace with Supabase Auth
      // const { data: { user } } = await supabase.auth.getUser();
      
      if (!this.currentUser) {
        return {
          success: false,
          error: 'Usuário não autenticado',
          timestamp: new Date().toISOString(),
        };
      }

      return {
        success: true,
        data: this.currentUser,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      return {
        success: false,
        error: `Erro ao buscar usuário atual: ${errorMessage}`,
        timestamp: new Date().toISOString(),
      };
    }
  }

  async getAllUsers(): Promise<ApiResponse<User[]>> {
    try {
      // Check permissions
      if (!this.currentUser || !hasPermission(this.currentUser, 'TEAM_VIEW')) {
        return {
          success: false,
          error: 'Acesso negado',
          timestamp: new Date().toISOString(),
        };
      }

      await new Promise(resolve => setTimeout(resolve, 500));
      
      return {
        success: true,
        data: this.mockUsers,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      return {
        success: false,
        error: `Erro ao buscar usuários: ${errorMessage}`,
        timestamp: new Date().toISOString(),
      };
    }
  }

  async createUser(userData: unknown): Promise<ApiResponse<User>> {
    try {
      // Check permissions
      if (!this.currentUser || !hasPermission(this.currentUser, 'TEAM_CREATE')) {
        return {
          success: false,
          error: 'Acesso negado',
          timestamp: new Date().toISOString(),
        };
      }

      const validatedData = CreateUserSchema.parse(userData);
      
      // Auto-assign SUPER_ADMIN role to guilherme@online.des.br
      const role = isSuperAdmin(validatedData.email) ? 'SUPER_ADMIN' : validatedData.role;
      
      const newUser: User = {
        ...validatedData,
        id: Math.random().toString(36).substr(2, 9),
        role,
        permissions: validatedData.permissions || [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      this.mockUsers.push(newUser);

      toast({
        title: "Sucesso!",
        description: "Usuário criado com sucesso.",
      });

      return {
        success: true,
        data: newUser,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      
      toast({
        title: "Erro",
        description: `Erro ao criar usuário: ${errorMessage}`,
        variant: "destructive",
      });

      return {
        success: false,
        error: `Erro ao criar usuário: ${errorMessage}`,
        timestamp: new Date().toISOString(),
      };
    }
  }

  async updateUser(id: string, userData: unknown): Promise<ApiResponse<User>> {
    try {
      // Check permissions
      if (!this.currentUser || (!hasPermission(this.currentUser, 'TEAM_EDIT') && this.currentUser.id !== id)) {
        return {
          success: false,
          error: 'Acesso negado',
          timestamp: new Date().toISOString(),
        };
      }

      const validatedData = UpdateUserSchema.parse(userData);
      const userIndex = this.mockUsers.findIndex(u => u.id === id);
      
      if (userIndex === -1) {
        return {
          success: false,
          error: 'Usuário não encontrado',
          timestamp: new Date().toISOString(),
        };
      }

      const updatedUser = {
        ...this.mockUsers[userIndex],
        ...validatedData,
        updatedAt: new Date().toISOString(),
      };

      this.mockUsers[userIndex] = updatedUser;

      toast({
        title: "Sucesso!",
        description: "Usuário atualizado com sucesso.",
      });

      return {
        success: true,
        data: updatedUser,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro desconhecido';
      
      toast({
        title: "Erro",
        description: `Erro ao atualizar usuário: ${errorMessage}`,
        variant: "destructive",
      });

      return {
        success: false,
        error: `Erro ao atualizar usuário: ${errorMessage}`,
        timestamp: new Date().toISOString(),
      };
    }
  }

  async deleteUser(id: string): Promise<ApiResponse<boolean>> {
    try {
      // Check permissions
      if (!this.currentUser || !hasPermission(this.currentUser, 'TEAM_DELETE')) {
        return {
          success: false,
          error: 'Acesso negado',
          timestamp: new Date().toISOString(),
        };
      }

      // Prevent deletion of super admin
      const userToDelete = this.mockUsers.find(u => u.id === id);
      if (userToDelete && isSuperAdmin(userToDelete.email)) {
        return {
          success: false,
          error: 'Não é possível excluir o super administrador',
          timestamp: new Date().toISOString(),
        };
      }

      const userIndex = this.mockUsers.findIndex(u => u.id === id);
      
      if (userIndex === -1) {
        return {
          success: false,
          error: 'Usuário não encontrado',
          timestamp: new Date().toISOString(),
        };
      }

      this.mockUsers.splice(userIndex, 1);

      toast({
        title: "Sucesso!",
        description: "Usuário removido com sucesso.",
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
        description: `Erro ao remover usuário: ${errorMessage}`,
        variant: "destructive",
      });

      return {
        success: false,
        error: `Erro ao remover usuário: ${errorMessage}`,
        timestamp: new Date().toISOString(),
      };
    }
  }

  // Check if current user has specific permission
  hasPermission(permission: string): boolean {
    if (!this.currentUser) return false;
    return hasPermission(this.currentUser, permission as any);
  }

  // Check if current user is super admin
  isSuperAdmin(): boolean {
    return this.currentUser?.role === 'SUPER_ADMIN' || false;
  }
}

export const userController = UserController.getInstance();