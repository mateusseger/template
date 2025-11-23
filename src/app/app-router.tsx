import { createBrowserRouter } from "react-router-dom"
import { ProtectedRoute } from "@/features/core/auth"
import { AppLayout } from "@/shared/components/layout/app-layout"

// Import de rotas das features core
import { authRoutes } from "@/features/core/auth/routes"
import { themeRoutes } from "@/features/core/theme/routes"
import { errorRoutes } from "@/features/core/errors/routes"
import { homeRoutes } from "@/features/core/home/routes"

// Import de rotas das features business
import { pokedexRoutes } from "@/features/business/pokedex/routes"
import { previsaoTempoRoutes } from "@/features/business/previsao-tempo/routes"
import { formulariosRoutes } from "@/features/business/formularios/routes"
import { toDoListRoutes } from "@/features/business/to-do-list/routes"
import { designSystemRoutes } from "@/features/business/design-system/routes"

export const router = createBrowserRouter([
    // Rotas públicas (auth)
    ...authRoutes,

    // Rotas protegidas (dentro do layout)
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <AppLayout />
            </ProtectedRoute>
        ),
        children: [
            ...homeRoutes,
            ...themeRoutes,
            ...designSystemRoutes,
            ...formulariosRoutes,
            ...toDoListRoutes,
            ...pokedexRoutes,
            ...previsaoTempoRoutes,
        ],
    },

    // Rotas de erro (404, etc)
    ...errorRoutes,
])
