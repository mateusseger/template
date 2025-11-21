import { useState, useCallback, useMemo, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { getVisibleMenuItems, type MenuItem } from "@/shared/lib/menu"
import { useAuth } from "@/features/auth"
import { getUserRoles } from "@/shared/lib/user"

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
        handleItemClick,
        closeSubmenu,
    }
}
