// Enhanced Team Member Card with Persona Support
import { TeamMember, PERSONA_CONFIGS } from '@/models';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Edit, 
  Trash2, 
  Mail, 
  Phone, 
  User, 
  ExternalLink,
  Linkedin,
  Github,
  Twitter,
  MapPin,
  Calendar
} from "lucide-react";

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
    return phone.replace(/(\+55\s?)(\d{2})\s?(\d{5})-?(\d{4})/, '+55 $2 $3-$4');
  };

  const personaConfig = member.persona ? PERSONA_CONFIGS[member.persona] : null;

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case 'linkedin': return <Linkedin className="h-4 w-4" />;
      case 'github': return <Github className="h-4 w-4" />;
      case 'twitter': return <Twitter className="h-4 w-4" />;
      default: return <ExternalLink className="h-4 w-4" />;
    }
  };

  return (
    <Card className={`w-full hover:shadow-lg transition-all ${!member.isActive ? 'opacity-60' : ''}`}>
      <CardHeader>
        <div className="flex items-start space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={member.avatar} alt={member.name} />
            <AvatarFallback 
              style={personaConfig ? { 
                backgroundColor: personaConfig.color + '20', 
                color: personaConfig.color 
              } : {}}
            >
              {member.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-2">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                {member.name}
                {!member.isActive && (
                  <Badge variant="outline" className="text-xs">Inativo</Badge>
                )}
              </CardTitle>
              <CardDescription className="mt-1">
                {member.position}
              </CardDescription>
            </div>
            
            {member.department && (
              <div className="flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-3 w-3" />
                {member.department}
              </div>
            )}

            {personaConfig && (
              <Badge 
                variant="secondary"
                style={{ 
                  backgroundColor: personaConfig.color + '20', 
                  color: personaConfig.color 
                }}
                className="text-xs"
              >
                {personaConfig.name} ({personaConfig.role})
              </Badge>
            )}
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

      <CardContent className="space-y-4">
        {/* Contact Info */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <a 
              href={`mailto:${member.email}`}
              className="hover:text-primary transition-colors"
            >
              {member.email}
            </a>
          </div>
          
          {member.phone && (
            <div className="flex items-center gap-2 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <a 
                href={`tel:${member.phone}`}
                className="hover:text-primary transition-colors"
              >
                {formatPhone(member.phone)}
              </a>
            </div>
          )}
        </div>

        {/* Bio */}
        {member.bio && (
          <div className="text-sm text-muted-foreground">
            <p className="line-clamp-3">{member.bio}</p>
          </div>
        )}

        {/* Skills */}
        {member.skills && member.skills.length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">Habilidades</h4>
            <div className="flex flex-wrap gap-1">
              {member.skills.slice(0, 4).map((skill, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {skill}
                </Badge>
              ))}
              {member.skills.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{member.skills.length - 4}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Social Links */}
        {member.socialLinks && Object.keys(member.socialLinks).length > 0 && (
          <div>
            <h4 className="text-sm font-medium mb-2">Links</h4>
            <div className="flex space-x-2">
              {Object.entries(member.socialLinks).map(([platform, url]) => (
                url && (
                  <Button
                    key={platform}
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(url, '_blank')}
                    className="p-2"
                  >
                    {getSocialIcon(platform)}
                  </Button>
                )
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="pt-4 border-t flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            Criado em: {formatDate(member.createdAt)}
          </div>
          {member.userId && (
            <Badge variant="outline" className="text-xs">
              <User className="h-3 w-3 mr-1" />
              Acesso ao sistema
            </Badge>
          )}
        </div>
      </CardContent>
    </Card>
  );
};