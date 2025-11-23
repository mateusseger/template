// Rotas da feature home

import { type RouteObject } from "react-router-dom"
import { HomePage } from "./pages/home-page"

export const homeRoutes: RouteObject[] = [
    {
        path: "/",
        element: <HomePage />,
    },
]
