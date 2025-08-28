// MVC Models - Data Types and Validation Schemas
import { z } from "zod";

// Role and Permission Enums
export const RoleEnum = z.enum([
  'SUPER_ADMIN',
  'ADMIN', 
  'EDITOR',
  'VIEWER',
  'USER'
]);

export const PermissionEnum = z.enum([
  'TEAM_VIEW',
  'TEAM_CREATE',
  'TEAM_EDIT', 
  'TEAM_DELETE',
  'CONFIG_VIEW',
  'CONFIG_EDIT',
  'LOGS_VIEW',
  'API_DOCS_VIEW',
  'A11Y_VIEW',
  'A11Y_EDIT',
  'GALLERY_VIEW',
  'GALLERY_EDIT'
]);

// Persona Types based on PRD
export const PersonaEnum = z.enum([
  'B_ETI',        // CMO - Acolhedora, leve, inspiradora
  'GEPTO',        // CIO - Estratégica, técnica, confiável  
  'EXECUTOR',     // COO - Prática, objetiva, organizadora
  'GUARDIA',      // CFO - Analítica, precisa, confiável
  'ESTRATEGISTA', // CTO - Visionária, técnica, inspiradora
  'ARQUITETO'     // CPO - Estratégica, criativa, analítica
]);

// User Model with Enhanced Roles
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  role: RoleEnum,
  permissions: z.array(PermissionEnum).default([]),
  name: z.string().optional(),
  avatar: z.string().optional(),
  isActive: z.boolean().default(true),
  lastLogin: z.string().datetime().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type User = z.infer<typeof UserSchema>;

// Enhanced Team Member Model with Persona
export const TeamMemberSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
  position: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  avatar: z.string().optional(),
  persona: PersonaEnum.optional(),
  department: z.string().optional(),
  skills: z.array(z.string()).default([]),
  bio: z.string().optional(),
  socialLinks: z.object({
    linkedin: z.string().optional(),
    github: z.string().optional(),
    twitter: z.string().optional(),
  }).optional(),
  isActive: z.boolean().default(true),
  userId: z.string().optional(), // Link to User if member has system access
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type TeamMember = z.infer<typeof TeamMemberSchema>;

// Persona Profile for UX Reference
export const PersonaProfileSchema = z.object({
  id: z.string(),
  persona: PersonaEnum,
  name: z.string(),
  role: z.string(), // CMO, CIO, etc.
  description: z.string(),
  voiceAndTone: z.object({
    voice: z.string(),
    tone: z.string(),
    writingStyle: z.array(z.string()),
    examples: z.array(z.string()),
  }),
  targetAudience: z.array(z.string()),
  preferredChannels: z.array(z.string()),
  keyMessages: z.array(z.string()),
  avatar: z.string().optional(),
  color: z.string().optional(), // Brand color for persona
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type PersonaProfile = z.infer<typeof PersonaProfileSchema>;

// Database Config Model
export const DbConfigSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
  host: z.string().min(3),
  port: z.number().int().min(1).max(65535),
  database: z.string().min(1),
  username: z.string().min(1),
  password: z.string().min(1),
  cname: z.string().optional(),
  parameters: z.record(z.unknown()).optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type DbConfig = z.infer<typeof DbConfigSchema>;

// Audit Log Model
export const AuditLogSchema = z.object({
  id: z.string(),
  action: z.string(),
  entity: z.string().optional(),
  entityId: z.string().optional(),
  userId: z.string(),
  details: z.record(z.unknown()).optional(),
  timestamp: z.string().datetime(),
});

export type AuditLog = z.infer<typeof AuditLogSchema>;

// API Response Models
export const ApiResponseSchema = z.object({
  success: z.boolean(),
  data: z.unknown().optional(),
  error: z.string().optional(),
  timestamp: z.string().datetime(),
});

export type ApiResponse<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
  timestamp: string;
};

// Form Validation Schemas for Create/Update operations
export const CreateUserSchema = UserSchema.omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true,
  lastLogin: true 
});

export const UpdateUserSchema = CreateUserSchema.partial();

export const CreateTeamMemberSchema = TeamMemberSchema.omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true 
});

export const UpdateTeamMemberSchema = CreateTeamMemberSchema.partial();

export const CreatePersonaProfileSchema = PersonaProfileSchema.omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true 
});

export const UpdatePersonaProfileSchema = CreatePersonaProfileSchema.partial();

export const CreateDbConfigSchema = DbConfigSchema.omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true 
});

export const UpdateDbConfigSchema = CreateDbConfigSchema.partial();

export const LoginSchema = z.object({
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export type LoginForm = z.infer<typeof LoginSchema>;

// Permission Helper Functions
export const hasPermission = (user: User, permission: z.infer<typeof PermissionEnum>): boolean => {
  if (user.role === 'SUPER_ADMIN') return true;
  return user.permissions.includes(permission);
};

export const isSuperAdmin = (email: string): boolean => {
  return email === 'guilherme@online.des.br';
};

// Persona Constants
export const PERSONA_CONFIGS = {
  B_ETI: {
    name: 'B.eti',
    role: 'CMO',
    description: 'Chief Marketing Officer - Acolhedora, leve, inspiradora',
    color: '#FF6B9D',
    voice: 'Acolhedora',
    tone: 'Leve e inspiradora'
  },
  GEPTO: {
    name: 'Gepto',
    role: 'CIO', 
    description: 'Chief Information Officer - Estratégica, técnica, confiável',
    color: '#4ECDC4',
    voice: 'Estratégica',
    tone: 'Técnica e confiável'
  },
  EXECUTOR: {
    name: 'Executor',
    role: 'COO',
    description: 'Chief Operating Officer - Prática, objetiva, organizadora', 
    color: '#45B7D1',
    voice: 'Prática',
    tone: 'Objetiva e organizadora'
  },
  GUARDIA: {
    name: 'Guardiã',
    role: 'CFO',
    description: 'Chief Financial Officer - Analítica, precisa, confiável',
    color: '#96CEB4', 
    voice: 'Analítica',
    tone: 'Precisa e confiável'
  },
  ESTRATEGISTA: {
    name: 'Estrategista',
    role: 'CTO',
    description: 'Chief Technology Officer - Visionária, técnica, inspiradora',
    color: '#FECA57',
    voice: 'Visionária', 
    tone: 'Técnica e inspiradora'
  },
  ARQUITETO: {
    name: 'Arquiteto',
    role: 'CPO',
    description: 'Chief Product Officer - Estratégica, criativa, analítica',
    color: '#A29BFE',
    voice: 'Estratégica',
    tone: 'Criativa e analítica'
  }
} as const;

// Export all types
export type {
  User as UserModel,
  TeamMember as TeamMemberModel,
  PersonaProfile as PersonaProfileModel,
  DbConfig as DbConfigModel,
  AuditLog as AuditLogModel,
};