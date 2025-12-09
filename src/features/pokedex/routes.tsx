import { Info, Zap, Award, Image as ImageIcon } from "lucide-react"
import { Navigate, Outlet, type RouteObject } from "react-router-dom"
import { PokedexListaPage } from "./pages/pokedex-lista-page"
import { PokedexDetalheLayout } from "./pages/pokedex-detalhe-layout"
import {
    InformacoesSecao,
    HabilidadesSecao,
    EstatisticasSecao,
    GaleriaSecao,
} from "./pages/secoes"

export const pokedexRoutes: RouteObject[] = [
    {
        path: "/pokedex",
        element: <Outlet />,
        handle: {
            breadcrumbLabel: "Pokédex",
            breadcrumbIcon: Zap,
        },
        children: [
            {
                index: true,
                element: <PokedexListaPage />,
            },
            {
                path: ":id",
                handle: {
                    breadcrumbLabel: (params: { id: string }) => `#${params.id.padStart(3, "0")}`,
                    breadcrumbIcon: Info,
                    breadcrumbNavigable: false,
                },
                children: [
                    // Redireciona /pokedex/:id para /pokedex/:id/informacoes
                    { index: true, element: <Navigate to="informacoes" replace /> },
                    {
                        // Layout route - wrapper para todas as seções
                        element: <PokedexDetalheLayout />,
                        children: [
                            {
                                path: "informacoes",
                                element: <InformacoesSecao />,
                                handle: {
                                    breadcrumbLabel: "Informações",
                                    breadcrumbIcon: Info,
                                },
                            },
                            {
                                path: "habilidades",
                                element: <HabilidadesSecao />,
                                handle: {
                                    breadcrumbLabel: "Habilidades",
                                    breadcrumbIcon: Zap,
                                },
                            },
                            {
                                path: "estatisticas",
                                element: <EstatisticasSecao />,
                                handle: {
                                    breadcrumbLabel: "Estatísticas",
                                    breadcrumbIcon: Award,
                                },
                            },
                            {
                                path: "galeria",
                                element: <GaleriaSecao />,
                                handle: {
                                    breadcrumbLabel: "Galeria",
                                    breadcrumbIcon: ImageIcon,
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    },
]
