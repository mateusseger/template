/**
 * Role Extraction Utilities
 * 
 * Handles extraction of user roles from various Keycloak token formats
 */

import type { UserProfile } from "./types"

/**
 * Extracts roles from Keycloak token profile supporting multiple formats
 * 
 * Supports the following formats (in order of precedence):
 * 1. userRoles array (custom claim)
 * 2. roles array (direct claim)
 * 3. resource_access[client_id].roles (client-specific roles)
 * 4. realm_access.roles (realm-wide roles)
 * 
 * @param profile - User profile from OIDC token
 * @param clientId - Optional client ID for resource_access lookup
 * @returns Array of role strings
 */
/**
 * Extracts roles from Keycloak token profile supporting multiple formats
 * 
 * Supports the following formats (in order of precedence):
 * 1. userRoles array (custom claim)
 * 2. resource_access[client_id].roles (client-specific roles) - HIGHEST PRIORITY for Keycloak
 * 3. roles array (direct claim)
 * 4. realm_access.roles (realm-wide roles)
 * 
 * @param profile - User profile from OIDC token
 * @param clientId - Optional client ID for resource_access lookup
 * @returns Array of role strings
 */
export function extractRolesFromProfile(
    profile: UserProfile | undefined,
    clientId?: string
): string[] {
    if (!profile) {
        return []
    }

    // Format 1: Custom userRoles claim (highest priority if exists)
    if (Array.isArray(profile.userRoles) && profile.userRoles.length > 0) {
        return profile.userRoles
    }

    // Format 2: Client-specific roles (resource_access[client_id].roles)
    // This should be checked BEFORE direct roles for Keycloak
    if (clientId && profile.resource_access?.[clientId]?.roles) {
        const clientRoles = profile.resource_access[clientId].roles
        if (Array.isArray(clientRoles) && clientRoles.length > 0) {
            return clientRoles
        }
    }

    // Format 3: Direct roles claim
    // Only use if no client-specific roles found
    if (Array.isArray(profile.roles) && profile.roles.length > 0) {
        return profile.roles
    }

    // Format 4: Realm-wide roles (realm_access.roles)
    // Fallback to realm roles if nothing else found
    if (profile.realm_access?.roles) {
        const realmRoles = profile.realm_access.roles
        if (Array.isArray(realmRoles) && realmRoles.length > 0) {
            return realmRoles
        }
    }

    return []
}

/**
 * Extracts basic user information from profile
 * 
 * @param profile - User profile from OIDC token
 * @returns Object with email and name
 */
export function extractUserInfo(profile: UserProfile | undefined): {
    email?: string
    name?: string
} {
    if (!profile) {
        return {}
    }

    return {
        email: profile.email || profile.preferred_username,
        name: profile.name || profile.preferred_username || profile.email,
    }
}
