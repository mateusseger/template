# Template React Corporativo

> Template profissional, escalável e moderno para aplicações React corporativas com autenticação Keycloak, sistema de temas e arquitetura baseada em features.

## 🎯 Visão Geral

Este template foi projetado para iniciar rapidamente projetos frontend corporativos internos com:

- ✅ Autenticação OIDC (Keycloak) pronta para uso
- ✅ Sistema de temas multi-marca (Herval, Taqi, iPlace)
- ✅ Arquitetura escalável baseada em features
- ✅ Componentes UI modernos (shadcn/ui)
- ✅ TypeScript + React 19 + Vite
- ✅ Controle de acesso baseado em roles (RBAC)
- ✅ Sistema automático de detail pages com seções navegáveis

## 🚀 Stack Tecnológica

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| React | 19.2 | Framework UI |
| TypeScript | 5.9 | Tipagem estática |
| Vite | 7.2 | Build tool |
| Tailwind CSS | 4.1 | Estilização |
| shadcn/ui | latest | Componentes UI |
| React Router | 7.9 | Roteamento |
| Tanstack Query | 5.90 | Server state |
| Framer Motion | 12.23 | Animações |
| oidc-client | 1.11 | Autenticação |

## 📁 Estrutura do Projeto

```
src/
├── app/                          # Configuração da aplicação
│   ├── providers/                # Providers globais (Theme, Auth, Query, ErrorBoundary)
│   ├── router/                   # Configuração de rotas
│   ├── App.tsx                   # Root component
│   └── main.tsx                  # Entry point
│
├── features/                     # Features de negócio (organizadas por domínio)
│   ├── auth/                     # Autenticação (3 componentes)
│   │   ├── components/           # 3 páginas agrupadas
│   │   │   ├── AuthCallbackPage.tsx
│   │   │   ├── LogoutPage.tsx
│   │   │   └── UnauthorizedPage.tsx
│   │   ├── auth-service.ts       # Service + Config + Mock (consolidado)
│   │   ├── auth-context.tsx      # Context provider
│   │   ├── auth-types.ts         # Tipos TypeScript
│   │   ├── auth-hooks.ts         # useAuth + useAuthorization (consolidado)
│   │   └── index.ts              # Barrel export
│   ├── pokemon/                  # Exemplo (2 componentes + API + detail sections)
│   │   ├── components/           # PokemonListPage, PokemonDetailPage
│   │   ├── pokemon-service.ts    # Integração com PokeAPI
│   │   ├── pokemon-types.ts      # Tipos da API
│   │   └── index.ts
│   ├── previsao-tempo/           # Exemplo (2 componentes + API + detail sections)
│   │   ├── components/           # PrevisaoTempoListPage, PrevisaoTempoDetailPage
│   │   ├── previsao-tempo-service.ts # Integração com Open-Meteo API
│   │   ├── previsao-tempo-types.ts   # Tipos da API
│   │   └── index.ts
│   ├── home/                     # Onboarding interativo (1 componente)
│   │   └── HomePage.tsx          # Documentação funcional do template
│   ├── tarefas/                  # Exemplo de CRUD moderno (1 componente)
│   │   ├── TarefasPage.tsx       # Lista com filtros, stats e animações
│   │   └── tarefas-types.ts
│   ├── design-system/            # Exemplo (1 componente na raiz)
│   │   └── DesignSystemPage.tsx
│   ├── settings/                 # Configurações (1 componente)
│   │   └── PreferencesPage.tsx   # Seletor de tema e preferências
│   └── errors/                   # Exemplo (1 componente na raiz)
│       └── NotFoundPage.tsx
│
├── shared/                       # Recursos compartilhados
│   ├── components/               # Componentes reutilizáveis
│   │   ├── ui/                   # shadcn/ui (NÃO MODIFICAR)
│   │   ├── layout/               # Layout components (Header, Sidebar, Breadcrumb)
│   │   ├── routing/              # ProtectedRoute
│   │   └── transitions/          # PageTransition
│   ├── lib/                      # Utilities e helpers
│   │   ├── utils/
│   │   │   └── cn.ts             # Class merge utility (nome específico)
│   │   ├── user/
│   │   │   └── index.ts          # User helpers (getUserRoles, etc)
│   │   ├── menu/
│   │   │   └── index.ts          # Menu config + helpers (consolidado)
│   │   └── permissions/
│   │       └── index.ts          # RBAC (roles e checagens)
│   ├── hooks/                    # Hooks compartilhados
│   ├── config/                   # Configurações estáticas (project, query-client)
│   ├── theme/                    # Sistema de temas
│   ├── assets/                   # Logos e imagens
│   └── types/                    # Tipos globais
│
└── styles/
    └── index.css                 # Estilos globais
```

