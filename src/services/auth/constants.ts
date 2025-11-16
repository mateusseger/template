/**
 * Authentication Constants
 * 
 * Centralizes all authentication-related constants for better maintainability
 */

/**
 * Storage keys for authentication tokens and state
 */
export const AUTH_STORAGE_KEYS = {
    TOKEN: "app-token",
    USER: "app-user",
    STATE: "oidc-state",
} as const

/**
 * Public routes that don't require authentication
 */
export const PUBLIC_ROUTES = [
    "/auth/callback",
    "/auth/logout",
    "/unauthorized",
] as const

/**
 * Authentication error codes and messages
 */
export const AUTH_ERRORS = {
    CALLBACK_FAILED: "Failed to process authentication callback",
    LOGOUT_FAILED: "Failed to complete logout process",
    TOKEN_EXPIRED: "Your session has expired. Please login again",
    UNAUTHORIZED: "You don't have permission to access this resource",
    INVALID_USER: "Invalid user data received",
    NETWORK_ERROR: "Network error occurred during authentication",
} as const

/**
 * Default redirect paths
 */
export const AUTH_REDIRECTS = {
    AFTER_LOGIN: "/",
    AFTER_LOGOUT: "/",
    UNAUTHORIZED: "/unauthorized",
} as const
