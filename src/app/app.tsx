import { RouterProvider } from "react-router-dom"
import { AppProviders } from "@/app/providers"
import { router } from "@/app/router"
import { MobileUnsupported } from "@/shared/components/layout/mobile-unsupported"
import { useMobile } from "@/shared/hooks/use-mobile"

function App() {
    const isMobile = useMobile()

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
