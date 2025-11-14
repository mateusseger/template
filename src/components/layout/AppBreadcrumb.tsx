import { Link, useLocation } from "react-router-dom"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Home } from "lucide-react"
import { findMenuItemByUrl, getBreadcrumbLabel } from "@/core/utils/menuHelpers"

/**
 * AppBreadcrumb - Navegação breadcrumb automática baseada na rota atual
 *
 * Integra-se com a configuração de menu para exibir rótulos e ícones apropriados.
 * Gera automaticamente a trilha de navegação com base no caminho da URL atual.
 */
export function AppBreadcrumb() {
    const location = useLocation()
    const pathnames = location.pathname.split("/").filter((x) => x)

    if (pathnames.length === 0) {
        return null
    }

    return (
        <Breadcrumb>
            <BreadcrumbList>
                <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                        <Link to="/" className="flex items-center gap-1">
                            <Home className="h-3.5 w-3.5"/>
                            Home
                        </Link>
                    </BreadcrumbLink>
                </BreadcrumbItem>

                {pathnames.map((value, index) => {
                    const to = `/${pathnames.slice(0, index + 1).join("/")}`
                    const isLast = index === pathnames.length - 1
                    const menuItem = findMenuItemByUrl(to)
                    const label = getBreadcrumbLabel(to, value)
                    const Icon = menuItem?.icon

                    return (
                        <div key={to} className="flex items-center gap-1.5">
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                {isLast ? (
                                    <BreadcrumbPage
                                        className="flex items-center gap-1">
                                        {Icon && <Icon className="h-3.5 w-3.5" />}
                                        {label}
                                    </BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link to={to} className="flex items-center gap-1" >
                                            {Icon && <Icon className="h-3.5 w-3.5" />}
                                            {label}
                                        </Link>
                                    </BreadcrumbLink>
                                )}
                            </BreadcrumbItem>
                        </div>
                    )
                })}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
