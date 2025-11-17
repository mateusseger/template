// Página de listagem de Pokémons

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Search, ChevronLeft, ChevronRight, Sparkles } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Input } from "@/shared/components/ui/input"
import { Button } from "@/shared/components/ui/button"
import { Skeleton } from "@/shared/components/ui/skeleton"
import { listPokemons, searchPokemonByName } from "../pokemon-service"
import type { Pokemon } from "../pokemon-types"

export function PokemonListPage() {
    const [pokemons, setPokemons] = useState<Pokemon[]>([])
    const [filteredPokemons, setFilteredPokemons] = useState<Pokemon[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isSearching, setIsSearching] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")
    const [page, setPage] = useState(0)
    const ITEMS_PER_PAGE = 20

    useEffect(() => {
        loadPokemons()
    }, [page])

    // Filtra localmente quando digita
    useEffect(() => {
        if (!searchTerm.trim()) {
            setFilteredPokemons(pokemons)
            return
        }

        const localResults = pokemons.filter((p) =>
            p.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setFilteredPokemons(localResults)
    }, [searchTerm, pokemons])

    async function loadPokemons() {
        setIsLoading(true)
        try {
            const data = await listPokemons(ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
            setPokemons(data)
            if (!searchTerm) {
                setFilteredPokemons(data)
            }
        } catch (error) {
            console.error("[Pokemon] Erro ao carregar pokémons:", error)
        } finally {
            setIsLoading(false)
        }
    }

    async function handleSearch() {
        if (!searchTerm.trim()) {
            setFilteredPokemons(pokemons)
            return
        }

        setIsSearching(true)
        try {
            // Busca na API por nome exato
            const result = await searchPokemonByName(searchTerm)
            if (result) {
                setFilteredPokemons([result])
            } else {
                setFilteredPokemons([])
            }
        } catch (error) {
            console.error("[Pokemon] Erro ao buscar pokémon:", error)
            setFilteredPokemons([])
        } finally {
            setIsSearching(false)
        }
    }

    function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            handleSearch()
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Sparkles className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Pokédex</h1>
                        <p className="text-muted-foreground">
                            Explore e descubra informações sobre os Pokémon
                        </p>
                    </div>
                </div>
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
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="pl-9"
                                disabled={isSearching}
                            />
                        </div>
                        <Button
                            onClick={handleSearch}
                            disabled={isSearching || !searchTerm.trim()}
                        >
                            {isSearching && <div className="h-4 w-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />}
                            Buscar
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {searchTerm && filteredPokemons.length > 0 && filteredPokemons.length < pokemons.length && (
                <div>
                    <h2 className="text-xl font-semibold mb-4">Resultados da Busca</h2>
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                        {filteredPokemons.map((pokemon) => (
                            <Link key={pokemon.id} to={`/pokemon/${pokemon.id}`}>
                                <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer group">
                                    <CardContent className="p-6">
                                        <div className="aspect-square mb-4 bg-linear-to-br from-muted/50 to-muted rounded-lg p-4 flex items-center justify-center">
                                            <img
                                                src={pokemon.image}
                                                alt={pokemon.name}
                                                className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-200"
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <h3 className="font-semibold text-lg capitalize">
                                                    {pokemon.name}
                                                </h3>
                                                <span className="text-sm text-muted-foreground">
                                                    #{pokemon.id.toString().padStart(3, '0')}
                                                </span>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            {searchTerm && filteredPokemons.length === 0 && !isSearching && (
                <Card className="p-12">
                    <div className="text-center space-y-3">
                        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                            <Search className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="font-semibold text-lg">Nenhum Pokémon encontrado</h3>
                        <p className="text-sm text-muted-foreground max-w-md mx-auto">
                            Tente buscar por outro nome. Exemplos: pikachu, charizard, mewtwo
                        </p>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSearchTerm("")}
                            className="mt-4"
                        >
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
                <>
                    <div>
                        <h2 className="text-xl font-semibold mb-4">Pokémon Populares</h2>
                        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {filteredPokemons.map((pokemon) => (
                                <Link key={pokemon.id} to={`/pokemon/${pokemon.id}`}>
                                    <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer group">
                                        <CardContent className="p-6">
                                            <div className="aspect-square mb-4 bg-linear-to-br from-muted/50 to-muted rounded-lg p-4 flex items-center justify-center">
                                                <img
                                                    src={pokemon.image}
                                                    alt={pokemon.name}
                                                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-200"
                                                    loading="lazy"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex items-center justify-between">
                                                    <h3 className="font-semibold text-lg capitalize">
                                                        {pokemon.name}
                                                    </h3>
                                                    <span className="text-sm text-muted-foreground">
                                                        #{pokemon.id.toString().padStart(3, '0')}
                                                    </span>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>

                        <div className="flex items-center justify-center gap-2 mt-8">
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPage((p) => Math.max(0, p - 1))}
                                disabled={page === 0}
                            >
                                <ChevronLeft className="h-4 w-4 mr-1" />
                                Anterior
                            </Button>
                            <span className="text-sm text-muted-foreground px-4">
                                Página {page + 1}
                            </span>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setPage((p) => p + 1)}
                            >
                                Próxima
                                <ChevronRight className="h-4 w-4 ml-1" />
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

