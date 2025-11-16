import { AppHeader } from "./AppHeader"
import { AppSidebarMenu } from "./AppSidebarMenu"
import { AppPageTransition } from "../transitions/AppPageTransition"
import { SidebarProvider } from "../ui/sidebar"
import { SidebarLayoutProvider } from "@/contexts/SidebarLayoutContext"
import { DetailSectionsProvider } from "./detail-sections/DetailSectionsProvider"
import { DetailSectionsSidebar } from "./detail-sections/DetailSectionsSidebar"

/**
 * AppLayout - Estrutura principal do layout da aplicação
 *
 * Componente que organiza a estrutura visual da aplicação, combinando:
 * - Barra lateral de navegação (AppSidebarMenu)
 * - Cabeçalho superior (AppHeader)
 * - Área de conteúdo principal com transições de página
 * - Terceiro sidebar de seções (quando habilitado via route handle)
 *
 * As transições de página são gerenciadas pelo Framer Motion sem perder
 * o estado dos componentes, proporcionando uma experiência fluida.
 *
 * Integra providers de contexto para:
 * - Estado do sidebar/submenu (SidebarLayoutProvider)
 * - Gerenciamento de seções de detalhe (DetailSectionsProvider)
 *
 * Layout Structure:
 * - SidebarProvider gerencia o sidebar principal e submenu
 * - Header fixo no topo (abaixo dos sidebars)
 * - DetailSectionsSidebar + Conteúdo em flex abaixo do header
 * - Conteúdo principal flui naturalmente ao lado, sem fixed positioning
 *
 * @see AppSidebarMenu - Menu de navegação lateral
 * @see AppHeader - Cabeçalho da aplicação
 * @see AppPageTransition - Gerenciador de transições entre páginas
 * @see DetailSectionsSidebar - Terceiro sidebar de navegação por seções
 */
export function AppLayout() {
    return (
        <SidebarLayoutProvider>
            <SidebarProvider>
                {/* Sidebar Principal */}
                <AppSidebarMenu />

                {/* Layout Principal: Header + (Detail Sections + Conteúdo) */}
                <DetailSectionsProvider>
                    <div className="flex-1 flex flex-col min-w-0">
                        {/* Header fixo no topo */}
                        <AppHeader />

                        {/* Wrapper flex para Detail Sidebar + Conteúdo (abaixo do header) */}
                        <div className="flex flex-1 min-w-0">
                            {/* Detail Sections Sidebar (terceiro sidebar) */}
                            {/* Sempre renderizado - AnimatePresence gerencia visibilidade */}
                            <DetailSectionsSidebar />

                            {/* Conteúdo Principal */}
                            <main className="flex-1 min-w-0">
                                <div className="container mx-auto max-w-7xl p-6">
                                    <AppPageTransition />
                                </div>
                            </main>
                        </div>
                    </div>
                </DetailSectionsProvider>
            </SidebarProvider>
        </SidebarLayoutProvider>
    )
}
