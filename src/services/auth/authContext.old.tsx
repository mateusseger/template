import { createContext, type ReactNode, useEffect, useState, useCallback } from "react"
import { getUser, login, logout as authLogout } from "@/services/auth/authService"
import type { IUser } from "@/core/types/user"

type AuthContextType = {
    user: IUser | null
    isAuthenticated: boolean
    isLoading: boolean
    logout: () => Promise<void>
    refreshUser: () => Promise<void>
}

interface AuthContextProviderProps {
    children: ReactNode
}

const PUBLIC_ROUTES = ['/auth/callback', '/auth/logout', '/unauthorized']

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [user, setUser] = useState<IUser | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    const isPublicRoute = useCallback(() => {
        return PUBLIC_ROUTES.some(route => window.location.pathname.startsWith(route))
    }, [])

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
            console.error("Error refreshing user:", error)
            setUser(null)
            setIsAuthenticated(false)
        }
    }, [])

    const logout = useCallback(async () => {
        try {
            await authLogout()
            setUser(null)
            setIsAuthenticated(false)
        } catch (error) {
            console.error("Error during logout:", error)
            // Force cleanup
            setUser(null)
            setIsAuthenticated(false)
            window.location.href = "/"
        }
    }, [])

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
                console.error("Error during auth initialization:", error)
                
                if (!isMounted) return
                
                // Try to login on error
                await login()
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

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4" />
                    <p className="text-sm text-muted-foreground">Loading...</p>
                </div>
            </div>
        )
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, isLoading, logout, refreshUser }}>
            {children}
        </AuthContext.Provider>
    )
}
