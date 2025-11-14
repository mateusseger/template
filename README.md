# React Template

Template moderno e completo para aplicações React corporativas com **Design System**, **Autenticação OIDC**, **Sistema de Roles** e **Temas Personalizáveis**.

## ✨ Features Principais

- 🎨 **Design System Completo** - 15+ componentes shadcn/ui prontos
- 🔐 **Autenticação & Autorização** - OIDC + Sistema de Roles
- 🌗 **Temas Dinâmicos** - 3 cores × Light/Dark = 6 variações
- 🧭 **Navegação Moderna** - Sidebar + Breadcrumb dinâmico
- ⚛️ **React 19 + TypeScript** - Type safety completa
- 🎯 **Arquitetura Escalável** - Feature-based organization
- ⚡ **Vite + Tailwind CSS 4** - Build otimizado e rápido

---

## 🚀 Quick Start

### Instalação

```bash
npm install
```

### Configuração do Tema

```bash
npm run setup  # Escolha: Red, Orange ou Green
```

### Desenvolvimento

```bash
npm run dev    # Abre em http://localhost:3000
```

### Build para Produção

```bash
npm run build
npm run preview
```

---

## 📁 Estrutura do Projeto

```
src/
├── components/
│   ├── ui/              # shadcn/ui components (15+)
│   └── layout/          # Sidebar, Header, Breadcrumb
├── features/            # Features da aplicação
│   ├── home/
│   ├── todos/           # Exemplo: TO-DO com estado local
│   ├── design-system/   # 📚 Catálogo de componentes
│   └── auth/
├── core/                # Auth, API, Utils, Types
├── themes/              # Sistema de temas (Red/Orange/Green)
├── hooks/               # useAuth, useAuthorization
└── router/              # Rotas protegidas por roles
```

---

## 🎨 Design System

### Componentes Disponíveis

**Formulários**: Button, Input, Textarea, Checkbox, Switch, Label  
**Feedback**: Alert, Badge, Progress, Skeleton, Toast  
**Navegação**: Breadcrumb, Tabs, Dropdown  
**Display**: Card, Avatar, Table, Separator  
**Overlay**: Dialog, Tooltip, AlertDialog

### Visualizar Componentes

Acesse **`/design-system`** para explorar todos os componentes de forma interativa.

---

## 🔐 Autenticação

### Modo de Desenvolvimento

Configure no `.env`:

```env
# Mock de autenticação para desenvolvimento
VITE_DEV_AUTH_BYPASS=true
VITE_DEV_MOCK_ROLES=admin,user
```

Com `VITE_DEV_AUTH_BYPASS=true`:
- ✅ Mock de usuário criado automaticamente
- ✅ Navegação livre em rotas protegidas
- ✅ Roles configuráveis via `.env`

### Sistema de Roles

```tsx
// Proteger rota
<ProtectedRoute requiredRoles={["admin"]}>
  <AdminPage />
</ProtectedRoute>

// Proteger componente
const { canAccess } = useAuthorization()
if (canAccess(["admin"])) {
  // renderizar conteúdo
}
```

---

## 🎨 Temas

### 3 Temas Corporativos

| Tema | Cor Primária | Light | Dark |
|------|--------------|-------|------|
| Red | `#dc2626` | ✅ | ✅ |
| Orange | `#ea580c` | ✅ | ✅ |
| Green | `#16a34a` | ✅ | ✅ |

### Trocar Tema

```tsx
import { useTheme } from "./themes"

const { setThemeColor, toggleMode } = useTheme()

setThemeColor("orange")  // Muda cor
toggleMode()             // Alterna light/dark
```

### Toggle Light/Dark

O seletor de tema está na **sidebar** (rodapé), com ícone de sol/lua.

---

## 🧭 Layout

### Estrutura

- **Sidebar** (esquerda): Menu de navegação + Toggle de tema
- **Header** (topo): Breadcrumb dinâmico + Menu de usuário
- **Main** (centro): Conteúdo das páginas

### Breadcrumb Dinâmico

Atualiza-se automaticamente baseado na rota:
- `/` → (não exibe)
- `/todos` → Home / Todos
- `/admin/users` → Home / Admin / Users

---

## 💡 Boas Práticas

### ✅ Fazer

```tsx
// Usar componentes shadcn
import { Button } from "./components/ui/button"
<Button>Click me</Button>

// Usar tokens de cor
<div className="bg-primary text-primary-foreground">

// Adicionar transições
<div className="transition-all duration-200 hover:scale-105">
```

### ❌ Evitar

```tsx
// CSS inline
❌ <div style={{ backgroundColor: '#dc2626' }}>
✅ <div className="bg-primary">

// Cores hardcoded
❌ <div className="bg-red-600">
✅ <div className="bg-primary">

// HTML puro
❌ <button className="...">
✅ <Button>...</Button>
```

