# 🤝 Como Contribuir com o WebEti Visual Harmony

Obrigado por considerar contribuir com o nosso Design System! Este documento fornece diretrizes para contribuições eficazes.

## 🚀 Começando

### Pré-requisitos
- Node.js 18+ e npm
- Git configurado
- Conta no GitHub
- Conhecimento básico de React, TypeScript e Tailwind CSS

### Setup do Ambiente

```bash
# Clone o repositório
git clone https://github.com/websolutionseti/webeti-visual-harmony.git
cd webeti-visual-harmony

# Instale as dependências
npm install

# Execute o ambiente de desenvolvimento
npm run dev
```

## 📋 Tipos de Contribuição

### 🐛 Reportar Bugs
1. Verifique se o bug já foi reportado nas [Issues](https://github.com/websolutionseti/webeti-visual-harmony/issues)
2. Crie uma nova issue usando o template de bug
3. Inclua:
   - Descrição clara do problema
   - Passos para reproduzir
   - Screenshots/vídeos quando aplicável
   - Informações do navegador/OS

### ✨ Propor Novas Features
1. Abra uma issue de discussão primeiro
2. Descreva o caso de uso e benefícios
3. Inclua mockups ou wireframes se possível
4. Aguarde aprovação antes de implementar

### 🎨 Contribuir com Componentes

#### Processo de Criação
1. **Design First**: Crie o design no Figma seguindo nosso Design System
2. **Issue**: Abra uma issue explicando o componente
3. **Branch**: Crie uma branch: `feat/componente-nome`
4. **Implementação**: Siga nossos padrões de código
5. **Documentação**: Adicione documentação completa
6. **Pull Request**: Abra PR com descrição detalhada

#### Estrutura de Componente
```
src/components/ui/meu-componente/
├── index.tsx           # Componente principal
├── meu-componente.tsx  # Implementação
├── variants.ts         # Variantes usando CVA
└── README.md          # Documentação
```

#### Exemplo de Implementação
```tsx
// components/ui/meu-componente.tsx
import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const meuComponenteVariants = cva(
  "base-classes-here",
  {
    variants: {
      variant: {
        default: "variant-classes",
        secondary: "secondary-classes"
      },
      size: {
        default: "size-classes",
        lg: "large-size-classes"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
)

export interface MeuComponenteProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof meuComponenteVariants> {
  // Props específicas aqui
}

const MeuComponente = React.forwardRef<HTMLDivElement, MeuComponenteProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div
        className={cn(meuComponenteVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
MeuComponente.displayName = "MeuComponente"

export { MeuComponente, meuComponenteVariants }
```

## 🎯 Padrões de Código

### Estilo de Código
- Use TypeScript estrito
- Componentes funcionais com hooks
- Props tipadas com interfaces
- Classes do Tailwind semânticas do design system

### Convenções de Nomenclatura
- Componentes: `PascalCase`
- Funções: `camelCase`
- Constantes: `UPPER_SNAKE_CASE`
- Arquivos: `kebab-case.tsx`

### Estrutura de Commit
```
type(scope): descrição

feat(button): adiciona variante outline
fix(card): corrige padding em mobile
docs(readme): atualiza instruções de instalação
style(typography): aplica formatação consistente
```

### Tipos de Commit
- `feat`: Nova feature
- `fix`: Correção de bug
- `docs`: Mudanças na documentação
- `style`: Mudanças que não afetam o código (formatação)
- `refactor`: Refatoração de código
- `test`: Adição ou correção de testes
- `chore`: Mudanças em build, dependências, etc.

## 🧪 Testes

### Executar Testes
```bash
npm run test        # Testes unitários
npm run test:watch  # Modo watch
npm run e2e         # Testes E2E
```

### Cobertura Mínima
- Componentes novos: 80%
- Utilities/hooks: 90%
- Testes visuais obrigatórios

## 📝 Documentação

### Componentes
Cada componente deve ter:
- Props documentadas com JSDoc
- Exemplos de uso
- Variantes disponíveis
- Estados (hover, focus, disabled)
- Diretrizes de acessibilidade

### Storybook
```tsx
// MeuComponente.stories.tsx
export default {
  title: 'Components/MeuComponente',
  component: MeuComponente,
  parameters: {
    docs: {
      description: {
        component: 'Descrição do componente aqui'
      }
    }
  }
}

export const Default = {
  args: {
    children: 'Conteúdo exemplo'
  }
}
```

## 🎨 Design Guidelines

### Tokens de Design
- **Cores**: Use apenas tokens do design system
- **Espaçamento**: Grid de 8pt
- **Tipografia**: Hierarquia definida
- **Sombreamento**: Padrões pré-definidos

### Acessibilidade
- Contraste mínimo 4.5:1
- Navegação por teclado
- ARIA labels apropriadas
- Testes com screen readers

### Responsividade
- Mobile-first approach
- Breakpoints padrão do Tailwind
- Componentes adaptativos

## 🔍 Code Review

### Checklist para PRs
- [ ] Código segue padrões estabelecidos
- [ ] Testes passando com cobertura adequada
- [ ] Documentação atualizada
- [ ] Design aprovado no Figma
- [ ] Acessibilidade verificada
- [ ] Performance testada
- [ ] Compatibilidade entre navegadores

### Processo de Review
1. **Auto-review**: Revise seu próprio código primeiro
2. **CI/CD**: Aguarde todos os checks passarem
3. **Design Review**: Validação com equipe de design
4. **Code Review**: Pelo menos 1 aprovação necessária
5. **Merge**: Squash and merge preferencial

## 🚀 Deploy

### Ambientes
- **Development**: Branch `develop`
- **Staging**: Branch `staging` 
- **Production**: Branch `main`

### Processo
1. PR aprovado e merged
2. CI/CD automaticamente deploya
3. Testes de smoke em staging
4. Release notes atualizadas

## 📞 Comunicação

### Canais
- **Issues**: Bugs e features
- **Discussions**: Dúvidas e brainstorming
- **Discord**: Chat em tempo real
- **Email**: contato@websolutions.eti.br

### Etiqueta
- Seja respeitoso e construtivo
- Use português ou inglês
- Inclua contexto suficiente
- Agradeça por reviews e feedback

## 🏆 Reconhecimento

Contribuidores serão:
- Listados no README
- Mencionados em release notes
- Convidados para eventos da empresa
- Considerados para posições futuras

## 📚 Recursos Úteis

### Documentação
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Radix UI](https://www.radix-ui.com/)
- [React Hook Form](https://react-hook-form.com/)
- [TypeScript](https://www.typescriptlang.org/docs/)

### Ferramentas
- [Figma](https://figma.com) - Design
- [Storybook](https://storybook.js.org/) - Componentes
- [VS Code](https://code.visualstudio.com/) - Editor recomendado
- [GitHub CLI](https://cli.github.com/) - Gerenciamento de PRs

---

**Obrigado por contribuir com o WebEti Visual Harmony!** 🎉

Sua contribuição faz a diferença na criação de produtos digitais mais acessíveis e consistentes.