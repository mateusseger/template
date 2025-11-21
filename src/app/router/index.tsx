import { createBrowserRouter } from "react-router-dom"
import { AppProtectedRoute } from "@/shared/components/routing/app-protected-route"
import { AppLayout } from "@/shared/components/layout/app-layout"
import { HomePage } from "@/features/home/home-page"
import { TarefasPage } from "@/features/tarefas/tarefas-page"
import { DesignSystemPage } from "@/features/design-system/design-system-page"
import { AuthCallbackPage } from "@/features/auth/components/auth-callback-page"
import { LogoutPage } from "@/features/auth/components/logout-page"
import { UnauthorizedPage } from "@/features/auth/components/unauthorized-page"
import { NotFoundPage } from "@/features/errors/not-found-page"
import { USER_ROLES } from "@/shared/lib/permissions"
import { PreferencesPage } from "@/features/settings/preferences-page"
import { PokemonListPage } from "@/features/pokemon/components/pokemon-list-page"
import { PokemonDetailPage } from "@/features/pokemon/components/pokemon-detail-page"
import { PrevisaoTempoListPage } from "@/features/previsao-tempo/components/previsao-tempo-list-page"
import { PrevisaoTempoDetailPage } from "@/features/previsao-tempo/components/previsao-tempo-detail-page"

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
                path: "/tarefas",
                element: <TarefasPage />,
            },
            {
                path: "/pokemon",
                element: <PokemonListPage />,
            },
            {
                path: "/pokemon/:id",
                element: <PokemonDetailPage />,
                handle: {
                    detailSectionsEnabled: true,
                    breadcrumbLabel: (params: { id: string }) => `#${params.id.padStart(3, '0')}`,
                },
            },
            {
                path: "/previsao-tempo",
                element: <PrevisaoTempoListPage />,
            },
            {
                path: "/previsao-tempo/:coords",
                element: <PrevisaoTempoDetailPage />,
                handle: {
                    detailSectionsEnabled: true,
                    breadcrumbLabel: () => `Previsão`,
                },
            },
            {
                path: "/settings/preferences",
                element: (
                    <AppProtectedRoute requiredRoles={[USER_ROLES.ADMIN]}>
                        <PreferencesPage />
                    </AppProtectedRoute>
                ),
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
