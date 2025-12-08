# PROMPT: Migração de Detail Sections para Navegação por Rotas

## 📋 Contexto

O **react-core** atualmente fornece um sistema de "Detail Sections" que permite criar páginas longas com navegação por seções via scroll spy. Este sistema inclui:

- `DetailSectionsProvider` - Contexto que gerencia registro e navegação de seções
- `DetailSectionsSidebar` - Sidebar fixa que exibe as seções e destaca a ativa
- `Section` - Componente para declarar seções nas páginas
- `DetailPageSkeleton` - Skeleton para páginas de detalhe

**Problema**: Este recurso adiciona complexidade ao core e as páginas carregam todo o conteúdo de uma vez.

**Solução**: Migrar para uma abordagem mais simples baseada em **rotas aninhadas**, onde cada seção é uma página separada, renderizada ao lado de uma sidebar de navegação.

---

## 🎯 Objetivos

1. **Remover do react-core**: `DetailSectionsProvider`, `DetailSectionsSidebar`, `Section`, `DetailPageSkeleton`
2. **Atualizar react-core**: Remover referências no `AppLayout`, exports e `README.md`
3. **Criar no react-template**: Novo sistema de navegação por seções usando rotas aninhadas
4. **Manter compatibilidade**: Design harmonioso com o existente, mobile-first, componentes reutilizáveis

---

## 📁 Arquivos a Modificar/Remover

### React-Core - REMOÇÕES

```
react-core/src/shared/components/layout/
├── detail-sections/
│   ├── detail-sections-provider.tsx  ❌ REMOVER
│   ├── detail-sections-sidebar.tsx   ❌ REMOVER
│   ├── section.tsx                   ❌ REMOVER
│   └── index.ts                      ❌ REMOVER (pasta inteira)
├── detail-page-skeleton.tsx          ❌ REMOVER
├── index.ts                          ✏️ ATUALIZAR (remover exports)
└── app-layout.tsx                    ✏️ ATUALIZAR (remover Provider e Sidebar)
```

### React-Core - ATUALIZAÇÕES

1. **`react-core/src/shared/components/layout/index.ts`**
   - Remover exports de `detail-sections`
   - Remover export de `DetailPageSkeleton`

2. **`react-core/src/shared/components/layout/app-layout.tsx`**
   - Remover import de `DetailSectionsProvider`
   - Remover import de `DetailSectionsSidebar`
   - Remover `<DetailSectionsProvider>` wrapper
   - Remover `<DetailSectionsSidebar />` do layout
   - Simplificar estrutura do layout

3. **`react-core/README.md`**
   - Remover seção "Detail Sections" completa
   - Remover "Usando Detail Sections" dos exemplos
   - Remover `Section` Props da API Reference
   - Atualizar descrição do Layout (remover menção a scroll spy)

---

## 🆕 Arquivos a Criar no React-Template

### Estrutura Proposta

```
react-template/src/shared/components/
├── index.ts                          ✏️ ATUALIZAR
├── section-layout/
│   ├── index.ts                      🆕 CRIAR
│   ├── section-layout.tsx            🆕 CRIAR (container principal)
│   ├── section-sidebar.tsx           🆕 CRIAR (sidebar de navegação)
│   └── section-content.tsx           🆕 CRIAR (wrapper do conteúdo)
```

---

## 📐 Especificações Técnicas

### 1. SectionLayout (Container Principal)

```tsx
// Props
interface SectionLayoutProps {
  sections: SectionItem[]      // Lista de seções para navegação
  basePath: string             // Path base para as rotas (ex: "/pokedex/1")
  title?: string               // Título opcional para o header
  backPath?: string            // Path para botão voltar
  children: React.ReactNode    // Outlet das rotas aninhadas
}

interface SectionItem {
  id: string                   // ID único (usado na URL)
  label: string                // Label exibido na sidebar
  icon: LucideIcon             // Ícone da seção
}
```

**Comportamento:**
- Mobile: Usa `Sheet` do shadcn (mesmo padrão do sidebar principal)
- Desktop: Usa `motion.aside` com AnimatePresence (mesmo padrão do `app-sidebar-submenu.tsx`)
- Sidebar sempre visível em desktop (`lg:` breakpoint)
- Em mobile, sidebar abre via botão no header

### 2. SectionSidebar (Navegação)

```tsx
// Comportamento
- Renderiza lista de NavLink para cada seção
- Destaca seção ativa baseado na rota atual
- Usa componentes shadcn: SidebarMenu, SidebarMenuItem, SidebarMenuButton
- Animação suave ao alternar seções
```

### 3. SectionContent (Wrapper)

```tsx
// Wrapper simples para o conteúdo com padding e scroll
- Recebe children (páginas das seções)
- Aplica estilos consistentes
- Pode incluir header com título da seção atual
```

---

## 🔄 Migração das Features

### Pokedex

**Antes (routes.tsx):**
```tsx
{
  path: "/pokedex/:id",
  element: <PokedexDetailPage />,
  handle: { detailSectionsEnabled: true }
}
```

**Depois (routes.tsx):**
```tsx
{
  path: "/pokedex/:id",
  element: <PokedexDetailLayout />,
  children: [
    { index: true, element: <Navigate to="info" replace /> },
    { path: "info", element: <PokedexInfoSection /> },
    { path: "abilities", element: <PokedexAbilitiesSection /> },
    { path: "stats", element: <PokedexStatsSection /> },
    { path: "gallery", element: <PokedexGallerySection /> },
  ]
}
```

