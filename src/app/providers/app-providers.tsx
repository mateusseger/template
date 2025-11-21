// Providers globais da aplicação (Theme, Auth, Query, ErrorBoundary)

import { type ReactNode } from "react"
import { QueryClientProvider } from "@tanstack/react-query"
import { ErrorBoundary, type FallbackProps } from "react-error-boundary"
import { AuthContextProvider } from "@/features/auth"
import { ThemeProvider } from "@/shared/theme"
import { queryClient } from "@/shared/config/query-client"

function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
    const isDev = import.meta.env.DEV

    const handleReportError = () => {
        // TODO: Integrar com serviço de monitoramento (Sentry, Datadog, etc)
        console.error("[ErrorBoundary] Erro reportado:", {
            message: error.message,
            stack: error.stack,
            timestamp: new Date().toISOString(),
        })
        alert("Erro reportado com sucesso!")
    }

    return (
        <div className="flex min-h-screen items-center justify-center p-6 bg-background">
            <div className="max-w-2xl w-full">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 mb-4">
                        <span className="text-3xl">⚠️</span>
                    </div>
                    <h2 className="text-2xl font-bold mb-2">Algo deu errado</h2>
                    <p className="text-muted-foreground mb-4">{error.message}</p>
                </div>

                {isDev && error.stack && (
                    <details className="mb-6 p-4 rounded-lg bg-muted text-sm">
                        <summary className="cursor-pointer font-medium mb-2">
                            Stack Trace (Dev Mode)
                        </summary>
                        <pre className="overflow-auto text-xs">{error.stack}</pre>
                    </details>
                )}

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                        onClick={resetErrorBoundary}
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                    >
                        Tentar Novamente
                    </button>
                    <button
                        onClick={() => window.location.reload()}
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                    >
                        Recarregar Página
                    </button>
                    <button
                        onClick={handleReportError}
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                    >
                        Reportar Erro
                    </button>
                </div>
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

