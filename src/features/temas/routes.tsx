// Rotas da feature temas

import { Layers } from "lucide-react"
import { type RouteObject } from "react-router-dom"
import { TemasPage } from "./pages/temas-page.tsx"

export const temasRoutes: RouteObject[] = [
    {
        path: "/temas",
        element: <TemasPage />,
        handle: {
            breadcrumbLabel: "Temas",
            breadcrumbIcon: Layers,
        },
    }
]
