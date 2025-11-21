import { AppHeader } from "./app-header"
import { AppSidebarMenu } from "./app-sidebar-menu"
import { AppPageTransition } from "../transitions/app-page-transition"
import { SidebarProvider } from "../ui/shadcn/sidebar"
import { SidebarLayoutProvider } from "@/shared/components/layout/sidebar-layout-context"
import { DetailSectionsProvider } from "./detail-sections/detail-sections-provider"
import { DetailSectionsSidebar } from "./detail-sections/detail-sections-sidebar"
import { Toaster } from "../ui/shadcn/sonner"

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
