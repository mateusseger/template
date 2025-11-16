// Tipos da feature Previsão do Tempo

export interface Location {
    id: number
    name: string
    latitude: number
    longitude: number
    country: string
    admin1?: string
    timezone: string
}

export interface CurrentWeather {
    temperature: number
    windspeed: number
    winddirection: number
    weathercode: number
    time: string
}

export interface DailyForecast {
    time: string[]
    temperature_2m_max: number[]
    temperature_2m_min: number[]
    weathercode: number[]
    precipitation_sum: number[]
    windspeed_10m_max: number[]
}

export interface HourlyForecast {
    time: string[]
    temperature_2m: number[]
    precipitation: number[]
    weathercode: number[]
    windspeed_10m: number[]
    humidity: number[]
}

export interface WeatherDetail {
    location: Location
    current: CurrentWeather
    daily: DailyForecast
    hourly: HourlyForecast
    timezone: string
}

