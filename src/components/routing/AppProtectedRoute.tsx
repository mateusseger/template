/**
 * Protected Route Component
 * 
 * Protects routes based on authentication and role-based authorization.
 * 
 * Features:
 * - Requires authentication (handled by AuthContext)
 * - Optional role-based access control
 * - Automatic redirect to /unauthorized for insufficient permissions
 * - No content flash during authorization checks
 * 
 * @example
 * ```tsx
 * // Any authenticated user
 * <AppProtectedRoute>
 *   <HomePage />
 * </AppProtectedRoute>
 * 
 * // Only admin users
 * <AppProtectedRoute requiredRoles={[USER_ROLES.ADMIN]}>
 *   <AdminPanel />
 * </AppProtectedRoute>
 * 
 * // Editor or Admin users
 * <AppProtectedRoute requiredRoles={[USER_ROLES.EDITOR, USER_ROLES.ADMIN]}>
 *   <EditorView />
 * </AppProtectedRoute>
 * ```
 */

import { type ReactNode, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { getUserRoles } from "@/core/lib/user-helpers"
import { hasAnyRole, type UserRole } from "@/core/permissions"

interface ProtectedRouteProps {
    /** Child components to render if authorized */
    children: ReactNode

    /** 
     * Required roles for access (empty = any authenticated user)
     * User needs ANY of the specified roles (OR logic)
     */
    requiredRoles?: UserRole[]
}

export function AppProtectedRoute({ children, requiredRoles = [] }: ProtectedRouteProps) {
    const navigate = useNavigate()
    const { user, isAuthenticated } = useAuth()

    // Extract user roles
    const userRoles = getUserRoles(user)

    // Check if user has required access
    const hasRequiredAccess = requiredRoles.length === 0 || hasAnyRole(userRoles, requiredRoles)

    useEffect(() => {
        // AuthContext handles redirect when not authenticated
        if (!isAuthenticated) {
            return
        }

        // Redirect if user doesn't have required permissions
        if (!hasRequiredAccess) {
            navigate("/unauthorized", { replace: true })
        }
    }, [isAuthenticated, hasRequiredAccess, navigate])

    // Don't render if not authenticated (AuthContext handles redirect)
    if (!isAuthenticated) {
        return null
    }

    // Don't render if unauthorized (redirect in progress)
    if (!hasRequiredAccess) {
        return null
    }

    return <>{children}</>
}

