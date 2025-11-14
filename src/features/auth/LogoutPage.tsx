import { useEffect } from "react"
import { logout } from "../../core/auth/authService"

export function LogoutPage() {
  useEffect(() => {
    const performLogout = async () => {
      await logout()
    }
    performLogout()
  }, [])

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h2 className="text-lg font-semibold">Logging out...</h2>
        <p className="text-sm text-muted-foreground mt-2">Please wait while we log you out.</p>
      </div>
    </div>
  )
}
