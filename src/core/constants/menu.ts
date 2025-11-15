import { Home, ListTodo, FileText, Shield, Palette, Settings, User, Sliders, Lock, type LucideIcon } from "lucide-react"
import { USER_ROLES, type UserRole } from "./roles"

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
        name: "Todos",
        url: "/todos",
        icon: ListTodo,
        description: "Lista de tarefas",
    },
    {
        name: "Settings",
        icon: Settings,
        description: "Configurações do sistema",
        subItems: [
            {
                name: "Preferences",
                url: "/settings/preferences",
                icon: Sliders,
                description: "Preferências do usuário",
            }
        ],
    },
]

/**
 * Filtra os itens de menu baseado nas roles do usuário
 */
export function getVisibleMenuItems(userRoles: string[]): MenuItem[] {
    return MENU_ITEMS.filter((item) => {
        // Se o item não requer roles específicas, é visível para todos
        if (!item.roles || item.roles.length === 0) {
            return true
        }
        // Verifica se o usuário tem pelo menos uma das roles necessárias
        return item.roles.some((role) => userRoles.includes(role))
    }).map((item) => {
        // Filtra subitens se existirem
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

/**
 * Verifica se um item de menu é acessível para o usuário
 */
export function canAccessMenuItem(menuItem: MenuItem, userRoles: string[]): boolean {
    if (!menuItem.roles || menuItem.roles.length === 0) {
        return true
    }
    return menuItem.roles.some((role) => userRoles.includes(role))
}

/**
 * Encontra um item de menu pela URL
 */
export function getMenuItemByUrl(url: string): MenuItem | undefined {
    return MENU_ITEMS.find((item) => item.url === url)
}
