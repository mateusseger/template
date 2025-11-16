/**
 * Authentication Hook
 * 
 * Provides access to authentication context.
 * Must be used within an AuthContextProvider.
 * 
 * @example
 * ```tsx
 * const { user, isAuthenticated, logout } = useAuth()
 * 
 * if (isAuthenticated) {
 *   console.log(user.name)
 * }
 * ```
 */

import { useContext } from "react"
import { AuthContext } from "@/services/auth/authContext"

export function useAuth() {
    const context = useContext(AuthContext)

    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthContextProvider")
    }

    return context
}

