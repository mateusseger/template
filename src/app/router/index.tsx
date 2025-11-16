import { createBrowserRouter } from "react-router-dom"
import { AppProtectedRoute } from "@/shared/components/routing/AppProtectedRoute"
import { AppLayout } from "@/shared/components/layout/AppLayout"
import { HomePage } from "@/features/home/HomePage"
import { TarefasPage } from "@/features/tarefas/TarefasPage"
import { DesignSystemPage } from "@/features/design-system/DesignSystemPage"
import { AuthCallbackPage } from "@/features/auth/components/AuthCallbackPage"
import { LogoutPage } from "@/features/auth/components/LogoutPage"
import { UnauthorizedPage } from "@/features/auth/components/UnauthorizedPage"
import { NotFoundPage } from "@/features/errors/NotFoundPage"
import { USER_ROLES } from "@/shared/lib/permissions"
import { PreferencesPage } from "@/features/settings/PreferencesPage"
import { PokemonListPage } from "@/features/pokemon/components/PokemonListPage"
import { PokemonDetailPage } from "@/features/pokemon/components/PokemonDetailPage"
import { PrevisaoTempoListPage } from "@/features/previsao-tempo/components/PrevisaoTempoListPage"
import { PrevisaoTempoDetailPage } from "@/features/previsao-tempo/components/PrevisaoTempoDetailPage"

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
