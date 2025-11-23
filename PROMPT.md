# PROMPT: Aprimoramento da Arquitetura Feature-Based

## 🎯 Contexto

Este projeto é um template React corporativo com autenticação Keycloak, sistema de temas multi-marca e arquitetura baseada em features. Atualmente, a estrutura já possui uma boa organização, mas precisa de refinamentos para torná-la mais escalável, padronizada e clara na separação de responsabilidades.

## 📋 Objetivo

Reestruturar a arquitetura do projeto para separar claramente:

1. **`app/`** - Configuração e inicialização da aplicação (providers, router, entry points)
2. **`features/`** - Features de negócio organizadas por domínio
3. **`shared/`** - Recursos compartilhados entre features (componentes, utilitários, hooks, etc)

### Separação de Features

Dentro de `features/`, criar duas categorias:

- **`core/`** - Features essenciais para o funcionamento do template (auth, theme, errors, etc)
- **`business/`** - Features de negócio/exemplos (pokedex, previsao-tempo, formularios, etc)

## 🏗️ Estrutura Proposta

```
src/
├── app/                              # Configuração e inicialização
│   ├── main.tsx                      # Entry point (ReactDOM.render)
│   ├── app.tsx                       # Root component
│   ├── global.css                    # Estilos globais
│   ├── app-providers.tsx             # Composição de providers (Theme, Auth, Query, ErrorBoundary)
│   └── app-router.tsx                # Router principal (importa routes de features)
│
├── features/                         # Features organizadas por domínio
│   ├── core/                         # Features essenciais do template
│   │   ├── auth/                     # Autenticação OIDC
│   │   │   ├── pages/                # Páginas da feature
│   │   │   │   ├── auth-callback-page.tsx
│   │   │   │   ├── logout-page.tsx
│   │   │   │   └── unauthorized-page.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── use-auth.ts
│   │   │   │   └── use-authorization.ts
│   │   │   ├── context/
│   │   │   │   └── auth-context.tsx
│   │   │   ├── services/
│   │   │   │   └── auth-service.ts   # OIDC service + config
│   │   │   ├── types/
│   │   │   │   └── auth-types.ts
│   │   │   ├── constants/
│   │   │   │   └── auth-constants.ts # Roles, errors, etc
│   │   │   ├── routes.tsx            # Rotas específicas da feature
│   │   │   └── index.ts              # Barrel export
│   │   │
│   │   ├── theme/                    # Sistema de temas
│   │   │   ├── pages/
│   │   │   │   └── theme-settings-page.tsx
│   │   │   ├── hooks/
│   │   │   │   └── use-theme.ts
│   │   │   ├── context/
│   │   │   │   └── theme-provider.tsx
│   │   │   ├── constants/
│   │   │   │   └── theme-config.ts   # Configuração de temas
│   │   │   ├── types/
│   │   │   │   └── theme-types.ts
│   │   │   ├── routes.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── errors/                   # Páginas de erro
│   │   │   ├── pages/
│   │   │   │   ├── not-found-page.tsx
│   │   │   │   └── error-boundary-page.tsx
│   │   │   ├── routes.tsx
│   │   │   └── index.ts
│   │   │
│   │   └── home/                     # Dashboard/Home
│   │       ├── pages/
│   │       │   └── home-page.tsx
│   │       ├── routes.tsx
│   │       └── index.ts
│   │
│   └── business/                     # Features de negócio/exemplos
│       ├── pokedex/
│       │   ├── pages/
│       │   │   ├── pokedex-list-page.tsx
│       │   │   └── pokedex-detail-page.tsx
│       │   ├── components/           # Componentes internos da feature
│       │   │   └── pokemon-card.tsx
│       │   ├── services/
│       │   │   └── pokedex-service.ts
│       │   ├── types/
│       │   │   └── pokedex-types.ts
│       │   ├── routes.tsx
│       │   └── index.ts
│       │
│       ├── previsao-tempo/
│       │   ├── pages/
│       │   │   ├── previsao-tempo-list-page.tsx
│       │   │   └── previsao-tempo-detail-page.tsx
│       │   ├── services/
│       │   │   └── previsao-tempo-service.ts
│       │   ├── types/
│       │   │   └── previsao-tempo-types.ts
│       │   ├── routes.tsx
│       │   └── index.ts
│       │
│       ├── formularios/
│       │   ├── pages/
│       │   │   └── formularios-page.tsx
│       │   ├── types/
│       │   │   └── formularios-types.ts
│       │   ├── routes.tsx
│       │   └── index.ts
│       │
│       ├── to-do-list/
│       │   ├── pages/
│       │   │   └── to-do-list-page.tsx
│       │   ├── types/
│       │   │   └── to-do-list-types.ts
│       │   ├── routes.tsx
│       │   └── index.ts
│       │
│       └── design-system/
│           ├── pages/
│           │   └── design-system-page.tsx
│           ├── routes.tsx
│           └── index.ts
│
└── shared/                           # Recursos compartilhados
    ├── components/                   # Componentes reutilizáveis
    │   ├── ui/                       # Componentes de interface
    │   │   ├── shadcn/               # shadcn/ui primitives (NÃO MODIFICAR)
    │   │   │   ├── button.tsx
    │   │   │   ├── card.tsx
    │   │   │   └── ...
    │   │   └── custom/               # Componentes custom do projeto
    │   │       ├── detail-page-skeleton.tsx
    │   │       └── scrolling-text.tsx
    │   ├── layout/                   # Componentes de layout
    │   │   ├── app-layout.tsx
    │   │   ├── app-header.tsx
    │   │   ├── app-sidebar-menu.tsx
    │   │   ├── app-sidebar-submenu.tsx
    │   │   ├── app-breadcrumb.tsx
    │   │   ├── mobile-unsupported.tsx
    │   │   ├── sidebar-layout-context.tsx
    │   │   └── detail-sections/
    │   │       ├── detail-sections-provider.tsx
    │   │       ├── detail-sections-sidebar.tsx
    │   │       ├── section.tsx
    │   │       └── index.ts
    │   ├── routing/                  # Componentes de roteamento
    │   │   └── app-protected-route.tsx
    │   └── transitions/              # Componentes de transição
    │       └── app-page-transition.tsx
    │
    ├── hooks/                        # Hooks compartilhados
    │   ├── use-mobile.ts
    │   └── use-sidebar-menu.ts
    │
    ├── services/                     # Serviços compartilhados (ex: HTTP client)
    │   └── api-client.ts
    │
    ├── utils/                        # Funções utilitárias
    │   ├── cn.ts                     # Class merge utility
    │   ├── date.ts                   # Date formatters
    │   ├── string.ts                 # String helpers
    │   └── number.ts                 # Number formatters
    │
    ├── constants/                    # Constantes globais
    │   ├── menu.ts                   # Configuração de menu
    │   ├── permissions.ts            # Roles e permissões
    │   └── routes.ts                 # Rotas globais/públicas
    │
    ├── helpers/                      # Funções auxiliares específicas
    │   ├── user-helpers.ts           # Helpers de usuário
    │   └── permission-helpers.ts     # Checagens de permissão
    │
    ├── types/                        # Tipos globais
    │   ├── global.d.ts
    │   └── env.d.ts
    │
    ├── config/                       # Configurações estáticas
    │   ├── project.ts                # Config do projeto
    │   └── query-client.ts           # Tanstack Query config
    │
    └── assets/                       # Assets estáticos
        ├── images/
        └── logos/
```

