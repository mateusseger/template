// Página de detalhes de um Pokémon com seções navegáveis

import { useParams, Link } from "react-router-dom"
import { ArrowLeft, Info, Zap, Award, Image as ImageIcon } from "lucide-react"
import { Section } from "@/shared/components/layout/detail-sections"
import { Button } from "@/shared/components/ui/shadcn/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/shadcn/card"
import { Badge } from "@/shared/components/ui/shadcn/badge"
import { Progress } from "@/shared/components/ui/shadcn/progress"
import { DetailPageSkeleton } from "@/shared/components/ui/custom/detail-page-skeleton"
import { Separator } from "@/shared/components/ui/shadcn/separator"
import { translateType, translateStat, getTypeColor } from "../api/pokedex-api"
import { usePokemonDetail } from "../api"

export function PokedexDetailPage() {
    const { id } = useParams<{ id: string }>()
    const { data: pokemon, isLoading, error } = usePokemonDetail(id)

    if (isLoading) {
        return <DetailPageSkeleton />
    }

    if (error || !pokemon) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <h2 className="text-2xl font-bold mb-2">Pokémon não encontrado</h2>
                <p className="text-muted-foreground mb-4">
                    {error instanceof Error ? error.message : "Pokémon não encontrado"}
                </p>
                <Link to="/exemplos/pokedex">
                    <Button>Voltar para Pokédex</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link to="/exemplos/pokedex">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <div className="flex items-center gap-3">
                            <h1 className="text-3xl font-bold tracking-tight capitalize">
                                {pokemon.name}
                            </h1>
                            <span className="text-2xl text-muted-foreground">
                                #{pokemon.id.toString().padStart(3, '0')}
                            </span>
                        </div>
                        <div className="flex gap-2 mt-2">
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
                </div>
            </div>

            {/* Seção: Informações Básicas */}
            <Section id="info" label="Informações Básicas" icon={Info}>
                <Section.Header id="info" label="Informações Básicas" icon={Info} />

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Imagem Principal */}
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

                    {/* Dados Físicos */}
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
            </Section>

            {/* Seção: Habilidades */}
            <Section id="abilities" label="Habilidades" icon={Zap}>
                <Section.Header id="abilities" label="Habilidades" icon={Zap} />

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
            </Section>

            {/* Seção: Estatísticas */}
            <Section id="stats" label="Estatísticas" icon={Award}>
                <Section.Header id="stats" label="Estatísticas" icon={Award} />

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
                                const maxStat = 255 // Valor máximo teórico
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
            </Section>

            {/* Seção: Galeria */}
            <Section id="gallery" label="Galeria" icon={ImageIcon}>
                <Section.Header id="gallery" label="Galeria" icon={ImageIcon} />

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
            </Section>
        </div>
    )
}

