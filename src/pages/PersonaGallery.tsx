// Persona Gallery - UX Reference for Team Personas
import React, { useState, useEffect } from 'react';
import { PersonaProfile, PERSONA_CONFIGS } from '@/models';
import { personaController } from '@/controllers/personaController';
import { PersonaCard } from '@/views/team/PersonaCard';
import AdminLayout from '@/components/AdminLayout';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  Users, 
  Search, 
  Filter,
  Palette,
  MessageSquare,
  Target,
  Plus,
  ExternalLink,
  BookOpen,
  Lightbulb
} from "lucide-react";
import { toast } from '@/hooks/use-toast';

const PersonaGallery = () => {
  const [personas, setPersonas] = useState<PersonaProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPersona, setSelectedPersona] = useState<PersonaProfile | null>(null);
  const [activeTab, setActiveTab] = useState('gallery');

  useEffect(() => {
    loadPersonas();
  }, []);

  const loadPersonas = async () => {
    setLoading(true);
    try {
      const response = await personaController.getAllPersonas();
      if (response.success && response.data) {
        setPersonas(response.data);
      } else {
        toast({
          title: "Erro",
          description: response.error || "Erro ao carregar personas",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro inesperado ao carregar personas",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const filteredPersonas = personas.filter(persona =>
    persona.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    persona.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    persona.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewPersona = (persona: PersonaProfile) => {
    setSelectedPersona(persona);
    setActiveTab('detail');
  };

  const PersonaOverview = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex justify-center">
          <div className="p-3 bg-primary/10 rounded-full">
            <Users className="h-8 w-8 text-primary" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold">Galeria de Personas UX</h1>
          <p className="text-lg text-muted-foreground">
            Referência estratégica para comunicação da WebSolutions ETI
          </p>
        </div>
      </div>

      {/* Strategy Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="text-center">
            <MessageSquare className="h-8 w-8 text-primary mx-auto mb-2" />
            <CardTitle className="text-lg">Voz & Tom</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
              Cada persona tem voz e tom únicos para conectar com seu público específico
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <Target className="h-8 w-8 text-success mx-auto mb-2" />
            <CardTitle className="text-lg">Público-Alvo</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
              Direcionamento estratégico para diferentes stakeholders e canais
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <Lightbulb className="h-8 w-8 text-accent mx-auto mb-2" />
            <CardTitle className="text-lg">Prompts AI</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground text-center">
              Prompts otimizados para gerar conteúdo no estilo de cada persona
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="max-w-md mx-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por persona, cargo ou estilo..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Personas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="animate-pulse">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="rounded-full bg-muted h-16 w-16"></div>
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
          filteredPersonas.map(persona => (
            <PersonaCard
              key={persona.id}
              persona={persona}
              onView={handleViewPersona}
            />
          ))
        )}
      </div>

      {filteredPersonas.length === 0 && !loading && (
        <div className="text-center py-12">
          <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold">Nenhuma persona encontrada</h3>
          <p className="text-muted-foreground">
            {searchTerm ? 'Tente ajustar os filtros de busca.' : 'Carregue personas para começar.'}
          </p>
        </div>
      )}
    </div>
  );

  const PersonaDetail = () => {
    if (!selectedPersona) return null;

    const config = PERSONA_CONFIGS[selectedPersona.persona];

    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => {
              setSelectedPersona(null);
              setActiveTab('gallery');
            }}
          >
            ← Voltar para galeria
          </Button>
          <Badge 
            variant="secondary"
            style={{ backgroundColor: config.color + '20', color: config.color }}
          >
            {config.role}
          </Badge>
        </div>

        {/* Persona Detail */}
        <PersonaCard
          persona={selectedPersona}
          compact={false}
        />

        {/* Additional Resources */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5" />
              Recursos Adicionais
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Guias de Uso</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Use o prompt AI para gerar conteúdo consistente</li>
                  <li>• Adapte o tom para cada canal específico</li>
                  <li>• Mantenha as mensagens-chave em destaque</li>
                  <li>• Monitore engajamento por persona</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Métricas Sugeridas</h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Taxa de engajamento por canal</li>
                  <li>• Conversão por tipo de conteúdo</li>
                  <li>• Tempo de produção de conteúdo</li>
                  <li>• Feedback qualitativo da audiência</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };

  return (
    <AdminLayout>
      <div className="container mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="gallery">Galeria</TabsTrigger>
            <TabsTrigger value="detail" disabled={!selectedPersona}>
              {selectedPersona ? `${selectedPersona.name}` : 'Detalhes'}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="gallery" className="mt-6">
            <PersonaOverview />
          </TabsContent>

          <TabsContent value="detail" className="mt-6">
            <PersonaDetail />
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default PersonaGallery;