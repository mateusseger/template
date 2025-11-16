/**
 * Authentication Context
 * 
 * Provides global authentication state and actions throughout the application.
 * 
 * Features:
 * - Automatic authentication check on mount
 * - Public route detection (no auth required)
 * - Loading states during auth operations
 * - User state management
 * - Login/logout functions
 * 
 * Usage:
 * ```tsx
 * const { user, isAuthenticated, isLoading, logout, refreshUser } = useAuth()
 * ```
 */

import { createContext, type ReactNode, useEffect, useState, useCallback } from "react"
import { getUser, login, logout as authLogout } from "./authService"
import { PUBLIC_ROUTES } from "./constants"
import type { IUser } from "./types"

// ==================== TYPES ====================

export type AuthContextType = {
    /** Current authenticated user or null */
    user: IUser | null

    /** Whether user is authenticated */
    isAuthenticated: boolean

    /** Whether auth state is being loaded/checked */
    isLoading: boolean

    /** Initiates login flow */
    login: () => Promise<void>

    /** Logs out current user */
    logout: () => Promise<void>

    /** Refreshes user data from auth service */
    refreshUser: () => Promise<void>
}

interface AuthContextProviderProps {
    children: ReactNode
}

// ==================== CONTEXT ====================

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

// ==================== PROVIDER ====================

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [user, setUser] = useState<IUser | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    /**
     * Checks if current route is public (doesn't require authentication)
     */
    const isPublicRoute = useCallback((): boolean => {
        const pathname = window.location.pathname
        return PUBLIC_ROUTES.some((route) => pathname.startsWith(route))
    }, [])

    /**
     * Refreshes user data from auth service
     */
    const refreshUser = useCallback(async () => {
        try {
            const currentUser = await getUser()

            if (currentUser) {
                setUser(currentUser)
                setIsAuthenticated(true)
            } else {
                setUser(null)
                setIsAuthenticated(false)
            }
        } catch (error) {
            console.error("[AuthContext] Error refreshing user:", error)
            setUser(null)
            setIsAuthenticated(false)
        }
    }, [])

    /**
     * Logs out current user
     */
    const handleLogout = useCallback(async () => {
        try {
            await authLogout()
            setUser(null)
            setIsAuthenticated(false)
        } catch (error) {
            console.error("[AuthContext] Error during logout:", error)
            // Force cleanup on error
            setUser(null)
            setIsAuthenticated(false)
            window.location.href = "/"
        }
    }, [])

    /**
     * Initiates login flow
     */
    const handleLogin = useCallback(async () => {
        try {
            await login()
        } catch (error) {
            console.error("[AuthContext] Error during login:", error)
            throw error
        }
    }, [])

    /**
     * Initializes authentication state on mount
     */
    useEffect(() => {
        let isMounted = true

        async function initAuth() {
            // Skip auth check for public routes
            if (isPublicRoute()) {
                setIsLoading(false)
                return
            }

            try {
                const currentUser = await getUser()

                if (!isMounted) return

                if (currentUser) {
                    setUser(currentUser)
                    setIsAuthenticated(true)
                } else {
                    // Not authenticated, redirect to login
                    await login()
                }
            } catch (error) {
                console.error("[AuthContext] Error during auth initialization:", error)

                if (!isMounted) return

                // Try to login on error
                try {
                    await login()
                } catch (loginError) {
                    console.error("[AuthContext] Login failed:", loginError)
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false)
                }
            }
        }

        initAuth()

        return () => {
            isMounted = false
        }
    }, [isPublicRoute])

    // ==================== LOADING STATE ====================

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4" />
                    <h2 className="text-lg font-semibold mb-2">Loading...</h2>
                    <p className="text-sm text-muted-foreground">
                        Checking authentication status
                    </p>
                </div>
            </div>
        )
    }

    // ==================== RENDER ====================

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                isLoading,
                login: handleLogin,
                logout: handleLogout,
                refreshUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}
