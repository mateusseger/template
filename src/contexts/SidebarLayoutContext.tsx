// filepath: src/contexts/SidebarLayoutContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react"

interface SidebarLayoutContextValue {
    isSubmenuOpen: boolean
    setIsSubmenuOpen: (open: boolean) => void
}

const SidebarLayoutContext = createContext<SidebarLayoutContextValue | undefined>(undefined)

/**
 * SidebarLayoutProvider - Compartilha o estado do submenu entre componentes do layout
 *
 * Permite que o AppSidebar publique seu estado de submenu para coordenação entre componentes.
 * Simplificado para usar layout flexível ao invés de positioning absoluto.
 */
export function SidebarLayoutProvider({ children }: { children: ReactNode }) {
    const [isSubmenuOpen, setIsSubmenuOpen] = useState(false)

    return (
        <SidebarLayoutContext.Provider value={{ isSubmenuOpen, setIsSubmenuOpen }}>
            {children}
        </SidebarLayoutContext.Provider>
    )
}

/**
 * useSidebarLayout - Hook para acessar o estado do layout de sidebar
 *
 * @throws {Error} Se usado fora do SidebarLayoutProvider
 */
export function useSidebarLayout() {
    const context = useContext(SidebarLayoutContext)
    if (!context) {
        throw new Error("useSidebarLayout must be used within SidebarLayoutProvider")
    }
    return context
}
