import { Link, useLocation } from "react-router-dom"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getBreadcrumbPath } from "@/core/helpers/menuHelpers"

/**
 * AppBreadcrumb - Navegação breadcrumb automática baseada na rota atual
 *
 * Integra-se com a configuração de menu para exibir rótulos e ícones apropriados.
 * Gera automaticamente a trilha de navegação com base no caminho da URL atual.
 */
export function AppBreadcrumb() {
    const location = useLocation()
    const breadcrumbItems = getBreadcrumbPath(location.pathname)

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {breadcrumbItems.map((item, index) => {
                    const isLast = index === breadcrumbItems.length - 1
                    const Icon = item.icon

                    return (
                        <div key={item.url} className="flex items-center gap-1.5">
                            {index > 0 && <BreadcrumbSeparator />}
                            <BreadcrumbItem>
                                {isLast || !item.url ? (
                                    <BreadcrumbPage className="flex items-center gap-1">
                                        {Icon && <Icon className="h-3.5 w-3.5" />}
                                        {item.name}
                                    </BreadcrumbPage>
                                ) : (
                                    <BreadcrumbLink asChild>
                                        <Link to={item.url} className="flex items-center gap-1">
                                            {Icon && <Icon className="h-3.5 w-3.5" />}
                                            {item.name}
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
