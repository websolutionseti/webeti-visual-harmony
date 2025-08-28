// Team Member Card View Component
import { TeamMember } from '@/models';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, Trash2, Mail, Phone } from "lucide-react";

interface TeamMemberCardProps {
  member: TeamMember;
  onEdit: (member: TeamMember) => void;
  onDelete: (id: string) => void;
  loading?: boolean;
}

export const TeamMemberCard = ({ member, onEdit, onDelete, loading = false }: TeamMemberCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatPhone = (phone?: string) => {
    if (!phone) return null;
    // Simple phone formatting
    return phone.replace(/(\d{2})(\d{2})(\d{5})(\d{4})/, '+$1 $2 $3-$4');
  };

  return (
    <Card className="w-full hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="space-y-1">
            <CardTitle className="text-lg">{member.name}</CardTitle>
            <CardDescription className="flex items-center gap-2">
              <Badge variant="secondary">{member.position}</Badge>
            </CardDescription>
          </div>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(member)}
              disabled={loading}
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onDelete(member.id)}
              disabled={loading}
              className="hover:bg-destructive hover:text-destructive-foreground"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="h-4 w-4" />
          <a 
            href={`mailto:${member.email}`}
            className="hover:text-primary transition-colors"
          >
            {member.email}
          </a>
        </div>
        
        {member.phone && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4" />
            <a 
              href={`tel:${member.phone}`}
              className="hover:text-primary transition-colors"
            >
              {formatPhone(member.phone)}
            </a>
          </div>
        )}
        
        <div className="pt-2 text-xs text-muted-foreground">
          Criado em: {formatDate(member.createdAt)}
        </div>
      </CardContent>
    </Card>
  );
};