// Rotas da feature pokedex

import { Info, Zap } from "lucide-react"
import { type RouteObject } from "react-router-dom"
import { PokedexListPage } from "./pages/pokedex-list-page"
import { PokedexDetailPage } from "./pages/pokedex-detail-page"

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
        element: <PokedexDetailPage />,
        handle: {
            breadcrumbLabel: (params: { id: string }) => `#${params.id.padStart(3, "0")}`,
            breadcrumbIcon: Info,
        },
    },
]