## 📐 Padrões e Princípios

### 1. Estrutura Interna de Features

Cada feature deve seguir uma estrutura consistente e escalável:

```
feature-name/
├── pages/                    # Páginas da feature (1 ou mais)
│   ├── feature-list-page.tsx
│   └── feature-detail-page.tsx
├── components/               # Componentes internos (opcional, se necessário)
│   └── feature-card.tsx
├── hooks/                    # Hooks específicos da feature (opcional)
│   └── use-feature-data.ts
├── context/                  # Context providers (opcional)
│   └── feature-context.tsx
├── services/                 # Serviços e integrações (opcional)
│   └── feature-service.ts
├── types/                    # Tipos TypeScript (opcional)
│   └── feature-types.ts
├── constants/                # Constantes da feature (opcional)
│   └── feature-constants.ts
├── utils/                    # Utilitários específicos (opcional)
│   └── feature-utils.ts
├── routes.tsx                # Rotas da feature (obrigatório)
└── index.ts                  # Barrel export (obrigatório)
```

**Regras:**

- ✅ **`pages/`** é obrigatório (sempre haverá pelo menos 1 página)
- ✅ **`routes.tsx`** é obrigatório (define rotas da feature)
- ✅ **`index.ts`** é obrigatório (barrel export público)
- ✅ Outras pastas são **opcionais** e só devem existir se houver necessidade
- ✅ Componentes que são usados apenas dentro da feature ficam em `components/`
- ✅ Componentes reutilizáveis por outras features vão para `shared/components/`

