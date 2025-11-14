import { AppHeader } from "./AppHeader"
import { AppSidebar } from "./AppSidebar"
import { Outlet } from "react-router-dom"
import { AppPageTransition } from "./AppPageTransition"
import { SidebarProvider } from "../ui/sidebar"

export function AppLayout() {
    return (
        <SidebarProvider>
            <AppSidebar />

            <div className="flex-1 flex flex-col min-w-0">
                <AppHeader />
                <main>
                    <div className="max-w-screen-2xl mx-auto p-6">
                        <AppPageTransition>
                            <Outlet />
                        </AppPageTransition>
                    </div>
                </main>
            </div>
        </SidebarProvider>
    )
}
