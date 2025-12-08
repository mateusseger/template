# PROMPT: Refatoração - Detail Sections para Master-Detail com Rotas

## 📋 Contexto

O **react-core** atualmente fornece um sistema de "Detail Sections" (`DetailSectionsProvider`, `DetailSectionsSidebar`, `Section`, `DetailPageSkeleton`) que cria páginas longas com navegação por scroll spy. Este sistema gera:

- **Acoplamento**: O `AppLayout` tem lógica específica para este recurso
- **Complexidade**: Provider global, registro de seções, scroll spy com observers
- **Performance**: Carrega todo conteúdo de uma vez

## 🎯 Objetivos

1. **Remover do react-core**: `DetailSectionsProvider`, `DetailSectionsSidebar`, `Section`, `DetailPageSkeleton`
2. **Criar no react-template**: Sistema simples de Master-Detail usando rotas aninhadas
3. **Sidebar desktop / Sheet mobile**: Padrão consistente com `app-sidebar-submenu.tsx`
4. **Mobile-first**: Classes Tailwind responsivas
5. **Componentes reutilizáveis**: Compartilhados entre features (Pokédex, Previsão do Tempo)
6. **Código limpo**: Sem excesso de comentários, seguindo padrões do projeto

---

## 🗑️ Fase 1: Remoções no React-Core

### Arquivos a Remover

```
react-core/src/shared/components/layout/
├── detail-sections/                       ❌ REMOVER PASTA COMPLETA
│   ├── detail-sections-provider.tsx
│   ├── detail-sections-sidebar.tsx
│   ├── section.tsx
│   └── index.ts
```

### Arquivos a Atualizar

#### `react-core/src/shared/components/layout/index.ts`

```diff
  export * from "./app-layout"
  export * from "./app-header"
  export * from "./app-sidebar-menu"
  export * from "./app-sidebar-submenu"
  export * from "./app-breadcrumb"
  export * from "./app-page-transition"
- export * from "./detail-sections"
```

#### `react-core/src/shared/components/layout/app-layout.tsx`

```tsx
import { memo } from "react"
import { AppHeader } from "./app-header"
import { AppSidebarMenu } from "./app-sidebar-menu"
import { AppPageTransition } from "./app-page-transition"
import { SidebarProvider } from "../ui/shadcn/sidebar"
import { Toaster } from "../ui/shadcn/sonner"
import { cn } from "@/shared/utils/cn"
import type { MenuItem, ProjectConfig } from "@/shared/types/config"

export interface AppLayoutProps {
    menuItems: MenuItem[]
    projectConfig: ProjectConfig
}

export const AppLayout = memo(function AppLayout({ menuItems, projectConfig }: AppLayoutProps) {
    return (
        <SidebarProvider>
            <AppSidebarMenu menuItems={menuItems} projectConfig={projectConfig} />

            <div className="flex-1 flex flex-col min-w-0">
                <AppHeader />

                <main className="flex-1 min-w-0">
                    <div className={cn(
                        "container mx-auto",
                        "p-4 sm:p-6",
                        "max-w-full lg:max-w-7xl"
                    )}>
                        <AppPageTransition />
                        <Toaster position="top-right" />
                    </div>
                </main>
            </div>
        </SidebarProvider>
    )
})
```

#### `react-core/src/shared/components/ui/index.ts`

Remover export de `DetailPageSkeleton` se existir.

#### `react-core/README.md`

Remover qualquer menção a Detail Sections, Section props, scroll spy.

---

## 🆕 Fase 2: Componentes Reutilizáveis no React-Template

### Estrutura de Arquivos

```
react-template/src/shared/components/
├── index.ts                              ✏️ ATUALIZAR
├── master-detail/
│   ├── index.ts                          🆕 CRIAR
│   ├── master-detail-layout.tsx          🆕 CRIAR
│   ├── master-detail-nav.tsx             🆕 CRIAR
│   └── types.ts                          🆕 CRIAR
```

