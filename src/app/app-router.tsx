import { createBrowserRouter } from "react-router-dom"

import {
    authRoutes,
    errorRoutes,
    themeRoutes,
    ProtectedRoute,
    AppLayout
} from "@herval/react-core"

import { homeRoutes } from "@/features/home/routes"
import { pokedexRoutes } from "@/features/pokedex/routes"
import { previsaoTempoRoutes } from "@/features/previsao-tempo/routes"
import { formulariosRoutes } from "@/features/formularios/routes"
import { toDoListRoutes } from "@/features/to-do-list/routes"
import { designSystemRoutes } from "@/features/design-system/routes"
import { appConfig } from "./app-config"

export const router = createBrowserRouter([
    // Rotas públicas (auth)
    ...authRoutes,

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
            ...themeRoutes,
        ],
    },


    // Rotas de erro (404, etc)
    ...errorRoutes,
])
