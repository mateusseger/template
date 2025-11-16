import { createBrowserRouter } from "react-router-dom"
import { AppProtectedRoute } from "@/components/routing/AppProtectedRoute"
import { AppLayout } from "@/components/layout/AppLayout"
import { HomePage } from "@/features/home/HomePage"
import { TodosPage } from "@/features/todos/TodosPage"
import { DesignSystemPage } from "@/features/design-system/DesignSystemPage"
import { AuthCallbackPage } from "@/features/auth/AuthCallbackPage"
import { LogoutPage } from "@/features/auth/LogoutPage"
import { UnauthorizedPage } from "@/features/auth/UnauthorizedPage"
import { NotFoundPage } from "@/features/errors/NotFoundPage"
import { USER_ROLES } from "@/core/constants/roles"
import { PreferencesPage } from "@/features/settings/PreferencesPage"
import { DevolucoesListPage } from "@/features/devolucoes/DevolucoesListPage"
import { DevolucaoDetailPage } from "@/features/devolucoes/DevolucaoDetailPage"

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
                path: "/todos",
                element: <TodosPage />,
            },
            {
                path: "/devolucoes",
                element: <DevolucoesListPage />,
            },
            {
                path: "/devolucoes/:id",
                element: <DevolucaoDetailPage />,
                handle: {
                    detailSectionsEnabled: true,
                    breadcrumbLabel: (params: { id: string }) => `DEV-${params.id}`,
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
