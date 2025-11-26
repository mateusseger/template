# Template React

> Template profissional, escalável e moderno para aplicações React corporativas com autenticação Keycloak, sistema de temas e arquitetura baseada em features.

## 🎯 Visão Geral

Este template foi projetado para iniciar rapidamente projetos frontend corporativos internos com:

- ✅ Autenticação OIDC (Keycloak) pronta para uso
- ✅ Sistema de temas multi-marca (Herval, Taqi, iPlace)
- ✅ Arquitetura escalável baseada em features
- ✅ React Query para gerenciamento de estado de servidor
- ✅ Componentes UI modernos (shadcn/ui)
- ✅ TypeScript + React 19 + Vite
- ✅ Controle de acesso baseado em roles (RBAC)

## 🚀 Quick Start

```bash
# Instalar dependências
npm install

# Configurar tema interativamente
npm run setup

# Configurar variáveis de ambiente
cp .env.example .env
# Edite .env com suas credenciais Keycloak

# Rodar em desenvolvimento
npm run dev

# Build para produção
npm run build
```

## 📦 Stack Tecnológica

| Tecnologia | Versão | Propósito |
|------------|--------|-----------|
| React | 19.2 | Framework UI |
| TypeScript | 5.9 | Tipagem estática |
| Vite | 7.2 | Build tool |
| Tanstack Query | 5.90 | Server state |
| React Router | 7.9 | Roteamento |
| Tailwind CSS | 4.1 | Estilização |
| shadcn/ui | latest | Componentes UI |
| Framer Motion | 12.23 | Animações |
| oidc-client | 1.11 | Autenticação |

## 📁 Estrutura do Projeto

```
src/
├── app/                                # Configuração global
│   ├── main.tsx                        # Entry point
│   ├── app.tsx                         # Root component
│   ├── app-providers.tsx               # Providers (Auth, Theme, Query)
│   ├── app-router.tsx                  # Router principal
│   └── global.css                      # Estilos globais
│
├── features/                           # Features por domínio
│   ├── core/                           # Features essenciais
│   │   ├── auth/                       # Autenticação OIDC + RBAC
│   │   │   ├── components/             # ProtectedRoute guard
│   │   │   ├── config/                 # Roles e permissões
│   │   │   └── utils/                  # Helpers de permissão e usuário
│   │   ├── theme/                      # Sistema de temas
│   │   └── errors/                     # Páginas de erro
│   │
│   └── business/                       # Features de negócio
│       ├── home/                       # Dashboard
│       ├── pokedex/                    # Exemplo: API externa
│       ├── previsao-tempo/             # Exemplo: API externa
│       ├── to-do-list/                 # Exemplo: CRUD completo
│       ├── formularios/                # Exemplo: Formulários
│       └── design-system/              # Showcase de componentes
│
└── shared/                             # Código compartilhado
    ├── components/                     # Componentes reutilizáveis
    │   ├── layout/                     # Layout (header, sidebar, etc)
    │   └── ui/                         # UI components (shadcn)
    │
    ├── config/                         # Configurações estáticas
    │   ├── menu.ts                     # Configuração de menu
    │   ├── project.ts                  # Metadados do projeto
    │   └── query-client.ts             # Config React Query
    │
    ├── context/                        # Contextos compartilhados
    │   └── sidebar-layout-context.tsx
    │
    ├── hooks/                          # Hooks reutilizáveis
    │   ├── use-mobile.ts
    │   └── use-sidebar-menu.ts
    │
    ├── utils/                          # Funções utilitárias puras
    │   └── cn.ts                       # Utility: className
    │
    └── assets/                         # Assets estáticos
        └── logos/
```

### 🎯 Estrutura de Feature (Colocation Pattern)

Cada feature segue o padrão de **co-location**: tudo relacionado à feature fica junto.

```
features/business/minha-feature/
├── pages/                            # Páginas (obrigatório)
│   ├── minha-feature-list-page.tsx
│   └── minha-feature-detail-page.tsx
│
├── api/                              # Integração com API (se necessário)
│   ├── minha-feature-api.ts         # Funções de API (fetch/axios)
│   ├── queries.ts                   # React Query hooks (GET)
│   ├── mutations.ts                 # React Query hooks (POST/PUT/DELETE)
│   └── index.ts                     # Barrel export
│
├── components/                       # Componentes internos (opcional)
│   └── minha-feature-card.tsx       # Usado apenas nesta feature
│
├── hooks/                            # Hooks customizados (opcional)
│   └── use-minha-feature-logic.ts   # Lógica específica da feature
│
├── types/                            # Tipos TypeScript (obrigatório se usar API)
│   └── minha-feature-types.ts
│
├── utils/                            # Utilitários específicos (opcional)
│   └── minha-feature-helpers.ts     # Funções auxiliares desta feature
│
├── config/                        # Configurações específicas (opcional)
│   └── minha-feature-config.ts   # Configurações usadas apenas nesta feature
│
├── routes.tsx                        # Rotas (obrigatório)
└── index.ts                          # Barrel export (obrigatório)
```

