import { useState, useEffect } from 'react';
import { Briefing, BriefingFormData } from '../types';

// Mock data para desenvolvimento
const mockBriefings: Briefing[] = [
  {
    id: '1',
    title: 'Website Corporativo - TechCorp',
    description: 'Desenvolvimento de website institucional moderno e responsivo',
    client: 'TechCorp Solutions',
    project_type: 'website',
    status: 'review',
    created_at: '2024-01-15T10:00:00Z',
    updated_at: '2024-01-20T14:30:00Z',
    created_by: 'admin@webeti.com',
    requirements: [
      {
        id: '1',
        category: 'Design',
        description: 'Layout moderno e clean',
        priority: 'high',
        completed: false
      },
      {
        id: '2',
        category: 'Funcionalidade',
        description: 'Sistema de contato integrado',
        priority: 'medium',
        completed: true
      }
    ]
  },
  {
    id: '2',
    title: 'E-commerce - Fashion Store',
    description: 'Loja virtual completa para venda de roupas',
    client: 'Fashion Store Ltda',
    project_type: 'ecommerce',
    status: 'approved',
    created_at: '2024-01-10T09:00:00Z',
    updated_at: '2024-01-25T16:45:00Z',
    created_by: 'admin@webeti.com',
    requirements: [
      {
        id: '3',
        category: 'E-commerce',
        description: 'Catálogo de produtos',
        priority: 'high',
        completed: true
      },
      {
        id: '4',
        category: 'Pagamento',
        description: 'Gateway de pagamento',
        priority: 'high',
        completed: false
      }
    ]
  }
];

export const useBriefings = () => {
  const [briefings, setBriefings] = useState<Briefing[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Simula carregamento de dados
  useEffect(() => {
    const loadBriefings = async () => {
      try {
        setLoading(true);
        // Simula delay de API
        await new Promise(resolve => setTimeout(resolve, 1000));
        setBriefings(mockBriefings);
      } catch (err) {
        setError('Erro ao carregar briefings');
      } finally {
        setLoading(false);
      }
    };

    loadBriefings();
  }, []);

  const createBriefing = async (data: BriefingFormData): Promise<Briefing> => {
    const newBriefing: Briefing = {
      ...data,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: 'admin@webeti.com'
    };

    setBriefings(prev => [...prev, newBriefing]);
    return newBriefing;
  };

  const updateBriefing = async (id: string, data: Partial<BriefingFormData>): Promise<Briefing> => {
    const updatedBriefing = briefings.find(b => b.id === id);
    if (!updatedBriefing) throw new Error('Briefing não encontrado');

    const updated = {
      ...updatedBriefing,
      ...data,
      updated_at: new Date().toISOString()
    };

    setBriefings(prev => prev.map(b => b.id === id ? updated : b));
    return updated;
  };

  const deleteBriefing = async (id: string): Promise<void> => {
    setBriefings(prev => prev.filter(b => b.id !== id));
  };

  const getBriefing = (id: string): Briefing | undefined => {
    return briefings.find(b => b.id === id);
  };

  return {
    briefings,
    loading,
    error,
    createBriefing,
    updateBriefing,
    deleteBriefing,
    getBriefing
  };
};