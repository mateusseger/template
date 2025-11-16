// Feature Auth - Barrel export

// Components
export { AuthCallbackPage } from "./components/AuthCallbackPage"
export { LogoutPage } from "./components/LogoutPage"
export { UnauthorizedPage } from "./components/UnauthorizedPage"

// Hooks
export { useAuth, useAuthorization } from "./auth-hooks"

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