### Tipos (`types.ts`)

```tsx
import type { LucideIcon } from "lucide-react"

export interface SecaoItem {
    id: string
    rotulo: string
    icone: LucideIcon
}

export interface MasterDetailLayoutProps {
    secoes: SecaoItem[]
    tituloVoltar: string
    rotaVoltar: string
    children: React.ReactNode
}
```

### Layout Principal (`master-detail-layout.tsx`)

```tsx
import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { ArrowLeft, Menu } from "lucide-react"
import { useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import {
    Button,
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@herval/react-core"
import { cn } from "@/shared/utils/cn"
import { MasterDetailNav } from "./master-detail-nav"
import type { MasterDetailLayoutProps } from "./types"

export function MasterDetailLayout({
    secoes,
    tituloVoltar,
    rotaVoltar,
    children,
}: MasterDetailLayoutProps) {
    const [sheetAberto, setSheetAberto] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    const secaoAtiva = secoes.find(s =>
        location.pathname.endsWith(`/${s.id}`)
    )?.id || secoes[0]?.id

    const handleNavegar = (id: string) => {
        const basePath = location.pathname.split('/').slice(0, -1).join('/')
        navigate(`${basePath}/${id}`)
        setSheetAberto(false)
    }

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Header Mobile */}
            <div className="flex items-center justify-between lg:hidden">
                <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate(rotaVoltar)}
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    {tituloVoltar}
                </Button>

                <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setSheetAberto(true)}
                >
                    <Menu className="h-4 w-4" />
                </Button>
            </div>

            {/* Sheet Mobile */}
            <Sheet open={sheetAberto} onOpenChange={setSheetAberto}>
                <SheetContent side="right" className="w-72 p-0">
                    <SheetHeader className="p-4 border-b">
                        <SheetTitle>Seções</SheetTitle>
                    </SheetHeader>
                    <div className="p-4">
                        <MasterDetailNav
                            secoes={secoes}
                            secaoAtiva={secaoAtiva}
                            onNavegar={handleNavegar}
                        />
                    </div>
                </SheetContent>
            </Sheet>

            {/* Layout Desktop */}
            <div className="flex gap-6">
                {/* Sidebar Desktop */}
                <AnimatePresence mode="wait">
                    <motion.aside
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: 224, opacity: 1 }}
                        exit={{ width: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="hidden lg:block shrink-0"
                    >
                        <div className="sticky top-20 space-y-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => navigate(rotaVoltar)}
                                className="w-full justify-start"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                {tituloVoltar}
                            </Button>

                            <div className="border rounded-lg p-3">
                                <h3 className="text-xs font-semibold text-muted-foreground mb-3 px-2">
                                    Seções
                                </h3>
                                <MasterDetailNav
                                    secoes={secoes}
                                    secaoAtiva={secaoAtiva}
                                    onNavegar={handleNavegar}
                                />
                            </div>
                        </div>
                    </motion.aside>
                </AnimatePresence>

                {/* Conteúdo */}
                <div className="flex-1 min-w-0">
                    {children}
                    <Outlet />
                </div>
            </div>
        </div>
    )
}
```

### Navegação (`master-detail-nav.tsx`)

```tsx
import { cn } from "@/shared/utils/cn"
import type { SecaoItem } from "./types"

interface MasterDetailNavProps {
    secoes: SecaoItem[]
    secaoAtiva: string
    onNavegar: (id: string) => void
}

export function MasterDetailNav({
    secoes,
    secaoAtiva,
    onNavegar,
}: MasterDetailNavProps) {
    return (
        <nav className="space-y-1">
            {secoes.map((secao) => {
                const isAtiva = secaoAtiva === secao.id
                const Icon = secao.icone

                return (
                    <button
                        key={secao.id}
                        onClick={() => onNavegar(secao.id)}
                        className={cn(
                            "w-full text-left rounded-md transition-colors",
                            "px-3 py-2 text-sm",
                            "flex items-center gap-2",
                            "hover:bg-accent hover:text-accent-foreground",
                            isAtiva && "bg-accent text-accent-foreground font-medium"
                        )}
                    >
                        <Icon className="h-4 w-4 shrink-0" />
                        <span className="truncate">{secao.rotulo}</span>
                    </button>
                )
            })}
        </nav>
    )
}
```

