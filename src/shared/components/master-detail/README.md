# Master-Detail Layout

Componente reutilizável para criar layouts de listagem com página de detalhes navegável por seções.

## Visão Geral

O `MasterDetailLayout` implementa o padrão de interface onde uma lista de itens leva a uma página de detalhes dividida em seções navegáveis. Utiliza rotas aninhadas do React Router para cada seção.

**Comportamento responsivo:**
- **Desktop (≥ lg)**: Sidebar fixa à esquerda com lista de seções
- **Mobile (< lg)**: Botão de menu que abre Sheet com as seções

## Instalação

Os componentes estão em `@/shared/components/master-detail`.

```tsx
import { 
  MasterDetailLayout, 
  type SecaoItem 
} from "@/shared/components"
```

## Uso Básico

### 1. Definir as Seções

```tsx
import { Info, Zap, Award } from "lucide-react"
import type { SecaoItem } from "@/shared/components"

const secoes: SecaoItem[] = [
  { id: "informacoes", rotulo: "Informações", icone: Info },
  { id: "habilidades", rotulo: "Habilidades", icone: Zap },
  { id: "estatisticas", rotulo: "Estatísticas", icone: Award },
]
```

### 2. Criar o Layout de Detalhes

```tsx
import { useParams } from "react-router-dom"
import { MasterDetailLayout, type SecaoItem } from "@/shared/components"

const secoes: SecaoItem[] = [...]

export function MeuItemDetailLayout() {
  const { id } = useParams<{ id: string }>()

  return (
    <MasterDetailLayout
      secoes={secoes}
      tituloVoltar="Lista"
      rotaVoltar="/lista"
    >
      {/* Header do item (opcional) */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Item #{id}</h1>
      </div>
    </MasterDetailLayout>
  )
}
```

### 3. Criar as Páginas de Seção

```tsx
// secoes/informacoes-secao.tsx
import { useParams } from "react-router-dom"
import { Card, CardContent } from "@herval/react-core"

export function InformacoeSecao() {
  const { id } = useParams<{ id: string }>()

  return (
    <Card>
      <CardContent className="p-6">
        Conteúdo de informações do item {id}
      </CardContent>
    </Card>
  )
}
```

### 4. Configurar as Rotas

```tsx
import { Navigate, type RouteObject } from "react-router-dom"
import { MeuItemDetailLayout } from "./pages/meu-item-detail-layout"
import { InformacoeSecao, HabilidadesSecao } from "./pages/secoes"

export const routes: RouteObject[] = [
  {
    path: "/lista/:id",
    element: <MeuItemDetailLayout />,
    children: [
      { index: true, element: <Navigate to="informacoes" replace /> },
      { path: "informacoes", element: <InformacoeSecao /> },
      { path: "habilidades", element: <HabilidadesSecao /> },
    ],
  },
]
```

## API

### `SecaoItem`

```tsx
interface SecaoItem {
  id: string           // ID da seção (usado na URL)
  rotulo: string       // Texto exibido na navegação
  icone: LucideIcon    // Ícone da seção
}
```

### `MasterDetailLayoutProps`

```tsx
interface MasterDetailLayoutProps {
  secoes: SecaoItem[]       // Lista de seções navegáveis
  tituloVoltar: string      // Texto do botão voltar
  rotaVoltar: string        // Rota de retorno à lista
  children: React.ReactNode // Header/conteúdo adicional
}
```

## Estrutura de Arquivos Recomendada

```
features/
└── minha-feature/
    ├── index.ts
    ├── routes.tsx
    └── pages/
        ├── lista-page.tsx
        ├── detail-layout.tsx
        └── secoes/
            ├── index.ts
            ├── informacoes-secao.tsx
            └── outras-secao.tsx
```

## Exemplos no Projeto

- **Pokédex**: `/pokedex/:id/informacoes`, `/pokedex/:id/habilidades`, etc.
- **Previsão do Tempo**: `/previsao-tempo/:coords/clima-atual`, etc.

## Dependências

Utiliza componentes do `@herval/react-core`:
- `Button`
- `Sheet`, `SheetContent`, `SheetHeader`, `SheetTitle`
- `framer-motion` (AnimatePresence, motion)
