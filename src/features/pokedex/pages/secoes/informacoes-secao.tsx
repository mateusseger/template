import { useParams } from "react-router-dom"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Badge,
    Separator,
    Skeleton,
} from "@herval/react-core"
import { usePokemonDetail } from "../../api"
import { getTypeColor, translateType } from "../../api/pokedex-api"

export function InformacoesSecao() {
    const { id } = useParams<{ id: string }>()
    const { data: pokemon, isLoading } = usePokemonDetail(id)

    if (isLoading) {
        return <Skeleton className="h-64 w-full" />
    }

    if (!pokemon) return null

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card>
                <CardContent className="p-8">
                    <div className="aspect-square bg-gradient-to-br from-muted/50 to-muted rounded-lg p-8 flex items-center justify-center">
                        <img
                            src={pokemon.image}
                            alt={pokemon.name}
                            className="w-full h-full object-contain"
                        />
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Características</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Altura</span>
                        <span className="text-lg font-semibold">
                            {(pokemon.height / 10).toFixed(1)} m
                        </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Peso</span>
                        <span className="text-lg font-semibold">
                            {(pokemon.weight / 10).toFixed(1)} kg
                        </span>
                    </div>
                    <Separator />
                    <div>
                        <span className="text-sm text-muted-foreground block mb-2">Tipos</span>
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
                </CardContent>
            </Card>
        </div>
    )
}
