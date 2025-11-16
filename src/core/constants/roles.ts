/**
 * User Roles and Permissions System
 * 
 * @deprecated The permission functions in this file are deprecated.
 * Please use @/core/permissions instead:
 * 
 * import { hasRole, hasAnyRole, hasAllRoles } from "@/core/permissions"
 * 
 * Role constants and types are still exported from here for backward compatibility.
 */

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

// Re-export from permission service for backward compatibility
export { hasRole, hasAnyRole, hasAllRoles, getRoleLevel, hasMinimumRoleLevel } from "@/core/permissions/permissionService"