### 2. Separação Pages vs Components

#### Pages (Rotas)
- Componentes que representam uma rota/URL
- Exemplo: `UserListPage`, `UserDetailPage`, `DashboardPage`
- Sempre ficam em `pages/`
- Nomeação: `*-page.tsx`

#### Components (Reutilizáveis)
- Componentes que compõem as páginas
- Exemplo: `UserCard`, `UserForm`, `UserTable`
- Ficam em `components/` (dentro da feature ou em `shared/`)
- Nomeação: `*.tsx` (sem sufixo `-page`)

**Exemplo:**
```
users/
├── pages/
│   ├── users-list-page.tsx       # Rota /users
│   └── user-detail-page.tsx      # Rota /users/:id
└── components/
    ├── user-card.tsx             # Usado pelas páginas
    └── user-form.tsx             # Usado pelas páginas
```

### 3. Sistema de Rotas por Feature

Cada feature deve exportar suas próprias rotas:

```typescript
// features/business/pokedex/routes.tsx
import { RouteObject } from "react-router-dom"
import { PokedexListPage } from "./pages/pokedex-list-page"
import { PokedexDetailPage } from "./pages/pokedex-detail-page"

export const pokedexRoutes: RouteObject[] = [
  {
    path: "/pokedex",
    element: <PokedexListPage />,
  },
  {
    path: "/pokedex/:id",
    element: <PokedexDetailPage />,
    handle: {
      detailSectionsEnabled: true,
      breadcrumbLabel: (params) => `#${params.id}`,
    },
  },
]
```

O router principal importa e combina todas as rotas:

```typescript
// app/app-router.tsx
import { createBrowserRouter } from "react-router-dom"
import { AppLayout } from "@/shared/components/layout/app-layout"
import { AppProtectedRoute } from "@/shared/components/routing/app-protected-route"

// Import de rotas das features
import { authRoutes } from "@/features/core/auth/routes"
import { themeRoutes } from "@/features/core/theme/routes"
import { errorRoutes } from "@/features/core/errors/routes"
import { homeRoutes } from "@/features/core/home/routes"
import { pokedexRoutes } from "@/features/business/pokedex/routes"
import { previsaoTempoRoutes } from "@/features/business/previsao-tempo/routes"
// ... outras features

export const router = createBrowserRouter([
  // Rotas públicas (auth, etc)
  ...authRoutes,
  
  // Rotas protegidas (dentro do layout)
  {
    path: "/",
    element: (
      <AppProtectedRoute>
        <AppLayout />
      </AppProtectedRoute>
    ),
    children: [
      ...homeRoutes,
      ...themeRoutes,
      ...pokedexRoutes,
      ...previsaoTempoRoutes,
      // ... outras features
    ],
  },
  
  // Rotas de erro (404, etc)
  ...errorRoutes,
])
```

### 4. Organização de `shared/`

O `shared/` deve ser organizado por **tipo de recurso**, não por feature:

#### ❌ Evitar: Estrutura genérica como `lib/`
```
shared/
└── lib/
    ├── utils/      # Muito genérico
    ├── menu/       # O que é isso?
    └── user/       # Tipos misturados