### Export (`index.ts`)

```tsx
export { MasterDetailLayout } from "./master-detail-layout"
export { MasterDetailNav } from "./master-detail-nav"
export type { SecaoItem, MasterDetailLayoutProps } from "./types"
```

### Atualizar `shared/components/index.ts`

```tsx
export { PageHeader } from "./page-header"
export * from "./master-detail"
```

---

## 🔄 Fase 3: Migração da Feature Pokédex

### Nova Estrutura

```
react-template/src/features/pokedex/
├── index.ts                              ✏️ ATUALIZAR
├── routes.tsx                            ✏️ ATUALIZAR
├── pages/
│   ├── pokedex-list-page.tsx             (manter)
│   ├── pokedex-detail-page.tsx           ❌ REMOVER
│   ├── pokedex-detail-layout.tsx         🆕 CRIAR
│   └── secoes/                           🆕 CRIAR PASTA
│       ├── index.ts
│       ├── informacoes-secao.tsx
│       ├── habilidades-secao.tsx
│       ├── estatisticas-secao.tsx
│       └── galeria-secao.tsx
```

### Routes (`routes.tsx`)

```tsx
import { Info, Zap, Award, Image as ImageIcon } from "lucide-react"
import { Navigate, type RouteObject } from "react-router-dom"
import { PokedexListPage } from "./pages/pokedex-list-page"
import { PokedexDetailLayout } from "./pages/pokedex-detail-layout"
import {
    InformacoeSecao,
    HabilidadesSecao,
    EstatisticasSecao,
    GaleriaSecao,
} from "./pages/secoes"

export const pokedexRoutes: RouteObject[] = [
    {
        path: "/pokedex",
        element: <PokedexListPage />,
        handle: {
            breadcrumbLabel: "Pokédex",
            breadcrumbIcon: Zap,
        },
    },
    {
        path: "/pokedex/:id",
        element: <PokedexDetailLayout />,
        handle: {
            breadcrumbLabel: (params: { id: string }) => `#${params.id.padStart(3, "0")}`,
            breadcrumbIcon: Info,
        },
        children: [
            { index: true, element: <Navigate to="informacoes" replace /> },
            { path: "informacoes", element: <InformacoeSecao /> },
            { path: "habilidades", element: <HabilidadesSecao /> },
            { path: "estatisticas", element: <EstatisticasSecao /> },
            { path: "galeria", element: <GaleriaSecao /> },
        ],
    },
]
```

### Detail Layout (`pokedex-detail-layout.tsx`)

```tsx
import { useParams } from "react-router-dom"
import { Info, Zap, Award, Image as ImageIcon } from "lucide-react"
import { Badge, Skeleton } from "@herval/react-core"
import { MasterDetailLayout, type SecaoItem } from "@/shared/components"
import { usePokemonDetail } from "../api"
import { getTypeColor, translateType } from "../api/pokedex-api"

const secoes: SecaoItem[] = [
    { id: "informacoes", rotulo: "Informações", icone: Info },
    { id: "habilidades", rotulo: "Habilidades", icone: Zap },
    { id: "estatisticas", rotulo: "Estatísticas", icone: Award },
    { id: "galeria", rotulo: "Galeria", icone: ImageIcon },
]

