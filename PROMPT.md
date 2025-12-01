# 🎨 PROMPT DE REFATORAÇÃO: React Template UI/UX

## 📋 Objetivo

Refatorar **todas as páginas visuais** das features implementadas no `react-template`, modernizando a interface, melhorando a experiência do usuário e garantindo **consistência de design** em todo o projeto.

---

## 🎯 Princípios Fundamentais

### 1. **Mobile-First**
- Toda interface deve ser projetada **primeiro para mobile**
- Breakpoints progressivos: `sm` (640px) → `md` (768px) → `lg` (1024px) → `xl` (1280px)
- Use hooks utilitários: `useMobile()` e `useBreakpoint()` da lib `@herval/react-core`
- Garanta que todos os elementos sejam tocáveis (min 44x44px)
- Evite hover-only interactions sem alternativa mobile

### 2. **Código Limpo e Profissional**
- Componentes bem estruturados e com responsabilidade única
- Nomenclatura clara e consistente (PascalCase para componentes, camelCase para funções)
- Evite duplicação de código
- Use TypeScript de forma rigorosa
- Comentários apenas quando necessário para explicar lógica complexa
- Prefira composição sobre configuração

### 3. **Tailwind CSS e Componentes shadcn/ui**
- **SEMPRE** use classes Tailwind para estilização
- **SEMPRE** use componentes da lib `@herval/react-core` quando disponíveis
- Componentes disponíveis: Button, Card, Input, Badge, Alert, Dialog, Sheet, Tabs, Select, Checkbox, Switch, Progress, Skeleton, Separator, Avatar, Table, Tooltip, Popover, Drawer, Calendar, e mais
- Use o utilitário `cn()` para combinar classes condicionalmente
- Respeite as variáveis CSS do tema (ex: `bg-primary`, `text-foreground`, `border-border`)

### 4. **Consistência de Design**
- Todas as páginas devem compartilhar o **mesmo padrão visual**
- **Estrutura padrão de página:**
  ```tsx
  <div className="space-y-6">
    {/* Header com ícone, título e descrição */}
    <div>
      <div className="flex items-center gap-3 mb-2">
        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <IconComponent className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Título da Página</h1>
          <p className="text-muted-foreground">Descrição concisa</p>
        </div>
      </div>
    </div>
    
    {/* Cards de estatísticas (se aplicável) */}
    {/* Conteúdo principal em Cards */}
  </div>
  ```
- **Paleta de cores consistente:**
  - Primária: `primary` (definida pelo tema ativo)
  - Fundo: `background`, `card`, `muted`
  - Texto: `foreground`, `muted-foreground`
  - Bordas: `border`
  - Destrutivo: `destructive`
- **Espaçamentos padronizados:**
  - Entre seções: `space-y-6` ou `space-y-8`
  - Dentro de Cards: `p-4`, `p-6`, `p-8`
  - Grid gaps: `gap-4`, `gap-6`

### 5. **Visual Moderno e Agradável**
- Design clean e minimalista
- Uso moderado de sombras: `shadow-sm`, `shadow-md`, `shadow-lg`
- Bordas arredondadas consistentes: `rounded-lg`, `rounded-xl`
- Hierarquia visual clara com tamanhos de fonte apropriados
- Microinterações sutis (hover, focus, active states)
- Feedbacks visuais imediatos (loading, success, error)

### 6. **Transições e Animações**
- **Evite poluição visual** com animações excessivas
- Use Framer Motion **apenas** quando agregar valor real
- Animações sutis e rápidas (150-300ms)
- Prefira `transition-all duration-200` do Tailwind para transições simples
- Exemplo de uso aceitável:
  ```tsx
  // Entrada/saída de listas
  <AnimatePresence mode="popLayout">
    {items.map((item) => (
      <motion.div
        key={item.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
      >
        {/* Conteúdo */}
      </motion.div>
    ))}
  </AnimatePresence>
  ```

