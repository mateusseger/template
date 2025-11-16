// Configuração e utilitários do menu de navegação

import { Home, ListTodo, Palette, Settings, Sliders, Sparkles, CloudSun, type LucideIcon } from "lucide-react"
import { type UserRole } from "@/shared/lib/permissions"

// ==================== TYPES ====================

export interface MenuSubItem {
    name: string
    url: string
    icon: LucideIcon
    description?: string
    roles?: UserRole[]
}

export interface MenuItem {
    name: string
    url?: string
    icon: LucideIcon
    roles?: UserRole[]
    description?: string
    subItems?: MenuSubItem[]
}

// ==================== CONFIGURATION ====================

export const MENU_ITEMS: MenuItem[] = [
    {
        name: "Home",
        url: "/",
        icon: Home,
        description: "Página inicial",
    },
    {
        name: "Design System",
        url: "/design-system",
        icon: Palette,
        description: "Componentes do design system",
    },
    {
        name: "Tarefas",
        url: "/tarefas",
        icon: ListTodo,
        description: "Lista de tarefas",
    },
    {
        name: "Pokédex",
        url: "/pokemon",
        icon: Sparkles,
        description: "Explorador de Pokémon",
    },
    {
        name: "Previsão do Tempo",
        url: "/previsao-tempo",
        icon: CloudSun,
        description: "Previsão do tempo completa",
    },
    {
        name: "Configurações",
        icon: Settings,
        description: "Configurações do sistema",
        subItems: [
            {
                name: "Preferências",
                url: "/settings/preferences",
                icon: Sliders,
                description: "Preferências do usuário",
            }
        ],
    },
]

// ==================== FILTERING ====================

// Filtra os itens de menu baseado nas roles do usuário
export function getVisibleMenuItems(userRoles: string[]): MenuItem[] {
    return MENU_ITEMS.filter((item) => {
        if (!item.roles || item.roles.length === 0) {
            return true
        }
        return item.roles.some((role) => userRoles.includes(role))
    }).map((item) => {
        if (item.subItems) {
            const visibleSubItems = item.subItems.filter((subItem) => {
                if (!subItem.roles || subItem.roles.length === 0) {
                    return true
                }
                return subItem.roles.some((role) => userRoles.includes(role))
            })
            return { ...item, subItems: visibleSubItems }
        }
        return item
    })
}

// Verifica se um item de menu é acessível para o usuário
export function canAccessMenuItem(menuItem: MenuItem, userRoles: string[]): boolean {
    if (!menuItem.roles || menuItem.roles.length === 0) {
        return true
    }
    return menuItem.roles.some((role) => userRoles.includes(role))
}

// ==================== SEARCH ====================

// Encontra um item de menu pela URL (busca em itens principais e subitens)
export function findMenuItemByUrl(url: string): MenuItem | MenuSubItem | undefined {
    // Busca em itens principais
    const mainItem = MENU_ITEMS.find((item) => item.url === url)
    if (mainItem) return mainItem

    // Busca em subitens
    for (const item of MENU_ITEMS) {
        if (item.subItems) {
            const subItem = item.subItems.find((sub) => sub.url === url)
            if (subItem) return subItem
        }
    }

    return undefined
}

// Encontra um item de menu pela URL (alias para compatibilidade)
export function getMenuItemByUrl(url: string): MenuItem | undefined {
    return MENU_ITEMS.find((item) => item.url === url)
}

// ==================== BREADCRUMB ====================

// Gera label para breadcrumb a partir da URL
export function getBreadcrumbLabel(url: string, segment: string): string {
    const menuItem = findMenuItemByUrl(url)
    if (menuItem?.name) return menuItem.name

    // Fallback: capitaliza primeira letra do segmento
    return segment.charAt(0).toUpperCase() + segment.slice(1)
}

// Gera o caminho completo de breadcrumb a partir de uma URL
export function getBreadcrumbPath(url: string): Array<MenuItem | MenuSubItem> {
    const homeItem = MENU_ITEMS.find((item: MenuItem) => item.url === "/")
    const path: Array<MenuItem | MenuSubItem> = homeItem ? [homeItem] : []

    if (url === "/") return path

    // Busca item principal
    const mainItem = MENU_ITEMS.find((item: MenuItem) => item.url === url)
    if (mainItem) {
        path.push(mainItem)
        return path
    }

    // Busca em subitens e inclui o pai
    for (const item of MENU_ITEMS) {
        if (item.subItems) {
            const subItem = item.subItems.find((sub: MenuSubItem) => sub.url === url)
            if (subItem) {
                path.push(item, subItem)
                return path
            }
        }
    }

    // Fallback para rotas dinâmicas: tenta encontrar a rota pai
    const segments = url.split('/').filter(Boolean)
    if (segments.length > 1) {
        const parentUrl = '/' + segments[0]
        const parentItem = MENU_ITEMS.find((item: MenuItem) => item.url === parentUrl)
        if (parentItem) {
            path.push(parentItem)
            path.push({ name: segments[segments.length - 1], url, icon: parentItem.icon } as MenuSubItem)
            return path
        }
    }

    return path
}

