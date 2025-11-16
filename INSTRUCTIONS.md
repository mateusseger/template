# 🤖 INSTRUCTIONS.md - Guia para IAs

Este documento define regras e padrões para assistentes de IA ao trabalhar neste template React + TypeScript.

## 🚫 O QUE NÃO PODE SER MODIFICADO

### 1. Componentes shadcn/ui (`src/components/ui/`)
- **NUNCA** modifique arquivos em `src/components/ui/`
- Estes são componentes padrão do shadcn/ui
- Para customizar: criar wrappers ou usar Tailwind classes
- Para adicionar novos: usar CLI do shadcn (`npx shadcn-ui@latest add [component]`)

### 2. Internals do Vite/React/TypeScript
- Não modificar `vite.config.ts` sem motivo crítico
- Não alterar `tsconfig.json` estrutura base
- Não adicionar polyfills desnecessários

### 3. Autenticação Core
- Não mudar o fluxo OIDC em `core/auth/auth-service.ts`
- Não remover suporte a mock auth (útil para dev)
- Não simplificar extração de roles (suporta múltiplos formatos Keycloak)

## ✅ O QUE PODE SER MODIFICADO

### 1. Features (`src/features/`)
- Adicionar novas features livremente
- Remover features de exemplo (todos, devolucoes)
- Seguir estrutura: `[feature]/[feature]-page.tsx`

### 2. Temas (`src/core/theme/`)
- Adicionar novos temas em `theme-config.ts`
- Modificar cores existentes (com cuidado)
- Ajustar tokens de design

### 3. Rotas (`src/router/index.tsx`)
- Adicionar novas rotas
- Modificar estrutura de rotas
- Adicionar proteções por role

### 4. Menu (`src/core/lib/menu.ts`)
- Adicionar/remover itens
- Reorganizar estrutura
- Ajustar roles de acesso

## 📐 PADRÕES OBRIGATÓRIOS

### Nomenclatura de Arquivos

```typescript
// ✅ CORRETO
auth-service.ts
user-helpers.ts
detail-sections-provider.tsx
pedido-detail-page.tsx

// ❌ ERRADO
authService.ts
UserHelpers.ts
DetailSectionsProvider.tsx
pedidoDetailPage.tsx
```

### Nomenclatura de Código

```typescript
// ✅ CORRETO - Componentes
export function AppLayout() {}
export function DetailSectionsProvider() {}

// ✅ CORRETO - Hooks e funções
export function useAuth() {}
export function getUserRoles() {}

// ✅ CORRETO - Tipos
export type UserRole = string
export interface AuthContextType {}

// ✅ CORRETO - Constantes
export const USER_ROLES = {}
export const PUBLIC_ROUTES = []

// ❌ ERRADO - Misturado
export function appLayout() {}  // Deveria ser PascalCase
export function UseAuth() {}    // Deveria ser camelCase
export type userRole = string   // Deveria ser PascalCase
export const userRoles = {}     // Deveria ser UPPER_SNAKE_CASE
```

### Estrutura de Imports

```typescript
// 1. React e externos
import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

// 2. Internos core
import { useAuth } from "@/hooks/useAuth"
import { USER_ROLES } from "@/core/permissions"

// 3. Internos components
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

// 4. Internos features
import { TodoCard } from "@/features/todos/components/todo-card"

// 5. Relativos
import { helper } from "./helper"
import type { LocalType } from "./types"

// ❌ ERRADO - Misturado
import { Button } from "@/components/ui/button"
import { useState } from "react"  // React deveria vir primeiro
import type { User } from "./types"  // Types deveriam vir por último
```

### Comentários

```typescript
// ✅ CORRETO - Breve e útil
/**
 * Extrai roles do usuário considerando múltiplos formatos Keycloak
 */
function extractRoles(profile: UserProfile): string[] {}

// ✅ CORRETO - Seção de código
// ==================== ROLE EXTRACTION ====================

// ❌ ERRADO - Óbvio
/**
 * Retorna verdadeiro
 */
function isTrue(): boolean {
  return true
}

// ❌ ERRADO - Comentário extenso desnecessário
/**
 * Esta função recebe um usuário e verifica se ele tem a role de admin
 * através da checagem do array de roles do usuário, que é retornado
 * pela função getUserRoles que por sua vez extrai as roles do profile...
 * [10 linhas depois...]
 */
function isAdmin(user: User): boolean {
  return getUserRoles(user).includes("admin")
}
```