### 7. **Detail Sections (Páginas de Detalhe)**
- Páginas de detalhe **DEVEM** usar o sistema de seções navegáveis
- **Estrutura obrigatória:**
  ```tsx
  import { Section } from "@herval/react-core"
  
  <div className="space-y-6">
    {/* Header da página */}
    
    <Section id="secao-1" label="Seção 1" icon={IconComponent}>
      <Section.Header id="secao-1" label="Seção 1" icon={IconComponent} />
      <Card>{/* Conteúdo */}</Card>
    </Section>
    
    <Section id="secao-2" label="Seção 2" icon={IconComponent2}>
      <Section.Header id="secao-2" label="Seção 2" icon={IconComponent2} />
      <Card>{/* Conteúdo */}</Card>
    </Section>
  </div>
  ```
- A sidebar terciária aparece **automaticamente** quando há seções
- IDs devem ser únicos e descritivos (kebab-case)
- Labels devem ser claros e concisos
- Ícones devem ser do `lucide-react` e relacionados ao conteúdo

### 8. **UI/UX de Excelência**
- **Hierarquia Visual:** Títulos, subtítulos e corpo de texto claramente diferenciados
- **Whitespace:** Respire! Use espaçamentos generosos
- **Contrast Ratio:** Garanta legibilidade (WCAG AA minimum)
- **Touch Targets:** Botões e links com tamanho mínimo de 44x44px
- **Loading States:** Sempre mostre feedback durante carregamentos (Skeleton, Spinner)
- **Empty States:** Trate casos onde não há dados de forma elegante
- **Error States:** Mensagens de erro claras e acionáveis
- **Success Feedback:** Toast ou Alert para ações bem-sucedidas
- **Responsive Images:** Use `object-contain`, `object-cover` apropriadamente
- **Acessibilidade:** Labels em inputs, ARIA quando necessário, navegação por teclado

---

## 📁 Features a Refatorar

### 1. **Home Page** (`/`) - **PRIORIDADE MÁXIMA** ⚠️

**Contexto:** A Home é o ponto de entrada do template. Atualmente possui um Onboarding **desatualizado** que não reflete mais a estrutura atual do projeto. Desde que o `react-template` passou a utilizar o `react-core` (lib centralizada), o conteúdo ficou depreciado.

**Tarefas:**

1. **Atualizar Onboarding Completo:**
   - **Remover** conteúdo obsoleto sobre estrutura antiga
   - **Adicionar** explicação sobre a lib `@herval/react-core`
   - **Explicar** a arquitetura atual: como o `react-template` consome o `react-core`
   - **Detalhar** features centralizadas no core:
     - Autenticação (OIDC)
     - Sistema de Temas
     - Tratamento de Erros
     - Layout (AppLayout, Sidebar, Header)
     - Componentes UI (shadcn/ui exportados)
     - Hooks utilitários
   - **Basear-se no README.md** do `react-core` (em `react-core/README.md`)

2. **Reestruturar Organização:**
   - **Seções claras e objetivas:**
     - Hero: Bem-vindo + CTAs principais
     - O que é o Template: Propósito e público-alvo
     - Arquitetura: Feature-First + react-core
     - Stack Tecnológica: React 19, TS, Vite, TanStack Query, etc.
     - Features Disponíveis: Auth, Temas, Layout, UI Components
     - Exemplos Práticos: Links para features de exemplo
     - Quick Start: Como começar a desenvolver
     - Adicionando Nova Feature: Guia passo a passo

3. **Facilitar Entendimento:**
   - **Linguagem simples e direta**
   - **Exemplos visuais:** Use Cards, Badges, ícones ilustrativos
   - **Code Snippets:** Mostre exemplos práticos de código
   - **Links de navegação:** Facilite o acesso às features de exemplo
   - **Informações progressivas:** Do básico ao avançado

4. **Design Renovado:**
   - Layout moderno e convidativo
   - Hero section impactante
   - Cards informativos e bem organizados
   - Grid responsivo para exemplos de features
   - Breadcrumb trail visual da arquitetura

**Referências importantes:**
- Ler `react-core/README.md` para entender todas as features
- Manter links para: `/design-system`, `/temas`, `/pokedex`, `/to-do-list`, `/previsao-tempo`, `/formularios`

---

### 2. **Design System Page** (`/design-system`)

**Objetivo:** Showcase interativo de todos os componentes UI disponíveis da lib `@herval/react-core`.

**Estrutura Atual:** Tabs com múltiplas seções de componentes.