**Estrutura de arquivos:**
```
react-template/src/features/pokedex/
├── pages/
│   ├── index.ts
│   ├── list-page.tsx
│   ├── detail-layout.tsx           🆕 Layout com SectionLayout
│   └── sections/                   🆕 Nova pasta
│       ├── index.ts
│       ├── info-section.tsx
│       ├── abilities-section.tsx
│       ├── stats-section.tsx
│       └── gallery-section.tsx
```

### Previsão Tempo

**Estrutura similar:**
```
react-template/src/features/previsao-tempo/
├── pages/
│   ├── index.ts
│   ├── list-page.tsx
│   ├── detail-layout.tsx           🆕 Layout com SectionLayout
│   └── sections/                   🆕 Nova pasta
│       ├── index.ts
│       ├── current-section.tsx
│       ├── weekly-section.tsx
│       ├── hourly-section.tsx
│       └── precipitation-section.tsx
```

---

## 🎨 Design e UX

### Mobile (< lg)

```
┌─────────────────────────────────┐
│ ← Voltar    Pokemon #001    ☰   │  ← Header com botão menu
├─────────────────────────────────┤
│                                 │
│     Conteúdo da Seção Ativa     │  ← Outlet renderiza página
│                                 │
│                                 │
└─────────────────────────────────┘

Ao clicar em ☰ (menu):

┌─────────────────────────────────┐
│ ┌───────────────────────┐       │
│ │ Seções            X   │       │  ← Sheet do shadcn
│ ├───────────────────────┤       │
│ │ ● Informações         │       │
│ │ ○ Habilidades         │       │
│ │ ○ Estatísticas        │       │
│ │ ○ Galeria             │       │
│ └───────────────────────┘       │
└─────────────────────────────────┘
```

### Desktop (≥ lg)

```
┌────────────────────────────────────────────────────────────┐
│                        Header                              │
├──────────────────┬─────────────────────────────────────────┤
│                  │                                         │
│  Seções          │        Conteúdo da Seção Ativa          │
│                  │                                         │
│  ● Informações   │   ┌─────────────────────────────────┐   │
│  ○ Habilidades   │   │                                 │   │
│  ○ Estatísticas  │   │    Página renderizada pelo      │   │
│  ○ Galeria       │   │    Outlet (rota aninhada)       │   │
│                  │   │                                 │   │
│                  │   └─────────────────────────────────┘   │
│                  │                                         │
└──────────────────┴─────────────────────────────────────────┘
     motion.aside                    flex-1
     w-64 (256px)
```

---

## ✅ Checklist de Implementação

### Fase 1: Criar Componentes no React-Template

- [] Criar `section-layout/index.ts`
- [] Criar `section-layout/section-layout.tsx`
- [] Criar `section-layout/section-sidebar.tsx`
- [] Criar `section-layout/types.ts`
- [] Atualizar `shared/components/index.ts`
- [] Testar componentes isoladamente

### Fase 2: Migrar Feature Pokedex

- [] Criar `pages/pokedex-detail-layout.tsx`
- [] Criar pasta `pages/sections/`
- [] Criar `sections/info-section.tsx`
- [] Criar `sections/abilities-section.tsx`
- [] Criar `sections/stats-section.tsx`
- [] Criar `sections/gallery-section.tsx`
- [] Atualizar `routes.tsx`
- [] Atualizar `index.ts`
- [] Remover `pokedex-detail-page.tsx` antigo
- [] Testar navegação completa

### Fase 3: Migrar Feature Previsão Tempo

- [] Criar `pages/previsao-tempo-detail-layout.tsx`
- [] Criar pasta `pages/sections/`
- [] Criar `sections/current-section.tsx`
- [] Criar `sections/weekly-section.tsx`
- [] Criar `sections/hourly-section.tsx`
- [] Criar `sections/precipitation-section.tsx`
- [] Atualizar `routes.tsx`
- [] Atualizar `index.ts`
- [] Remover `previsao-tempo-detail-page.tsx` antigo
- [] Testar navegação completa

### Fase 4: Limpeza do React-Core

- [] Remover pasta `detail-sections/`
- [] Remover `detail-page-skeleton.tsx`
- [] Atualizar `layout/index.ts`
- [] Atualizar `app-layout.tsx`
- [] Atualizar `README.md`
- [] Atualizar `ui/index.ts`
- [] Verificar se há outros imports quebrados
- [] Testar build do react-core
- [] Testar build do react-template

---

## 📝 Padrões a Seguir

1. **Mobile-First**: Sempre começar estilização pelo mobile
2. **Componentes Shadcn**: Usar componentes do react-core quando disponíveis
3. **Animações**: Usar framer-motion para transições (padrão do projeto)
4. **Tipagem**: TypeScript strict, interfaces bem definidas
5. **Nomenclatura**: kebab-case para arquivos, PascalCase para componentes
6. **Imports**: Usar alias `@/` para imports absolutos
7. **CSS**: Tailwind CSS com utilitário `cn()` para classes condicionais

---

## 🔗 Referências

- `app-sidebar-submenu.tsx` - Exemplo de Sheet (mobile) + motion.aside (desktop)
- Componentes shadcn disponíveis no react-core: Sheet, Button, etc.
- Padrão de rotas aninhadas do React Router v7
