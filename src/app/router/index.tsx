import { createBrowserRouter } from "react-router-dom"
import { AppProtectedRoute } from "@/shared/components/routing/app-protected-route"
import { AppLayout } from "@/shared/components/layout/app-layout"
import { HomePage } from "@/features/home/home-page"
import { ToDoListPage } from "@/features/exemplos/to-do-list/to-do-list-page"
import { DesignSystemPage } from "@/features/design-system/design-system-page"
import { AuthCallbackPage } from "@/features/auth/components/auth-callback-page"
import { LogoutPage } from "@/features/auth/components/logout-page"
import { UnauthorizedPage } from "@/features/auth/components/unauthorized-page"
import { NotFoundPage } from "@/features/errors/not-found-page"
import { USER_ROLES } from "@/shared/lib/permissions"
import { TemasPage } from "@/features/temas/temas-page"
import { PokedexListPage } from "@/features/exemplos/pokedex/components/pokedex-list-page"
import { PokedexDetailPage } from "@/features/exemplos/pokedex/components/pokedex-detail-page"
import { PrevisaoTempoListPage } from "@/features/exemplos/previsao-tempo/components/previsao-tempo-list-page"
import { PrevisaoTempoDetailPage } from "@/features/exemplos/previsao-tempo/components/previsao-tempo-detail-page"
import { FormulariosPage } from "@/features/exemplos/formularios"

export const router = createBrowserRouter([
    {
        path: "/",
        element: (
            <AppProtectedRoute>
                <AppLayout />
            </AppProtectedRoute>
        ),
        children: [
            {
                path: "/",
                element: <HomePage />,
            },
            {
                path: "/design-system",
                element: <DesignSystemPage />,
            },
            {
                path: "/themes",
                element: (
                    <AppProtectedRoute requiredRoles={[USER_ROLES.ADMIN]}>
                        <TemasPage />
                    </AppProtectedRoute>
                ),
            },
            {
                path: "/exemplos/formularios",
                element: <FormulariosPage />,
            },
            {
                path: "/exemplos/to-do-list",
                element: <ToDoListPage />
            },
            {
                path: "exemplos/pokedex",
                element: <PokedexListPage />,
            },
            {
                path: "exemplos/pokedex/:id",
                element: <PokedexDetailPage />,
                handle: {
                    detailSectionsEnabled: true,
                    breadcrumbLabel: (params: { id: string }) => `#${params.id.padStart(3, '0')}`,
                },
            },
            {
                path: "exemplos/previsao-tempo",
                element: <PrevisaoTempoListPage />,
            },
            {
                path: "exemplos/previsao-tempo/:coords",
                element: <PrevisaoTempoDetailPage />,
                handle: {
                    detailSectionsEnabled: true,
                    breadcrumbLabel: () => `Previsão`,
                },
            },
        ],
    },
    {
        path: "/auth/callback",
        element: <AuthCallbackPage />,
    },
    {
        path: "/auth/logout",
        element: <LogoutPage />,
    },
    {
        path: "/unauthorized",
        element: <UnauthorizedPage />,
    },
    {
        path: "*",
        element: <NotFoundPage />,
    },
])