**Melhorias:**
- **Organização:** Agrupar componentes por categoria (Form, Feedback, Overlay, Data Display, Layout)
- **Demonstração:** Cada componente deve ter:
  - Preview interativo
  - Props principais destacadas
  - Variantes visíveis (default, outline, ghost, destructive, etc.)
  - Code snippet com exemplo de uso
- **Busca/Filtro:** Permitir buscar componentes por nome
- **Modo Escuro:** Garantir que todos os exemplos funcionem em dark mode
- **Mobile:** Cards empilhados, tabs rolantes

**Componentes a mostrar:**
- **Form:** Button, Input, Textarea, Select, Checkbox, Switch, Label
- **Feedback:** Alert, Badge, Progress, Skeleton, Spinner, Toast (Sonner)
- **Overlay:** Dialog, Sheet, Popover, Tooltip, DropdownMenu, Drawer
- **Data Display:** Card, Table, Avatar, Separator, Tabs
- **Layout:** ScrollArea, AspectRatio

---

### 3. **Temas Page** (`/temas`)

**Objetivo:** Permitir que o usuário escolha o tema visual (Herval, Taqi, iPlace) e o modo (light/dark).

**Estrutura Atual:** Seletor de tema + toggle dark mode + paleta de cores.

**Melhorias:**
- **Visual:** Cards grandes e clicáveis para cada tema, com preview da cor primária
- **Feedback Visual:** Mostrar logo do tema ativo, badge "Ativo", transição suave
- **Preview em Tempo Real:** Ao clicar em um tema, aplicar imediatamente
- **Informações Técnicas:** Mostrar variáveis CSS, código hex da primary color
- **Guia para Devs:** Como adicionar um novo tema (referência ao core)
- **Mobile:** Grid empilhado, cards responsivos

**Dados:**
- Temas: Herval (Vermelho), Taqi (Laranja), iPlace (Verde-limão)
- Logos em: `@herval/react-core/assets/logos`
- Config em: `react-core/src/features/themes/config/themes-config.ts`

---

### 4. **To-Do List Page** (`/to-do-list`)

**Objetivo:** CRUD completo de tarefas com React Query, demonstrando mutations e optimistic updates.

**Estrutura Atual:** Input para adicionar, lista com filtros (todas/ativas/concluídas), cards de estatísticas.

**Melhorias:**
- **Cards de Estatísticas:** Total, Ativas, Concluídas (ícones coloridos)
- **Input de Adicionar:** Destaque visual, ícone de ação, feedback ao pressionar Enter
- **Lista de Tarefas:**
  - Animação de entrada/saída (Framer Motion)
  - Checkbox visual para completar
  - Botão de deletar visível no hover (desktop) ou sempre visível (mobile)
  - Linha riscada quando completa
  - Badge de status
- **Filtros:** Tabs para alternar entre "Todas", "Ativas", "Concluídas"
- **Empty State:** Quando não há tarefas, mostrar mensagem amigável com ícone
- **Loading:** Skeleton durante carregamento inicial
- **Feedback:** Toast ao adicionar/completar/deletar
- **Mobile:** Lista empilhada, botões maiores

---

### 5. **Pokédex Pages** (`/pokedex`)

#### **5.1. Pokédex List Page** (`/pokedex`)

**Objetivo:** Listagem de Pokémons com busca e paginação.

**Estrutura Atual:** Input de busca, grid de cards de Pokémon, paginação.

