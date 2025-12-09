import { cn } from "@herval/react-core"
import type { SecaoItem } from "./types"

interface ItemDetailNavProps {
    secoes: SecaoItem[]
    secaoAtiva: string
    onNavegar: (id: string) => void
}

export function ItemDetailNav({
    secoes,
    secaoAtiva,
    onNavegar,
}: ItemDetailNavProps) {
    return (
        <nav className="space-y-1">
            {secoes.map((secao) => {
                const isAtiva = secaoAtiva === secao.id
                const Icon = secao.icon

                return (
                    <button
                        key={secao.id}
                        onClick={() => onNavegar(secao.id)}
                        className={cn(
                            "w-full text-left rounded-md transition-colors",
                            "px-3 py-2 text-sm",
                            "flex items-center gap-2",
                            "hover:bg-accent hover:text-accent-foreground",
                            isAtiva && "bg-accent text-accent-foreground font-medium"
                        )}
                    >
                        <Icon className="h-4 w-4 shrink-0" />
                        <span className="truncate">{secao.label}</span>
                    </button>
                )
            })}
        </nav>
    )
}