export function PokedexDetailLayout() {
    const { id } = useParams<{ id: string }>()
    const { data: pokemon, isLoading } = usePokemonDetail(id)

    if (isLoading) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-64 w-full" />
            </div>
        )
    }

    return (
        <MasterDetailLayout
            secoes={secoes}
            tituloVoltar="Pokédex"
            rotaVoltar="/pokedex"
        >
            {pokemon && (
                <div className="mb-6">
                    <div className="flex items-center gap-3 mb-2">
                        <h1 className="text-2xl sm:text-3xl font-bold capitalize">
                            {pokemon.name}
                        </h1>
                        <span className="text-xl sm:text-2xl text-muted-foreground">
                            #{pokemon.id.toString().padStart(3, '0')}
                        </span>
                    </div>
                    <div className="flex gap-2">
                        {pokemon.types.map((type) => (
                            <Badge
                                key={type.slot}
                                className={`${getTypeColor(type.type.name)} text-white border-0`}
                            >
                                {translateType(type.type.name)}
                            </Badge>
                        ))}
                    </div>
                </div>
            )}
        </MasterDetailLayout>
    )
}
```

### Exemplo de Seção (`informacoes-secao.tsx`)

```tsx
import { useParams } from "react-router-dom"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Badge,
    Separator,
    Skeleton,
} from "@herval/react-core"
import { usePokemonDetail } from "../../api"
import { getTypeColor, translateType } from "../../api/pokedex-api"

