// React Query: Queries (GET) para Pokedex

import { useQuery } from "@tanstack/react-query"
import { listPokemons, getPokemonDetail, searchPokemonByName } from "./pokedex-api"

/**
 * Hook para listar pokémons com paginação
 */
export function usePokemons(limit = 20, offset = 0) {
    return useQuery({
        queryKey: ["pokemons", limit, offset],
        queryFn: () => listPokemons(limit, offset),
        staleTime: 1000 * 60 * 5, // 5 minutos
    })
}

/**
 * Hook para buscar detalhes de um pokémon específico
 */
export function usePokemonDetail(id: string | undefined) {
    return useQuery({
        queryKey: ["pokemon", id],
        queryFn: () => getPokemonDetail(id!),
        enabled: !!id, // Só executa se id existir
        staleTime: 1000 * 60 * 10, // 10 minutos
    })
}

/**
 * Hook para buscar pokémon por nome
 */
export function useSearchPokemon(name: string) {
    return useQuery({
        queryKey: ["pokemon-search", name],
        queryFn: () => searchPokemonByName(name),
        enabled: name.length > 0, // Só executa se houver nome
        staleTime: 1000 * 60 * 5, // 5 minutos
    })
}
