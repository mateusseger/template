import { AppHeader } from "./AppHeader"
import { AppSidebarMenu } from "./AppSidebarMenu"
import { AppPageTransition } from "../transitions/AppPageTransition"
import { SidebarProvider } from "../ui/sidebar"

/**
 * AppLayout - Estrutura principal do layout da aplicação
 *
 * Componente que organiza a estrutura visual da aplicação, combinando:
 * - Barra lateral de navegação (AppSidebarMenu)
 * - Cabeçalho superior (AppHeader)
 * - Área de conteúdo principal com transições de página
 *
 * As transições de página são gerenciadas pelo Framer Motion sem perder
 * o estado dos componentes, proporcionando uma experiência fluida.
 *
 * @see AppSidebarMenu - Menu de navegação lateral
 * @see AppHeader - Cabeçalho da aplicação
 * @see AppPageTransition - Gerenciador de transições entre páginas
 */
export function AppLayout() {
    return (
        <SidebarProvider>
            <AppSidebarMenu />

            <div className="flex-1 flex flex-col">
                <AppHeader />
                <main className="flex-1">
                    <div className="container mx-auto max-w-7xl p-6">
                        <AppPageTransition />
                    </div>
                </main>
            </div>
        </SidebarProvider>
    )
}
