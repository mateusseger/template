// Serviço centralizado de autenticação com Keycloak/OIDC
// Inclui: service + config + mock consolidados

import { User, UserManager, type UserManagerSettings, WebStorageStateStore } from "oidc-client"
import { USER_ROLES } from "@/shared/lib/permissions"
import type { IUser, UserProfile } from "./auth-types"

// ==================== CONFIG ====================

const oidcConfig: UserManagerSettings = {
  authority: import.meta.env.VITE_APP_AUTHORITY,
  client_id: import.meta.env.VITE_APP_CLIENT_ID,
  redirect_uri: `${window.location.origin}/auth/callback`,
  silent_redirect_uri: `${window.location.origin}/auth/callback`,
  response_type: import.meta.env.VITE_APP_RESPONSE_TYPE,
  scope: import.meta.env.VITE_APP_SCOPE,
  post_logout_redirect_uri: `${window.location.origin}`,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  stateStore: new WebStorageStateStore({ store: window.localStorage }),
  revokeAccessTokenOnSignout: true,
}

const userManager = new UserManager(oidcConfig)
const DEV_MODE = import.meta.env.VITE_DEV_AUTH_BYPASS === "true"
const CLIENT_ID = import.meta.env.VITE_APP_CLIENT_ID || "react-app"

// ==================== MOCK AUTH ====================

function getDevMockRoles(): string[] {
    const rolesEnv = import.meta.env.VITE_DEV_MOCK_ROLES
    if (rolesEnv && typeof rolesEnv === "string") {
        return rolesEnv
            .split(",")
            .map((role) => role.trim())
            .filter(Boolean)
    }
    return [USER_ROLES.USER]
}

function createMockUser(customRoles?: string[]): IUser {
    const roles = customRoles ?? getDevMockRoles()
    const now = Math.floor(Date.now() / 1000)
    const expiresIn = 3600

    return {
        id_token: "mock_id_token",
        session_state: "mock_session_state",
        access_token: "mock_access_token",
        refresh_token: "mock_refresh_token",
        token_type: "Bearer",
        scope: "openid profile email roles",
        profile: {
            iss: "http://localhost:8080/realms/herval",
            aud: "react-app",
            exp: now + expiresIn,
            iat: now,
            sub: "mock-user-id-12345",
            name: "Mock User (Dev Mode)",
            email: "mock.user@dev.local",
            email_verified: true,
            preferred_username: "mockuser",
            given_name: "Mock",
            family_name: "User",
            userRoles: roles,
        },
        expires_at: now + expiresIn,
        expired: false,
        scopes: ["openid", "profile", "email", "roles"],
        toStorageString: () => JSON.stringify({}),
        state: "mock_state",
        expires_in: expiresIn,
        email: "mock.user@dev.local",
        name: "Mock User (Dev Mode)",
        userRoles: roles,
    } as IUser
}

// ==================== ROLE EXTRACTION ====================

// Extrai roles do profile do usuário (suporta múltiplos formatos Keycloak)
function extractRoles(profile: UserProfile | undefined): string[] {
    if (!profile) return []

    // 1. Custom userRoles claim
    if (Array.isArray(profile.userRoles) && profile.userRoles.length > 0) {
        return profile.userRoles
    }

    // 2. Client-specific roles
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

function extractUserInfo(profile: UserProfile | undefined): { email?: string; name?: string } {
    if (!profile) return {}
    
    return {
        email: profile.email || profile.preferred_username,
        name: profile.name || profile.preferred_username || profile.email,
    }
}

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

// Obtém o usuário autenticado atual
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
        console.error("[AuthService] Erro ao obter usuário:", error)
        return null
    }
}

// Verifica se usuário está autenticado
export async function isAuthenticated(): Promise<boolean> {
    if (DEV_MODE) return true
    
    const user = await getUser()
    return !!user && !!user.access_token && !user.expired
}

// Inicia o fluxo de login (redireciona para Keycloak)
export async function login(): Promise<void> {
    if (DEV_MODE) return

    try {
        await userManager.signinRedirect()
    } catch (error) {
        console.error("[AuthService] Erro no login:", error)
        throw new Error("Falha ao iniciar login")
    }
}

// Processa callback após redirect do Keycloak
export async function handleCallback(): Promise<IUser | null> {
    if (DEV_MODE) {
        return createMockUser()
    }

    try {
        const user = await userManager.signinRedirectCallback()

        if (!user || !user.access_token) {
            throw new Error("Dados de usuário inválidos")
        }

        const enrichedUser = enrichUser(user)
        localStorage.setItem("app-token", user.access_token)

        return enrichedUser
    } catch (error) {
        console.error("[AuthService] Erro no callback:", error)
        throw new Error("Falha ao processar callback de autenticação")
    }
}

// Realiza logout completo (limpa sessão e redireciona)
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
        console.error("[AuthService] Erro no logout, fazendo fallback:", error)

        try {
            await userManager.removeUser()
        } catch (e) {
            console.error("[AuthService] Falha ao remover usuário:", e)
        }

        localStorage.clear()
        sessionStorage.clear()

        const authority = import.meta.env.VITE_APP_AUTHORITY
        const redirectUri = encodeURIComponent(window.location.origin)
        window.location.href = `${authority}/protocol/openid-connect/logout?post_logout_redirect_uri=${redirectUri}`
    }
}

// Obtém o access token atual
export async function getToken(): Promise<string | null> {
    if (DEV_MODE) return "mock_access_token"
    
    const user = await getUser()
    return user?.access_token || null
}

// Renova o token usando refresh token
export async function renewToken(): Promise<IUser | null> {
    if (DEV_MODE) return createMockUser()

    try {
        const user = await userManager.signinSilent()
        return enrichUser(user)
    } catch (error) {
        console.error("[AuthService] Erro ao renovar token:", error)
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
    CALLBACK_FAILED: "Falha ao processar callback de autenticação",
    LOGOUT_FAILED: "Falha ao completar logout",
    TOKEN_EXPIRED: "Sua sessão expirou. Por favor, faça login novamente",
    UNAUTHORIZED: "Você não tem permissão para acessar este recurso",
    INVALID_USER: "Dados de usuário inválidos recebidos",
    NETWORK_ERROR: "Erro de rede durante autenticação",
} as const

export { userManager, createMockUser }

