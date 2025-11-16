import { RouterProvider } from "react-router-dom"
import { AppProviders } from "@/app/providers"
import { router } from "@/app/router"
import { MobileUnsupported } from "@/shared/components/layout/MobileUnsupported"
import { useIsMobile } from "@/shared/hooks/useIsMobile"

function App() {
    const isMobile = useIsMobile()

    if (isMobile) {
        return (
            <AppProviders>
                <MobileUnsupported />
            </AppProviders>
        )
    }

    return (
        <AppProviders>
            <RouterProvider router={router} />
        </AppProviders>
    )
}

export default App
