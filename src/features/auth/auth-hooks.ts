// Hooks de autenticação e autorização consolidados

import { useContext } from "react"
import { AuthContext } from "./auth-context"
import { getUserRoles } from "@/shared/lib/user"
import {
    hasAnyRole,
    hasAllRoles,
    hasMinimumRoleLevel,
    type UserRole,
} from "@/shared/lib/permissions"

// Hook de autenticação - Fornece acesso ao contexto de autenticação
export function useAuth() {
    const context = useContext(AuthContext)

    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthContextProvider")
    }

    return context
}

// Hook de autorização - Verifica roles e permissões do usuário
export function useAuthorization() {
    const { user } = useAuth()
    const userRoles = getUserRoles(user)

    // Verifica se o usuário tem alguma das roles necessárias
    const canAccess = (requiredRoles: UserRole[]): boolean => {
        return hasAnyRole(userRoles, requiredRoles)
    }

    // Verifica se o usuário tem todas as roles necessárias
    const canAccessAll = (requiredRoles: UserRole[]): boolean => {
        return hasAllRoles(userRoles, requiredRoles)
    }

    // Verifica se o usuário tem pelo menos o nível mínimo de role
    const hasMinimumLevel = (minimumRole: UserRole): boolean => {
        return hasMinimumRoleLevel(userRoles, minimumRole)
    }

    // Verifica se o usuário tem uma role específica
    const hasRole = (role: UserRole): boolean => {
        return userRoles.includes(role)
    }

    return {
        userRoles,
        canAccess,
        canAccessAll,
        hasMinimumLevel,
        hasRole,
    }
}

