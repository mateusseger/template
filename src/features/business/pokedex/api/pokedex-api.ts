// Serviço de integração com PokeAPI

import type { Pokemon, PokemonDetail } from "../types/pokedex-types"

const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2"

// Lista pokémons com paginação
export async function listPokemons(limit = 20, offset = 0): Promise<Pokemon[]> {
    const response = await fetch(`${POKEAPI_BASE_URL}/pokemon?limit=${limit}&offset=${offset}`)

    if (!response.ok) {
        throw new Error("Erro ao buscar pokémons")
    }

    const data = await response.json()

    // Enriquecer dados com ID e imagem
    const pokemons: Pokemon[] = data.results.map((pokemon: any, index: number) => {
        const id = offset + index + 1
        return {
            id,
            name: pokemon.name,
            url: pokemon.url,
            image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
            types: [], // Será preenchido no detail
        }
    })

    return pokemons
}

// Obtém detalhes de um pokémon específico
export async function getPokemonDetail(id: string): Promise<PokemonDetail> {
    const response = await fetch(`${POKEAPI_BASE_URL}/pokemon/${id}`)

    if (!response.ok) {
        throw new Error("Pokémon não encontrado")
    }

    const data = await response.json()

    return {
        id: data.id,
        name: data.name,
        image: data.sprites.other['official-artwork'].front_default || data.sprites.front_default,
        types: data.types,
        height: data.height,
        weight: data.weight,
        abilities: data.abilities,
        stats: data.stats,
        sprites: data.sprites,
    }
}

// Busca pokémon por nome (a API aceita nome exato em minúsculas)
export async function searchPokemonByName(name: string): Promise<Pokemon | null> {
    try {
        const response = await fetch(`${POKEAPI_BASE_URL}/pokemon/${name.toLowerCase()}`)

        if (!response.ok) {
            return null
        }

        const data = await response.json()

        return {
            id: data.id,
            name: data.name,
            url: `${POKEAPI_BASE_URL}/pokemon/${data.id}`,
            image: data.sprites.other['official-artwork'].front_default || data.sprites.front_default,
            types: data.types.map((t: any) => t.type.name),
        }
    } catch (error) {
        return null
    }
}

// Tradução de tipos para português
export function translateType(type: string): string {
    const translations: Record<string, string> = {
        normal: "Normal",
        fire: "Fogo",
        water: "Água",
        electric: "Elétrico",
        grass: "Planta",
        ice: "Gelo",
        fighting: "Lutador",
        poison: "Veneno",
        ground: "Terra",
        flying: "Voador",
        psychic: "Psíquico",
        bug: "Inseto",
        rock: "Pedra",
        ghost: "Fantasma",
        dragon: "Dragão",
        dark: "Sombrio",
        steel: "Metálico",
        fairy: "Fada",
    }
    return translations[type] || type
}

// Tradução de stats para português
export function translateStat(stat: string): string {
    const translations: Record<string, string> = {
        hp: "HP",
        attack: "Ataque",
        defense: "Defesa",
        "special-attack": "Ataque Especial",
        "special-defense": "Defesa Especial",
        speed: "Velocidade",
    }
    return translations[stat] || stat
}

// Cores por tipo de pokémon
export function getTypeColor(type: string): string {
    const colors: Record<string, string> = {
        normal: "bg-gray-400",
        fire: "bg-orange-500",
        water: "bg-blue-500",
        electric: "bg-yellow-400",
        grass: "bg-green-500",
        ice: "bg-cyan-400",
        fighting: "bg-red-600",
        poison: "bg-purple-500",
        ground: "bg-amber-600",
        flying: "bg-indigo-400",
        psychic: "bg-pink-500",
        bug: "bg-lime-500",
        rock: "bg-stone-600",
        ghost: "bg-violet-600",
        dragon: "bg-indigo-600",
        dark: "bg-gray-700",
        steel: "bg-slate-500",
        fairy: "bg-pink-400",
    }
    return colors[type] || "bg-gray-400"
}

