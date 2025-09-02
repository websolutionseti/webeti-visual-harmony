# Módulo de Briefing - WebETI Visual Harmony

## Visão Geral
Módulo independente para gerenciamento de briefings integrado ao sistema WebETI Visual Harmony.

## Estrutura do Módulo
```
src/modules/briefing/
├── components/          # Componentes específicos do briefing
├── hooks/              # Hooks customizados
├── pages/              # Páginas do módulo
├── types/              # Tipos TypeScript
├── services/           # Serviços e APIs
├── integration/        # Componente de integração
└── README.md          # Esta documentação
```

## Instalação e Uso

### 1. Integração no App Principal
```tsx
// App.tsx
import { ModuleIntegration } from '@/modules/briefing/integration/ModuleIntegration';

// Adicionar nas rotas:
<Route path="/briefings/*" element={
  <ModuleIntegration 
    config={{ 
      authContext: useAuth,
      supabaseClient: supabase 
    }}
  />
} />
```

### 2. Rotas Disponíveis
- `/briefings` - Lista de briefings
- `/briefings/new` - Criar novo briefing
- `/briefings/edit/:id` - Editar briefing
- `/briefings/view/:id` - Visualizar briefing

## Funcionalidades
- ✅ Criação e edição de briefings
- ✅ Sistema de templates
- ✅ Gerenciamento de status
- ✅ Integração com autenticação
- ✅ Responsivo e acessível
- ✅ Tema escuro/claro

## Dependências
O módulo utiliza as mesmas dependências do projeto principal:
- React + TypeScript
- Tailwind CSS
- Radix UI
- React Hook Form
- Zod para validação