---

## 📚 Documentação Completa

Para guia detalhado de uso, exemplos e referência completa:

- [**📖 COMPLETE_GUIDE.md**](./COMPLETE_GUIDE.md) - Guia completo
- [**🎨 DESIGN_SYSTEM.md**](./DESIGN_SYSTEM.md) - Documentação do Design System
- [**🏗️ ARCHITECTURE.md**](./ARCHITECTURE.md) - Detalhes da arquitetura

---

## 🔧 Scripts Disponíveis

```bash
npm run dev       # Desenvolvimento (localhost:3000)
npm run build     # Build de produção
npm run preview   # Preview do build
npm run lint      # Lint do código
npm run setup     # Configurar tema padrão
```

---

## 📦 Tecnologias

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS 4** - Utility-first CSS
- **shadcn/ui** - Component library
- **Radix UI** - Headless UI primitives
- **React Router 7** - Routing
- **TanStack Query** - Data fetching
- **OIDC Client** - Autenticação
- **Lucide Icons** - Icon library

---

## 🎯 Próximos Passos

1. ✅ Instalar dependências: `npm install`
2. ✅ Configurar tema: `npm run setup`
3. ✅ Configurar `.env` com suas credenciais
4. ✅ Iniciar desenvolvimento: `npm run dev`
5. ✅ Explorar `/design-system`
6. ✅ Criar suas features em `src/features/`

---

## 📄 Licença

MIT

---

**Template React v3.0** - Design System & Layout Completo ✅


```bash
npm run dev
```

Acesse `http://localhost:3000`

---

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── layout/         # Layout (Header, Sidebar, AppLayout)
│   └── ui/             # shadcn/ui components
├── contexts/           # Contextos React
├── core/               # Núcleo da aplicação
│   ├── api/           # React Query setup
│   ├── auth/          # Autenticação (OIDC + mock)
│   ├── constants/     # Constantes (roles, etc.)
│   ├── types/         # Tipos TypeScript
│   └── utils/         # Utilit ários
├── features/           # Features (feature-based)
│   ├── admin/         # Painel admin (protegido)
│   ├── auth/          # Páginas de autenticação
│   ├── errors/        # Páginas de erro
│   ├── example/       # Página exemplo
│   ├── home/          # Home page
│   └── todos/         # TODO list example
├── hooks/              # Custom hooks
│   ├── useAuth.ts     # Hook de autenticação
│   └── useAuthorization.ts  # Hook de roles
└── router/             # Configuração de rotas
```

Ver [ARCHITECTURE.md](./ARCHITECTURE.md) para detalhes completos.

---

## 🔐 Autenticação

### Modo de Produção (OIDC)

Com `VITE_DEV_AUTH_BYPASS=false`:
- Usa OIDC/SSO real
- Redireciona para provedor de autenticação
- Valida tokens
- Gerencia sessão

### Modo de Desenvolvimento (Mock)

Com `VITE_DEV_AUTH_BYPASS=true`:
- Cria usuário mock automaticamente
- Bypass completo do OIDC
- Roles configuráveis via `VITE_DEV_MOCK_ROLES`
- Ideal para desenvolvimento local

**Exemplo**: Mock com roles de admin e editor:
```env
VITE_DEV_MOCK_ROLES=admin,editor,user
```

---

## 👥 Sistema de Roles

### Roles Disponíveis

```typescript
const USER_ROLES = {
  ADMIN: "admin",      // Nível 4 - Acesso total
  EDITOR: "editor",    // Nível 3 - Pode editar
  VIEWER: "viewer",    // Nível 2 - Pode visualizar
  USER: "user",        // Nível 1 - Acesso básico
}
```

### Protegendo Rotas

```typescript
// No router
<ProtectedRoute requiredRoles={[USER_ROLES.ADMIN]}>
  <AdminPage />
</ProtectedRoute>
```

### Verificando Roles em Componentes

```typescript
import { useAuthorization } from "../hooks/useAuthorization"
import { USER_ROLES } from "../core/constants/roles"

function MyComponent() {
  const { canAccess, hasRole } = useAuthorization()

  if (canAccess([USER_ROLES.ADMIN])) {
    return <AdminContent />
  }

  return <UserContent />
}
```

### Menu Dinâmico

Itens de menu aparecem apenas se o usuário tiver as roles necessárias:

```typescript
const menuItems = [
  {
    title: "Admin",
    url: "/admin",
    requiredRoles: [USER_ROLES.ADMIN],  // Só admins veem
  },
]
```

Ver [ARCHITECTURE.md#sistema-de-autorização](./ARCHITECTURE.md#sistema-de-autorização-roles) para mais detalhes.

---

## 🎨 UI e Componentes

### shadcn/ui

Template usa shadcn/ui - componentes acessíveis baseados em Radix UI.

**Instalando novos componentes**:
```bash
npx shadcn@latest add dialog
npx shadcn@latest add input
npx shadcn@latest add form
```

Ver [shadcn/ui docs](https://ui.shadcn.com) para componentes disponíveis.

### Tailwind CSS

Estilos usando utility classes:

```tsx
<div className="flex items-center gap-4 p-6">
  <h1 className="text-3xl font-bold">Title</h1>
  <p className="text-muted-foreground">Description</p>
