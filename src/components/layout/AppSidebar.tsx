import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
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
import { getVisibleMenuItems, type MenuItem } from "@/core/constants/menu"
import { useAuth } from "@/hooks/useAuth"
import { useTheme } from "@/themes"
import { cn } from "@/core/utils/cn"

/**
 * AppSidebar - Sidebar principal da aplicação
 *
 * Funcionalidades:
 * - Menu colapsável com ícones
 * - Suporte a submenus em painel lateral
 * - Alternador de tema claro/escuro
 * - Estados ativos baseados na rota atual
 */
export function AppSidebar() {
    const location = useLocation()
    const { user } = useAuth()
    const { theme, toggleMode } = useTheme()
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null)
    const [displayedSubmenu, setDisplayedSubmenu] = useState<MenuItem | null>(null)

    const menuItems = getVisibleMenuItems(user?.userRoles || [])
    const isRouteActive = (url: string) => location.pathname === url

    const handleItemClick = (item: MenuItem) => {
        if (item.subItems?.length) {
            const isClosing = openSubmenu === item.name
            setOpenSubmenu(isClosing ? null : item.name)
            if (!isClosing) setDisplayedSubmenu(item)
        } else {
            setOpenSubmenu(null)
        }
    }

    const handleTransitionEnd = () => {
        if (!openSubmenu) setDisplayedSubmenu(null)
    }

    return (
        <>
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
                                    const isSubmenuOpen = openSubmenu === item.name
                                    const isActive = !openSubmenu && item.url ? isRouteActive(item.url) : false

                                    const buttonContent = (
                                        <>
                                            <item.icon className="h-4 w-4" />
                                            <span>{item.name}</span>
                                            {hasSubmenu && (
                                                <ChevronRight
                                                    className={cn(
                                                        "ml-auto h-4 w-4 transition-transform duration-200",
                                                        isSubmenuOpen && "rotate-180"
                                                    )}
                                                />
                                            )}
                                        </>
                                    )

                                    const buttonClasses = cn(
                                        "transition-all duration-200 hover:translate-x-1",
                                        hasSubmenu && "cursor-pointer",
                                        isActive && "font-medium shadow-sm",
                                        isSubmenuOpen && "bg-accent text-accent-foreground"
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
                                                    {buttonContent}
                                                </SidebarMenuButton>
                                            ) : (
                                                <SidebarMenuButton
                                                    asChild
                                                    isActive={isActive}
                                                    tooltip={item.description || item.name}
                                                >
                                                    <Link to={item.url!} onClick={() => handleItemClick(item)} className={buttonClasses}>
                                                        {buttonContent}
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
                            aria-label="Alternar tema"
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

            <div
                className={cn(
                    "bg-background flex flex-col overflow-hidden transition-[width] duration-300 ease-in-out",
                    openSubmenu ? "w-64" : "w-0",
                    displayedSubmenu && "border-r"
                )}
                onTransitionEnd={handleTransitionEnd}
            >
                {displayedSubmenu && (
                    <>
                        <div className="border-b min-w-64">
                            <div className="h-14 flex items-center px-4">
                                <h3 className="text-sm font-semibold text-foreground whitespace-nowrap">
                                    {displayedSubmenu.name}
                                </h3>
                            </div>
                        </div>

                        <div className="flex-1 p-2 min-w-64">
                            <SidebarMenu>
                                {displayedSubmenu.subItems?.map((subItem) => {
                                    const isActive = isRouteActive(subItem.url)

                                    return (
                                        <SidebarMenuItem key={subItem.url}>
                                            <SidebarMenuButton
                                                asChild
                                                isActive={isActive}
                                            >
                                                <Link
                                                    to={subItem.url}
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
                    </>
                )}
            </div>
        </>
    )
}