## 🏗️ ARQUITETURA

### Organização por Domínio

```
✅ CORRETO - Por feature
features/pedidos/
├── pedidos-list-page.tsx
├── pedido-detail-page.tsx
├── components/
│   └── pedido-card.tsx
└── types.ts

❌ ERRADO - Por tipo de arquivo
pages/
├── pedidos-list.tsx
└── pedido-detail.tsx
components/
└── pedido-card.tsx
types/
└── pedido.ts
```

### Barrel Exports

**Use apenas quando reduz fricção real:**

```typescript
// ✅ CORRETO - core/auth/index.ts
export { AuthContextProvider, useAuth } from "./auth-context"
export { login, logout, getUser } from "./auth-service"
export type { IUser, AuthContextType } from "./auth-types"

// ❌ ERRADO - Desnecessário para feature simples
// features/todos/index.ts (não criar se só tem 2 arquivos)
export { TodosPage } from "./todos-page"
```

### Responsabilidade de Arquivos

```typescript
// ✅ CORRETO - Arquivo com responsabilidade clara
// auth-service.ts: Lógica de autenticação
export function login() {}
export function logout() {}
export function getUser() {}
export function renewToken() {}

// ❌ ERRADO - Arquivo fazendo tudo
// utils.ts: 50 funções diferentes sem relação
export function login() {}
export function formatDate() {}
export function calculateTax() {}
export function sendEmail() {}
```

## 🎯 COMO ADICIONAR FEATURES

### 1. Criar Estrutura

```bash
features/pedidos/
├── pedidos-list-page.tsx       # Página de listagem
├── pedido-detail-page.tsx      # Página de detalhe
├── components/
│   ├── pedido-card.tsx         # Card do pedido
│   └── pedido-form.tsx         # Formulário
└── types.ts                    # Tipos específicos (opcional)
```

### 2. Adicionar Rota

```typescript
// router/index.tsx
{
  path: "/pedidos",
  element: <PedidosListPage />,
},
{
  path: "/pedidos/:id",
  element: <PedidoDetailPage />,
  handle: {
    detailSectionsEnabled: true,
  },
},
```

### 3. Adicionar ao Menu

```typescript
// core/lib/menu.ts
{
  name: "Pedidos",
  url: "/pedidos",
  icon: ShoppingCart,
  description: "Gerenciamento de pedidos",
}
```

### 4. (Opcional) Proteger por Role

```typescript
// router/index.tsx
{
  path: "/pedidos",
  element: (
    <AppProtectedRoute requiredRoles={[USER_ROLES.EDITOR]}>
      <PedidosListPage />
    </AppProtectedRoute>
  ),
}
```

## 🔐 TRABALHANDO COM AUTENTICAÇÃO

### Obter Usuário e Roles

```typescript
// ✅ CORRETO
import { useAuth } from "@/hooks/useAuth"
import { getUserRoles } from "@/core/lib/user-helpers"

function MyComponent() {
  const { user, isAuthenticated } = useAuth()
  const roles = getUserRoles(user)
  
  return <div>{user?.name}</div>
}

// ❌ ERRADO - Acessar diretamente
import { AuthContext } from "@/core/auth"
function MyComponent() {
  const user = AuthContext.user  // Não funciona
}
```

### Checar Permissões

```typescript
// ✅ CORRETO - Hook de autorização
import { useAuthorization } from "@/hooks/useAuthorization"

function MyComponent() {
  const { hasRole, canAccess } = useAuthorization()
  
  if (hasRole(USER_ROLES.ADMIN)) {
    return <AdminPanel />
  }
}

// ✅ CORRETO - Função direta
import { getUserRoles } from "@/core/lib/user-helpers"
import { hasAnyRole } from "@/core/permissions"

const roles = getUserRoles(user)
if (hasAnyRole(roles, [USER_ROLES.ADMIN, USER_ROLES.EDITOR])) {
  // ...
}

// ❌ ERRADO - Lógica inline duplicada
if (user.userRoles && user.userRoles.includes("admin")) {
  // Usar funções helpers
}
```

## 🎨 TRABALHANDO COM TEMAS

### Adicionar Novo Tema