### Princípios Arquiteturais

| Princípio | Descrição |
|-----------|-----------|
| **Feature-First** | Código organizado por domínio de negócio, não por tipo técnico |
| **Co-location** | Arquivos relacionados na mesma feature (agrupar em components/ quando 2+) |
| **Separation of Concerns** | Camadas claras: app (setup), features (domínio), shared (infraestrutura) |
| **Screaming Architecture** | Estrutura de pastas revela o propósito à primeira vista |
| **Simplicidade** | Sem abstrações prematuras, código direto e legível |

## 🎨 Sistema de Temas

Design minimalista com 3 temas corporativos. **Todos compartilham as mesmas cores secundárias**, diferenciando-se apenas pelo **primary**.

### Temas Disponíveis

| Tema | Primary | Características |
|------|---------|-----------------|
| 🔴 **Herval** | `#e10000` | Minimalista, Corporativo, Elegante |
| 🟠 **Taqi** | `#eb5c2e` | Clean, Moderno, Sofisticado |
| 🟢 **iPlace** | `#c6d30d` | Tech, Vibrante, Contemporâneo |

> 💡 Ao trocar de tema, apenas elementos com `primary` mudam. Todo o resto é idêntico.

### Configurar Tema

```bash
npm run setup                    # Script interativo
```

Ou manualmente no `.env`:
```env
VITE_APP_THEME=herval           # ou taqi, iplace
```

Ou via interface em `/settings/preferences` (Configurações > Preferências) após iniciar o app.

### Adicionar Novo Tema

1. Adicionar cores completas em `src/shared/theme/theme-config.ts`:

```typescript
export type ThemeName = "herval" | "taqi" | "iplace" | "novo-tema"

export const THEMES: Record<ThemeName, Theme> = {
  "novo-tema": {
    light: {
      background: "#ffffff",
      foreground: "#0a0a0a",
      card: "#ffffff",
      "card-foreground": "#0a0a0a",
      primary: "#your-primary-color",
      "primary-foreground": "#ffffff",
      secondary: "#f5f5f5",
      "secondary-foreground": "#0a0a0a",
      muted: "#fafafa",
      "muted-foreground": "#737373",
      accent: "#fafafa",
      "accent-foreground": "#0a0a0a",
      destructive: "#ef4444",
      "destructive-foreground": "#ffffff",
      border: "#e5e5e5",
      input: "#e5e5e5",
      ring: "#your-primary-color",
      // ... outras cores (popover, sidebar, etc)
    },
    dark: {
      // ... copie a estrutura do light e ajuste para dark
      // mude apenas primary e ring, mantenha o resto igual aos outros temas
    }
  }
}

export const THEME_METADATA: Record<ThemeName, {...}> = {
  "novo-tema": {
    name: "Novo Tema",
    description: "Descrição do tema",
    characteristics: ["Tag1", "Tag2", "Tag3"],
  }
}
```

2. Adicionar no script `scripts/setup-theme.js`:

```javascript
const themes = {
  "novo-tema": {
    name: "Novo Tema",
    color: "novo-tema",
    primary: "#your-color"
  }
}
```

3. Adicionar logo em `src/shared/assets/` (se necessário)

> ⚠️ **Importante:** Mantenha todas as cores secundárias (background, muted, border, etc) idênticas aos temas existentes. Mude apenas `primary` e `ring` para preservar consistência visual.

