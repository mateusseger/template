import { useAuth } from "@/core/hooks/useAuth"
import { hasAnyRole, hasAllRoles, hasMinimumRoleLevel, type UserRole } from "@/core/constants/roles"

export function useAuthorization() {
    const { user } = useAuth()

    const getUserRoles = (): string[] => {
        return user?.profile?.["userRoles"] ?? user?.userRoles ?? []
    }

    const canAccess = (requiredRoles: UserRole[]): boolean => {
        const userRoles = getUserRoles()
        return hasAnyRole(userRoles, requiredRoles)
    }

    const canAccessAll = (requiredRoles: UserRole[]): boolean => {
        const userRoles = getUserRoles()
        return hasAllRoles(userRoles, requiredRoles)
    }

    const hasMinimumLevel = (minimumRole: UserRole): boolean => {
        const userRoles = getUserRoles()
        return hasMinimumRoleLevel(userRoles, minimumRole)
    }

    const hasRole = (role: UserRole): boolean => {
        const userRoles = getUserRoles()
        return userRoles.includes(role)
    }

    return {
        userRoles: getUserRoles(),
        canAccess,
        canAccessAll,
        hasMinimumLevel,
        hasRole,
    }
}
