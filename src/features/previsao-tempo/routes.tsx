import { CloudSun, MapPin, Info, Calendar, Clock, CloudRain } from "lucide-react"
import { Navigate, Outlet, type RouteObject } from "react-router-dom"
import { PrevisaoTempoListaPage } from "./pages/previsao-tempo-lista-page"
import { PrevisaoTempoDetalheLayout } from "./pages/previsao-tempo-detalhe-layout"
import {
    ClimaAtualSecao,
    PrevisaoSemanalSecao,
    PrevisaoHorariaSecao,
    PrecipitacaoSecao,
} from "./pages/secoes"

export const previsaoTempoRoutes: RouteObject[] = [
    {
        path: "/previsao-tempo",
        element: <Outlet />,
        handle: {
            breadcrumbLabel: "Previsão do Tempo",
            breadcrumbIcon: CloudSun,
        },
        children: [
            {
                index: true,
                element: <PrevisaoTempoListaPage />,
            },
            {
                path: ":coords",
                handle: {
                    breadcrumbLabel: "Detalhes",
                    breadcrumbIcon: MapPin,
                    breadcrumbNavigable: false,
                },
                children: [
                    { index: true, element: <Navigate to="clima-atual" replace /> },
                    {
                        // Layout route - wrapper para todas as seções
                        element: <PrevisaoTempoDetalheLayout />,
                        children: [
                            {
                                path: "clima-atual",
                                element: <ClimaAtualSecao />,
                                handle: {
                                    breadcrumbLabel: "Clima Atual",
                                    breadcrumbIcon: Info,
                                },
                            },
                            {
                                path: "previsao-semanal",
                                element: <PrevisaoSemanalSecao />,
                                handle: {
                                    breadcrumbLabel: "Próximos 7 Dias",
                                    breadcrumbIcon: Calendar,
                                },
                            },
                            {
                                path: "previsao-horario",
                                element: <PrevisaoHorariaSecao />,
                                handle: {
                                    breadcrumbLabel: "Próximas 24 Horas",
                                    breadcrumbIcon: Clock,
                                },
                            },
                            {
                                path: "precipitacao",
                                element: <PrecipitacaoSecao />,
                                handle: {
                                    breadcrumbLabel: "Precipitação",
                                    breadcrumbIcon: CloudRain,
                                },
                            },
                        ],
                    },
                ],
            },
        ],
    },
]
