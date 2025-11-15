import { Link } from "react-router-dom"
import { Moon, Sun, ChevronRight } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/themes"
import { cn } from "@/utils/cn"
import { useSidebarMenu } from "@/core/hooks/useSidebarMenu"
import { AppSidebarSubmenu } from "./AppSidebarSubmenu"

/**
 * AppSidebarMenu - Barra lateral principal de navegação
 *
 * Arquitetura:
 * - Utiliza o hook useSidebarMenu para encapsular estado e lógica
 * - Delega a renderização de submenus ao componente AppSidebarSubmenu
 * - Foco em composição e apresentação
 *
 * Funcionalidades:
 * - Menu colapsável com ícones
 * - Suporte a submenus com painel secundário animado
 * - Alternador de tema no rodapé
 * - Estado ativo baseado na rota atual
 * - Filtragem de menu baseada em permissões (via hook)
 * - Acessibilidade completa com atributos ARIA
 *
 * Estrutura:
 * - Header: Logo/título da aplicação
 * - Content: Lista de itens de menu com possíveis submenus
 * - Footer: Controle de alternância de tema (claro/escuro)
 *
 * @see useSidebarMenu - Hook personalizado para gerenciamento de estado
 * @see AppSidebarSubmenu - Componente de submenu secundário
 */
export function AppSidebarMenu() {
    const { theme, toggleMode } = useTheme()
    const {
        menuItems,
        activeSubmenu,
        isRouteActive,
        isSubmenuOpen,
        handleItemClick,
        closeSubmenu,
    } = useSidebarMenu()

    return (
        <>
            {/* Barra Lateral Principal */}
            <Sidebar collapsible="icon">
                <SidebarHeader className="border-b p-0">
                    <div className="h-14 px-4 flex items-center justify-between">
                        <h2 className="text-lg font-semibold tracking-tight group-data-[collapsible=icon]:hidden">
                            Template App
                        </h2>
                        <span className="text-lg font-bold hidden group-data-[collapsible=icon]:block">
                            T
                        </span>
                    </div>
                </SidebarHeader>

                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {menuItems.map((item) => {
                                    const hasSubmenu = !!item.subItems?.length
                                    const isExpanded = isSubmenuOpen(item)
                                    const isActive = !activeSubmenu && item.url ? isRouteActive(item.url) : false

                                    const buttonClasses = cn(
                                        "transition-all duration-200 hover:translate-x-1",
                                        hasSubmenu && "cursor-pointer",
                                        isActive && "font-medium shadow-sm",
                                        isExpanded && "bg-accent text-accent-foreground"
                                    )

                                    return (
                                        <SidebarMenuItem key={item.name}>
                                            {hasSubmenu ? (
                                                <SidebarMenuButton
                                                    onClick={() => handleItemClick(item)}
                                                    tooltip={item.description || item.name}
                                                    isActive={false}
                                                    className={buttonClasses}
                                                >
                                                    <item.icon className="h-4 w-4" />
                                                    <span>{item.name}</span>
                                                    <ChevronRight
                                                        className={cn(
                                                            "ml-auto h-4 w-4 transition-transform duration-200",
                                                            isExpanded && "rotate-180"
                                                        )}
                                                    />
                                                </SidebarMenuButton>
                                            ) : (
                                                <SidebarMenuButton
                                                    asChild
                                                    isActive={isActive}
                                                    tooltip={item.description || item.name}
                                                >
                                                    <Link
                                                        to={item.url!}
                                                        onClick={() => handleItemClick(item)}
                                                        className={buttonClasses}
                                                    >
                                                        <item.icon className="h-4 w-4" />
                                                        <span>{item.name}</span>
                                                    </Link>
                                                </SidebarMenuButton>
                                            )}
                                        </SidebarMenuItem>
                                    )
                                })}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>

                <SidebarFooter className="border-t p-0">
                    <div className="h-14 px-4 flex items-center justify-between group-data-[collapsible=icon]:justify-center">
                        <span className="text-sm text-muted-foreground group-data-[collapsible=icon]:hidden">
                            Aparência
                        </span>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={toggleMode}
                            className="h-8 w-8 shrink-0"
                        >
                            {theme.mode === "light" ? (
                                <Moon className="h-4 w-4" />
                            ) : (
                                <Sun className="h-4 w-4" />
                            )}
                        </Button>
                    </div>
                </SidebarFooter>

                <SidebarRail />
            </Sidebar>

            {/* Painel Secundário de Submenu - Animado */}
            <AppSidebarSubmenu
                parentItem={activeSubmenu}
                isRouteActive={isRouteActive}
                onClose={closeSubmenu}
            />
        </>
    )
}
