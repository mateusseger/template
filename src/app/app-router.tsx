import { createBrowserRouter, useRouteError } from "react-router-dom"

import {
    authRoutes,
    errorRoutes,
    ProtectedRoute,
    AppLayout,
    ErrorFallback
} from "@herval/react-core"

import { homeRoutes } from "@/features/home/routes"
import { pokedexRoutes } from "@/features/pokedex/routes"
import { previsaoTempoRoutes } from "@/features/previsao-tempo/routes"
import { formulariosRoutes } from "@/features/formularios/routes"
import { toDoListRoutes } from "@/features/to-do-list/routes"
import { designSystemRoutes } from "@/features/design-system/routes"
import { appConfig } from "./app-config"
import { temasRoutes } from "@/features/temas/routes"

// Wrapper para erros de rota
function RouteError() {
    const error = useRouteError() as Error
    return <ErrorFallback error={error} showStack={import.meta.env.DEV} />
}

// Helper para adicionar errorElement às rotas
const withErrorElement = (routes: Parameters<typeof createBrowserRouter>[0]) =>
    routes.map(route => ({ ...route, errorElement: <RouteError /> }))

export const router = createBrowserRouter([
    // Rotas públicas (auth)
    ...withErrorElement(authRoutes),

    // Rotas protegidas (dentro do layout)
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <AppLayout
                    projectConfig={appConfig.project}
                    menuItems={appConfig.menu}
                />
            </ProtectedRoute>
        ),
        children: [
            ...homeRoutes,
            ...designSystemRoutes,
            ...formulariosRoutes,
            ...toDoListRoutes,
            ...pokedexRoutes,
            ...previsaoTempoRoutes,
            ...temasRoutes,
        ],
        errorElement: <RouteError />
    },

    // Rotas de erro (404, etc)
    ...withErrorElement(errorRoutes),
])
