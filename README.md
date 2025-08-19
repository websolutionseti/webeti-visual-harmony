# 🎨 WebEti Visual Harmony

<div align="center">
  <img src="public/assets/brand/webeti-logo-1.png" alt="WebSolutions ETI" width="200">
  
  **Sistema de Identidade Visual Premium**
  
  *Tecnologia que entende o seu negócio*
  
  [![Live Preview](https://img.shields.io/badge/Live-Preview-blue?style=for-the-badge)](https://ds.websolutions.eti.br/)
  [![Lovable](https://img.shields.io/badge/Built%20with-Lovable-purple?style=for-the-badge)](https://lovable.dev)
  [![GitHub](https://img.shields.io/badge/GitHub-Repository-black?style=for-the-badge)](https://github.com/websolutionseti/webeti-visual-harmony)
</div>

---

## 🚀 Sobre o Projeto

O **WebEti Visual Harmony** é o sistema de design oficial da WebSolutions ETI, criado para unificar a identidade visual em todos os produtos e serviços da empresa. Este projeto representa o estado da arte em design systems brasileiros, combinando estética premium com funcionalidade técnica.

### ✨ Destaques

- 🎯 **Design System Completo** - Fundamentos, componentes e padrões documentados
- 🌙 **Dark/Light Mode** - Alternância de temas com persistência
- ♿ **Acessibilidade A11y** - WCAG 2.1 AA compliant
- 📱 **Mobile First** - Responsivo e otimizado para todos os dispositivos  
- 🔧 **Modular** - Componentes reutilizáveis entre projetos
- 🖼️ **Galeria de Assets** - CDN interno para ícones e imagens
- 🤖 **IA Integrada** - Personagens B.eti e Gepto

---

## 🏗️ Arquitetura

```
webeti-visual-harmony/
├── 📁 src/
│   ├── components/       # Componentes reutilizáveis
│   ├── modules/          # Módulos específicos (A11y, Gallery, etc.)
│   ├── pages/            # Páginas da aplicação
│   └── lib/              # Utilitários e helpers
├── 📁 public/
│   ├── assets/           # Assets organizados por categoria
│   │   ├── brand/        # Logotipos e marca
│   │   ├── icons/        # Ícones SVG
│   │   ├── images/       # Imagens e fotos
│   │   └── partners/     # Logos de parceiros
└── 📁 docs/              # Documentação técnica
```

---

## 🛠️ Tecnologias

<div align="center">

| Frontend | Backend | DevOps | Design |
|----------|---------|--------|--------|
| React 18 | Supabase | GitHub Actions | Figma |
| TypeScript | PostgreSQL | Docker | Adobe CC |
| Tailwind CSS | Edge Functions | Traefik | Storybook |
| Vite | Auth | CI/CD | Design Tokens |

</div>

---

## 🚀 Quick Start

### 1️⃣ Desenvolvimento Local

```bash
# Clone o repositório
git clone https://github.com/websolutionseti/webeti-visual-harmony.git
cd webeti-visual-harmony

# Instale as dependências
npm install

# Execute o servidor de desenvolvimento
npm run dev

# Acesse http://localhost:5173
```

### 2️⃣ Usando no Lovable

1. Acesse: [https://lovable.dev/projects/7f02378c-bd23-4878-8c6c-f840b1313ff6](https://lovable.dev/projects/7f02378c-bd23-4878-8c6c-f840b1313ff6)
2. Faça login ou crie uma conta
3. Comece a editar em tempo real

### 3️⃣ Preview Online

- **Produção**: [https://ds.websolutions.eti.br/](https://ds.websolutions.eti.br/)
- **Preview**: [https://preview--webeti-visual-harmony.lovable.app/](https://preview--webeti-visual-harmony.lovable.app/)

---

## 📚 Documentação

### 🎨 Design System

- **Fundamentos**: Cores, tipografia, espaçamento, grid
- **Componentes**: Buttons, cards, forms, navigation
- **Padrões**: Layouts, microcopy, animações
- **Tokens**: CSS custom properties e Tailwind config

### 🔧 Módulos Disponíveis

#### A11y Menu (`/modules/a11y`)
Menu de acessibilidade reutilizável entre projetos:
```jsx
import { A11yMenu } from '@/modules/a11y';

<A11yMenu 
  fontSize={24}
  language="pt"
  onChangeLanguage={handleLanguageChange}
  onToggleContrast={toggleContrast}
/>
```

#### Gallery (`/modules/gallery`)
Galeria de assets com preview e URLs diretas:
```jsx
import { AssetGallery } from '@/modules/gallery';

<AssetGallery 
  category="icons"
  showCopyUrl={true}
  baseUrl="https://cdn.websolutions.eti.br"
/>
```

---

## 🖼️ Galeria de Assets

### 📋 Como Usar

Para referenciar assets em outros projetos:

```html
<!-- Ícones -->
<img src="https://ds.websolutions.eti.br/assets/icons/automacao.svg" alt="Automação">

<!-- Logos -->
<img src="https://ds.websolutions.eti.br/assets/brand/webeti-logo-1.png" alt="WebEti">

<!-- Parceiros -->
<img src="https://ds.websolutions.eti.br/assets/partners/online-des-logo-1.png" alt="Online Des">
```

### 📁 Categorias Disponíveis

- `brand/` - Logotipos WebSolutions ETI
- `icons/` - Ícones SVG otimizados
- `images/` - Fotos e ilustrações
- `partners/` - Logos de parceiros e clientes

---

## 🤝 Como Contribuir

### 1️⃣ Reportar Issues
- Use templates específicos para bugs/features
- Inclua screenshots quando aplicável
- Marque com labels apropriadas

### 2️⃣ Propor Componentes
1. Crie um issue explicando o caso de uso
2. Faça o design no Figma seguindo o DS
3. Implemente seguindo os padrões existentes
4. Adicione documentação e testes

### 3️⃣ Padrões de Commit
```
feat: adiciona componente Tooltip
fix: corrige contraste do botão secundário  
docs: atualiza README com nova galeria
style: aplica formatação consistente
```

---

## 🔗 Links Importantes

### 🌐 Websites
- [WebSolutions ETI](https://websolutions.eti.br/) - Site oficial
- [B.eti A11y](https://beti.websolutions.eti.br/) - Menu de acessibilidade
- [Online Des](https://online.des.br/) - Parceiro de design

### 👥 Social & Contato
- [LinkedIn Empresa](https://linkedin.com/company/websolutionseti)
- [LinkedIn Guilherme](https://www.linkedin.com/in/websolutionseti/)
- [GitHub](https://github.com/websolutionseti/)
- [Figma](https://www.figma.com/@gpuentes)

---

## 📊 Roadmap

### ✅ Concluído (v1.0)
- [x] Design System base
- [x] Componentes principais
- [x] Dark/Light mode
- [x] Documentação interativa

### 🔄 Em Progresso (v1.1)
- [ ] Galeria de assets completa
- [ ] Módulo A11y exportável
- [ ] Testes automatizados
- [ ] Storybook integration

### 🎯 Planejado (v2.0)
- [ ] NPM package `@webeti/design-system`
- [ ] API de assets
- [ ] Plugin Figma
- [ ] Tema builder dinâmico

---

## 📜 Changelog

### v1.0.0 (2024-01-20)
- 🎉 Lançamento inicial do Visual Harmony
- ✨ Sistema de cores premium
- 🎨 Componentes base (Button, Card, Typography)
- 📱 Layout responsivo

### v1.0.1 (2024-01-21)
- 🐛 Fix: Contraste de botões no modo escuro
- 📚 Docs: Atualização do README
- 🖼️ Assets: Adição de logos de parceiros

---

## 📄 Licença

Este projeto é propriedade da **WebSolutions ETI** e está licenciado sob os termos da licença MIT para componentes open source e licença proprietária para uso comercial.

Para mais informações sobre licenciamento comercial, entre em contato: [contato@websolutions.eti.br](mailto:contato@websolutions.eti.br)

---

<div align="center">
  <p>
    <strong>Feito com ❤️ por <a href="https://websolutions.eti.br">WebSolutions ETI</a></strong>
  </p>
  <p>
    <em>Tecnologia que entende o seu negócio</em>
  </p>
</div>