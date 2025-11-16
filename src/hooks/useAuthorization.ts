/**
 * Authorization Hook
 * 
 * Provides role-based authorization checks for the current user.
 * 
 * Features:
 * - Check for specific roles
 * - Check for ANY required role
 * - Check for ALL required roles
 * - Check minimum role level (hierarchy-based)
 * - Access user's roles directly
 * 
 * @example
 * ```tsx
 * const { hasRole, canAccess, userRoles } = useAuthorization()
 * 
 * if (hasRole(USER_ROLES.ADMIN)) {
 *   // Show admin UI
 * }
 * 
 * if (canAccess([USER_ROLES.EDITOR, USER_ROLES.ADMIN])) {
 *   // Show edit button
 * }
 * ```
 */

import { useAuth } from "@/hooks/useAuth"
import { getUserRoles } from "@/core/lib/user-helpers"
import {
    hasAnyRole,
    hasAllRoles,
    hasMinimumRoleLevel,
    type UserRole,
} from "@/core/permissions"

export function useAuthorization() {
    const { user } = useAuth()
    const userRoles = getUserRoles(user)

    /**
     * Check if user has ANY of the required roles
     */
    const canAccess = (requiredRoles: UserRole[]): boolean => {
        return hasAnyRole(userRoles, requiredRoles)
    }

    /**
     * Check if user has ALL of the required roles
     */
    const canAccessAll = (requiredRoles: UserRole[]): boolean => {
        return hasAllRoles(userRoles, requiredRoles)
    }

    /**
     * Check if user has at least the minimum role level
     */
    const hasMinimumLevel = (minimumRole: UserRole): boolean => {
        return hasMinimumRoleLevel(userRoles, minimumRole)
    }

    /**
     * Check if user has a specific role
     */
    const hasRole = (role: UserRole): boolean => {
        return userRoles.includes(role)
    }

    return {
        /** Current user's roles */
        userRoles,

        /** Check if user has ANY of the required roles */
        canAccess,

        /** Check if user has ALL of the required roles */
        canAccessAll,

        /** Check if user has at least the minimum role level */
        hasMinimumLevel,

        /** Check if user has a specific role */
        hasRole,
    }
}

