/**
 * Permissions & Role-Based Access Control (RBAC)
 * Sistema centralizado de permissões e roles
 */

// ==================== ROLE DEFINITIONS ====================

export const USER_ROLES = {
    ADMIN: "admin",
    EDITOR: "editor",
    VIEWER: "viewer",
    USER: "user",
} as const

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES]

export const ROLE_HIERARCHY: Record<UserRole, number> = {
    [USER_ROLES.ADMIN]: 4,
    [USER_ROLES.EDITOR]: 3,
    [USER_ROLES.VIEWER]: 2,
    [USER_ROLES.USER]: 1,
}

// ==================== PERMISSION CHECKS ====================

/**
 * Verifica se usuário possui uma role específica
 */
export function hasRole(userRoles: string[], requiredRole: UserRole): boolean {
    return userRoles.includes(requiredRole)
}

/**
 * Verifica se usuário possui QUALQUER uma das roles requeridas (OR)
 */
export function hasAnyRole(userRoles: string[], requiredRoles: UserRole[]): boolean {
    if (requiredRoles.length === 0) return true
    return requiredRoles.some((role) => userRoles.includes(role))
}

/**
 * Verifica se usuário possui TODAS as roles requeridas (AND)
 */
export function hasAllRoles(userRoles: string[], requiredRoles: UserRole[]): boolean {
    if (requiredRoles.length === 0) return true
    return requiredRoles.every((role) => userRoles.includes(role))
}

/**
 * Obtém o nível hierárquico de uma role
 */
export function getRoleLevel(role: UserRole): number {
    return ROLE_HIERARCHY[role] ?? 0
}

/**
 * Verifica se usuário possui ao menos o nível mínimo de role
 */
export function hasMinimumRoleLevel(userRoles: string[], minimumRole: UserRole): boolean {
    const minimumLevel = getRoleLevel(minimumRole)
    return userRoles.some((role) => getRoleLevel(role as UserRole) >= minimumLevel)
}

/**
 * Obtém o maior nível de role do usuário
 */
export function getHighestRoleLevel(userRoles: string[]): number {
    return Math.max(
        0,
        ...userRoles.map((role) => getRoleLevel(role as UserRole))
    )
}

/**
 * Verifica se usuário pode acessar um recurso
 * (Alias para hasAnyRole)
 */
export function canAccess(userRoles: string[], requiredRoles: UserRole[]): boolean {
    return hasAnyRole(userRoles, requiredRoles)
}