export function InformacoeSecao() {
    const { id } = useParams<{ id: string }>()
    const { data: pokemon, isLoading } = usePokemonDetail(id)

    if (isLoading) {
        return <Skeleton className="h-64 w-full" />
    }

    if (!pokemon) return null

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardContent className="p-8">
                    <div className="aspect-square bg-gradient-to-br from-muted/50 to-muted rounded-lg p-8 flex items-center justify-center">
                        <img
                            src={pokemon.image}
                            alt={pokemon.name}
                            className="w-full h-full object-contain"
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Características</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Altura</span>
                        <span className="text-lg font-semibold">
                            {(pokemon.height / 10).toFixed(1)} m
                        </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Peso</span>
                        <span className="text-lg font-semibold">
                            {(pokemon.weight / 10).toFixed(1)} kg
                        </span>
                    </div>
                    <Separator />
                    <div>
                        <span className="text-sm text-muted-foreground block mb-2">Tipos</span>
                        <div className="flex gap-2">
                            {pokemon.types.map((type) => (
                                <Badge
                                    key={type.slot}
                                    className={`${getTypeColor(type.type.name)} text-white border-0`}
                                >
                                    {translateType(type.type.name)}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
```

### Index das Seções (`secoes/index.ts`)

```tsx
export { InformacoeSecao } from "./informacoes-secao"
export { HabilidadesSecao } from "./habilidades-secao"
export { EstatisticasSecao } from "./estatisticas-secao"
export { GaleriaSecao } from "./galeria-secao"
```

---

## 🔄 Fase 4: Migração da Feature Previsão do Tempo

### Nova Estrutura

```
react-template/src/features/previsao-tempo/
├── index.ts                              ✏️ ATUALIZAR
├── routes.tsx                            ✏️ ATUALIZAR
├── pages/
│   ├── previsao-tempo-list-page.tsx      (manter)
│   ├── previsao-tempo-detail-page.tsx    ❌ REMOVER
│   ├── previsao-tempo-detail-layout.tsx  🆕 CRIAR
│   └── secoes/                           🆕 CRIAR PASTA
│       ├── index.ts
│       ├── clima-atual-secao.tsx
│       ├── previsao-semanal-secao.tsx
│       ├── previsao-horaria-secao.tsx
│       └── precipitacao-secao.tsx
```

### Routes (`routes.tsx`)

```tsx
import { CloudSun, MapPin, Info, Calendar, Clock, CloudRain } from "lucide-react"
import { Navigate, type RouteObject } from "react-router-dom"
import { PrevisaoTempoListPage } from "./pages/previsao-tempo-list-page"
import { PrevisaoTempoDetailLayout } from "./pages/previsao-tempo-detail-layout"
import {
    ClimaAtualSecao,
    PrevisaoSemanalSecao,
    PrevisaoHorariaSecao,
    PrecipitacaoSecao,
} from "./pages/secoes"

export const previsaoTempoRoutes: RouteObject[] = [
    {
        path: "/previsao-tempo",
        element: <PrevisaoTempoListPage />,
        handle: {
            breadcrumbLabel: "Previsão do Tempo",
            breadcrumbIcon: CloudSun,
        },
    },
    {
        path: "/previsao-tempo/:coords",
        element: <PrevisaoTempoDetailLayout />,
        handle: {
            breadcrumbLabel: "Detalhes",
            breadcrumbIcon: MapPin,
        },
        children: [
            { index: true, element: <Navigate to="clima-atual" replace /> },
            { path: "clima-atual", element: <ClimaAtualSecao /> },
            { path: "previsao-semanal", element: <PrevisaoSemanalSecao /> },
            { path: "previsao-horaria", element: <PrevisaoHorariaSecao /> },
            { path: "precipitacao", element: <PrecipitacaoSecao /> },
        ],
    },
]
```

### Detail Layout (`previsao-tempo-detail-layout.tsx`)

```tsx
import { useMemo } from "react"
import { useParams, useLocation } from "react-router-dom"
import { Info, Calendar, Clock, CloudRain } from "lucide-react"
import { Skeleton } from "@herval/react-core"
import { MasterDetailLayout, type SecaoItem } from "@/shared/components"
import { useWeatherDetail } from "../api"
import { formatHour } from "../api/previsao-tempo-api"

const secoes: SecaoItem[] = [
    { id: "clima-atual", rotulo: "Clima Atual", icone: Info },
    { id: "previsao-semanal", rotulo: "Próximos 7 Dias", icone: Calendar },
    { id: "previsao-horaria", rotulo: "Próximas 24 Horas", icone: Clock },
    { id: "precipitacao", rotulo: "Precipitação", icone: CloudRain },
]

export function PrevisaoTempoDetailLayout() {
    const { coords } = useParams<{ coords: string }>()
    const location = useLocation()
    const locationData = location.state?.location

    const { lat, lon } = useMemo(() => {
        if (!coords) return { lat: undefined, lon: undefined }
        const [latitude, longitude] = coords.split(',').map(Number)
        if (isNaN(latitude) || isNaN(longitude)) return { lat: undefined, lon: undefined }
        return { lat: latitude, lon: longitude }
    }, [coords])

    const { data: weather, isLoading } = useWeatherDetail(lat, lon)

    const weatherWithLocation = useMemo(() => {
        if (!weather) return null
        if (locationData) {
            return { ...weather, location: locationData }
        }
        return weather
    }, [weather, locationData])

    if (isLoading) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-64 w-full" />
            </div>
        )
    }

    return (
        <MasterDetailLayout
            secoes={secoes}
            tituloVoltar="Previsão do Tempo"
            rotaVoltar="/previsao-tempo"
        >
            {weatherWithLocation && (
                <div className="mb-6">
                    <h1 className="text-2xl sm:text-3xl font-bold">
                        {weatherWithLocation.location.name || "Localidade"}
                    </h1>
                    <p className="text-muted-foreground mt-1">
                        {weatherWithLocation.location.country && `${weatherWithLocation.location.country} • `}
                        Atualizado em {formatHour(weatherWithLocation.current.time)}
                    </p>
                </div>
            )}
        </MasterDetailLayout>
    )
}
```

---

## ✅ Checklist de Implementação

### Fase 1: Remoções no React-Core

- [ ] Remover pasta `detail-sections/`
- [ ] Atualizar `layout/index.ts`
- [ ] Simplificar `app-layout.tsx`
- [ ] Atualizar `ui/index.ts` (se necessário)
- [ ] Atualizar `README.md`
- [ ] Build e teste do react-core

### Fase 2: Componentes no React-Template

- [ ] Criar `shared/components/master-detail/types.ts`
- [ ] Criar `shared/components/master-detail/master-detail-nav.tsx`
- [ ] Criar `shared/components/master-detail/master-detail-layout.tsx`
- [ ] Criar `shared/components/master-detail/index.ts`
- [ ] Atualizar `shared/components/index.ts`

### Fase 3: Migração Pokédex

- [ ] Criar `pages/pokedex-detail-layout.tsx`
- [ ] Criar pasta `pages/secoes/`
- [ ] Criar `secoes/informacoes-secao.tsx`
- [ ] Criar `secoes/habilidades-secao.tsx`
- [ ] Criar `secoes/estatisticas-secao.tsx`
- [ ] Criar `secoes/galeria-secao.tsx`
- [ ] Criar `secoes/index.ts`
- [ ] Atualizar `routes.tsx`
- [ ] Atualizar `index.ts`
- [ ] Remover `pokedex-detail-page.tsx`
- [ ] Testar navegação

### Fase 4: Migração Previsão do Tempo

- [ ] Criar `pages/previsao-tempo-detail-layout.tsx`
- [ ] Criar pasta `pages/secoes/`
- [ ] Criar `secoes/clima-atual-secao.tsx`
- [ ] Criar `secoes/previsao-semanal-secao.tsx`
- [ ] Criar `secoes/previsao-horaria-secao.tsx`
- [ ] Criar `secoes/precipitacao-secao.tsx`
- [ ] Criar `secoes/index.ts`
- [ ] Atualizar `routes.tsx`
- [ ] Atualizar `index.ts`
- [ ] Remover `previsao-tempo-detail-page.tsx`
- [ ] Testar navegação

### Fase 5: Documentação

- [ ] Criar `shared/components/master-detail/README.md`
- [ ] Build final e testes

---

## 🎨 Design Visual

### Mobile (< lg)

```
┌─────────────────────────────────┐
│ ← Pokédex                   ☰   │  ← Header com menu
├─────────────────────────────────┤
│ Pikachu #025                    │  ← Info do item
│ ⚡ Elétrico                      │
├─────────────────────────────────┤
│                                 │
│     Conteúdo da Seção           │  ← Outlet (rota)
│                                 │
└─────────────────────────────────┘

☰ abre Sheet:
┌─────────────────────────────────┐
│ ┌───────────────────────┐       │
│ │ Seções            X   │       │
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
┌─────────────────────────────────────────────────────┐
│                    Header Global                    │
├──────────────────┬──────────────────────────────────┤
│                  │                                  │
│  ← Pokédex       │  Pikachu #025                    │
│                  │  ⚡ Elétrico                      │
│  ┌────────────┐  │                                  │
│  │ Seções     │  │  ┌────────────────────────────┐  │
│  │            │  │  │                            │  │
│  │ ● Info     │  │  │   Conteúdo da Seção        │  │
│  │ ○ Habil.   │  │  │   (Outlet)                 │  │
│  │ ○ Stats    │  │  │                            │  │
│  │ ○ Galeria  │  │  └────────────────────────────┘  │
│  └────────────┘  │                                  │
│                  │                                  │
└──────────────────┴──────────────────────────────────┘
     w-56 (224px)               flex-1
```

---

## 📝 Padrões a Seguir

1. **Mobile-First**: Estilos base para mobile, `lg:` para desktop
2. **Tailwind Classes**: Usar `cn()` para classes condicionais
3. **Componentes shadcn**: Usar os disponíveis em react-core
4. **Nomenclatura**: kebab-case arquivos, PascalCase componentes
5. **Rotas em português**: `informacoes`, `habilidades`, etc.
6. **Sem comentários excessivos**: Código auto-documentado
7. **TypeScript**: Tipagem completa nas interfaces
