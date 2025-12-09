import { useParams, Link } from "react-router-dom"
import { Info, Zap, Award, Image as ImageIcon } from "lucide-react"
import { Skeleton } from "@herval/react-core"
import { ItemDetailLayout, type SecaoItem } from "@/shared/components"
import { usePokemonDetail } from "../api"

const secoes: SecaoItem[] = [
    { id: "informacoes", label: "Informações", icon: Info },
    { id: "habilidades", label: "Habilidades", icon: Zap },
    { id: "estatisticas", label: "Estatísticas", icon: Award },
    { id: "galeria", label: "Galeria", icon: ImageIcon },
]

export function PokedexDetalheLayout() {
    const { id } = useParams<{ id: string }>()
    const { data: pokemon, isLoading, error } = usePokemonDetail(id)

    if (isLoading) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-64 w-full" />
            </div>
        )
    }

    if (error || !pokemon) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <h2 className="text-2xl font-bold mb-2">Pokémon não encontrado</h2>
                <p className="text-muted-foreground mb-4">
                    {error instanceof Error ? error.message : "Pokémon não encontrado"}
                </p>
                <Link to="/pokedex" className="text-primary hover:underline">
                    Voltar para Pokédex
                </Link>
            </div>
        )
    }

    // Título com nome e número
    const titulo = `${pokemon.name} #${pokemon.id.toString().padStart(3, '0')}`

    return (
        <ItemDetailLayout
            secoes={secoes}
            tituloVoltar="Pokédex"
            rotaVoltar="/pokedex"
            tituloItem={titulo}
        />
    )
}
