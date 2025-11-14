import { type ReactNode, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "@/hooks/useAuth"
import { hasAnyRole, type UserRole } from "@/core/constants/roles"
import { getUserRoles } from "@/core/utils/userHelpers"

interface ProtectedRouteProps {
    children: ReactNode
    requiredRoles?: UserRole[]
}

/**
 * AppProtectedRoute - Componente de guarda para controle de acesso baseado em permissões
 *
 * Responsabilidades:
 * - Verifica autenticação do usuário antes de renderizar conteúdo protegido
 * - Valida se o usuário possui as permissões (roles) necessárias
 * - Redireciona para /unauthorized se o usuário não tiver acesso
 * - Retorna null enquanto aguarda verificações, evitando flash de conteúdo
 *
 * Fluxo de Autorização:
 * 1. Verifica se o usuário está autenticado (gerenciado pelo AuthProvider)
 * 2. Extrai as roles do usuário usando helper centralizado
 * 3. Compara roles do usuário com roles requeridas
 * 4. Permite acesso se nenhuma role for requerida (qualquer usuário autenticado)
 * 5. Redireciona se usuário não tiver permissões necessárias
 *
 * @param children - Componentes filhos a serem renderizados se autorizado
 * @param requiredRoles - Array opcional de roles, se vazio permite qualquer usuário autenticado
 *
 * @example
 * ```tsx
 * <AppProtectedRoute requiredRoles={['admin']}>
 *   <AdminPanel />
 * </AppProtectedRoute>
 * ```
 */
export function AppProtectedRoute({ children, requiredRoles = [] }: ProtectedRouteProps) {
    const navigate = useNavigate()
    const { user, isAuthenticated } = useAuth()

    // Verifica autorização - extrai roles usando helper centralizado
    const userRoles = getUserRoles(user)
    const hasRequiredAccess = requiredRoles.length === 0 || hasAnyRole(userRoles, requiredRoles)

    useEffect(() => {
        // AuthProvider gerencia redirecionamento quando não autenticado
        if (!isAuthenticated) return

        // Redireciona se usuário não possui as permissões necessárias
        if (!hasRequiredAccess) {
            navigate("/unauthorized", { replace: true })
        }
    }, [isAuthenticated, hasRequiredAccess, navigate])

    // Se não autenticado, não renderiza (AuthProvider gerencia redirecionamento)
    if (!isAuthenticated) {
        return null
    }

    // Se usuário não tem acesso, não renderiza (redirecionamento ocorrendo no effect)
    if (!hasRequiredAccess) {
        return null
    }

    return <>{children}</>
}
