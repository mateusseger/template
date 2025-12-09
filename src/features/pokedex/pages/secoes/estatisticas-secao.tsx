import { useParams } from "react-router-dom"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Progress,
    Separator,
    Skeleton,
} from "@herval/react-core"
import { usePokemonDetail } from "../../api"
import { translateStat } from "../../api/pokedex-api"

export function EstatisticasSecao() {
    const { id } = useParams<{ id: string }>()
    const { data: pokemon, isLoading } = usePokemonDetail(id)

    if (isLoading) {
        return <Skeleton className="h-64 w-full" />
    }

    if (!pokemon) return null

    return (
        <Card>
            <CardHeader>
                <CardTitle>Atributos Base</CardTitle>
                <CardDescription>
                    Estatísticas fundamentais do Pokémon
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {pokemon.stats.map((stat) => {
                        const maxStat = 255
                        const percentage = (stat.base_stat / maxStat) * 100

                        return (
                            <div key={stat.stat.name} className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm font-medium">
                                        {translateStat(stat.stat.name)}
                                    </span>
                                    <span className="text-sm font-bold">
                                        {stat.base_stat}
                                    </span>
                                </div>
                                <Progress value={percentage} className="h-2" />
                            </div>
                        )
                    })}
                </div>
                <Separator className="my-4" />
                <div className="flex justify-between items-center">
                    <span className="font-semibold">Total</span>
                    <span className="text-lg font-bold text-primary">
                        {pokemon.stats.reduce((sum, stat) => sum + stat.base_stat, 0)}
                    </span>
                </div>
            </CardContent>
        </Card>
    )
}
