// Serviço de integração com Open-Meteo API

import type { Location, WeatherDetail } from "./previsao-tempo-types"

const GEOCODING_API = "https://geocoding-api.open-meteo.com/v1"
const WEATHER_API = "https://api.open-meteo.com/v1"

// Busca localidades por nome
export async function searchLocations(query: string): Promise<Location[]> {
    if (!query || query.length < 2) return []

    const response = await fetch(
        `${GEOCODING_API}/search?name=${encodeURIComponent(query)}&count=10&language=pt&format=json`
    )

    if (!response.ok) {
        throw new Error("Erro ao buscar localidades")
    }

    const data = await response.json()

    if (!data.results) return []

    return data.results.map((result: any) => ({
        id: result.id,
        name: result.name,
        latitude: result.latitude,
        longitude: result.longitude,
        country: result.country,
        admin1: result.admin1,
        timezone: result.timezone,
    }))
}

// Obtém previsão completa para uma localidade
export async function getWeatherDetail(lat: number, lon: number): Promise<WeatherDetail> {
    const params = new URLSearchParams({
        latitude: lat.toString(),
        longitude: lon.toString(),
        current: "temperature_2m,windspeed_10m,winddirection_10m,weathercode",
        hourly: "temperature_2m,precipitation,weathercode,windspeed_10m,relativehumidity_2m",
        daily: "weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max",
        timezone: "auto",
    })

    const response = await fetch(`${WEATHER_API}/forecast?${params}`)

    if (!response.ok) {
        throw new Error("Erro ao buscar previsão do tempo")
    }

    const data = await response.json()

    return {
        location: {
            id: 0,
            name: "",
            latitude: data.latitude,
            longitude: data.longitude,
            country: "",
            timezone: data.timezone,
        },
        current: {
            temperature: data.current.temperature_2m,
            windspeed: data.current.windspeed_10m,
            winddirection: data.current.winddirection_10m,
            weathercode: data.current.weathercode,
            time: data.current.time,
        },
        daily: {
            time: data.daily.time,
            temperature_2m_max: data.daily.temperature_2m_max,
            temperature_2m_min: data.daily.temperature_2m_min,
            weathercode: data.daily.weathercode,
            precipitation_sum: data.daily.precipitation_sum,
            windspeed_10m_max: data.daily.windspeed_10m_max,
        },
        hourly: {
            time: data.hourly.time,
            temperature_2m: data.hourly.temperature_2m,
            precipitation: data.hourly.precipitation,
            weathercode: data.hourly.weathercode,
            windspeed_10m: data.hourly.windspeed_10m,
            humidity: data.hourly.relativehumidity_2m,
        },
        timezone: data.timezone,
    }
}

// Traduz código de clima para descrição
export function getWeatherDescription(code: number): string {
    const descriptions: Record<number, string> = {
        0: "Céu limpo",
        1: "Principalmente limpo",
        2: "Parcialmente nublado",
        3: "Nublado",
        45: "Neblina",
        48: "Neblina com geada",
        51: "Chuvisco leve",
        53: "Chuvisco moderado",
        55: "Chuvisco intenso",
        61: "Chuva leve",
        63: "Chuva moderada",
        65: "Chuva forte",
        71: "Neve leve",
        73: "Neve moderada",
        75: "Neve forte",
        77: "Granizo",
        80: "Pancadas de chuva leves",
        81: "Pancadas de chuva moderadas",
        82: "Pancadas de chuva fortes",
        85: "Pancadas de neve leves",
        86: "Pancadas de neve fortes",
        95: "Tempestade",
        96: "Tempestade com granizo leve",
        99: "Tempestade com granizo forte",
    }
    return descriptions[code] || "Desconhecido"
}

// Ícone emoji por código de clima
export function getWeatherEmoji(code: number): string {
    if (code === 0) return "☀️"
    if (code <= 3) return "⛅"
    if (code <= 48) return "🌫️"
    if (code <= 67) return "🌧️"
    if (code <= 77) return "🌨️"
    if (code <= 82) return "🌦️"
    if (code <= 86) return "❄️"
    return "⛈️"
}

// Formata data (corrige timezone para interpretar como data local)
export function formatDate(dateString: string): string {
    // API retorna datas no formato YYYY-MM-DD sem timezone
    // Adicionar 'T12:00:00' garante que seja interpretado como meio-dia local
    const date = new Date(dateString + 'T12:00:00')
    return date.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: 'short',
        weekday: 'short'
    })
}

// Formata hora
export function formatHour(dateTimeString: string): string {
    const date = new Date(dateTimeString)
    return date.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
    })
}