```

#### ✅ Preferir: Estrutura específica por tipo
```
shared/
├── utils/          # Funções utilitárias puras
│   ├── cn.ts
│   ├── date.ts
│   └── string.ts
├── constants/      # Constantes globais
│   ├── menu.ts
│   └── permissions.ts
├── helpers/        # Funções auxiliares específicas
│   ├── user-helpers.ts
│   └── permission-helpers.ts
├── services/       # Serviços compartilhados
│   └── api-client.ts
├── hooks/          # Hooks compartilhados
└── components/     # Componentes compartilhados
```

**Diferença entre `utils/` e `helpers/`:**

- **`utils/`**: Funções puras, genéricas, sem dependências externas
  - Exemplo: `cn(classes)`, `formatDate(date)`, `capitalize(str)`
  
- **`helpers/`**: Funções específicas do domínio, podem ter dependências
  - Exemplo: `getUserRoles(user)`, `hasPermission(role)`, `formatUsername(user)`

### 5. Barrel Exports

Cada feature deve ter um `index.ts` que exporta sua API pública:

```typescript
// features/core/auth/index.ts
export { useAuth, useAuthorization } from "./hooks/use-auth"
export { AuthContext } from "./context/auth-context"
export type { User, AuthConfig } from "./types/auth-types"
export { AUTH_ERRORS, AUTH_EVENTS } from "./constants/auth-constants"

// NÃO exportar:
// - Componentes de página (são usados apenas pelas rotas)
// - Implementações internas
// - Services (geralmente)
```

Importação por outras features:

```typescript
// ✅ CORRETO
import { useAuth, useAuthorization } from "@/features/core/auth"