**Princípio de Co-location:**
- ✅ Tudo relacionado à feature fica **dentro** da pasta da feature
- ✅ Facilita entendimento, manutenção e remoção de código
- ✅ Componentes usados só aqui? Ficam em `components/`
- ✅ Hooks específicos? Ficam em `hooks/`
- ✅ Só mova para `shared/` quando **realmente** for reutilizado por múltiplas features

## 🎨 Sistema de Temas

### Temas Disponíveis

O template oferece três temas corporativos com design minimalista. Todos compartilham as mesmas cores secundárias, diferenciando-se apenas na cor primária:

| Tema | Primary | Características |
| 🔴 **Herval** | `#e10000` | Minimalista, Corporativo, Elegante |
| 🟠 **Taqi** | `#eb5c2e` | Clean, Moderno, Sofisticado |
| 🟢 **iPlace** | `#c6d30d` | Tech, Vibrante, Contemporâneo |

### Configuração

```bash
# Interativo
npm run setup

# Manual (.env)
VITE_APP_THEME=herval  # ou taqi, iplace

# Via interface
# Acesse /themes após iniciar o app
```

### Seleção de Tema

O tema pode ser configurado de três formas:

1. **Script interativo** (recomendado):
   ```bash
   npm run setup
   ```
   - Menu interativo com preview de cores
   - Atualiza automaticamente o .env
   - Valida a configuração

2. **Manual via .env**:
   ```bash
   VITE_APP_THEME=herval  # ou taqi, iplace
   ```

3. **Via interface** (apenas desenvolvimento):
   - Acesse `/themes` após iniciar o app
   - Preview visual de todos os temas
   - Alteração em tempo real

### Adicionar Novo Tema

1. Editar `src/features/core/theme/config/theme-config.ts`
2. Adicionar no script `scripts/setup-theme.js`
3. Adicionar logo em `src/shared/assets/` (opcional)

> ⚠️ **Importante:** Mantenha cores secundárias idênticas. Mude apenas `primary` e `ring`.

## 🔐 Autenticação e Autorização

### Configuração

O template usa **OIDC (OpenID Connect)** com Keycloak para autenticação:

```env
# .env - Produção
VITE_APP_AUTHORITY=https://your-keycloak.com/realms/your-realm
VITE_APP_CLIENT_ID=your-client-id
VITE_APP_RESPONSE_TYPE=code
VITE_APP_SCOPE=openid profile email roles

# .env - Desenvolvimento (opcional)
VITE_DEV_AUTH_BYPASS=true              # Pular autenticação
VITE_DEV_MOCK_ROLES=admin,user         # Roles mockadas
```

**Modo Desenvolvimento:**
- `VITE_DEV_AUTH_BYPASS=true`: Desabilita Keycloak, permite desenvolvimento sem servidor de auth
- `VITE_DEV_MOCK_ROLES`: Define roles simuladas para testes locais

### Uso em Componentes

```typescript
import { useAuth, useAuthorization, USER_ROLES } from "@/features/core/auth"

function MyComponent() {
  const { user, logout } = useAuth()
  const { hasRole, canAccess } = useAuthorization()

  if (hasRole(USER_ROLES.ADMIN)) {
    return <AdminPanel />
  }

  return <UserView />
}
```

### Proteger Rotas

```typescript
// routes.tsx
import { ProtectedRoute, USER_ROLES } from "@/features/core/auth"

export const minhaFeatureRoutes = [
    {
        path: "/admin",
        element: (
            <ProtectedRoute requiredRoles={[USER_ROLES.ADMIN]}>
                <AdminPage />
            </ProtectedRoute>
        ),
    },
]
```

**Hierarquia de Roles:**
- `ADMIN`: Acesso total (herda USER)
- `USER`: Acesso básico
- Configurável em `features/core/auth/config/permissions-config.ts`

