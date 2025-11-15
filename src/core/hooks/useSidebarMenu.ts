import { useState, useCallback, useMemo, useEffect } from "react"
import { useLocation } from "react-router-dom"
import { getVisibleMenuItems, type MenuItem } from "@/core/constants/menu"
import { useAuth } from "@/core/hooks/useAuth"
import { getUserRoles } from "@/core/helpers/userHelpers"

/**
 * useSidebarMenu - Hook personalizado para gerenciamento de estado e lógica do menu lateral
 *
 * Responsabilidades:
 * - Gerenciar o estado do submenu ativo
 * - Filtrar itens de menu baseado nas permissões (roles) do usuário
 * - Detectar qual rota está atualmente ativa
 * - Gerenciar interações com itens do menu (cliques, abrir/fechar)
 * - Fechar submenu automaticamente ao navegar
 *
 * Otimizações de Performance:
 * - useMemo para memoizar roles do usuário e evitar recálculos
 * - useMemo para memoizar itens de menu filtrados
 * - useCallback para funções estáveis que não causam re-renders desnecessários
 *
 * Fluxo de Funcionamento:
 * 1. Extrai roles do usuário autenticado
 * 2. Filtra menu items baseado nas permissões
 * 3. Rastreia qual submenu está aberto (se houver)
 * 4. Fornece callbacks para interação com menu
 * 5. Fecha submenu automaticamente quando a rota muda
 *
 * @returns {Object} Objeto contendo:
 * - menuItems: Array de itens de menu visíveis para o usuário
 * - activeSubmenu: Item de menu com submenu atualmente aberto (ou null)
 * - isRouteActive: Função para verificar se uma URL está ativa
 * - isSubmenuOpen: Função para verificar se um submenu específico está aberto
 * - handleItemClick: Handler para cliques em itens do menu
 * - closeSubmenu: Função para fechar o submenu atual
 *
 * @example
 * ```tsx
 * const {
 *   menuItems,
 *   activeSubmenu,
 *   isRouteActive,
 *   handleItemClick
 * } = useSidebarMenu()
 * ```
 */
export function useSidebarMenu() {
    const location = useLocation()
    const { user } = useAuth()
    const [activeSubmenu, setActiveSubmenu] = useState<MenuItem | null>(null)

    // Memoiza roles do usuário para evitar recálculo desnecessário
    const userRoles = useMemo(() => getUserRoles(user), [user])

    // Memoiza itens de menu filtrados baseado nas permissões do usuário
    const menuItems = useMemo(() => getVisibleMenuItems(userRoles), [userRoles])

    // Verifica se uma rota está atualmente ativa
    const isRouteActive = useCallback(
        (url: string) => location.pathname === url,
        [location.pathname]
    )

    // Verifica se um submenu específico está atualmente aberto
    const isSubmenuOpen = useCallback(
        (item: MenuItem) => activeSubmenu?.name === item.name,
        [activeSubmenu]
    )

    // Gerencia clique em item do menu (alterna submenu ou fecha)
    const handleItemClick = useCallback(
        (item: MenuItem) => {
            if (item.subItems?.length) {
                // Alterna submenu - fecha se já estiver aberto, abre se estiver fechado
                setActiveSubmenu((current) =>
                    current?.name === item.name ? null : item
                )
            } else {
                // Fecha submenu ao navegar para item regular (sem submenu)
                setActiveSubmenu(null)
            }
        },
        []
    )

    // Fecha o submenu explicitamente
    const closeSubmenu = useCallback(() => {
        setActiveSubmenu(null)
    }, [])

    // Fecha submenu automaticamente quando a navegação muda
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
