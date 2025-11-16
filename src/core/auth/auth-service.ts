/**
 * Authentication Service
 * Serviço centralizado de autenticação com Keycloak/OIDC
 * 
 * Responsabilidades:
 * - Login e logout via OIDC
 * - Gerenciamento de tokens
 * - Extração e enrichment de roles
 * - Suporte a modo mock para desenvolvimento
 */

import { User, UserManager } from "oidc-client"
import { oidcConfig } from "./oidc-config"
import { isDevAuthBypassEnabled, createMockUser } from "./mock-auth"
import type { IUser, UserProfile } from "./auth-types"

const userManager = new UserManager(oidcConfig)
const DEV_MODE = isDevAuthBypassEnabled()
const CLIENT_ID = import.meta.env.VITE_APP_CLIENT_ID || "react-app"

// ==================== ROLE EXTRACTION ====================

/**
 * Extrai roles do profile do usuário (consolidado do roleExtractor)
 * Suporta múltiplos formatos Keycloak
 */
function extractRoles(profile: UserProfile | undefined): string[] {
    if (!profile) return []

    // 1. Custom userRoles claim
    if (Array.isArray(profile.userRoles) && profile.userRoles.length > 0) {
        return profile.userRoles
    }

    // 2. Client-specific roles (resource_access[client_id].roles)
    if (profile.resource_access?.[CLIENT_ID]?.roles) {
        const clientRoles = profile.resource_access[CLIENT_ID].roles
        if (Array.isArray(clientRoles) && clientRoles.length > 0) {
            return clientRoles
        }
    }

    // 3. Direct roles claim
    if (Array.isArray(profile.roles) && profile.roles.length > 0) {
        return profile.roles
    }

    // 4. Realm-wide roles
    if (profile.realm_access?.roles) {
        const realmRoles = profile.realm_access.roles
        if (Array.isArray(realmRoles) && realmRoles.length > 0) {
            return realmRoles
        }
    }

    return []
}

/**
 * Extrai informações básicas do usuário do profile
 */
function extractUserInfo(profile: UserProfile | undefined): { email?: string; name?: string } {
    if (!profile) return {}
    
    return {
        email: profile.email || profile.preferred_username,
        name: profile.name || profile.preferred_username || profile.email,
    }
}

/**
 * Enriquece usuário OIDC com dados da aplicação
 */
function enrichUser(user: User): IUser {
    const enrichedUser = user as IUser

    if (user.profile) {
        enrichedUser.userRoles = extractRoles(user.profile as UserProfile)
        const { email, name } = extractUserInfo(user.profile as UserProfile)
        enrichedUser.email = email
        enrichedUser.name = name
    } else {
        enrichedUser.userRoles = []
    }

    return enrichedUser
}

// ==================== PUBLIC API ====================

/**
 * Obtém o usuário autenticado atual
 * Retorna null se não autenticado ou token expirado
 */
export async function getUser(): Promise<IUser | null> {
    if (DEV_MODE) {
        const mockUser = createMockUser()
        localStorage.setItem("app-token", mockUser.access_token)
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
 * Verifica se usuário está autenticado
 */
export async function isAuthenticated(): Promise<boolean> {
    if (DEV_MODE) return true
    
    const user = await getUser()
    return !!user && !!user.access_token && !user.expired
}

/**
 * Inicia o fluxo de login (redireciona para Keycloak)
 */
export async function login(): Promise<void> {
    if (DEV_MODE) return

    try {
        await userManager.signinRedirect()
    } catch (error) {
        console.error("[AuthService] Login failed:", error)
        throw new Error("Failed to initiate login")
    }
}

/**
 * Processa callback após redirect do Keycloak
 */
export async function handleCallback(): Promise<IUser | null> {
    if (DEV_MODE) {
        return createMockUser()
    }

    try {
        const user = await userManager.signinRedirectCallback()

        if (!user || !user.access_token) {
            throw new Error("Invalid user data received")
        }

        const enrichedUser = enrichUser(user)
        localStorage.setItem("app-token", user.access_token)

        return enrichedUser
    } catch (error) {
        console.error("[AuthService] Callback processing failed:", error)
        throw new Error("Failed to process authentication callback")
    }
}

/**
 * Realiza logout completo (limpa sessão e redireciona)
 */
export async function logout(): Promise<void> {
    if (DEV_MODE) {
        localStorage.clear()
        sessionStorage.clear()
        window.location.href = "/"
        return
    }

    try {
        await userManager.signoutRedirect()
        localStorage.clear()
        sessionStorage.clear()
    } catch (error) {
        console.error("[AuthService] Logout failed, performing fallback:", error)

        try {
            await userManager.removeUser()
        } catch (e) {
            console.error("[AuthService] Failed to remove user:", e)
        }

        localStorage.clear()
        sessionStorage.clear()

        const authority = import.meta.env.VITE_APP_AUTHORITY
        const redirectUri = encodeURIComponent(window.location.origin)
        window.location.href = `${authority}/protocol/openid-connect/logout?post_logout_redirect_uri=${redirectUri}`
    }
}

/**
 * Obtém o access token atual
 */
export async function getToken(): Promise<string | null> {
    if (DEV_MODE) return "mock_access_token"
    
    const user = await getUser()
    return user?.access_token || null
}

/**
 * Renova o token usando refresh token
 */
export async function renewToken(): Promise<IUser | null> {
    if (DEV_MODE) return createMockUser()

    try {
        const user = await userManager.signinSilent()
        return enrichUser(user)
    } catch (error) {
        console.error("[AuthService] Token renewal failed:", error)
        return null
    }
}

// ==================== CONSTANTS ====================

export const AUTH_STORAGE_KEYS = {
    TOKEN: "app-token",
    USER: "app-user",
    STATE: "oidc-state",
} as const

export const PUBLIC_ROUTES = [
    "/auth/callback",
    "/auth/logout",
    "/unauthorized",
] as const

export const AUTH_ERRORS = {
    CALLBACK_FAILED: "Failed to process authentication callback",
    LOGOUT_FAILED: "Failed to complete logout process",
    TOKEN_EXPIRED: "Your session has expired. Please login again",
    UNAUTHORIZED: "You don't have permission to access this resource",
    INVALID_USER: "Invalid user data received",
    NETWORK_ERROR: "Network error occurred during authentication",
} as const

export { userManager, createMockUser }
