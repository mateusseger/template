/**
 * Authentication Callback Page
 * 
 * Handles the OAuth/OIDC callback after user authenticates with Keycloak.
 * 
 * Flow:
 * 1. Extracts auth code/tokens from URL
 * 2. Exchanges code for tokens (done by oidc-client)
 * 3. Enriches user data with roles
 * 4. Stores tokens and user data
 * 5. Redirects to home page
 * 
 * Error handling:
 * - Displays user-friendly error messages
 * - Provides retry option
 * - Logs detailed errors to console
 */

import { useEffect, useState, useRef } from "react"
import { handleCallback, AUTH_ERRORS } from "@/core/auth"

const AUTH_REDIRECTS = {
    AFTER_LOGIN: "/",
    AFTER_LOGOUT: "/",
}

export function AuthCallbackPage() {
    const [error, setError] = useState<string | null>(null)
    const hasProcessed = useRef(false)

    useEffect(() => {
        // Prevent double processing in React StrictMode
        if (hasProcessed.current) {
            return
        }
        hasProcessed.current = true

        const processCallback = async () => {
            try {
                const user = await handleCallback()

                if (user) {
                    // Success: Redirect to home
                    window.location.href = AUTH_REDIRECTS.AFTER_LOGIN
                } else {
                    setError(AUTH_ERRORS.INVALID_USER)
                }
            } catch (err) {
                console.error("[AuthCallback] Error processing callback:", err)
                setError(
                    err instanceof Error
                        ? err.message
                        : AUTH_ERRORS.CALLBACK_FAILED
                )
            }
        }

        processCallback()
    }, [])

    // Error state
    if (error) {
        return (
            <div className="flex min-h-screen items-center justify-center p-6">
                <div className="text-center max-w-md">
                    {/* Error Icon */}
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 text-destructive mb-6">
                        <svg
                            className="w-8 h-8"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </div>

                    {/* Error Message */}
                    <h2 className="text-xl font-semibold text-foreground mb-3">
                        Authentication Failed
                    </h2>
                    <p className="text-sm text-muted-foreground mb-6">
                        {error}
                    </p>

                    {/* Retry Button */}
                    <button
                        onClick={() => window.location.href = AUTH_REDIRECTS.AFTER_LOGOUT}
                        className="px-6 py-3 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium"
                    >
                        Return to Login
                    </button>
                </div>
            </div>
        )
    }

    // Loading state
    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
                {/* Loading Spinner */}
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-6" />

                {/* Loading Text */}
                <h2 className="text-xl font-semibold mb-3">
                    Authenticating...
                </h2>
                <p className="text-sm text-muted-foreground">
                    Please wait while we complete the login process.
                </p>
            </div>
        </div>
    )
}
