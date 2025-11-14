import { Link } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"
import type { MenuItem } from "@/core/constants/menu"

/**
 * AppSidebarSubmenu - Painel de navegação secundário para itens de submenu
 *
 * Funcionalidades:
 * - Animações suaves usando Framer Motion
 * - Reutiliza primitivos de UI da Sidebar para consistência visual
 * - Fecha automaticamente ao navegar para um item
 *
 * Design:
 * - Largura fixa (256px) quando aberto, 0 quando fechado
 * - Transição suave de largura com fade de opacidade
 * - Mantém alinhamento visual com a barra lateral principal
 *
 * Animação:
 * - AnimatePresence gerencia entrada/saída do componente
 * - Motion.aside anima largura e opacidade
 * - Duração de 0.3s com easing suave
 *
 * @param parentItem - Item de menu pai contendo subItems
 * @param isRouteActive - Callback para verificar se uma rota está ativa
 * @param onClose - Callback para fechar o submenu
 */

interface SidebarSubmenuProps {
    /** Item de menu pai contendo subItems */
    parentItem: MenuItem | null
    /** Callback para verificar se uma rota está atualmente ativa */
    isRouteActive: (url: string) => boolean
    /** Callback para fechar o submenu */
    onClose?: () => void
}

export function AppSidebarSubmenu({
    parentItem,
    isRouteActive,
    onClose,
}: SidebarSubmenuProps) {
    return (
        <AnimatePresence mode="wait">
            {parentItem && (
                <motion.aside
                    key={parentItem.name}
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 256, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{
                        duration: 0.3,
                        ease: "easeInOut",
                    }}
                    className="bg-background flex flex-col overflow-hidden border-r"
                    role="navigation"
                    id={`submenu-${parentItem.name}`}
                >
                    {/* Cabeçalho do Submenu */}
                    <div className="border-b min-w-64">
                        <div className="h-14 flex items-center px-4">
                            <h3 className="text-sm font-semibold text-foreground whitespace-nowrap">
                                {parentItem.name}
                            </h3>
                        </div>
                    </div>

                    {/* Conteúdo do Submenu */}
                    <div className="flex-1 p-2 min-w-64">
                        <SidebarMenu>
                            {parentItem.subItems?.map((subItem) => {
                                const isActive = isRouteActive(subItem.url)

                                return (
                                    <SidebarMenuItem key={subItem.url}>
                                        <SidebarMenuButton
                                            asChild
                                            isActive={isActive}
                                        >
                                            <Link
                                                to={subItem.url}
                                                onClick={onClose}
                                                className="transition-all duration-200 hover:translate-x-1"
                                            >
                                                <subItem.icon className="h-4 w-4" />
                                                <span>{subItem.name}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                )
                            })}
                        </SidebarMenu>
                    </div>
                </motion.aside>
            )}
        </AnimatePresence>
    )
}
