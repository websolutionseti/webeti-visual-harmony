// Team Member Form View Component
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TeamMember, CreateTeamMemberSchema } from '@/models';
import { toast } from '@/hooks/use-toast';

interface TeamMemberFormProps {
  member?: TeamMember;
  onSave: (memberData: any) => Promise<void>;
  onCancel: () => void;
  loading?: boolean;
}

export const TeamMemberForm = ({ member, onSave, onCancel, loading = false }: TeamMemberFormProps) => {
  const [formData, setFormData] = useState({
    name: member?.name || '',
    position: member?.position || '',
    email: member?.email || '',
    phone: member?.phone || '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name,
        position: member.position,
        email: member.email,
        phone: member.phone || '',
      });
    }
  }, [member]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      // Validate form data
      CreateTeamMemberSchema.parse(formData);
      await onSave(formData);
      
      // Reset form if creating new member
      if (!member) {
        setFormData({
          name: '',
          position: '',
          email: '',
          phone: '',
        });
      }
    } catch (error: any) {
      if (error.errors) {
        // Zod validation errors
        const validationErrors: Record<string, string> = {};
        error.errors.forEach((err: any) => {
          validationErrors[err.path[0]] = err.message;
        });
        setErrors(validationErrors);
      } else {
        toast({
          title: "Erro",
          description: "Erro ao salvar membro da equipe.",
          variant: "destructive",
        });
      }
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Nome *</Label>
        <Input
          id="name"
          type="text"
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Digite o nome completo"
          className={errors.name ? 'border-destructive' : ''}
        />
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="position">Cargo *</Label>
        <Input
          id="position"
          type="text"
          value={formData.position}
          onChange={(e) => handleChange('position', e.target.value)}
          placeholder="Ex: Full Stack Developer"
          className={errors.position ? 'border-destructive' : ''}
        />
        {errors.position && (
          <p className="text-sm text-destructive">{errors.position}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="exemplo@websolutions.eti.br"
          className={errors.email ? 'border-destructive' : ''}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Telefone</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          placeholder="+55 11 99999-9999"
          className={errors.phone ? 'border-destructive' : ''}
        />
        {errors.phone && (
          <p className="text-sm text-destructive">{errors.phone}</p>
        )}
      </div>

      <div className="flex justify-end space-x-2 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          disabled={loading}
        >
          {loading ? 'Salvando...' : (member ? 'Atualizar' : 'Criar')}
        </Button>
      </div>
    </form>
  );
};