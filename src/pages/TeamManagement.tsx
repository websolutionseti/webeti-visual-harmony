import React, { useState, useEffect } from 'react';
import { TeamMember, PERSONA_CONFIGS } from '@/models';
import { teamController } from '@/controllers/teamController';
import { userController } from '@/controllers/userController';
import { TeamMemberCard } from '@/views/team/TeamMemberCard';
import { PersonaCard } from '@/views/team/PersonaCard';
import AdminLayout from '@/components/AdminLayout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Plus, 
  Search, 
  Filter,
  UserPlus,
  Eye,
  Settings,
  Shield,
  Crown
} from "lucide-react";
import { toast } from '@/hooks/use-toast';

const TeamManagement = () => {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPersona, setSelectedPersona] = useState<string>('all');
  const [viewMode, setViewMode] = useState<'cards' | 'table'>('cards');
  const [activeTab, setActiveTab] = useState('team');
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  useEffect(() => {
    loadMembers();
    checkUserPermissions();
  }, []);

  const loadMembers = async () => {
    setLoading(true);
    try {
      const response = await teamController.getAllMembers();
      if (response.success && response.data) {
        setMembers(response.data);
      } else {
        toast({
          title: "Erro",
          description: response.error || "Erro ao carregar membros da equipe",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro inesperado ao carregar membros",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const checkUserPermissions = async () => {
    try {
      const isSuperAdminUser = userController.isSuperAdmin();
      setIsSuperAdmin(isSuperAdminUser);
    } catch (error) {
      console.error('Erro ao verificar permissões:', error);
    }
  };

  const handleEdit = (member: TeamMember) => {
    // TODO: Implementar modal de edição
    toast({
      title: "Em desenvolvimento",
      description: "Funcionalidade de edição será implementada em breve.",
    });
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await teamController.deleteMember(id);
      if (response.success) {
        setMembers(members.filter(m => m.id !== id));
      }
    } catch (error) {
      console.error('Erro ao remover membro:', error);
    }
  };

  // Filter members based on search and persona
  const filteredMembers = members.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.position.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesPersona = selectedPersona === 'all' || member.persona === selectedPersona;
    
    return matchesSearch && matchesPersona;
  });

  // Get unique personas from members
  const availablePersonas = Array.from(new Set(members.map(m => m.persona).filter(Boolean)));

  const TeamOverview = () => (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total</p>
                <p className="text-2xl font-bold">{members.length}</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Ativos</p>
                <p className="text-2xl font-bold text-success">
                  {members.filter(m => m.isActive).length}
                </p>
              </div>
              <Shield className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Personas</p>
                <p className="text-2xl font-bold text-accent">{availablePersonas.length}</p>
              </div>
              <Eye className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        
        {isSuperAdmin && (
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Admin</p>
                  <p className="text-2xl font-bold text-warning">SUPER</p>
                </div>
                <Crown className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Filters and Controls */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
          <div className="relative min-w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por nome, cargo ou email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <select
            value={selectedPersona}
            onChange={(e) => setSelectedPersona(e.target.value)}
            className="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="all">Todas as personas</option>
            {availablePersonas.map(persona => {
              const config = PERSONA_CONFIGS[persona as keyof typeof PERSONA_CONFIGS];
              return (
                <option key={persona} value={persona}>
                  {config?.name || persona}
                </option>
              );
            })}
          </select>
        </div>

        <div className="flex gap-2">
          {userController.hasPermission('TEAM_CREATE') && (
            <Button onClick={() => toast({ title: "Em breve", description: "Funcionalidade será implementada" })}>
              <Plus className="h-4 w-4 mr-2" />
              Adicionar Membro
            </Button>
          )}
        </div>
      </div>

      {/* Members Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="animate-pulse">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-muted h-12 w-12"></div>
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-muted rounded"></div>
                    <div className="h-3 bg-muted rounded w-2/3"></div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-muted rounded"></div>
                  <div className="h-3 bg-muted rounded w-3/4"></div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          filteredMembers.map(member => (
            <TeamMemberCard
              key={member.id}
              member={member}
              onEdit={handleEdit}
              onDelete={handleDelete}
              loading={loading}
            />
          ))
        )}
      </div>

      {filteredMembers.length === 0 && !loading && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold">Nenhum membro encontrado</h3>
          <p className="text-muted-foreground">
            {searchTerm || selectedPersona !== 'all' 
              ? 'Tente ajustar os filtros de busca.' 
              : 'Adicione membros para começar.'}
          </p>
        </div>
      )}
    </div>
  );

  return (
    <AdminLayout>
      <div className="container mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Gestão de Equipe</h1>
              <p className="text-muted-foreground">
                Sistema completo para gerenciamento de equipe e personas UX
              </p>
            </div>
          </div>
          
          {isSuperAdmin && (
            <div className="flex items-center gap-2 mt-4">
              <Crown className="h-4 w-4 text-warning" />
              <Badge variant="secondary" className="bg-warning/10 text-warning">
                Super Administrador - Acesso Total
              </Badge>
            </div>
          )}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="team">Equipe</TabsTrigger>
            <TabsTrigger value="personas">Personas UX</TabsTrigger>
          </TabsList>

          <TabsContent value="team" className="mt-6">
            <TeamOverview />
          </TabsContent>

          <TabsContent value="personas" className="mt-6">
            <div className="text-center py-12">
              <Eye className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Personas UX</h3>
              <p className="text-muted-foreground mb-4">
                Acesse a galeria completa de personas para referência estratégica
              </p>
              <Button 
                onClick={() => window.open('/admin/personas', '_blank')}
                className="flex items-center gap-2"
              >
                <Eye className="h-4 w-4" />
                Ver Galeria de Personas
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default TeamManagement;