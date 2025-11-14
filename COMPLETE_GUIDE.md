# Template React - Guia Completo

## 📚 Índice

1. [Visão Geral](#visão-geral)
2. [Design System](#design-system)
3. [Arquitetura](#arquitetura)
4. [Componentes](#componentes)
5. [Layout e Navegação](#layout-e-navegação)
6. [Autenticação e Autorização](#autenticação-e-autorização)
7. [Temas](#temas)
8. [Boas Práticas](#boas-práticas)

---

## 🎯 Visão Geral

Este template é uma base sólida para desenvolvimento de aplicações React corporativas, com foco em:

- **Design System completo** baseado em shadcn/ui
- **Autenticação robusta** com OIDC e sistema de roles
- **Layout profissional** com sidebar, header e breadcrumb dinâmico
- **Temas personalizáveis** (3 cores × 2 modos = 6 variações)
- **Arquitetura escalável** feature-based
- **TypeScript strict** para máxima type safety

---

## 🎨 Design System

### Componentes Disponíveis

O template inclui **todos** os componentes essenciais do shadcn/ui:

#### Formulários
- `Button` - Botões com 6 variantes e 4 tamanhos
- `Input` - Campos de texto
- `Textarea` - Campos de texto multilinha
- `Checkbox` - Caixas de seleção
- `Switch` - Toggle switches
- `Label` - Labels para formulários

#### Feedback
- `Alert` - Alertas e notificações
- `Badge` - Tags e labels
- `Progress` - Barras de progresso
- `Skeleton` - Loading placeholders
- `Toast` - Notificações toast (planejado)

#### Navegação
- `Breadcrumb` - Navegação hierárquica (com implementação dinâmica)
- `Tabs` - Abas de navegação
- `DropdownMenu` - Menus dropdown

#### Display
- `Card` - Containers de conteúdo
- `Avatar` - Avatares de usuário
- `Table` - Tabelas de dados
- `Separator` - Divisores visuais

#### Overlay
- `Dialog` - Modais e dialogs
- `Tooltip` - Tooltips informativos
- `AlertDialog` - Dialogs de confirmação (planejado)

### Página de Demonstração

Acesse `/design-system` para ver:
- Todos os componentes em ação
- Exemplos interativos
- Paleta de cores do tema atual
- Testes de light/dark mode

### Personalizações

Todos os componentes foram **sutilmente personalizados**:
- Transições suaves (`transition-all duration-200`)
- Hover states com feedback visual
- Active states com animação de scale
- Focus rings acessíveis
- Shadow elevado ao hover (cards, botões)

---

## 🏗️ Arquitetura

### Estrutura de Pastas

```
src/
├── components/           # Componentes reutilizáveis
│   ├── ui/              # Componentes shadcn/ui
│   └── layout/          # Componentes de layout
├── features/            # Features da aplicação
│   ├── home/
│   ├── todos/
│   ├── design-system/
│   └── auth/
├── core/                # Lógica core
│   ├── auth/           # Serviços de autenticação
│   ├── api/            # Configuração API
│   ├── constants/      # Constantes globais
│   ├── types/          # Tipos TypeScript
│   └── utils/          # Utilitários
├── contexts/           # React Contexts
├── hooks/              # Custom hooks
├── themes/             # Sistema de temas
└── router/             # Configuração de rotas
```

### Princípios

1. **Feature-based**: Cada feature é autocontida
2. **Separation of Concerns**: UI, lógica e dados separados
3. **DRY**: Sem duplicação de código
4. **Type Safety**: TypeScript strict em todo projeto
5. **Acessibilidade**: WCAG AA compliance

---

## 🧩 Componentes

### Como Usar

#### Button

```tsx
import { Button } from "./components/ui/button"

// Variantes
<Button>Default</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>

// Tamanhos
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon"><Icon /></Button>
```

#### Dialog

```tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./components/ui/dialog"

<Dialog>
  <DialogTrigger asChild>
    <Button>Abrir</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Título</DialogTitle>
      <DialogDescription>Descrição</DialogDescription>
    </DialogHeader>
    {/* Conteúdo */}
  </DialogContent>
</Dialog>
```

#### Form com Validation

```tsx
import { useState } from "react"
import { Input } from "./components/ui/input"
import { Label } from "./components/ui/label"
import { Button } from "./components/ui/button"

function MyForm() {
  const [email, setEmail] = useState("")

  return (
    <form className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="email@example.com"
        />
      </div>
      <Button type="submit">Enviar</Button>
    </form>
  )
}
```

#### Table

```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./components/ui/table"

<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Nome</TableHead>
      <TableHead>Email</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>João</TableCell>
      <TableCell>joao@example.com</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### Adicionar Novos Componentes

```bash
# Via shadcn CLI
npx shadcn@latest add [component-name]

# Ou manualmente em src/components/ui/
```

---

## 🧭 Layout e Navegação

### Estrutura do Layout

```
┌─────────────────────────────────────┐
│          Header (Fixo)              │
│  [Breadcrumb] ........ [User Menu]  │
├──────────┬──────────────────────────┤
│          │                          │
│ Sidebar  │      Main Content        │
│  (Fixo)  │       (Scroll)           │
│          │                          │
│  [Menu]  │                          │
│          │                          │
│  [Theme] │                          │
└──────────┴──────────────────────────┘
```

### Sidebar

Localização: `src/components/layout/Sidebar.tsx`

Características:
- Menu de navegação com ícones
- Item ativo destacado com cor primária
- Hover effect com translate-x
- Seletor de theme (light/dark) no rodapé
- Backdrop blur para efeito glassmorphism
- Controle de acesso baseado em roles

### Header

Localização: `src/components/layout/Header.tsx`

Características:
- Breadcrumb dinâmico
- Menu de usuário com avatar
- Dropdown com logout
- Sticky position
- Shadow suave

### Breadcrumb Dinâmico

Localização: `src/components/layout/DynamicBreadcrumb.tsx`

Funciona automaticamente baseado na rota atual:
- `/` → Não exibe (homepage)
- `/todos` → Home / Todos
- `/admin/users/123` → Home / Admin / Users / 123

Para adicionar labels customizados:

```tsx
const routeNames: Record<string, string> = {
  "todos": "Tarefas",
  "admin": "Administração",
  "users": "Usuários",
}
```

---

## 🔐 Autenticação e Autorização

### Modo de Desenvolvimento

Configure no `.env`:

```env
VITE_DEV_AUTH_BYPASS=true
VITE_DEV_MOCK_ROLES=admin,user
```

Quando `VITE_DEV_AUTH_BYPASS=true`:
- Cria automaticamente um usuário mockado
- Não requer login real
- Permite navegar em rotas protegidas

### Sistema de Roles

Roles disponíveis (configuráveis):

```tsx
// src/core/constants/roles.ts
export const USER_ROLES = {
  ADMIN: "admin",
  EDITOR: "editor",
  VIEWER: "viewer",
  USER: "user",
} as const
```

### Proteger Rotas

```tsx
// No router
{
  path: "/admin",
  element: (
    <ProtectedRoute requiredRoles={[USER_ROLES.ADMIN]}>
      <AdminPage />
    </ProtectedRoute>
  ),
}
```

### Proteger Componentes

```tsx
import { useAuthorization } from "./hooks/useAuthorization"

function MyComponent() {
  const { canAccess } = useAuthorization()

  if (!canAccess([USER_ROLES.ADMIN])) {
    return <div>Acesso negado</div>
  }

  return <div>Conteúdo admin</div>
}
```

### Menu Condicional

```tsx
const menuItems = [
  { title: "Home", url: "/" },
  { 
    title: "Admin", 
    url: "/admin",
    requiredRoles: [USER_ROLES.ADMIN] // Só exibe se user tem role
  },
]
```

---

## 🎨 Temas

### Temas Disponíveis

| Tema | Cor | Light | Dark |
|------|-----|-------|------|
| Red (Vermelho) | `#dc2626` | ✅ | ✅ |
| Orange (Laranja) | `#ea580c` | ✅ | ✅ |
| Green (Verde) | `#16a34a` | ✅ | ✅ |

### Configurar Tema Padrão

#### Via CLI (Recomendado)

```bash
npm run setup
```

Escolha interativamente o tema que será salvo no `.env`.

#### Programaticamente

```tsx
import { useTheme } from "./themes"

function ThemePicker() {
  const { theme, setThemeColor, toggleMode, setThemeMode } = useTheme()

  return (
    <div>
      {/* Trocar cor */}
      <button onClick={() => setThemeColor("red")}>Red</button>
      <button onClick={() => setThemeColor("orange")}>Orange</button>
      <button onClick={() => setThemeColor("green")}>Green</button>

      {/* Trocar modo */}
      <button onClick={toggleMode}>Toggle Light/Dark</button>
      <button onClick={() => setThemeMode("dark")}>Dark Mode</button>
      
      {/* Estado atual */}
      <p>Tema: {theme.color} - {theme.mode}</p>
    </div>
  )
}
```

### Tokens de Cor

Use sempre os tokens CSS ao invés de cores hardcoded:

```tsx
// ❌ Evitar
<div className="bg-red-600 text-white">

// ✅ Correto
<div className="bg-primary text-primary-foreground">
```

Tokens disponíveis:
- `bg-primary` / `text-primary` / `border-primary`
- `bg-secondary` / `text-secondary`
- `bg-accent` / `text-accent`
- `bg-muted` / `text-muted`
- `bg-destructive` / `text-destructive`
- `bg-card` / `text-card`
- `bg-popover` / `text-popover`

### Adicionar Novo Tema

1. Editar `src/themes/themes.ts`:

```tsx
export const themes = {
  red: { ... },
  orange: { ... },
  green: { ... },
  blue: {  // Novo
    light: {
      primary: "#2563eb",
      "primary-foreground": "#ffffff",
      // ... outras cores
    },
    dark: {
      primary: "#3b82f6",
      // ... outras cores
    }
  }
}
```

2. Atualizar `src/themes/types.ts`:

```tsx
export type ThemeColor = "red" | "orange" | "green" | "blue"
```

3. Atualizar `scripts/setup-theme.js`

---

## 💡 Boas Práticas

### ✅ Fazer

1. **Usar componentes shadcn**
   ```tsx
   import { Button } from "./components/ui/button"
   <Button>Click me</Button>
   ```

2. **Tokens de cor**
   ```tsx
   <div className="bg-primary text-primary-foreground">
   ```

3. **Transições**
   ```tsx
   <div className="transition-all duration-200 hover:scale-105">
   ```

4. **Type safety**
   ```tsx
   interface Props {
     name: string
     age: number
   }

   function Component({ name, age }: Props) { }
   ```

5. **Feature isolation**
   ```
   features/
   └── todos/
       ├── TodosPage.tsx
       ├── TodosList.tsx
       ├── types.ts
       └── hooks/
           └── useTodos.ts
   ```

### ❌ Evitar

1. **CSS inline**
   ```tsx
   ❌ <div style={{ backgroundColor: '#dc2626' }}>
   ✅ <div className="bg-primary">
   ```

2. **Cores hardcoded**
   ```tsx
   ❌ <div className="bg-red-600">
   ✅ <div className="bg-primary">
   ```

3. **HTML puro**
   ```tsx
   ❌ <button className="...">
   ✅ <Button>...</Button>
   ```

4. **Type `any`**
   ```tsx
   ❌ const data: any = {}
   ✅ const data: User = {}
   ```

5. **Mixar responsabilidades**
   ```tsx
   ❌ Feature com lógica de autenticação
   ✅ Feature usa hook useAuth()
   ```

---

## 📝 Checklist para Nova Feature

- [ ] Criar pasta em `src/features/[nome]/`
- [ ] Definir tipos em `types.ts`
- [ ] Criar componentes de página
- [ ] Adicionar rota em `src/router/index.tsx`
- [ ] Adicionar item no menu (se necessário)
- [ ] Configurar proteção de rota (roles)
- [ ] Usar componentes shadcn/ui
- [ ] Testar em light e dark mode
- [ ] Testar nos 3 temas
- [ ] Validar acessibilidade

---

## 🔗 Recursos

- [shadcn/ui Docs](https://ui.shadcn.com)
- [Tailwind CSS v4](https://tailwindcss.com)
- [React Router v7](https://reactrouter.com)
- [TanStack Query](https://tanstack.com/query)
- [Radix UI](https://www.radix-ui.com)
- [Lucide Icons](https://lucide.dev)

---

## 🎯 Próximos Passos

Após configurar o template:

1. Configurar variáveis de ambiente no `.env`
2. Executar `npm run setup` para escolher tema
3. Desenvolver suas features em `src/features/`
4. Customizar cores do tema (se necessário)
5. Adicionar novos componentes shadcn conforme necessidade
6. Configurar integração com sua API
7. Ajustar roles e permissões

---

**Versão**: 3.0.0  
**Última Atualização**: 13 de Novembro de 2024  
**Status**: Design System & Layout Completo ✅
