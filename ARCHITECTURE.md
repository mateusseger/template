# Arquitetura do Template React

## Visão Geral

Este template segue uma **arquitetura feature-based** com separação clara de responsabilidades, facilitando a escalabilidade e manutenção do projeto.

---

## Estrutura de Pastas

```
src/
├── components/           # Componentes reutilizáveis
│   ├── layout/          # Componentes de estrutura (AppLayout, Header, Sidebar)
│   └── ui/              # Componentes shadcn/ui (button, card, separator, etc.)
├── contexts/            # Contextos React globais
│   └── AuthContext.tsx  # Contexto de autenticação
├── core/                # Núcleo da aplicação (infraestrutura)
│   ├── api/            # Configuração React Query
│   ├── auth/           # Autenticação (OIDC + mock)
│   ├── constants/      # Constantes globais (roles, etc.)
│   ├── types/          # Tipos TypeScript compartilhados
│   └── utils/          # Funções utilitárias
├── features/            # Features da aplicação (feature-based)
│   ├── admin/          # Painel administrativo
│   ├── auth/           # Páginas de autenticação
│   ├── errors/         # Páginas de erro
│   ├── example/        # Página exemplo
│   ├── home/           # Página inicial
│   └── todos/          # Feature de TODO list
├── hooks/               # Custom hooks compartilhados
│   ├── useAuth.ts      # Hook de autenticação
│   └── useAuthorization.ts  # Hook de autorização
├── router/              # Configuração de rotas
│   └── index.tsx       # Definição das rotas
├── App.tsx              # Componente raiz
├── main.tsx             # Entry point
└── index.css            # Estilos globais (Tailwind)
```

---

## Camadas da Aplicação

### 1. Core (`/core`)

**Responsabilidade**: Infraestrutura central da aplicação

#### `/core/api`
- Configuração do React Query client
- Setup de queries e mutations

#### `/core/auth`
- Serviço de autenticação (OIDC)
- Mock de usuário para desenvolvimento
- Configuração OIDC

#### `/core/constants`
- `roles.ts`: Definição de roles e funções de autorização
- Outras constantes da aplicação

#### `/core/types`
- Tipos TypeScript compartilhados
- Interfaces globais (IUser, etc.)

#### `/core/utils`
- Funções utilitárias (`cn` para classes, etc.)

---

### 2. Components (`/components`)

**Responsabilidade**: Componentes reutilizáveis de UI

#### `/components/layout`
- `AppLayout.tsx`: Layout principal (sidebar + header + conteúdo)
- `Header.tsx`: Cabeçalho da aplicação
- `Sidebar.tsx`: Menu lateral com navegação
- `ProtectedRoute.tsx`: Wrapper para rotas protegidas

#### `/components/ui`
- Componentes do shadcn/ui
- Button, Card, Separator, etc.
- **Não customizar** sem necessidade

---

### 3. Features (`/features`)

**Responsabilidade**: Funcionalidades da aplicação

Cada feature deve ser **autocontida** e pode ter:
- Componentes específicos
- Tipos/interfaces
- Páginas
- Hooks customizados (se necessário)

#### Estrutura de uma feature
```
/features/minha-feature/
├── MinhaFeaturePage.tsx    # Página principal
├── components/             # Componentes específicos (opcional)
├── hooks/                  # Hooks específicos (opcional)
└── types.ts                # Tipos específicos (opcional)
```

---

### 4. Hooks (`/hooks`)

**Responsabilidade**: Custom hooks compartilhados

- `useAuth.ts`: Acesso ao contexto de autenticação
- `useAuthorization.ts`: Verificação de roles e permissões

---

### 5. Contexts (`/contexts`)

**Responsabilidade**: Contextos React globais

- `AuthContext.tsx`: Estado global de autenticação

**Regra**: Usar Context API apenas para estado verdadeiramente global. Evitar duplicar server state (usar React Query).

---

### 6. Router (`/router`)

**Responsabilidade**: Definição e configuração de rotas

- Define todas as rotas da aplicação
- Configura proteção de rotas
- Associa roles a rotas específicas

---