```typescript
// 1. core/theme/theme-config.ts
export type ThemeName = "herval" | "taqi" | "iplace" | "novo-tema"

export const THEMES: Record<ThemeName, Theme> = {
  "novo-tema": {
    light: { /* ... */ },
    dark: { /* ... */ }
  }
}

// 2. scripts/setup-theme.js
const themes = {
  "novo-tema": {
    name: "Novo Tema",
    color: "novo-tema",
    primary: "#COLOR"
  }
}

// 3. .env
VITE_APP_THEME=novo-tema
```

### Usar Tema em Componente

```typescript
// ✅ CORRETO
import { useTheme } from "@/core/theme"

function MyComponent() {
  const { theme, setThemeMode, toggleMode } = useTheme()
  
  return (
    <button onClick={toggleMode}>
      Toggle {theme.mode}
    </button>
  )
}

// ❌ ERRADO - Manipular CSS direto
function MyComponent() {
  const toggleDark = () => {
    document.body.classList.toggle("dark")  // Usar useTheme
  }
}
```

## 📐 DETAIL SECTIONS

### Estrutura Completa

```typescript
// 1. Configurar rota
{
  path: "/items/:id",
  element: <ItemDetailPage />,
  handle: {
    detailSectionsEnabled: true,
    breadcrumbLabel: (params) => `Item ${params.id}`,
  },
}

// 2. Criar página com seções
import { Section } from "@/components/layout/detail-sections"

export function ItemDetailPage() {
  return (
    <div className="space-y-6">
      <Section id="info" label="Informações" icon={Info}>
        <Section.Header id="info" label="Informações" icon={Info} />
        {/* Conteúdo */}
      </Section>
      
      <Section id="details" label="Detalhes" icon={FileText}>
        <Section.Header id="details" label="Detalhes" icon={FileText} />
        {/* Conteúdo */}
      </Section>
    </div>
  )
}
```

## 🐛 TRATAMENTO DE ERROS

### Padrão de Erro Simples

```typescript
// ✅ CORRETO - Log + fallback discreto
try {
  await riskyOperation()
} catch (error) {
  console.error("[Component] Error:", error)
  return <ErrorMessage />
}

// ❌ ERRADO - Ignorar erro
try {
  await riskyOperation()
} catch (error) {
  // nada
}

// ❌ ERRADO - Crash da aplicação
try {
  await riskyOperation()
} catch (error) {
  throw error  // Evitar throw sem tratamento
}
```

## 📦 DEPENDÊNCIAS

### Adicionar Nova Dependência

**Pergunte primeiro:**
1. É realmente necessária?
2. Existe alternativa nativa ou já instalada?
3. Está mantida ativamente?
4. Tem bom tamanho de bundle?

```bash
# ✅ CORRETO - Necessidade real
npm install date-fns  # Se precisar manipulação de datas complexa

# ❌ ERRADO - Desnecessário
npm install lodash  # JavaScript nativo já resolve
npm install moment  # date-fns é menor e melhor
```

## ✅ CHECKLIST ANTES DE COMMITAR

- [ ] Código segue nomenclatura kebab-case para arquivos
- [ ] Componentes em PascalCase, funções em camelCase
- [ ] Imports organizados (externos → internos → relativos)
- [ ] Sem arquivos `.old` ou código morto
- [ ] Comentários em português (quando necessários)
- [ ] TypeScript sem erros (`npx tsc --noEmit`)
- [ ] ESLint sem erros (`npm run lint`)
- [ ] Build funciona (`npm run build`)
- [ ] Testado manualmente no navegador

## 💡 SUGESTÕES DE MELHORIAS

Ao sugerir melhorias:

### ✅ BOM
- "Consolidar funções duplicadas em user-helpers.ts"
- "Adicionar loading state em PedidosListPage"
- "Extrair PedidoCard para component reutilizável"

### ❌ RUIM
- "Reescrever tudo com Zustand" (over-engineering)
- "Criar factory pattern para components" (abstração desnecessária)
- "Adicionar Redux" (React Query já gerencia server state)

## 🎓 PRINCÍPIOS

1. **Simplicidade > Complexidade**
2. **Código direto > Abstrações prematuras**
3. **Convenção > Configuração**
4. **Escalável ≠ Complexo**
5. **Se funciona e é simples, não complique**

---

**LEMBRE-SE:** O objetivo deste template é ser **fácil de entender e manter**, não impressionar com padrões avançados.