// ❌ INCORRETO
import { useAuth } from "@/features/core/auth/hooks/use-auth"
```

### 6. Convenções de Nomenclatura

| Tipo | Padrão | Exemplo |
|------|--------|---------|
| **Arquivos** | kebab-case | `user-profile-page.tsx` |
| **Componentes** | PascalCase | `UserProfilePage` |
| **Hooks** | camelCase + use* | `useUserData` |
| **Funções** | camelCase | `formatDate`, `getUserRoles` |
| **Tipos** | PascalCase | `User`, `AuthConfig` |
| **Constantes** | UPPER_SNAKE_CASE | `USER_ROLES`, `API_URL` |
| **Pages** | *-page.tsx | `users-list-page.tsx` |
| **Services** | *-service.ts | `auth-service.ts` |
| **Types** | *-types.ts | `auth-types.ts` |
| **Routes** | routes.tsx | `routes.tsx` |

## 🎯 Tarefas de Implementação

Realize as seguintes modificações na estrutura do projeto:

### 1. Reestruturar `app/`

- [ ] Mover arquivos de providers para raiz de `app/`:
  - `app/providers/app-providers.tsx` → `app/app-providers.tsx`
- [ ] Renomear e ajustar router:
  - `app/router/index.tsx` → `app/app-router.tsx`
  - Atualizar imports no `app.tsx`
- [ ] Manter `main.tsx`, `app.tsx`, `global.css` na raiz de `app/`

### 2. Separar Features em `core/` e `business/`

- [ ] Criar `features/core/` e mover features essenciais:
  - `auth/` (com nova estrutura interna)
  - `theme/` (mover de `temas/` e reorganizar)
  - `errors/`
  - `home/`
  
- [ ] Criar `features/business/` e mover features de exemplo:
  - `pokedex/` (de `exemplos/pokedex/`)
  - `previsao-tempo/` (de `exemplos/previsao-tempo/`)
  - `formularios/` (de `exemplos/formularios/`)
  - `to-do-list/` (de `exemplos/to-do-list/`)
  - `design-system/`

### 3. Reestruturar Cada Feature

Para cada feature, aplicar a estrutura padrão:

#### Feature `auth`:
- [ ] Criar `pages/` e mover de `components/`:
  - `auth-callback-page.tsx`
  - `logout-page.tsx`
  - `unauthorized-page.tsx`
- [ ] Criar `hooks/` e separar:
  - `use-auth.ts` (hook principal)
  - `use-authorization.ts` (hook de permissões)
- [ ] Criar `context/` e mover:
  - `auth-context.tsx`
- [ ] Criar `services/` e mover:
  - `auth-service.ts`
- [ ] Criar `types/` e mover:
  - `auth-types.ts`
- [ ] Criar `constants/` e extrair constantes do service (se houver)
- [ ] Criar `routes.tsx` com rotas da feature
- [ ] Atualizar `index.ts` (barrel export)

#### Feature `theme`:
- [ ] Mover de `temas/` para `features/core/theme/`
- [ ] Mover de `shared/theme/` para `features/core/theme/`
- [ ] Criar estrutura:
  - `pages/theme-settings-page.tsx` (atual `temas-page.tsx`)
  - `hooks/use-theme.ts` (mover de `shared/theme/`)
  - `context/theme-provider.tsx` (mover de `shared/theme/`)
  - `constants/theme-config.ts` (mover de `shared/theme/`)
  - `types/theme-types.ts` (mover de `shared/theme/`)
  - `routes.tsx`
  - `index.ts`

#### Features de `business/`:
- [ ] Para cada feature (pokedex, previsao-tempo, etc):
  - Criar `pages/` e mover componentes de página
  - Criar `components/` se houver componentes internos
  - Criar `services/` e mover serviços
  - Criar `types/` e mover tipos
  - Criar `routes.tsx`
  - Criar/atualizar `index.ts`

### 4. Reorganizar `shared/`

- [ ] Remover `shared/theme/` (movido para `features/core/theme/`)
- [ ] Reestruturar `shared/lib/`:
  - [ ] Criar `shared/utils/` e mover:
    - `lib/utils/cn.ts` → `utils/cn.ts`
    - Adicionar outros utils puros (date, string, number)
  - [ ] Criar `shared/constants/` e mover:
    - `lib/menu/index.ts` → `constants/menu.ts`
    - `lib/permissions/index.ts` → `constants/permissions.ts`
  - [ ] Criar `shared/helpers/` e mover:
    - `lib/user/index.ts` → `helpers/user-helpers.ts`
    - Adicionar `helpers/permission-helpers.ts` (funções de checagem)
  - [ ] Remover pasta `lib/` após migração
- [ ] Manter estrutura de `shared/components/`:
  - `ui/shadcn/` (NÃO MODIFICAR)
  - `ui/custom/`
  - `layout/`
  - `routing/`
  - `transitions/`
- [ ] Manter `shared/hooks/`
- [ ] Manter `shared/config/`
- [ ] Manter `shared/assets/`

### 5. Atualizar Sistema de Rotas

- [ ] Criar arquivo `routes.tsx` em cada feature
- [ ] Implementar sistema de rotas por feature (ver seção 3)
- [ ] Atualizar `app/app-router.tsx` para importar rotas das features
- [ ] Remover imports diretos de páginas do router

### 6. Atualizar Imports

- [ ] Atualizar todos os imports para refletir nova estrutura:
  - `@/features/auth` → `@/features/core/auth`
  - `@/features/exemplos/*` → `@/features/business/*`
  - `@/shared/lib/utils/cn` → `@/shared/utils/cn`
  - `@/shared/lib/menu` → `@/shared/constants/menu`
  - `@/shared/lib/permissions` → `@/shared/constants/permissions`
  - `@/shared/lib/user` → `@/shared/helpers/user-helpers`
  - `@/shared/theme/*` → `@/features/core/theme/*`

### 7. Atualizar Configurações

- [ ] Verificar e atualizar `tsconfig.json` se necessário (paths)
- [ ] Atualizar `.gitignore` se necessário
- [ ] Atualizar scripts em `package.json` se necessário

## ✅ Checklist de Validação

Após implementar todas as mudanças, verifique:

- [ ] ✅ Estrutura espelha a organização descrita (app, features/core, features/business, shared)
- [ ] ✅ Todas as features seguem a estrutura interna padrão (pages, components, hooks, etc)
- [ ] ✅ Separação clara entre pages e components
- [ ] ✅ Cada feature tem seu próprio `routes.tsx`
- [ ] ✅ Router principal importa rotas de features, não páginas diretamente
- [ ] ✅ `shared/` organizado por tipo de recurso (utils, constants, helpers, components, hooks)
- [ ] ✅ Não existe mais `shared/lib/` genérico
- [ ] ✅ Não existe mais `features/exemplos/` (movido para `features/business/`)
- [ ] ✅ Theme está em `features/core/theme/`, não em `shared/`
- [ ] ✅ Todos os imports foram atualizados
- [ ] ✅ Barrel exports (`index.ts`) implementados em todas as features
- [ ] ✅ Nomenclatura consistente (kebab-case para arquivos, PascalCase para componentes)
- [ ] ✅ Projeto compila sem erros (`npm run build`)
- [ ] ✅ Aplicação funciona corretamente (`npm run dev`)
- [ ] ✅ Rotas funcionam corretamente
- [ ] ✅ Autenticação funciona
- [ ] ✅ Sistema de temas funciona
- [ ] ✅ Navegação entre páginas funciona
- [ ] ✅ Proteção de rotas funciona

## 📝 Observações Importantes

1. **Preservar Funcionalidades**: Todas as funcionalidades existentes devem continuar funcionando após a reestruturação.

2. **Não Modificar shadcn/ui**: Componentes em `shared/components/ui/shadcn/` NÃO devem ser modificados.

3. **Manter Comentários**: Comentários úteis devem ser preservados durante a migração.

4. **TypeScript Strict**: Manter tipagem forte, evitar `any`.

5. **Testes**: Após cada fase de reestruturação, testar a aplicação.

6. **Commits**: Se possível, fazer commits atômicos por etapa (facilita rollback se necessário).

## 🎯 Resultado Esperado

Ao final da reestruturação, o projeto deve ter:

- ✅ **Arquitetura clara e escalável**: Separação evidente entre app, features e shared
- ✅ **Features autocontidas**: Cada feature com sua estrutura completa e rotas próprias
- ✅ **Separação core vs business**: Features essenciais separadas de exemplos/negócio
- ✅ **Shared organizado**: Recursos compartilhados organizados por tipo, não genericamente
- ✅ **Rotas descentralizadas**: Sistema de rotas por feature, não centralizado
- ✅ **Fácil navegação**: Estrutura de pastas revela o propósito à primeira vista
- ✅ **Onboarding rápido**: Novos desenvolvedores encontram código facilmente
- ✅ **Escalabilidade**: Fácil adicionar novas features sem refatoração estrutural

## 📚 Referências

Este padrão arquitetural é baseado em:

- **Feature-Sliced Design (FSD)**: Metodologia de organização por features
- **Domain-Driven Design (DDD)**: Separação por domínios de negócio
- **Bulletproof React**: Boas práticas de arquitetura React
- **Screaming Architecture**: Estrutura que comunica o propósito
- Padrões de projetos enterprise (Vercel, Next.js, Remix)

## 🔄 IMPORTANTE: Atualização do README

**APÓS CONCLUIR TODAS AS MODIFICAÇÕES ACIMA, VOCÊ DEVE ATUALIZAR O ARQUIVO `README.md` COM:**

1. **Nova estrutura de pastas**: Atualizar seção "📁 Estrutura do Projeto" com a nova organização (app, features/core, features/business, shared)

2. **Novos padrões**: Documentar:
   - Sistema de rotas por feature
   - Separação core vs business
   - Nova organização de shared (utils, constants, helpers)
   - Estrutura interna padrão de features (pages, components, hooks, etc)

3. **Como adicionar nova feature**: Atualizar seção com novo processo:
   - Decidir se é core ou business
   - Criar estrutura padrão (pages, routes.tsx, index.ts)
   - Adicionar rotas no router principal
   - Adicionar no menu

4. **Guias de migração**: Adicionar seção explicando mudanças principais:
   - `@/features/auth` → `@/features/core/auth`
   - `@/shared/lib/*` → `@/shared/utils|constants|helpers/*`
   - `@/shared/theme` → `@/features/core/theme`

5. **Exemplos atualizados**: Atualizar todos os exemplos de código com nova estrutura de imports

6. **Tabela de localização**: Adicionar tabela mostrando onde encontrar cada tipo de código:

| O que procuro | Onde encontrar |
|---------------|----------------|
| Páginas de uma feature | `features/[core\|business]/[nome]/pages/` |
| Rotas de uma feature | `features/[core\|business]/[nome]/routes.tsx` |
| Componentes reutilizáveis | `shared/components/` |
| Funções utilitárias | `shared/utils/` |
| Constantes globais | `shared/constants/` |
| Helpers de domínio | `shared/helpers/` |
| Hooks compartilhados | `shared/hooks/` |
| Configuração de auth | `features/core/auth/` |
| Sistema de temas | `features/core/theme/` |

**O README.md deve refletir EXATAMENTE a nova estrutura implementada. É a documentação viva do projeto.**
