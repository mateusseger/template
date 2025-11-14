import { type ReactNode, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { hasAnyRole, type UserRole } from "@/core/constants/roles"

interface ProtectedRouteProps {
  children: ReactNode
  requiredRoles?: UserRole[]
}

export function AppProtectedRoute({ children, requiredRoles = [] }: ProtectedRouteProps) {
  const navigate = useNavigate()
  const { user, isAuthenticated } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) {
      return
    }

    if (requiredRoles.length > 0) {
      const userRoles: string[] = user?.profile?.["userRoles"] ?? user?.userRoles ?? []
      
      if (!hasAnyRole(userRoles, requiredRoles)) {
        navigate("/unauthorized")
        return
      }
    }
  }, [isAuthenticated, user, requiredRoles, navigate])

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold">Authenticating...</h2>
          <p className="text-sm text-muted-foreground mt-2">Please wait...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
