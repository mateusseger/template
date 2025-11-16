/**
 * User Helper Utilities
 * 
 * Provides utility functions for working with user data:
 * - Role extraction
 * - Name formatting
 * - Initial generation for avatars
 * 
 * @example
 * ```ts
 * const roles = getUserRoles(user)
 * const initials = getUserInitials(user)
 * const displayName = getUserDisplayName(user)
 * ```
 */

import type { IUser } from "@/core/auth/auth-types"

/**
 * Extracts user roles from user object
 * 
 * Handles multiple formats:
 * 1. user.userRoles (enriched by authService)
 * 2. user.profile.userRoles (custom claim)
 * 3. user.profile.roles (direct claim)
 * 4. user.profile.resource_access[client_id].roles (Keycloak client-specific)
 * 5. user.profile.realm_access.roles (Keycloak realm-wide)
 * 
 * @param user - User object
 * @returns Array of role strings
 */
export function getUserRoles(user: IUser | null | undefined): string[] {
    if (!user) {
        return []
    }


    // Format 1: userRoles at root (enriched by authService)
    if (Array.isArray(user.userRoles) && user.userRoles.length > 0) {
        return user.userRoles
    }

    // Format 2: userRoles in profile (custom claim)
    if (user.profile?.userRoles && Array.isArray(user.profile.userRoles) && user.profile.userRoles.length > 0) {
        return user.profile.userRoles
    }

    // Format 3: roles in profile (direct claim)
    if (user.profile?.roles && Array.isArray(user.profile.roles) && user.profile.roles.length > 0) {
        return user.profile.roles
    }

    // Format 4: resource_access[client_id].roles (Keycloak client-specific)
    const clientId = import.meta.env.VITE_APP_CLIENT_ID || "react-app"
    if (user.profile?.resource_access?.[clientId]?.roles) {
        const clientRoles = user.profile.resource_access[clientId].roles
        if (Array.isArray(clientRoles) && clientRoles.length > 0) {
            return clientRoles
        }
    }

    // Format 5: realm_access.roles (Keycloak realm-wide)
    if (user.profile?.realm_access?.roles) {
        const realmRoles = user.profile.realm_access.roles
        if (Array.isArray(realmRoles) && realmRoles.length > 0) {
            return realmRoles
        }
    }

    return []
}

/**
 * Gets display name for user with safe fallbacks
 * 
 * Priority order:
 * 1. user.name
 * 2. user.profile.name
 * 3. user.email
 * 4. user.profile.email
 * 5. "User" (fallback)
 * 
 * @param user - User object
 * @returns Display name string
 */
export function getUserDisplayName(user: IUser | null | undefined): string {
    if (!user) {
        return "User"
    }

    return (
        user.name ||
        user.profile?.name ||
        user.email ||
        user.profile?.email ||
        "User"
    )
}

/**
 * Generates user initials for avatar display
 * 
 * Logic:
 * - Full name: First letter of first and last name ("John Doe" -> "JD")
 * - Email: First letter only ("john@example.com" -> "J")
 * - Fallback: "U" (User)
 * 
 * @param user - User object
 * @returns 1-2 character initials string
 */
export function getUserInitials(user: IUser | null | undefined): string {
    const displayName = getUserDisplayName(user)

    // Email format: use first character only
    if (displayName.includes("@")) {
        return displayName[0].toUpperCase()
    }

    // Name format: try first and last initials
    const nameParts = displayName.split(" ").filter(Boolean)
    if (nameParts.length > 1) {
        return (
            nameParts[0][0].toUpperCase() +
            nameParts[nameParts.length - 1][0].toUpperCase()
        )
    }

    // Single word or fallback: first character
    return displayName[0]?.toUpperCase() || "U"
}
