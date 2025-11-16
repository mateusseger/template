/**
 * Logout Page
 * 
 * Handles user logout process.
 * 
 * Flow:
 * 1. Calls logout service (signoutRedirect)
 * 2. Service clears Keycloak session
 * 3. Service clears local storage
 * 4. Service redirects back to application
 * 
 * Note: This is a transient page shown during logout.
 * Most of the time, user will be redirected immediately.
 */

import { useEffect, useRef } from "react"
import { logout } from "@/core/auth"

const AUTH_REDIRECTS = {
    AFTER_LOGOUT: "/",
}

export function LogoutPage() {
    const hasLoggedOut = useRef(false)

    useEffect(() => {
        // Prevent double processing in React StrictMode
        if (hasLoggedOut.current) {
            return
        }
        hasLoggedOut.current = true

        const performLogout = async () => {
            try {
                await logout()
            } catch (error) {
                console.error("[Logout] Error during logout:", error)
                // Force redirect even on error
                window.location.href = AUTH_REDIRECTS.AFTER_LOGOUT
            }
        }

        performLogout()
    }, [])

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
                {/* Loading Spinner */}
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-6" />

                {/* Logout Text */}
                <h2 className="text-xl font-semibold mb-3">
                    Logging out...
                </h2>
                <p className="text-sm text-muted-foreground">
                    Please wait while we complete the logout process.
                </p>
            </div>
        </div>
    )
}
