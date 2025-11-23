// Rotas da feature de temas

import { type RouteObject } from "react-router-dom"
import { AppProtectedRoute } from "@/shared/components/routing/app-protected-route"
import { USER_ROLES } from "@/shared/constants/permissions"
import { ThemeSettingsPage } from "./pages/theme-settings-page"

export const themeRoutes: RouteObject[] = [
    {
        path: "/themes",
        element: (
            <AppProtectedRoute requiredRoles={[USER_ROLES.ADMIN]}>
                <ThemeSettingsPage />
            </AppProtectedRoute>
        ),
    },
]
