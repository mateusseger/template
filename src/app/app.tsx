import { RouterProvider } from "react-router-dom"
import { AppProviders } from "@/app/app-providers"
import { router } from "@/app/app-router"
import { MobileUnsupportedPage } from "@/features/core/errors/pages/mobile-unsupported-page"
import { useMobile } from "@/shared/hooks/use-mobile"

function App() {
    const isMobile = useMobile()

    if (isMobile) {
        return (
            <AppProviders>
                <MobileUnsupportedPage />
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
