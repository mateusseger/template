// Providers globais da aplicação (Theme, Auth, Query, ErrorBoundary)

import { type ReactNode } from "react"
import { QueryClientProvider } from "@tanstack/react-query"
import { ErrorBoundary } from "react-error-boundary"
import { AuthContextProvider } from "@/features/auth"
import { ThemeProvider } from "@/shared/theme"
import { queryClient } from "@/shared/config/queryClient"

function ErrorFallback({ error }: { error: Error }) {
    return (
        <div className="flex min-h-screen items-center justify-center p-6">
            <div className="max-w-md w-full text-center">
                <h2 className="text-2xl font-bold mb-4">Algo deu errado</h2>
                <p className="text-muted-foreground mb-4">{error.message}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                >
                    Recarregar Página
                </button>
            </div>
        </div>
    )
}

interface AppProvidersProps {
    children: ReactNode
}

export function AppProviders({ children }: AppProvidersProps) {
    return (
        <ErrorBoundary FallbackComponent={ErrorFallback}>
            <ThemeProvider>
                <QueryClientProvider client={queryClient}>
                    <AuthContextProvider>
                        {children}
                    </AuthContextProvider>
                </QueryClientProvider>
            </ThemeProvider>
        </ErrorBoundary>
    )
}

