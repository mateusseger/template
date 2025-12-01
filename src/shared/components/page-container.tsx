import { cn } from "@herval/react-core"

interface PageContainerProps {
    children: React.ReactNode
    className?: string
}

/**
 * PageContainer - Wrapper para conteúdo de páginas
 *
 * Nota: O AppLayout já aplica container e padding.
 * Este componente adiciona apenas espaçamento vertical consistente.
 */
export function PageContainer({ children, className }: PageContainerProps) {
    return (
        <div className={cn("py-2", className)}>
            {children}
        </div>
    )
}
