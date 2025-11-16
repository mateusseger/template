/**
 * Authentication Service
 * 
 * Core authentication service providing a clean API for:
 * - User authentication (login/logout)
 * - Token management
 * - User session management
 * - Role extraction and enrichment
 * 
 * Supports both production (OIDC/Keycloak) and development (mock) modes
 */

import { User, UserManager } from "oidc-client"
import { oidcConfig } from "./oidcConfig"
import { AUTH_STORAGE_KEYS, AUTH_ERRORS } from "./constants"
import { extractRolesFromProfile, extractUserInfo } from "./roleExtractor"
import { isDevAuthBypassEnabled, createMockUser } from "./mockAuth"
import type { IUser } from "./types"

// Initialize UserManager
const userManager = new UserManager(oidcConfig)

// Environment configuration
const DEV_MODE = isDevAuthBypassEnabled()
const CLIENT_ID = import.meta.env.VITE_APP_CLIENT_ID || "react-app"

// ==================== USER ENRICHMENT ====================

/**
 * Enriches OIDC user with application-specific data
 * 
 * @param user - Raw OIDC user object
 * @returns Enriched user with roles, email, and name
 */
function enrichUser(user: User): IUser {
    const enrichedUser = user as IUser

    if (user.profile) {
        // Extract roles from various Keycloak formats
        enrichedUser.userRoles = extractRolesFromProfile(user.profile as any, CLIENT_ID)


        // Extract user info
        const { email, name } = extractUserInfo(user.profile as any)
        enrichedUser.email = email
        enrichedUser.name = name
    } else {
        // Fallback if profile is missing
        enrichedUser.userRoles = []
    }

    return enrichedUser
}

// ==================== PUBLIC API ====================

/**
 * Gets the currently authenticated user
 * 
 * Returns enriched user object with roles and profile information,
 * or null if user is not authenticated or token is expired.
 * 
 * In development mode, returns a mock user if DEV_AUTH_BYPASS is enabled.
 * 
 * @returns Promise resolving to user object or null
 */
export async function getUser(): Promise<IUser | null> {
    if (DEV_MODE) {
        const mockUser = createMockUser()
        localStorage.setItem(AUTH_STORAGE_KEYS.TOKEN, mockUser.access_token)
        return mockUser
    }

    try {
        const user = await userManager.getUser()

        if (!user || user.expired) {
            return null
        }

        return enrichUser(user)
    } catch (error) {
        console.error("[AuthService] Error getting user:", error)
        return null
    }
}

/**
 * Checks if user is currently authenticated
 * 
 * @returns Promise resolving to authentication status
 */
export async function isAuthenticated(): Promise<boolean> {
    if (DEV_MODE) {
        return true
    }

    const user = await getUser()
    return !!user && !!user.access_token && !user.expired
}

/**
 * Initiates the login flow
 * 
 * Redirects user to OIDC provider (Keycloak) for authentication.
 * After successful authentication, user will be redirected back to the callback URL.
 * 
 * In development mode, this is a no-op.
 * 
 * @throws Error if login redirect fails
 */
export async function login(): Promise<void> {
    if (DEV_MODE) {
        return
    }

    try {
        await userManager.signinRedirect()
    } catch (error) {
        console.error("[AuthService] Login failed:", error)
        throw new Error(AUTH_ERRORS.NETWORK_ERROR)
    }
}

/**
 * Handles authentication callback after redirect from OIDC provider
 * 
 * Processes the callback URL, extracts tokens, enriches user data,
 * and stores authentication information.
 * 
 * @returns Promise resolving to enriched user object or null on failure
 * @throws Error if callback processing fails
 */
export async function handleCallback(): Promise<IUser | null> {
    if (DEV_MODE) {
        return createMockUser()
    }

    try {
        const user = await userManager.signinRedirectCallback()

        if (!user || !user.access_token) {
            throw new Error(AUTH_ERRORS.INVALID_USER)
        }

        const enrichedUser = enrichUser(user)

        // Store access token
        localStorage.setItem(AUTH_STORAGE_KEYS.TOKEN, user.access_token)

        return enrichedUser
    } catch (error) {
        console.error("[AuthService] Callback processing failed:", error)
        throw new Error(AUTH_ERRORS.CALLBACK_FAILED)
    }
}

/**
 * Logs out the current user
 * 
 * Performs complete logout by:
 * 1. Calling OIDC provider's logout endpoint (signoutRedirect)
 * 2. Clearing local storage
 * 3. Clearing session storage
 * 4. Redirecting to post-logout URL
 * 
 * On error, performs fallback cleanup and manual redirect.
 * 
 * @throws Error if logout fails (caught internally with fallback)
 */
export async function logout(): Promise<void> {
    if (DEV_MODE) {
        localStorage.clear()
        sessionStorage.clear()
        window.location.href = "/"
        return
    }

    try {
        // Primary logout method: signoutRedirect handles everything
        await userManager.signoutRedirect()

        // Cleanup storage (signoutRedirect does this too, but being explicit)
        localStorage.clear()
        sessionStorage.clear()
    } catch (error) {
        console.error("[AuthService] Logout failed, performing fallback:", error)

        // Fallback: Manual cleanup and redirect
        try {
            await userManager.removeUser()
        } catch (e) {
            console.error("[AuthService] Failed to remove user:", e)
        }

        localStorage.clear()
        sessionStorage.clear()

        // Construct Keycloak logout URL manually
        const authority = import.meta.env.VITE_APP_AUTHORITY
        const redirectUri = encodeURIComponent(window.location.origin)
        window.location.href = `${authority}/protocol/openid-connect/logout?post_logout_redirect_uri=${redirectUri}`
    }
}

/**
 * Gets the current access token
 * 
 * @returns Promise resolving to access token or null
 */
export async function getToken(): Promise<string | null> {
    if (DEV_MODE) {
        return "mock_access_token"
    }

    const user = await getUser()
    return user?.access_token || null
}

/**
 * Renews the access token using refresh token
 * 
 * Performs silent token renewal without user interaction.
 * 
 * @returns Promise resolving to refreshed user or null on failure
 */
export async function renewToken(): Promise<IUser | null> {
    if (DEV_MODE) {
        return createMockUser()
    }

    try {
        const user = await userManager.signinSilent()
        return enrichUser(user)
    } catch (error) {
        console.error("[AuthService] Token renewal failed:", error)
        return null
    }
}

// ==================== EXPORTS ====================

export { userManager, createMockUser }

