import { useParams, Link } from "react-router-dom"
import { Info, Zap, Award, Image as ImageIcon } from "lucide-react"
import { Badge, Skeleton } from "@herval/react-core"
import { ItemDetailLayout, type SecaoItem } from "@/shared/components"
import { usePokemonDetail } from "../api"
import { getTypeColor, translateType } from "../api/pokedex-api"

const secoes: SecaoItem[] = [
    { id: "informacoes", label: "Informações", icon: Info },
    { id: "habilidades", label: "Habilidades", icon: Zap },
    { id: "estatisticas", label: "Estatísticas", icon: Award },
    { id: "galeria", label: "Galeria", icon: ImageIcon },
]

export function PokedexDetailLayout() {
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

    return (
        <ItemDetailLayout
            secoes={secoes}
            tituloVoltar="Pokédex"
            rotaVoltar="/pokedex"
        >
            <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl sm:text-3xl font-bold capitalize">
                        {pokemon.name}
                    </h1>
                    <span className="text-xl sm:text-2xl text-muted-foreground">
                        #{pokemon.id.toString().padStart(3, '0')}
                    </span>
                </div>
                <div className="flex gap-2">
                    {pokemon.types.map((type) => (
                        <Badge
                            key={type.slot}
                            className={`${getTypeColor(type.type.name)} text-white border-0`}
                        >
                            {translateType(type.type.name)}
                        </Badge>
                    ))}
                </div>
            </div>
        </ItemDetailLayout>
    )
}