## Sistema de Autenticação

### Fluxo de Autenticação

1. **OIDC Real** (Produção)
   - Usuário é redirecionado para SSO
   - Após login, retorna via `/auth/callback`
   - Token é salvo no localStorage
   - Usuário acessa a aplicação

2. **Mock** (Desenvolvimento)
   - Quando `VITE_DEV_AUTH_BYPASS=true`
   - Usuário mock é criado automaticamente
   - Roles configuráveis via `VITE_DEV_MOCK_ROLES`
   - Bypass completo do fluxo OIDC

### Arquivos de Autenticação

- `core/auth/authService.ts`: Lógica de autenticação
- `core/auth/oidcConfig.ts`: Configuração OIDC
- `contexts/AuthContext.tsx`: Contexto global
- `hooks/useAuth.ts`: Hook para acesso ao contexto

---

## Sistema de Autorização (Roles)

### Definição de Roles

Arquivo: `core/constants/roles.ts`

```typescript
export const USER_ROLES = {
  ADMIN: "admin",
  EDITOR: "editor",
  VIEWER: "viewer",
  USER: "user",
} as const
```

### Hierarquia de Roles

```
ADMIN (nível 4)     → acesso total
EDITOR (nível 3)    → pode editar
VIEWER (nível 2)    → pode visualizar
USER (nível 1)      → acesso básico
```

### Funções de Autorização

```typescript
hasRole(userRoles, role)           // Tem uma role específica?
hasAnyRole(userRoles, roles)       // Tem alguma das roles?
hasAllRoles(userRoles, roles)      // Tem todas as roles?
hasMinimumRoleLevel(userRoles, minimumRole)  // Tem nível mínimo?
```

### Hook de Autorização

```typescript
const { userRoles, canAccess, hasRole } = useAuthorization()

// Verificar se pode acessar
if (canAccess([USER_ROLES.ADMIN])) {
  // Mostrar conteúdo admin
}
```

### Protegendo Rotas

```typescript
<ProtectedRoute requiredRoles={[USER_ROLES.ADMIN]}>
  <AdminPage />
</ProtectedRoute>
```

### Menu Dinâmico

O sidebar mostra apenas itens que o usuário pode acessar:

```typescript
const menuItems = [
  {
    title: "Admin",
    url: "/admin",
    requiredRoles: [USER_ROLES.ADMIN],  // Só aparece para admins
  },
]
```

---

## Fluxo de Dados

### 1. Data Fetching (React Query)

```
Componente → useQuery/useMutation
              ↓
         React Query
              ↓
         API Service
              ↓
         Backend API
```

### 2. Autenticação

```
App Init → AuthContext
             ↓
        authService.getUser()
             ↓
     DEV_AUTH_BYPASS?
      ↙         ↘
   Mock User    OIDC Flow
      ↘         ↙
      User State
```

### 3. Autorização

```
User Login → Roles carregadas
               ↓
          AuthContext
               ↓
        useAuthorization
               ↓
     Componentes/Rotas verificam roles
```

---

## Padrões de Design

### 1. Feature-based Organization

Cada feature é independente e autocontida:
- Facilita manutenção
- Permite trabalho paralelo
- Escala naturalmente

### 2. Separation of Concerns

- **Core**: Infraestrutura e lógica central
- **Components**: UI reutilizável
- **Features**: Lógica de negócio
- **Hooks**: Lógica compartilhada
- **Contexts**: Estado global

### 3. Composition over Inheritance

- Componentes funcionais
- Hooks para compartilhar lógica
- Providers para contextos

### 4. Single Responsibility

Cada módulo/componente tem uma única responsabilidade clara.

---

## Convenções de Código

### Nomenclatura

- **Componentes**: PascalCase (`HomePage.tsx`)
- **Hooks**: camelCase com prefixo `use` (`useAuth.ts`)
- **Utilitários**: camelCase (`cn.ts`)
- **Constantes**: UPPER_SNAKE_CASE (`USER_ROLES`)
- **Types**: PascalCase com prefixo `I` (`IUser`)

### Imports