</div>
```

---

## 🧩 Criando uma Nova Feature

### 1. Criar estrutura

```bash
mkdir -p src/features/minha-feature
touch src/features/minha-feature/MinhaFeaturePage.tsx
```

### 2. Criar componente

```tsx
// src/features/minha-feature/MinhaFeaturePage.tsx
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card"

export function MinhaFeaturePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Minha Feature</h1>
      <Card>
        <CardHeader>
          <CardTitle>Conteúdo</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Implementação da feature...</p>
        </CardContent>
      </Card>
    </div>
  )
}
```

### 3. Adicionar rota

```tsx
// src/router/index.tsx
import { MinhaFeaturePage } from "../features/minha-feature/MinhaFeaturePage"

// Adicionar nas children:
{
  path: "/minha-feature",
  element: <MinhaFeaturePage />,
  // Opcional: proteger com roles
  // element: (
  //   <ProtectedRoute requiredRoles={[USER_ROLES.ADMIN]}>
  //     <MinhaFeaturePage />
  //   </ProtectedRoute>
  // ),
}
```

### 4. Adicionar ao menu

```tsx
// src/components/layout/Sidebar.tsx
{
  title: "Minha Feature",
  icon: IconeEscolhido,
  url: "/minha-feature",
  requiredRoles: [USER_ROLES.USER], // opcional
}
```

Ver [QUICK_START.md](./QUICK_START.md) para guia detalhado.

---

## 📚 Documentação

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Arquitetura detalhada do projeto
- **[QUICK_START.md](./QUICK_START.md)** - Guia rápido de uso
- **[MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md)** - Guia de migração Bootstrap → Tailwind
- **[.github/instructions](./.github/instructions)** - Instruções para AI assistants
- **[CHANGELOG.md](./CHANGELOG.md)** - Histórico de mudanças

---

## 🛠️ Comandos

```bash
npm run dev          # Desenvolvimento (porta 3000)
npm run build        # Build de produção
npm run lint         # ESLint
npm run preview      # Preview do build
```

---

## 🔧 Tecnologias

### Core
- React 19.2.0
- TypeScript 5.9.3
- Vite 7.2.2

### UI
- Tailwind CSS 4.1.17
- shadcn/ui (Radix UI)
- Lucide React (ícones)

### Auth & Data
- oidc-client 1.11.5
- React Query 5.90.8
- Axios 1.13.2

### Routing
- React Router DOM 7.9.5

---

## 🎯 Casos de Uso

### Desenvolvimento Local
```env
VITE_DEV_AUTH_BYPASS=true
VITE_DEV_MOCK_ROLES=admin,user
```
Desenvolva sem dependência de SSO.

### Testes de Roles
```env
VITE_DEV_MOCK_ROLES=viewer
```
Teste comportamento com roles específicas.

### Produção
```env
VITE_DEV_AUTH_BYPASS=false
```
Usa OIDC real com validação completa.

---

## ⚠️ Importante

### Segurança

- ✅ **Frontend**: Verificação de roles para UX
- ⚠️ **Backend**: SEMPRE validar roles no servidor
- ❌ Nunca confiar apenas na verificação do frontend

### Production Checklist

- [ ] `VITE_DEV_AUTH_BYPASS=false`
- [ ] Configurar variáveis de ambiente de produção
- [ ] Remover roles de desenvolvimento
- [ ] Validar autenticação OIDC
- [ ] Executar `npm run build`
- [ ] Testar em ambiente de staging

---

## 📝 Contribuindo

1. Siga as convenções do projeto (ver `.github/instructions`)
2. Mantenha a arquitetura feature-based
3. Use TypeScript strict mode
4. Siga padrões do shadcn/ui
5. Documente mudanças significativas

---

## 📄 Licença

MIT

---

## 🆘 Suporte

- 📖 Leia [ARCHITECTURE.md](./ARCHITECTURE.md) para arquitetura
- 🚀 Veja [QUICK_START.md](./QUICK_START.md) para guia rápido
- 📚 Consulte [.github/instructions](./.github/instructions) para convenções

---

**Versão**: 2.0.0  
**Última Atualização**: 13 de Novembro de 2024
