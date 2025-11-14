import { createBrowserRouter } from "react-router-dom"
import { AppProtectedRoute } from "../components/layout/AppProtectedRoute"
import { AppLayout } from "../components/layout/AppLayout"
import { HomePage } from "../features/home/HomePage"
import { TodosPage } from "../features/todos/TodosPage"
import { ExamplePage } from "../features/example/ExamplePage"
import { AdminPage } from "../features/admin/AdminPage"
import { DesignSystemPage } from "../features/design-system/DesignSystemPage"
import { AuthCallbackPage } from "../features/auth/AuthCallbackPage"
import { LogoutPage } from "../features/auth/LogoutPage"
import { UnauthorizedPage } from "../features/auth/UnauthorizedPage"
import { NotFoundPage } from "../features/errors/NotFoundPage"
import { USER_ROLES } from "../core/constants/roles"

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
        path: "/todos",
        element: <TodosPage />,
      },
      {
        path: "/example",
        element: <ExamplePage />,
      },
      {
        path: "/design-system",
        element: <DesignSystemPage />,
      },
      {
        path: "/admin",
        element: (
          <AppProtectedRoute requiredRoles={[USER_ROLES.ADMIN]}>
            <AdminPage />
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
