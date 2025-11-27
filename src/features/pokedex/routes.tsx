// Rotas da feature pokedex

import { type RouteObject } from "react-router-dom"
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
            breadcrumbLabel: (params: { id: string }) => `#${params.id.padStart(3, '0')}`,
        },
    },
]
