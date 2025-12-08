// Rotas da feature previsao-tempo

import { CloudSun, MapPin } from "lucide-react"
import { type RouteObject } from "react-router-dom"
import { PrevisaoTempoListPage } from "./pages/previsao-tempo-list-page"
import { PrevisaoTempoDetailPage } from "./pages/previsao-tempo-detail-page"

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
        element: <PrevisaoTempoDetailPage />,
        handle: {
            breadcrumbLabel: "Detalhes",
            breadcrumbIcon: MapPin,
        },
    },
]
