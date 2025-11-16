/**
 * Core Auth Module
 * Exports públicos do módulo de autenticação
 */

// Context
export { AuthContext, AuthContextProvider } from "./auth-context"
export type { AuthContextType } from "./auth-context"

// Service
export {
    getUser,
    isAuthenticated,
    login,
    logout,
    handleCallback,
    getToken,
    renewToken,
    AUTH_STORAGE_KEYS,
    PUBLIC_ROUTES,
    AUTH_ERRORS,
} from "./auth-service"

// Types
export type { IUser, UserProfile, AuthState, AuthConfig } from "./auth-types"

// Mock (para testes)
export { createMockUser, isDevAuthBypassEnabled } from "./mock-auth"