**Melhorias:**
- **Busca:** Input com ícone, loading state, botão "Buscar"
- **Grid Responsivo:** 2 cols mobile, 3 cols tablet, 4 cols desktop
- **Cards de Pokémon:**
  - Imagem centralizada com fundo degradê sutil
  - Nome capitalizado
  - Número formatado (#001, #025)
  - Hover effect: elevação e escala da imagem
  - Skeleton durante loading
- **Paginação:** Botões "Anterior" e "Próxima", indicador de página
- **Empty State:** Se busca não retornar resultados
- **Cidades Populares:** Seção com Pokémons populares (Pikachu, Charizard, etc.)

#### **5.2. Pokédex Detail Page** (`/pokedex/:id`)

**Objetivo:** Detalhes completos de um Pokémon com seções navegáveis.

**Estrutura Atual:** Seções: Info Básica, Habilidades, Estatísticas, Galeria.

**Melhorias:**
- **Header:** Botão voltar, nome capitalizado, número, badges de tipo
- **Seções obrigatórias com `<Section>`:**
  1. **Informações Básicas** (Info):
     - Grid 2 colunas: Imagem grande | Características (Altura, Peso, Tipos)
  2. **Habilidades** (Zap):
     - Grid de cards com nome, slot, badge "Oculta"
  3. **Estatísticas** (Award):
     - Lista de stats com Progress bar visual
     - Total de stats destacado
  4. **Galeria** (ImageIcon):
     - Grid de sprites (front, shiny, official artwork)
- **Cores dos Tipos:** Cada tipo tem cor específica (fire: vermelho, water: azul, etc.)
- **Loading:** `DetailPageSkeleton` durante carregamento
- **Error:** Mensagem amigável se Pokémon não for encontrado

---

### 6. **Previsão do Tempo Pages** (`/previsao-tempo`)

#### **6.1. Previsão Tempo List Page** (`/previsao-tempo`)

**Objetivo:** Busca de cidades e seleção para ver previsão.

**Estrutura Atual:** Input de busca, resultados da busca, cidades populares.

**Melhorias:**
- **Busca:** Input com ícone de lupa, loading spinner, debounce
- **Cards de Cidade:**
  - Ícone de localização
  - Nome da cidade + estado + país
  - Hover effect: elevação e sombra
  - Link para página de detalhe
- **Cidades Populares:** Grid com principais cidades brasileiras
- **Empty State:** Se busca não retornar resultados
- **Mobile:** Cards empilhados, input full-width

#### **6.2. Previsão Tempo Detail Page** (`/previsao-tempo/:coords`)

**Objetivo:** Previsão completa do tempo com seções navegáveis.

**Estrutura Atual:** Seções: Clima Atual, Previsão Semanal, Previsão Horária, Precipitação.

**Melhorias:**
- **Header:** Botão voltar, nome da cidade, horário de atualização
- **Seções obrigatórias com `<Section>`:**
  1. **Clima Atual** (Info):
     - Card grande com emoji do clima, temperatura, descrição
     - Card lateral com vento e direção
  2. **Próximos 7 Dias** (Calendar):
     - Lista de dias com emoji, descrição, temp max/min
     - Hover effect nas linhas
  3. **Próximas 24 Horas** (Clock):
     - Grid de cards pequenos com hora, emoji, temperatura, precipitação
  4. **Precipitação** (CloudRain):
     - Barras de progresso para cada dia
     - Volume em mm
- **Emojis de Clima:** ☀️ 🌤️ ⛅ 🌥️ ☁️ 🌦️ 🌧️ ⛈️ 🌩️ ❄️
- **Loading:** `DetailPageSkeleton`
- **Error:** Mensagem se coordenadas inválidas

---

### 7. **Formulários Page** (`/formularios`)

**Objetivo:** Demonstrar validação de formulários com React Hook Form + Zod.

**Estrutura Atual:** Tabs com "Formulário Completo" e "Login Simples".

**Melhorias:**
- **Cards de Estatísticas:** React Hook Form, Zod Schema, UX Fluida
- **Tabs:** Formulário Completo | Login Simples
- **Formulário Completo:**
  - Labels com ícones
  - Inputs com ícones inline
  - Mensagens de erro em vermelho abaixo dos campos
  - Skills como badges clicáveis
  - Notificações como checkboxes agrupados
  - Botões: "Cadastrar" (primary) | "Limpar" (outline)
  - Success Alert ao enviar
- **Login Simples:**
  - Card centralizado (max-w-md)
  - Email + Senha + Checkbox "Lembrar"
  - Botão "Entrar" full-width
  - Success Alert ao enviar
- **Info Cards:** Mostrar validações implementadas
- **Code Examples:** Snippets de código de como usar
- **Mobile:** Inputs empilhados, botões full-width

---

## 🧩 Componentes e Utilitários Disponíveis

### Componentes de Layout (de `@herval/react-core`)
```tsx
import {
  AppLayout,          // Layout principal com sidebar e header
  Section,            // Sistema de seções navegáveis
  DetailPageSkeleton, // Skeleton para páginas de detalhe
} from "@herval/react-core"
```

### Componentes UI (de `@herval/react-core`)
```tsx
import {
  // Form
  Button, Input, Textarea, Select, Checkbox, Switch, Label,
  SelectContent, SelectItem, SelectTrigger, SelectValue,
  
  // Feedback
  Alert, AlertTitle, AlertDescription, Badge, Progress, 
  Skeleton, Spinner,
  
  // Overlay
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription,
  DialogFooter, DialogTrigger,
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
  SheetFooter, SheetTrigger, SheetClose,
  Popover, PopoverContent, PopoverTrigger,
  Tooltip, TooltipContent, TooltipTrigger, TooltipProvider,
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, 
  DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger,
  Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription,
  DrawerFooter, DrawerTrigger, DrawerClose,
  
  // Data Display
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
  Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableCaption,
  Avatar, AvatarImage, AvatarFallback,
  Separator,
  Tabs, TabsList, TabsTrigger, TabsContent,
  
  // Layout
  ScrollArea,
  Calendar,
} from "@herval/react-core"
```

### Hooks (de `@herval/react-core`)
```tsx
import {
  useAuth,       // { user, logout, isAuthenticated }
  useTheme,      // { theme, setThemeName, setThemeMode, toggleMode }
  useMobile,     // boolean - true se < md (768px)
  useBreakpoint, // (breakpoint: "sm"|"md"|"lg"|"xl"|"2xl") => boolean
} from "@herval/react-core"
```

### Utilitários (de `@herval/react-core`)
```tsx
import { cn } from "@herval/react-core" // Combina classes Tailwind

// Uso:
<div className={cn("base-class", condition && "conditional-class")} />
```

### Ícones (de `lucide-react`)
```tsx
import {
  Home, User, Settings, // Navegação
  Search, Filter, X,    // Ações
  Check, AlertCircle, Info, XCircle, // Status
  Plus, Minus, Edit, Trash2,         // CRUD
  ArrowLeft, ArrowRight, ChevronDown, // Direções
  Moon, Sun, Palette,                // Tema
  // ... e muitos outros
} from "lucide-react"
```

---

## 📐 Padrões de Código

### Estrutura de Página Padrão
```tsx
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@herval/react-core"
import { IconName } from "lucide-react"

export function MinhaPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <IconName className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Título</h1>
            <p className="text-muted-foreground">Descrição</p>
          </div>
        </div>
      </div>

      {/* Stats Cards (opcional) */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>{/* Stat 1 */}</Card>
        <Card>{/* Stat 2 */}</Card>
        <Card>{/* Stat 3 */}</Card>
      </div>

      {/* Conteúdo Principal */}
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>{/* Content */}</CardContent>
      </Card>
    </div>
  )
}
```

### Estrutura de Página de Detalhe
```tsx
import { Section, DetailPageSkeleton } from "@herval/react-core"
import { Info, Award, Image } from "lucide-react"

export function MinhaDetailPage() {
  const { data, isLoading } = useQuery(...)

  if (isLoading) return <DetailPageSkeleton />

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/voltar">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{data.title}</h1>
            <p className="text-muted-foreground">{data.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Seção 1 */}
      <Section id="info" label="Informações" icon={Info}>
        <Section.Header id="info" label="Informações" icon={Info} />
        <Card>{/* Content */}</Card>
      </Section>

      {/* Seção 2 */}
      <Section id="stats" label="Estatísticas" icon={Award}>
        <Section.Header id="stats" label="Estatísticas" icon={Award} />
        <Card>{/* Content */}</Card>
      </Section>
    </div>
  )
}
```

### Loading States
```tsx
// Lista de Cards
{isLoading ? (
  <div className="grid gap-4 md:grid-cols-3">
    {Array.from({ length: 6 }).map((_, i) => (
      <Card key={i}>
        <CardContent className="p-6">
          <Skeleton className="h-32 w-full mb-4" />
          <Skeleton className="h-6 w-3/4 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </CardContent>
      </Card>
    ))}
  </div>
) : (
  <div className="grid gap-4 md:grid-cols-3">
    {items.map((item) => (
      <Card key={item.id}>{/* Content */}</Card>
    ))}
  </div>
)}
```

### Empty States
```tsx
{items.length === 0 && (
  <Card className="p-12">
    <div className="text-center space-y-3">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
        <IconName className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="font-semibold text-lg">Nenhum item encontrado</h3>
      <p className="text-sm text-muted-foreground max-w-md mx-auto">
        Descrição do que fazer
      </p>
      <Button onClick={action}>Ação</Button>
    </div>
  </Card>
)}
```

### Error States
```tsx
{error && (
  <Alert variant="destructive">
    <XCircle className="h-4 w-4" />
    <AlertTitle>Erro</AlertTitle>
    <AlertDescription>{error.message}</AlertDescription>
  </Alert>
)}
```

### Grid Responsivo
```tsx
// 1 col mobile, 2 cols tablet, 3 cols desktop, 4 cols wide
<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {items.map((item) => (
    <Card key={item.id}>{/* Content */}</Card>
  ))}
</div>
```

### Hover Effects
```tsx
<Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer group">
  <CardContent>
    <img className="group-hover:scale-110 transition-transform duration-200" />
  </CardContent>
</Card>
```

---

## ✅ Checklist de Refatoração

Para cada página, certifique-se de:

- [ ] **Mobile-First:** Design funciona perfeitamente em mobile (375px)
- [ ] **Consistência:** Segue o padrão de layout definido
- [ ] **Componentes:** Usa apenas componentes de `@herval/react-core`
- [ ] **Tailwind:** 100% estilização com Tailwind CSS
- [ ] **TypeScript:** Tipagem rigorosa, sem `any`
- [ ] **Loading:** Skeleton ou Spinner durante carregamentos
- [ ] **Empty State:** Tratamento quando não há dados
- [ ] **Error State:** Tratamento de erros amigável
- [ ] **Responsivo:** Grid/Flex adapta-se a todos os breakpoints
- [ ] **Acessibilidade:** Labels, ARIA, navegação por teclado
- [ ] **Detail Sections:** Páginas de detalhe usam `<Section>`
- [ ] **Ícones:** Ícones de `lucide-react` consistentes
- [ ] **Espaçamento:** `space-y-6` ou `space-y-8` entre seções
- [ ] **Cards:** Uso de `Card` para agrupar conteúdo
- [ ] **Hierarquia:** Títulos, subtítulos e corpo claramente diferenciados
- [ ] **Feedback:** Toast/Alert para ações (sucesso, erro)
- [ ] **Animações:** Sutis e não excessivas
- [ ] **Código Limpo:** Sem duplicação, bem organizado
- [ ] **Comentários:** Apenas quando necessário

---

## 🎓 Referências

### Documentação
- **React Core README:** `react-core/README.md`
- **Tailwind CSS:** https://tailwindcss.com/docs
- **shadcn/ui:** https://ui.shadcn.com
- **Lucide Icons:** https://lucide.dev
- **Framer Motion:** https://www.framer.com/motion

### Arquitetura
- **Feature-First:** Código organizado por domínio de negócio
- **Co-location:** Tudo relacionado a uma feature fica junto
- **Separation of Concerns:** UI separada de lógica de negócio

### Convenções
- **Arquivos:** kebab-case (`minha-page.tsx`)
- **Componentes:** PascalCase (`MinhaPage`)
- **Funções:** camelCase (`handleClick`)
- **Constantes:** UPPER_SNAKE_CASE (`MAX_ITEMS`)
- **CSS:** Tailwind classes, sem CSS inline ou styled-components

---

## 🚀 Próximos Passos

1. **Ler este PROMPT na íntegra**
2. **Estudar o README.md do react-core**
3. **Analisar páginas existentes** para entender o contexto atual
4. **Começar pela Home Page** (prioridade máxima)
5. **Refatorar uma feature por vez**, testando em todos os breakpoints
6. **Manter consistência** entre todas as páginas
7. **Validar acessibilidade** e responsividade
8. **Documentar mudanças** significativas se necessário

---

## 📌 Observações Finais

- **Não altere a lógica de negócio** (queries, mutations, validações)
- **Não modifique rotas** ou estrutura de pastas
- **Não remova funcionalidades existentes**, apenas melhore a UI/UX
- **Priorize qualidade sobre velocidade**
- **Teste em múltiplos dispositivos e navegadores**
- **Mantenha backward compatibility** com a lib react-core

---

**Boa refatoração! 🎨✨**
