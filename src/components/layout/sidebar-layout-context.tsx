/**
 * Sidebar Layout Context
 * Compartilha o estado do submenu entre componentes do layout
 */

import { createContext, useContext, useState, type ReactNode } from "react"

interface SidebarLayoutContextValue {
    isSubmenuOpen: boolean
    setIsSubmenuOpen: (open: boolean) => void
}

const SidebarLayoutContext = createContext<SidebarLayoutContextValue | undefined>(undefined)

export function SidebarLayoutProvider({ children }: { children: ReactNode }) {
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false)

    return (
        <SidebarLayoutContext.Provider value={{ isSubmenuOpen, setIsSubmenuOpen }}>
            {children}
        </SidebarLayoutContext.Provider>
    )
}

export function useSidebarLayout() {
    const context = useContext(SidebarLayoutContext)
    if (!context) {
        throw new Error("useSidebarLayout must be used within SidebarLayoutProvider")
    }
    return context
}