Ordem de imports:
1. Bibliotecas externas (React, etc.)
2. Core/lib
3. Components
4. Hooks
5. Types
6. CSS

Exemplo:
```typescript
import { useState } from "react"           // 1. Externa
import { cn } from "../../core/utils/cn"   // 2. Core
import { Button } from "../../components/ui/button"  // 3. Component
import { useAuth } from "../../hooks/useAuth"  // 4. Hook
import type { IUser } from "../../core/types/user"  // 5. Type
```

### TypeScript

- **Sempre tipar** props, retornos e parâmetros públicos
- **Evitar `any`** - usar `unknown` com type guards
- **Interfaces** para objetos públicos
- **Types** para unions e aliases
- **Strict mode** habilitado

---

## Escalabilidade

### Adicionando Nova Feature

1. Criar pasta em `/features/<nome-feature>`
2. Criar componente de página
3. Adicionar rota em `/router/index.tsx`
4. (Opcional) Adicionar item ao menu em `Sidebar.tsx`
5. (Opcional) Definir roles necessárias

### Adicionando Nova Role

1. Adicionar em `core/constants/roles.ts`:
```typescript
export const USER_ROLES = {
  // ... existentes
  NOVA_ROLE: "nova-role",
}
```

2. Atualizar hierarquia se necessário:
```typescript
export const ROLE_HIERARCHY = {
  // ... existentes
  [USER_ROLES.NOVA_ROLE]: 5,
}
```

3. Usar nas rotas/componentes conforme necessário

### Adicionando Novo Componente shadcn/ui

```bash
npx shadcn@latest add <component-name>
```

O componente será adicionado em `/components/ui`.

---

## Performance

### Code Splitting

Rotas são carregadas sob demanda automaticamente pelo React Router.

### Memoization

Usar `React.memo` apenas quando necessário:
- Componentes pesados
- Componentes que re-renderizam frequentemente
- Componentes com props estáveis

### React Query

- Cache automático de dados
- Invalidação inteligente
- Background refetching

---

## Segurança

### Autenticação

- Tokens armazenados em localStorage
- Verificação de expiração
- Logout automático em caso de token expirado

### Autorização

- Verificação no frontend (UX)
- **SEMPRE validar no backend** (segurança real)
- Roles verificadas em cada rota protegida

### Environment Variables

- Secrets via `.env`
- Prefixo `VITE_*` para exposição ao frontend
- **Nunca** commitar `.env` com secrets reais

---

## Testing (Sugestões)

### Estrutura de Testes

```
src/
├── components/
│   └── __tests__/
├── features/
│   └── todos/
│       └── __tests__/
└── core/
    └── auth/
        └── __tests__/
```

### Ferramentas Sugeridas

- **Jest** ou **Vitest**: Test runner
- **React Testing Library**: Teste de componentes
- **MSW**: Mock de API
- **Playwright**: E2E testing

---

## CI/CD (Sugestões)

### Pipeline Básico

1. **Lint**: `npm run lint`
2. **Type Check**: `tsc --noEmit`
3. **Build**: `npm run build`
4. **Test**: `npm run test` (quando implementado)
5. **Deploy**: Deploy do diretório `/dist`

---

## Manutenibilidade

### Regras de Ouro

1. **DRY** (Don't Repeat Yourself) - Evitar duplicação
2. **KISS** (Keep It Simple, Stupid) - Simplicidade
3. **YAGNI** (You Aren't Gonna Need It) - Não adicionar antes da hora
4. **Separation of Concerns** - Responsabilidades claras
5. **Single Responsibility** - Uma coisa por vez

### Code Review

- Verificar tipagem TypeScript
- Seguir convenções de nomenclatura
- Validar separação de responsabilidades
- Garantir testes (quando implementados)
- Revisar imports e dependências

---

## Recursos

- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [React Router](https://reactrouter.com)
- [React Query](https://tanstack.com/query)
- [Tailwind CSS](https://tailwindcss.com)
- [shadcn/ui](https://ui.shadcn.com)

---

**Versão**: 2.0.0  
**Data**: 13 de Novembro de 2024  
**Status**: Revisado e Atualizado
