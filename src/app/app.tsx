import { AuthProvider, ErrorFallback, ThemeProvider } from "@herval/react-core"
import { RouterProvider } from "react-router-dom"
import { ErrorBoundary } from "react-error-boundary"
import { appConfig } from './app-config'
import { router } from "./app-router"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "@/shared/config/query-client"

function App() {
    return (
        <ErrorBoundary
            FallbackComponent={({ error, resetErrorBoundary }) => (
                <ErrorFallback
                    error={error}
                    resetErrorBoundary={resetErrorBoundary}
                    showStack={import.meta.env.DEV}
                />
            )}
        >
            <ThemeProvider>
                <AuthProvider config={appConfig.auth} devMode>
                    <QueryClientProvider client={queryClient}>
                        <RouterProvider router={router} />
                    </QueryClientProvider>
                </AuthProvider>
            </ThemeProvider>
        </ErrorBoundary>
    )
}

export default App
