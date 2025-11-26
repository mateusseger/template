import {
    AuthProvider,
    ErrorBoundaryProvider,
    ThemeProvider,
    MobileUnsupportedPage,
    useMobile
} from "@herval/react-core"

import { RouterProvider } from "react-router-dom"
import { appConfig } from './app-config'
import { router } from "./app-router"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/shared/config/query-client"


function App() {
    const isMobile = useMobile()

    if (isMobile)
        return <MobileUnsupportedPage />

    return (
        <ErrorBoundaryProvider>
            <ThemeProvider>
                <AuthProvider config={appConfig.auth} devMode>
                    <QueryClientProvider client={queryClient}>
                        <RouterProvider router={router} />
                    </QueryClientProvider>
                </AuthProvider>
            </ThemeProvider>
        </ErrorBoundaryProvider>
    )
}

export default App