## 🔐 Autenticação e Autorização

### Setup de Autenticação

Configure as variáveis de ambiente no `.env`:

```env
# Keycloak/OIDC
VITE_APP_AUTHORITY=https://your-keycloak.com/realms/your-realm
VITE_APP_CLIENT_ID=your-client-id
VITE_APP_RESPONSE_TYPE=code
VITE_APP_SCOPE=openid profile email roles

# Dev Mode (opcional)
VITE_DEV_AUTH_BYPASS=true
VITE_DEV_MOCK_ROLES=admin,user
```

### Modo Desenvolvimento

Para desenvolver sem Keycloak:

```env
VITE_DEV_AUTH_BYPASS=true
VITE_DEV_MOCK_ROLES=admin,editor,user
```

### Proteger Rotas

#### Autenticação básica:
```typescript
{
  path: "/dashboard",
  element: (
    <ProtectedRoute>
      <DashboardPage />
    </ProtectedRoute>
  ),
}
```

#### Com roles específicas:
```typescript
{
  path: "/admin",
  element: (
    <ProtectedRoute requiredRoles={[USER_ROLES.ADMIN]}>
      <AdminPage />
    </ProtectedRoute>
  ),
}
```

### Usar Hooks de Autorização

```typescript
// Importação simplificada - tudo de um único lugar
import { useAuth, useAuthorization } from "@/features/auth"
import { USER_ROLES } from "@/shared/lib/permissions"

function MyComponent() {
  const { user, logout } = useAuth()
  const { hasRole, canAccess } = useAuthorization()
  
  if (hasRole(USER_ROLES.ADMIN)) {
    return <AdminPanel />
  }
  
  return <UserView />
}
```

## 🎯 Como Adicionar uma Nova Feature

### 1. Criar Estrutura

#### Feature Simples (1 componente)
```bash
src/features/relatorios/
├── RelatoriosPage.tsx          # Única página
├── relatorios-service.ts       # Lógica + API (se necessário)
└── relatorios-types.ts         # Tipos (se necessário)
```

#### Feature com Múltiplos Componentes (2+ componentes)
```bash
src/features/pedidos/
├── components/                 # Agrupar quando > 1 componente
│   ├── PedidosListPage.tsx
│   ├── PedidoDetailPage.tsx
│   └── PedidoCard.tsx          # Componentes internos (se necessário)
├── pedidos-service.ts          # Lógica + API
├── pedidos-types.ts            # Tipos
└── index.ts                    # Barrel export (opcional)
```

**Regra Simples:**
- ✅ **1 componente** → Manter na raiz da feature
- ✅ **2+ componentes** → Agrupar em `components/`
- ✅ Service sempre consolidado (lógica + API + config)
- ✅ Evitar pastas `lib/`, `hooks/`, `utils/` dentro de features

### 2. Adicionar Rota

Em `src/app/router/index.tsx`:

```typescript
// Feature com 1 componente (raiz)
import { RelatoriosPage } from "@/features/relatorios/RelatoriosPage"

// Feature com 2+ componentes (pasta components/)
import { PedidosListPage } from "@/features/pedidos/components/PedidosListPage"

// ...
{
  path: "/pedidos",
  element: <PedidosListPage />,
}
```

### 3. Adicionar ao Menu

Em `src/shared/lib/menu/index.ts`:

```typescript
import { ShoppingCart } from "lucide-react"

export const MENU_ITEMS: MenuItem[] = [
  // ...
  {
    name: "Pedidos",
    url: "/pedidos",
    icon: ShoppingCart,
    description: "Gerenciamento de pedidos",
  },
]
```

### 4. (Opcional) Proteger por Role

```typescript
{
  path: "/pedidos",
  element: (
    <ProtectedRoute requiredRoles={[USER_ROLES.EDITOR]}>
      <PedidosListPage />
    </ProtectedRoute>
  ),
}
```

## 📄 Páginas de Detalhe com Seções

Sistema automático de navegação por seções com sidebar terciária. Perfeito para páginas complexas!

