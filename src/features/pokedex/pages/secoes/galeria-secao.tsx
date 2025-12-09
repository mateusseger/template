import { useParams } from "react-router-dom"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Skeleton,
} from "@herval/react-core"
import { usePokemonDetail } from "../../api"

export function GaleriaSecao() {
    const { id } = useParams<{ id: string }>()
    const { data: pokemon, isLoading } = usePokemonDetail(id)

    if (isLoading) {
        return <Skeleton className="h-64 w-full" />
    }

    if (!pokemon) return null

    return (
        <Card>
            <CardHeader>
                <CardTitle>Sprites</CardTitle>
                <CardDescription>
                    Diferentes visualizações do Pokémon
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
                    {pokemon.sprites.front_default && (
                        <Card className="overflow-hidden">
                            <CardContent className="p-4">
                                <div className="aspect-square bg-muted rounded-lg p-2 flex items-center justify-center mb-2">
                                    <img
                                        src={pokemon.sprites.front_default}
                                        alt="Frente normal"
                                        className="w-full h-full object-contain pixelated"
                                    />
                                </div>
                                <p className="text-xs text-center text-muted-foreground">
                                    Frente Normal
                                </p>
                            </CardContent>
                        </Card>
                    )}
                    {pokemon.sprites.front_shiny && (
                        <Card className="overflow-hidden">
                            <CardContent className="p-4">
                                <div className="aspect-square bg-muted rounded-lg p-2 flex items-center justify-center mb-2">
                                    <img
                                        src={pokemon.sprites.front_shiny}
                                        alt="Frente shiny"
                                        className="w-full h-full object-contain pixelated"
                                    />
                                </div>
                                <p className="text-xs text-center text-muted-foreground">
                                    Shiny ✨
                                </p>
                            </CardContent>
                        </Card>
                    )}
                    {pokemon.sprites.other?.['official-artwork']?.front_default && (
                        <Card className="overflow-hidden md:col-span-2">
                            <CardContent className="p-4">
                                <div className="aspect-square bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-4 flex items-center justify-center mb-2">
                                    <img
                                        src={pokemon.sprites.other['official-artwork'].front_default}
                                        alt="Artwork oficial"
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                                <p className="text-xs text-center text-muted-foreground">
                                    Artwork Oficial
                                </p>
                            </CardContent>
                        </Card>
                    )}
                </div>
            </CardContent>
        </Card>
    )
}
