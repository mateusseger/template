import { useState, useCallback, useMemo, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { getVisibleMenuItems, type MenuItem } from "@/shared/constants/menu"
import { useAuth } from "@/features/core/auth"
import { getUserRoles } from "@/shared/helpers/user-helpers"

// Hook para gerenciar estado e lógica do menu lateral
// Filtra itens baseados em permissões e gerencia submenu ativo
export function useSidebarMenu() {
    const location = useLocation()
    const { user } = useAuth()
    const [activeSubmenu, setActiveSubmenu] = useState<MenuItem | null>(null)

    const userRoles = useMemo(() => getUserRoles(user), [user])
    const menuItems = useMemo(() => getVisibleMenuItems(userRoles), [userRoles])

    const isRouteActive = useCallback(
        (url: string) => location.pathname === url,
        [location.pathname]
    )

    // Verifica se um item de menu pai tem algum subitem ativo
    const hasActiveSubitem = useCallback(
        (item: MenuItem) => {
            if (!item.subItems?.length) return false
            return item.subItems.some(subItem => isRouteActive(subItem.url))
        },
        [isRouteActive]
    )

    const isSubmenuOpen = useCallback(
        (item: MenuItem) => activeSubmenu?.name === item.name,
        [activeSubmenu]
    )

    const handleItemClick = useCallback(
        (item: MenuItem) => {
            if (item.subItems?.length) {
                setActiveSubmenu((current) =>
                    current?.name === item.name ? null : item
                )
            } else {
                setActiveSubmenu(null)
            }
        },
        []
    )

    const closeSubmenu = useCallback(() => {
        setActiveSubmenu(null)
    }, [])

    useEffect(() => {
        setActiveSubmenu(null)
    }, [location.pathname])

    return {
        menuItems,
        activeSubmenu,
        isRouteActive,
        isSubmenuOpen,
        hasActiveSubitem,
        handleItemClick,
        closeSubmenu,
    }
}
