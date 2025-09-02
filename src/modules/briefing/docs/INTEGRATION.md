# Guia de Integração - Módulo de Briefing

## Configuração Rápida

### 1. Adicionar ao App Principal
```tsx
// App.tsx
import { ModuleIntegration } from '@/modules/briefing/integration/ModuleIntegration';

// Adicionar à estrutura de rotas:
<Route path="/briefings/*" element={
  <ProtectedRoute>
    <ModuleIntegration 
      config={{ 
        authContext: useAuth,
        supabaseClient: supabase 
      }}
    />
  </ProtectedRoute>
} />
```

### 2. Adicionar Link na Navegação
```tsx
// MainHeader.tsx ou Navigation.tsx
<Link to="/briefings" className="nav-link">
  Briefings
</Link>
```

## Configuração Avançada

### Com Supabase
```tsx
<ModuleIntegration 
  config={{
    supabaseClient: supabaseClient,
    authContext: useAuth(),
    apiEndpoint: process.env.VITE_API_URL
  }}
/>
```

### Sem Backend (Mock)
```tsx
<ModuleIntegration 
  config={{
    theme: 'system' // ou 'light' | 'dark'
  }}
/>
```

## Estrutura de Dados

### Briefing
```typescript
interface Briefing {
  id: string;
  title: string;
  description: string;
  client: string;
  project_type: 'website' | 'app' | 'ecommerce' | 'branding' | 'marketing';
  status: 'draft' | 'review' | 'approved' | 'completed';
  created_at: string;
  updated_at: string;
  created_by: string;
  requirements: BriefingRequirement[];
  timeline?: {
    start_date?: string;
    end_date?: string;
    milestones?: Milestone[];
  };
}
```

## Customização

### Temas
O módulo herda o sistema de temas do projeto principal via Tailwind CSS.

### Estilos
Todos os componentes usam os tokens de design do sistema principal:
- `--primary`, `--secondary`
- `--muted`, `--accent`
- `--card`, `--popover`

### Validação
Utilizamos Zod para validação de formulários com mensagens em português.

## Deploy

### Preparação
1. Certifique-se de que todas as dependências estão instaladas
2. Configure as variáveis de ambiente se usar Supabase
3. Teste em modo de desenvolvimento

### Build
```bash
npm run build
```

O módulo será incluído automaticamente no build principal.

## Troubleshooting

### Erro: "Module not found"
- Verifique se o alias `@/modules` está configurado no vite.config.ts
- Confirme que todos os arquivos do módulo estão na pasta correta

### Erro: "Supabase not configured"
- Adicione a configuração do Supabase no config
- Verifique as credenciais e URL do banco

### Estilos não aparecem
- Confirme que o Tailwind está processando os arquivos do módulo
- Verifique se `src/modules/**/*.{js,ts,jsx,tsx}` está no content do tailwind.config.ts