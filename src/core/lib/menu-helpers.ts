/**
 * Menu Helper Utilities - Utilitários auxiliares para manipulação de menus
 *
 * Fornece funções para:
 * - Busca de itens de menu por URL
 * - Geração de labels para breadcrumb
 * - Navegação na estrutura hierárquica do menu
 */

import { type MenuItem, type MenuSubItem, MENU_ITEMS } from "./menu"

/**
 * findMenuItemByUrl - Encontra um item de menu pela URL (incluindo subitens)
 *
 * Realiza busca em dois níveis:
 * 1. Busca em itens principais (top-level)
 * 2. Busca em subitens aninhados
 *
 * Útil para:
 * - Determinar qual item de menu está ativo
 * - Obter ícone e nome para breadcrumb
 * - Validar se uma URL existe no menu
 *
 * @param url - URL a ser buscada (ex: "/dashboard" ou "/settings/profile")
 * @returns MenuItem ou MenuSubItem encontrado, ou undefined se não existir
 *
 * @example
 * ```typescript
 * const item = findMenuItemByUrl("/dashboard")
 * if (item) {
 *   console.log(item.name, item.icon)
 * }
 * ```
 */
export function findMenuItemByUrl(url: string): MenuItem | MenuSubItem | undefined {
    // Busca em itens principais
    const mainItem = MENU_ITEMS.find((item) => item.url === url)
    if (mainItem) return mainItem

    // Busca em subitens aninhados
    for (const item of MENU_ITEMS) {
        if (item.subItems) {
            const subItem = item.subItems.find((sub) => sub.url === url)
            if (subItem) return subItem
        }
    }

    return undefined
}

/**
 * getBreadcrumbLabel - Gera label para breadcrumb a partir da URL
 *
 * Lógica de geração:
 * 1. Tenta encontrar item de menu correspondente à URL
 * 2. Se encontrado, usa o nome do item de menu
 * 3. Se não encontrado, capitaliza o primeiro caractere do segmento da URL
 *
 * Fallback útil para:
 * - URLs dinâmicas que não estão no menu
 * - Páginas de detalhes (ex: /users/123)
 * - Rotas geradas programaticamente
 *
 * @param url - URL completa do breadcrumb (ex: "/settings/profile")
 * @param segment - Segmento da URL para fallback (ex: "profile")
 * @returns Label formatado para exibição no breadcrumb
 *
 * @example
 * ```typescript
 * // Com item de menu: retorna "Perfil"
 * getBreadcrumbLabel("/settings/profile", "profile")
 *
 * // Sem item de menu: retorna "Profile" (capitalizado)
 * getBreadcrumbLabel("/users/123", "123")
 * ```
 */
export function getBreadcrumbLabel(url: string, segment: string): string {
    const menuItem = findMenuItemByUrl(url)
    if (menuItem?.name) return menuItem.name

    // Fallback: capitaliza primeira letra do segmento
    return segment.charAt(0).toUpperCase() + segment.slice(1)
}

/**
 * getBreadcrumbPath - Gera o caminho completo de breadcrumb a partir de uma URL
 *
 * Busca na estrutura do menu para construir o caminho hierárquico.
 * Se a URL corresponder a um subitem, retorna [pai, filho].
 * Se for um item principal, retorna apenas o item.
 * Sempre inclui o Home no início.
 *
 * Para rotas dinâmicas (ex: /devolucoes/:id), tenta encontrar a rota pai.
 *
 * @param url - URL atual (ex: "/settings/profile")
 * @returns Array de MenuItem/MenuSubItem representando o caminho completo
 *
 * @example
 * ```typescript
 * // Para "/settings/profile" retorna: [Home, Settings, Profile]
 * const path = getBreadcrumbPath("/settings/profile")
 * ```
 */
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
    // Ex: /devolucoes/123 -> busca /devolucoes
    const segments = url.split('/').filter(Boolean)
    if (segments.length > 1) {
        const parentUrl = '/' + segments[0]
        const parentItem = MENU_ITEMS.find((item: MenuItem) => item.url === parentUrl)
        if (parentItem) {
            // Retorna o item pai, e o componente breadcrumb adicionará o label dinâmico
            path.push(parentItem)
            // Adiciona placeholder que será substituído por breadcrumbLabel se existir
            path.push({ name: segments[segments.length - 1], url, icon: parentItem.icon } as MenuSubItem)
            return path
        }
    }

    // Fallback final: não encontrou no menu, retorna só o home
    return path
}
