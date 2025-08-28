// MVC Models - Data Types and Validation Schemas
import { z } from "zod";

// User Model
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['ADMIN', 'USER', 'READ_ONLY']),
  name: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type User = z.infer<typeof UserSchema>;

// Team Member Model
export const TeamMemberSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
  position: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

export type TeamMember = z.infer<typeof TeamMemberSchema>;

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
export const CreateTeamMemberSchema = TeamMemberSchema.omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true 
});

export const UpdateTeamMemberSchema = CreateTeamMemberSchema.partial();

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

// Export all types
export type {
  User as UserModel,
  TeamMember as TeamMemberModel,
  DbConfig as DbConfigModel,
  AuditLog as AuditLogModel,
};