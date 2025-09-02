import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Briefing } from "../types";
import { Edit, Eye, Calendar, User } from "lucide-react";
import { format } from "date-fns";

interface BriefingCardProps {
  briefing: Briefing;
  onEdit?: (id: string) => void;
  onView?: (id: string) => void;
}

const statusColors = {
  draft: "bg-slate-500/10 text-slate-600 border-slate-500/20",
  review: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  approved: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
  completed: "bg-blue-500/10 text-blue-600 border-blue-500/20"
};

const statusLabels = {
  draft: "Rascunho",
  review: "Em Revisão",
  approved: "Aprovado",
  completed: "Concluído"
};

const projectTypeLabels = {
  website: "Website",
  app: "Aplicativo",
  ecommerce: "E-commerce",
  branding: "Branding",
  marketing: "Marketing"
};

export const BriefingCard = ({ briefing, onEdit, onView }: BriefingCardProps) => {
  const completedRequirements = briefing.requirements.filter(r => r.completed).length;
  const totalRequirements = briefing.requirements.length;
  const progressPercentage = totalRequirements > 0 ? (completedRequirements / totalRequirements) * 100 : 0;

  return (
    <Card className="group hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-lg group-hover:text-primary transition-colors">
              {briefing.title}
            </CardTitle>
            <CardDescription className="line-clamp-2">
              {briefing.description}
            </CardDescription>
          </div>
          <Badge 
            variant="outline" 
            className={statusColors[briefing.status]}
          >
            {statusLabels[briefing.status]}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{briefing.client}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{format(new Date(briefing.created_at), 'dd/MM/yyyy')}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Badge variant="secondary">
            {projectTypeLabels[briefing.project_type]}
          </Badge>
          <div className="text-sm text-muted-foreground">
            {completedRequirements}/{totalRequirements} requisitos
          </div>
        </div>

        <div className="w-full bg-muted rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>

        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onView?.(briefing.id)}
            className="flex-1"
          >
            <Eye className="h-4 w-4 mr-2" />
            Visualizar
          </Button>
          <Button 
            variant="default" 
            size="sm" 
            onClick={() => onEdit?.(briefing.id)}
            className="flex-1"
          >
            <Edit className="h-4 w-4 mr-2" />
            Editar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};