### 1. Configurar Handle na Rota

Em `src/app/router/index.tsx`:

```typescript
{
  path: "/pokemon/:id",
  element: <PokemonDetailPage />,
  handle: {
    detailSectionsEnabled: true,                          // Habilita sidebar terciário
    breadcrumbLabel: (params) => `#${params.id}`,         // Label dinâmico
  },
}
```

### 2. Criar Página com Seções

```typescript
import { Section } from "@/shared/components/layout/detail-sections"
import { Info, Zap, Award } from "lucide-react"

export function PokemonDetailPage() {
  return (
    <div className="space-y-6">
      {/* Cada Section se registra automaticamente */}
      
      <Section id="info" label="Informações Básicas" icon={Info}>
        <Section.Header id="info" label="Informações Básicas" icon={Info} />
        
        {/* Use componentes shadcn */}
        <Card>
          <CardHeader>
            <CardTitle>Características</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Seu conteúdo aqui */}
          </CardContent>
        </Card>
      </Section>
      
      <Section id="abilities" label="Habilidades" icon={Zap}>
        <Section.Header id="abilities" label="Habilidades" icon={Zap} />
        {/* Conteúdo */}
      </Section>
      
      <Section id="stats" label="Estatísticas" icon={Award}>
        <Section.Header id="stats" label="Estatísticas" icon={Award} />
        {/* Conteúdo */}
      </Section>
    </div>
  )
}
```

### 🎯 Como Funciona

1. **Automático:** Seções se registram automaticamente no provider
2. **Navegação:** Sidebar terciário exibe todas as seções
3. **Scroll:** Clique na seção = scroll suave automático
4. **Highlight:** Seção visível fica destacada automaticamente
5. **Acessibilidade:** ARIA labels e foco gerenciados

### 📝 Exemplos Reais no Template

- **Pokémon** (`/pokemon/:id`): 4 seções (Info, Habilidades, Estatísticas, Galeria)
- **Previsão do Tempo** (`/previsao-tempo/:coords`): 4 seções (Clima Atual, Próximos 7 Dias, Próximas 24h, Precipitação)

**Sem configuração extra! Só adicionar `<Section>` components.**

## 🎓 Features de Exemplo

O template inclui features prontas que demonstram as melhores práticas:

### 🏠 Home (Onboarding)
- **Propósito:** Documentação interativa e funcional do template
- **Destaques:**
  - Hero section com saudação personalizada
  - Sistema de tabs (Guia Completo, Conceitos, Quick Start)
  - Seções expansíveis com toda arquitetura e padrões
  - Cards animados com Framer Motion
  - Links contextuais para outras páginas
- **Aprenda:** Estrutura de onboarding completa, tabs, collapsibles

### ✅ Tarefas
- **Propósito:** Exemplo de CRUD moderno com UX fluida
- **Destaques:**
  - Cards de estatísticas (Total, Ativas, Concluídas)
  - Sistema de filtros com tabs
  - Animações de entrada/saída (AnimatePresence)
  - Estados vazios personalizados
  - Hover effects e feedback visual
- **Aprenda:** State management, filtros, animações, UX moderna

### ⚙️ Preferências
- **Propósito:** Personalização de tema e aparência
- **Destaques:**
  - Toggle de modo escuro/claro com persistência
  - Seletor visual de temas (Herval, Taqi, iPlace)
  - Preview de cores em tempo real
  - Feedback visual do tema ativo
  - Informações do sistema
- **Aprenda:** Integração com ThemeProvider, localStorage, switches

### 🎨 Design System
- **Propósito:** Catálogo de componentes shadcn/ui
- **Aprenda:** Todos os componentes disponíveis e suas variantes

### 🎯 Pokémon & 🌤️ Previsão do Tempo
- **Propósito:** Exemplos de integração com APIs externas
- **Destaques:**
  - Páginas de lista e detalhe
  - Sistema de seções navegáveis
  - Loading states e error handling
  - Tanstack Query para cache
- **Aprenda:** Consumo de API, detail sections, server state

> 💡 **Dica:** Explore essas features antes de criar as suas. Elas demonstram todos os padrões e práticas recomendadas.

## 🛠️ Scripts Disponíveis

```bash
npm run dev         # Inicia servidor de desenvolvimento
npm run build       # Build para produção
npm run preview     # Preview do build
npm run lint        # Executa linter
npm run setup       # Configuração inicial (tema + nome do projeto)
```

## 📝 Convenções de Código

### Nomenclatura

| Tipo | Padrão | Exemplo |
|------|--------|---------|
| Arquivos | kebab-case | `pedido-detail-page.tsx` |
| Componentes | PascalCase | `PedidoDetailPage` |
| Hooks/Funções | camelCase | `useAuth`, `getUserData` |
| Tipos/Interfaces | PascalCase | `UserData`, `AuthConfig` |
| Constantes | UPPER_SNAKE_CASE | `USER_ROLES`, `API_URL` |

### Ordem de Imports

```typescript
// 1. React e externos
import { useState } from "react"
import { useNavigate } from "react-router-dom"

