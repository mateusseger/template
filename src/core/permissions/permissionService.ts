/**
 * Permission Service
 * 
 * Centralized permission checking logic for the application
 */

import type { UserRole } from "@/core/constants/roles"
import { ROLE_HIERARCHY } from "@/core/constants/roles"

/**
 * Checks if user has a specific role
 * 
 * @param userRoles - Array of user's roles
 * @param requiredRole - Role to check for
 * @returns true if user has the role
 */
export function hasRole(userRoles: string[], requiredRole: UserRole): boolean {
    return userRoles.includes(requiredRole)
}

/**
 * Checks if user has ANY of the required roles
 * 
 * @param userRoles - Array of user's roles
 * @param requiredRoles - Array of roles to check for
 * @returns true if user has at least one of the required roles
 */
export function hasAnyRole(userRoles: string[], requiredRoles: UserRole[]): boolean {
    if (requiredRoles.length === 0) {
        return true
    }
    return requiredRoles.some((role) => userRoles.includes(role))
}

/**
 * Checks if user has ALL of the required roles
 * 
 * @param userRoles - Array of user's roles
 * @param requiredRoles - Array of roles to check for
 * @returns true if user has all of the required roles
 */
export function hasAllRoles(userRoles: string[], requiredRoles: UserRole[]): boolean {
    if (requiredRoles.length === 0) {
        return true
    }
    return requiredRoles.every((role) => userRoles.includes(role))
}

/**
 * Gets the hierarchy level of a role
 * 
 * @param role - Role to get level for
 * @returns Numeric level (higher = more permissions)
 */
export function getRoleLevel(role: UserRole): number {
    return ROLE_HIERARCHY[role] ?? 0
}

/**
 * Checks if user has at least the minimum required role level
 * 
 * @param userRoles - Array of user's roles
 * @param minimumRole - Minimum required role
 * @returns true if user has a role with equal or higher level
 */
export function hasMinimumRoleLevel(userRoles: string[], minimumRole: UserRole): boolean {
    const minimumLevel = getRoleLevel(minimumRole)
    return userRoles.some((role) => getRoleLevel(role as UserRole) >= minimumLevel)
}

/**
 * Gets the highest role level from user's roles
 * 
 * @param userRoles - Array of user's roles
 * @returns Highest role level
 */
export function getHighestRoleLevel(userRoles: string[]): number {
    return Math.max(
        0,
        ...userRoles.map((role) => getRoleLevel(role as UserRole))
    )
}

/**
 * Checks if user can access a resource based on roles
 * 
 * @param userRoles - Array of user's roles
 * @param requiredRoles - Array of roles required for access (empty = any authenticated user)
 * @returns true if user can access
 */
export function canAccess(userRoles: string[], requiredRoles: UserRole[]): boolean {
    return hasAnyRole(userRoles, requiredRoles)
}
