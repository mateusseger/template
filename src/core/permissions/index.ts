/**
 * Permission Service - Barrel Export
 * 
 * Centralized exports for permission-related functionality
 */

export {
    hasRole,
    hasAnyRole,
    hasAllRoles,
    getRoleLevel,
    hasMinimumRoleLevel,
    getHighestRoleLevel,
    canAccess,
} from "./permissionService"

export { USER_ROLES, ROLE_HIERARCHY, type UserRole } from "@/core/constants/roles"
