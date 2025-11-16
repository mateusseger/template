/**
 * Authentication Service - Barrel Export
 * 
 * Centralized exports for easy importing of auth functionality
 * 
 * @example
 * ```ts
 * import { getUser, login, logout } from '@/services/auth'
 * import type { IUser } from '@/services/auth'
 * ```
 */

// Core service functions
export {
    getUser,
    isAuthenticated,
    login,
    logout,
    handleCallback,
    getToken,
    renewToken,
    userManager,
    createMockUser,
} from "./authService"

// Context and provider
export { AuthContext, AuthContextProvider, type AuthContextType } from "./authContext"

// Types
export type { IUser, UserProfile, AuthState, AuthConfig } from "./types"

// Constants
export { AUTH_STORAGE_KEYS, PUBLIC_ROUTES, AUTH_ERRORS, AUTH_REDIRECTS } from "./constants"

// Utilities
export { extractRolesFromProfile, extractUserInfo } from "./roleExtractor"
export { isDevAuthBypassEnabled } from "./mockAuth"

// Configuration
export { oidcConfig } from "./oidcConfig"
