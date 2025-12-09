import { useParams } from "react-router-dom"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Badge,
    Skeleton,
} from "@herval/react-core"
import { usePokemonDetail } from "../../api"

export function HabilidadesSecao() {
    const { id } = useParams<{ id: string }>()
    const { data: pokemon, isLoading } = usePokemonDetail(id)

    if (isLoading) {
        return <Skeleton className="h-64 w-full" />
    }

    if (!pokemon) return null

    return (
        <Card>
            <CardHeader>
                <CardTitle>Habilidades do Pokémon</CardTitle>
                <CardDescription>
                    {pokemon.abilities.length} habilidade{pokemon.abilities.length > 1 ? 's' : ''} disponível{pokemon.abilities.length > 1 ? 'is' : ''}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                    {pokemon.abilities.map((ability) => (
                        <Card key={ability.slot} className="border-2">
                            <CardContent className="p-4">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h4 className="font-semibold capitalize">
                                            {ability.ability.name.replace('-', ' ')}
                                        </h4>
                                        <p className="text-sm text-muted-foreground mt-1">
                                            Slot {ability.slot}
                                        </p>
                                    </div>
                                    {ability.is_hidden && (
                                        <Badge variant="outline" className="text-xs">
                                            Oculta
                                        </Badge>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