## 🔄 React Query: Queries e Mutations

### Configuração Global

O `QueryClient` está em `shared/config/query-client.ts` e aplicado via `QueryClientProvider`.

### Estrutura Padrão

```
feature/api/
├── minha-feature-api.ts      # Funções de API (async functions)
├── queries.ts                # Hooks useQuery (GET)
├── mutations.ts              # Hooks useMutation (POST/PUT/DELETE)
└── index.ts                  # Barrel export
```

### Exemplo: Queries (GET)

```typescript
// api/minha-feature-api.ts
export async function listItems(): Promise<Item[]> {
    const res = await fetch("/api/items")
    if (!res.ok) throw new Error("Erro ao buscar items")
    return res.json()
}

// api/queries.ts
import { useQuery } from "@tanstack/react-query"
import { listItems } from "./minha-feature-api"

export function useItems() {
    return useQuery({
        queryKey: ["items"],
        queryFn: listItems,
        staleTime: 1000 * 60 * 5, // Cache 5 min
    })
}

// pages/items-page.tsx
import { useItems } from "../api"

export function ItemsPage() {
    const { data: items = [], isLoading } = useItems()

    if (isLoading) return <Skeleton />
    return <div>{items.map(item => ...)}</div>
}
```

### Exemplo: Mutations (POST/PUT/DELETE)

```typescript
// api/minha-feature-api.ts
export async function createItem(data: CreateItemDTO): Promise<Item> {
    const res = await fetch("/api/items", {
        method: "POST",
        body: JSON.stringify(data),
    })
    if (!res.ok) throw new Error("Erro ao criar item")
    return res.json()
}

// api/mutations.ts
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createItem } from "./minha-feature-api"

export function useCreateItem() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createItem,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["items"] })
        },
    })
}

// pages/create-item-page.tsx
import { useCreateItem } from "../api"

export function CreateItemPage() {
    const createMutation = useCreateItem()

    const handleSubmit = (data) => {
        createMutation.mutate(data, {
            onSuccess: () => navigate("/items"),
        })
    }

    return (
        <Button
            onClick={handleSubmit}
            disabled={createMutation.isPending}
        >
            {createMutation.isPending ? "Criando..." : "Criar"}
        </Button>
    )
}
```

### Atualização Otimista

```typescript
// api/mutations.ts
export function useDeleteItem() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteItem,

        // UI atualiza antes da resposta
        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: ["items"] })
            const previous = queryClient.getQueryData(["items"])

            queryClient.setQueryData(["items"], (old) =>
                old?.filter((item) => item.id !== id)
            )

            return { previous }
        },

        // Reverte em caso de erro
        onError: (_err, _id, context) => {
            queryClient.setQueryData(["items"], context?.previous)
        },

        // Garante sincronização
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["items"] })
        },
    })
}
```

### Exemplo Completo: To-Do List

O template inclui um exemplo completo de CRUD em `features/business/to-do-list/`:

- ✅ Queries (listar, buscar por ID)
- ✅ Mutations (criar, atualizar, deletar)
- ✅ Atualização otimista
- ✅ Loading states
- ✅ Error handling

Acesse `/exemplos/to-do-list` para ver em funcionamento!

## 🎯 Como Adicionar Nova Feature

### 1. Criar Estrutura

```bash
# Feature sem API
src/features/business/minha-feature/
├── pages/
├── routes.tsx
└── index.ts

# Feature com API
src/features/business/minha-feature/
├── pages/
├── api/
│   ├── minha-feature-api.ts
│   ├── queries.ts
│   ├── mutations.ts
│   └── index.ts
├── types/
├── routes.tsx
└── index.ts
```

### 📄 Páginas de Detalhe com Seções

Para páginas complexas, use o sistema de **Detail Sections** com navegação automática:

```typescript
import { DetailSectionsProvider } from "@/shared/components/layout/detail-sections"

export function MeuDetailPage() {
    return (
        <DetailSectionsProvider>
            {/* Sidebar terciária aparece automaticamente */}
            <Section id="overview" title="Visão Geral">
                {/* Conteúdo */}
            </Section>
            <Section id="details" title="Detalhes">
                {/* Conteúdo */}
            </Section>
        </DetailSectionsProvider>
    )
}
```

**Recursos:**
- ✅ Sidebar terciária aparece automaticamente
- ✅ Scroll suave entre seções
- ✅ Highlight da seção visível
- ✅ Navegação por clique