// 2. Features (use barrel exports)
import { useAuth, useAuthorization } from "@/features/auth"

// 3. Shared
import { Button } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils/cn"
import { getUserRoles } from "@/shared/lib/user"
import { MENU_ITEMS } from "@/shared/lib/menu"
import { USER_ROLES } from "@/shared/lib/permissions"

// 4. Relativos
import { helper } from "./helper"
import type { LocalType } from "./types"
```

### Comentários

- ✅ Sempre em português brasileiro
- ✅ Curtos e concisos (1 linha acima do código)
- ✅ Apenas onde agregam valor real
- ❌ Evitar comentários óbvios
- ❌ Evitar blocos longos de documentação

## ⚠️ Restrições Importantes

### NÃO MODIFICAR

- ❌ Componentes em `src/shared/components/ui/` (shadcn/ui)
- ❌ Fluxo OIDC em `src/features/auth/auth-service.ts` (core)

### Adicionar Componentes shadcn/ui

```bash
npx shadcn@latest add [component-name]
```

Os componentes serão adicionados automaticamente em `src/shared/components/ui/`

## 🎓 Filosofia do Template

### Simplicidade > Complexidade

- Código direto e legível
- Sem abstrações prematuras
- Padrões claros e previsíveis

### Escalabilidade sem Over-Engineering

- Fácil adicionar features sem refatoração estrutural
- Crescimento orgânico conforme necessidade
- Evitar "factory", "manager", etc sem ganho real

### Developer Experience (DX)

- Onboarding rápido de novos devs
- Tempo reduzido para localizar código
- Produtividade maximizada

## 📚 Referências

Este template foi inspirado em padrões consolidados da indústria:

- [Bulletproof React](https://github.com/alan2207/bulletproof-react)
- [Feature-Sliced Design](https://feature-sliced.design/)
- Padrões de projetos enterprise (Vercel, Shopify, Airbnb)
- Domain-Driven Design principles

## ✅ Checklist Antes de Começar Novo Projeto

- [ ] Executar `npm install`
- [ ] Executar `npm run setup` para configurar tema e nome
- [ ] Configurar `.env` com credenciais Keycloak
- [ ] Remover features de exemplo (tarefas, pokemon, previsao-tempo) se não necessárias
- [ ] Ajustar logo e favicon
- [ ] Revisar `src/shared/lib/menu/index.ts` e remover itens de exemplo
- [ ] Configurar roles em `src/shared/lib/permissions/index.ts` conforme necessidade
- [ ] Testar autenticação e autorização
- [ ] Executar `npm run build` para verificar build de produção

## 🤝 Contribuindo

Mantenha os princípios do template ao adicionar novas funcionalidades:

1. Simplicidade e legibilidade
2. Organização por feature/domínio
3. Comentários em português, curtos e úteis
4. Tipagem forte (evitar `any`)
5. Testes de funcionalidade antes de commit

---

**Desenvolvido para acelerar o desenvolvimento de aplicações corporativas internas.**
