// Rotas da feature design-system

import { Palette } from "lucide-react"
import { type RouteObject } from "react-router-dom"
import { DesignSystemPage } from "./pages/design-system-page"

export const designSystemRoutes: RouteObject[] = [
    {
        path: "/design-system",
        element: <DesignSystemPage />,
        handle: {
            breadcrumbLabel: "Design System",
            breadcrumbIcon: Palette,
        },
    },
]
