// Tipos da feature Pokemon

export interface Pokemon {
    id: number
    name: string
    url: string
    image: string
    types: string[]
}

export interface PokemonDetail {
    id: number
    name: string
    image: string
    types: PokemonType[]
    height: number
    weight: number
    abilities: Ability[]
    stats: Stat[]
    sprites: Sprites
}

export interface PokemonType {
    slot: number
    type: {
        name: string
        url: string
    }
}

export interface Ability {
    ability: {
        name: string
        url: string
    }
    is_hidden: boolean
    slot: number
}

export interface Stat {
    base_stat: number
    effort: number
    stat: {
        name: string
        url: string
    }
}

export interface Sprites {
    front_default: string
    front_shiny: string
    other: {
        'official-artwork': {
            front_default: string
        }
        dream_world: {
            front_default: string
        }
    }
}

