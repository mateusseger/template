// React Query: Queries (GET) para Previsão do Tempo

import { useQuery } from "@tanstack/react-query"
import { searchLocations, getWeatherDetail } from "./previsao-tempo-api"

/**
 * Hook para buscar localizações por query
 */
export function useSearchLocations(query: string) {
    return useQuery({
        queryKey: ["locations", query],
        queryFn: () => searchLocations(query),
        enabled: query.length > 2, // Só busca com 3+ caracteres
        staleTime: 1000 * 60 * 5, // 5 minutos
    })
}

/**
 * Hook para buscar detalhes do clima de uma localização
 */
export function useWeatherDetail(lat: number | undefined, lon: number | undefined) {
    return useQuery({
        queryKey: ["weather", lat, lon],
        queryFn: () => getWeatherDetail(lat!, lon!),
        enabled: lat !== undefined && lon !== undefined, // Só executa se tiver coordenadas
        staleTime: 1000 * 60 * 10, // 10 minutos
    })
}
