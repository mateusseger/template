import { useState, useMemo } from "react"
import { Link } from "react-router-dom"
import { Search, ChevronLeft, ChevronRight, X, Zap, Loader2, Sparkles } from "lucide-react"
import { PageHeader } from "@/shared/components"
import {
    Input,
    Button,
    Skeleton,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Badge
} from "@herval/react-core"
import { usePokemons, useSearchPokemon } from "../api"

const ITENS_POR_PAGINA = 20

export function PokedexListaPage() {
    const [termoBusca, setTermoBusca] = useState("")
    const [modoBusca, setModoBusca] = useState(false)
    const [pagina, setPagina] = useState(0)

    const { data: pokemons = [], isLoading } = usePokemons(ITENS_POR_PAGINA, pagina * ITENS_POR_PAGINA)
    const { data: resultadoBusca, isLoading: buscando } = useSearchPokemon(
        modoBusca ? termoBusca : ""
    )

    const pokemonsFiltrados = useMemo(() => {
        if (modoBusca && resultadoBusca) return [resultadoBusca]
        if (!termoBusca.trim()) return pokemons
        return pokemons.filter((p) =>
            p.name.toLowerCase().includes(termoBusca.toLowerCase())
        )
    }, [termoBusca, pokemons, modoBusca, resultadoBusca])

    const handleBuscar = () => {
        if (!termoBusca.trim()) {
            setModoBusca(false)
            return
        }
        setModoBusca(true)
    }

    const handleLimparBusca = () => {
        setTermoBusca("")
        setModoBusca(false)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleBuscar()
    }

    return (
        <div className="space-y-8">
            <PageHeader
                icon={Zap}
                iconClassName="text-red-500"
                title="Pokédex"
                description="Explore e descubra informações sobre os Pokémon"
            />

            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Página Atual</p>
                                <p className="text-2xl font-bold mt-1">{pagina + 1}</p>
                            </div>
                            <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                                <Search className="h-6 w-6 text-blue-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Exibindo</p>
                                <p className="text-2xl font-bold mt-1">{pokemonsFiltrados.length} Pokémon</p>
                            </div>
                            <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                                <Sparkles className="h-6 w-6 text-green-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Por Página</p>
                                <p className="text-2xl font-bold mt-1">{ITENS_POR_PAGINA}</p>
                            </div>
                            <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center">
                                <Zap className="h-6 w-6 text-red-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Buscar Pokémon</CardTitle>
                    <CardDescription>
                        Digite o nome de um Pokémon para encontrá-lo na API
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Ex: pikachu, charizard, mewtwo..."
                                value={termoBusca}
                                onChange={(e) => setTermoBusca(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="pl-9"
                                disabled={buscando}
                            />
                        </div>
                        <Button onClick={handleBuscar} disabled={buscando || !termoBusca.trim()}>
                            {buscando ? (
                                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            ) : (
                                <Search className="h-4 w-4 mr-2" />
                            )}
                            Buscar
                        </Button>
                        {termoBusca && (
                            <Button variant="ghost" onClick={handleLimparBusca} disabled={buscando}>
                                <X className="h-4 w-4 mr-2" />
                                Limpar
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>

            {termoBusca && pokemonsFiltrados.length > 0 && pokemonsFiltrados.length < pokemons.length && (
                <div>
                    <h2 className="text-xl font-semibold mb-4">Resultados da Busca</h2>
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {pokemonsFiltrados.map((pokemon) => (
                            <Link key={pokemon.id} to={`/pokedex/${pokemon.id}`}>
                                <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer group overflow-hidden border-primary/20">
                                    <CardContent className="p-6">
                                        <div className="aspect-square mb-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg p-4 flex items-center justify-center relative">
                                            <Badge variant="default" className="absolute top-2 right-2 font-mono">
                                                #{pokemon.id.toString().padStart(3, '0')}
                                            </Badge>
                                            <img
                                                src={pokemon.image}
                                                alt={pokemon.name}
                                                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-200"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="text-center">
                                            <h3 className="font-semibold text-lg capitalize">{pokemon.name}</h3>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {termoBusca && pokemonsFiltrados.length === 0 && !buscando && (
                <Card className="p-12">
                    <div className="text-center space-y-3">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                            <Search className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="font-semibold text-lg">Nenhum Pokémon encontrado</h3>
                        <p className="text-sm text-muted-foreground max-w-md mx-auto">
                            Tente buscar por outro nome. Exemplos: pikachu, charizard, mewtwo
                        </p>
                        <Button variant="outline" size="sm" onClick={() => setTermoBusca("")} className="mt-4">
                            Limpar busca
                        </Button>
                    </div>
                </Card>
            )}

            {isLoading ? (
                <>
                    <h2 className="text-xl font-semibold mb-4">Pokémon Populares</h2>
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <Card key={i}>
                                <CardContent className="p-6">
                                    <Skeleton className="h-32 w-full mb-4" />
                                    <Skeleton className="h-6 w-3/4 mb-2" />
                                    <Skeleton className="h-4 w-1/2" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </>
            ) : (
                <div>
                    <h2 className="text-xl font-semibold mb-4">Pokémon Populares</h2>
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {pokemonsFiltrados.map((pokemon) => (
                            <Link key={pokemon.id} to={`/pokedex/${pokemon.id}`}>
                                <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer group overflow-hidden">
                                    <CardContent className="p-6">
                                        <div className="aspect-square mb-4 bg-gradient-to-br from-muted/50 to-muted rounded-lg p-4 flex items-center justify-center relative">
                                            <Badge variant="secondary" className="absolute top-2 right-2 font-mono">
                                                #{pokemon.id.toString().padStart(3, '0')}
                                            </Badge>
                                            <img
                                                src={pokemon.image}
                                                alt={pokemon.name}
                                                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-200"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="text-center">
                                            <h3 className="font-semibold text-lg capitalize">{pokemon.name}</h3>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center justify-center gap-4 mt-8">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setPagina((p) => Math.max(0, p - 1))}
                            disabled={pagina === 0}
                        >
                            <ChevronLeft className="h-4 w-4 mr-1" />
                            <span className="hidden sm:inline">Anterior</span>
                        </Button>

                        <div className="flex items-center gap-2">
                            {pagina > 0 && (
                                <Button variant="ghost" size="sm" onClick={() => setPagina(0)} className="h-8 w-8 p-0">
                                    1
                                </Button>
                            )}
                            {pagina > 2 && <span className="text-muted-foreground">...</span>}
                            {pagina > 1 && (
                                <Button variant="ghost" size="sm" onClick={() => setPagina(pagina - 1)} className="h-8 w-8 p-0">
                                    {pagina}
                                </Button>
                            )}
                            <Button variant="secondary" size="sm" className="h-8 w-8 p-0">
                                {pagina + 1}
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => setPagina(pagina + 1)} className="h-8 w-8 p-0">
                                {pagina + 2}
                            </Button>
                        </div>

                        <Button variant="outline" size="sm" onClick={() => setPagina((p) => p + 1)}>
                            <span className="hidden sm:inline">Próxima</span>
                            <ChevronRight className="h-4 w-4 ml-1" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    )
}
