// Rotas da feature previsao-tempo

import { type RouteObject } from "react-router-dom"
import { PrevisaoTempoListPage } from "./pages/previsao-tempo-list-page"
import { PrevisaoTempoDetailPage } from "./pages/previsao-tempo-detail-page"

export const previsaoTempoRoutes: RouteObject[] = [
    {
        path: "/exemplos/previsao-tempo",
        element: <PrevisaoTempoListPage />,
    },
    {
        path: "/exemplos/previsao-tempo/:coords",
        element: <PrevisaoTempoDetailPage />,
        handle: {
            detailSectionsEnabled: true,
            breadcrumbLabel: () => `Previsão`,
        },
    },
]
