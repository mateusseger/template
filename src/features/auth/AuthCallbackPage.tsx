import { useEffect } from "react"
import { handleOAuthCallback } from "@/services/auth/authService"

export function AuthCallbackPage() {
    useEffect(() => {
        const processCallback = async () => {
            const user = await handleOAuthCallback(window.location.href)
            if (user) {
                window.location.href = "/"
            }
        }
        processCallback()
    }, [])

    return (
        <div className="flex min-h-screen items-center justify-center">
            <div className="text-center">
                <h2 className="text-lg font-semibold">Authenticating...</h2>
                <p className="text-sm text-muted-foreground mt-2">Please wait while we log you in.</p>
            </div>
        </div>
    )
}
