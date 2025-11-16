import { Link, useLocation, useMatches, useParams } from "react-router-dom"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { getBreadcrumbPath } from "@/helpers/menuHelpers"

/**
 * AppBreadcrumb - Navegação breadcrumb automática baseada na rota atual
 *
 * Integra-se com a configuração de menu para exibir rótulos e ícones apropriados.
 * Gera automaticamente a trilha de navegação com base no caminho da URL atual.
 * Suporta breadcrumbLabel dinâmico via route handle para páginas de detalhe.
 */
export function AppBreadcrumb() {
    const location = useLocation()
    const matches = useMatches()
    const params = useParams()
    const breadcrumbItems = getBreadcrumbPath(location.pathname)

    // Verifica se a rota atual tem handle.breadcrumbLabel
    const currentMatch = matches[matches.length - 1]
    const handle = currentMatch?.handle as any
    const dynamicLabel = handle?.breadcrumbLabel?.(params)

    // Se há label dinâmico, substitui o último item
    const items = dynamicLabel && breadcrumbItems.length > 0
        ? [
            ...breadcrumbItems.slice(0, -1),
            { ...breadcrumbItems[breadcrumbItems.length - 1], name: dynamicLabel }
        ]
        : breadcrumbItems

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {items.map((item, index) => {
                    const isLast = index === items.length - 1
                    const Icon = item.icon

                    return (
                        <div key={item.url || index} className="flex items-center gap-1.5">
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