**Exemplos:** Veja `/exemplos/pokedex` e `/exemplos/previsao-tempo`

### 2. Criar Rotas

```typescript
// routes.tsx
import { type RouteObject } from "react-router-dom"
import { MinhaFeaturePage } from "./pages/minha-feature-page"

export const minhaFeatureRoutes: RouteObject[] = [
    {
        path: "/minha-feature",
        element: <MinhaFeaturePage />,
    },
]
```

### 3. Adicionar ao Router

```typescript
// app/app-router.tsx
import { minhaFeatureRoutes } from "@/features/business/minha-feature/routes"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AppProtectedRoute><AppLayout /></AppProtectedRoute>,
        children: [
            ...minhaFeatureRoutes, // adicionar aqui
        ],
    },
])
```

### 4. Adicionar ao Menu

```typescript
// shared/config/menu.ts
import { Layers } from "lucide-react"

export const MENU_ITEMS: MenuItem[] = [
    {
        name: "Minha Feature",
        url: "/minha-feature",
        icon: Layers,
        roles: [USER_ROLES.USER], // opcional
    },
]
```

## 📝 Padrões e Nomenclatura

### Nomenclatura de Arquivos

| Tipo | Padrão | Exemplo |
|------|--------|--------|
| Arquivos | `kebab-case` | `user-profile.ts` |
| Componentes | `PascalCase` | `UserProfile` |
| Funções/Hooks | `camelCase` | `useUserData` |
| Constantes | `UPPER_SNAKE_CASE` | `MAX_ITEMS` |
| Types/Interfaces | `PascalCase` | `UserData` |

### Comentários

Comentários devem ser em **português brasileiro**, curtos e úteis:

```typescript
// ✅ Bom: conciso e útil
// Busca pedidos por status ativo
const activeOrders = orders.filter(o => o.status === 'active')

// ❌ Evitar: óbvio demais
// Esta função filtra os pedidos
const activeOrders = orders.filter(o => o.status === 'active')
```

## 🧪 Exemplos de Features

O template inclui features de exemplo que você pode estudar ou remover:

| Feature | Path | Demonstra |
|---------|------|-----------|
| **To-Do List** | `/exemplos/to-do-list` | CRUD completo, mutations, optimistic updates |
| **Pokédex** | `/exemplos/pokedex` | API externa, paginação, queries |
| **Previsão Tempo** | `/exemplos/previsao-tempo` | Busca, queries condicionais |
| **Formulários** | `/exemplos/formularios` | Validação, submissão |
| **Design System** | `/exemplos/design-system` | Showcase de componentes |

## ✅ Checklist para Novo Projeto

- [ ] `npm install`
- [ ] `npm run setup` (configurar tema)
- [ ] Configurar `.env` com Keycloak
- [ ] Remover features de exemplo (se desnecessário)
- [ ] Ajustar logo em `shared/assets/`
- [ ] Revisar `shared/config/menu.ts`
- [ ] Configurar roles em `features/core/auth/config/permissions-config.ts`
- [ ] Testar autenticação
- [ ] `npm run build`

## 🎓 Filosofia do Template

### Princípios Arquiteturais

| Princípio | Descrição |
|-----------|-----------|
| **Feature-First** | Código organizado por domínio, não por tipo técnico |
| **Co-location** | Tudo relacionado à feature fica junto na mesma pasta |
| **Simplicidade** | Código direto e legível, sem abstrações prematuras |
| **Escalabilidade** | Fácil adicionar/remover features sem refatoração |
| **DX First** | Onboarding rápido, produtividade maximizada |

### Quando Usar

✅ **Use para:**
- Aplicações corporativas internas
- Projetos que precisam de auth Keycloak
- Múltiplos temas/marcas
- Features com APIs externas

❌ **Não use para:**
- Landing pages simples
- Projetos sem autenticação
- Apps que não precisam de React Query

## 📚 Referências

### Arquitetura
- [Feature-Sliced Design](https://feature-sliced.design/)
- [Bulletproof React](https://github.com/alan2207/bulletproof-react)

### Tecnologias
- [React Query Docs](https://tanstack.com/query/latest)
- [Shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)

## 🤝 Contribuindo

Mantenha os princípios:

1. Simplicidade e legibilidade
2. Organização por feature
3. Comentários úteis em português
4. Tipagem forte (evitar `any`)
5. Testar antes de commit

---

**Desenvolvido para acelerar o desenvolvimento de aplicações corporativas internas.**
