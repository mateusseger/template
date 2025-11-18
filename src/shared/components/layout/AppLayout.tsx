import { AppHeader } from "./AppHeader"
import { AppSidebarMenu } from "./AppSidebarMenu"
import { AppPageTransition } from "../transitions/AppPageTransition"
import { SidebarProvider } from "../ui/sidebar"
import { SidebarLayoutProvider } from "@/shared/components/layout/sidebar-layout-context"
import { DetailSectionsProvider } from "./detail-sections/DetailSectionsProvider"
import { DetailSectionsSidebar } from "./detail-sections/DetailSectionsSidebar"
import { Toaster } from "../ui/sonner"

// Layout principal: sidebar de navegação + header + conteúdo com transições
// Suporta sidebar terciário de seções quando habilitado via route handle
export function AppLayout() {
    return (
        <SidebarLayoutProvider>
            <SidebarProvider>
                <AppSidebarMenu />

                <DetailSectionsProvider>
                    <div className="flex-1 flex flex-col min-w-0">
                        <AppHeader />

                        <div className="flex flex-1 min-w-0">
                            <DetailSectionsSidebar />

                            <main className="flex-1 min-w-0">
                                <div className="container mx-auto max-w-7xl p-6">
                                    <AppPageTransition />
                                    <Toaster position="top-right" />
                                </div>
                            </main>
                        </div>
                    </div>
                </DetailSectionsProvider>
            </SidebarProvider>
        </SidebarLayoutProvider>
    )
}
