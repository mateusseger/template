// Rotas da feature formularios

import { type RouteObject } from "react-router-dom"
import { FormulariosPage } from "./pages/formularios-page"

export const formulariosRoutes: RouteObject[] = [
    {
        path: "/formularios",
        element: <FormulariosPage />,
    },
]
