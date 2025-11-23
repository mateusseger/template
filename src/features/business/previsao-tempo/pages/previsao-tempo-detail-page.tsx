// Página de detalhes do clima com previsão completa

import { useMemo } from "react"
import { useParams, useLocation, Link } from "react-router-dom"
import { ArrowLeft, Info, Calendar, Clock, CloudRain } from "lucide-react"
import { Section } from "@/shared/components/layout/detail-sections"
import { Button } from "@/shared/components/ui/shadcn/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/shadcn/card"
import { DetailPageSkeleton } from "@/shared/components/ui/custom/detail-page-skeleton"
import { Separator } from "@/shared/components/ui/shadcn/separator"
import {
    getWeatherDescription,
    getWeatherEmoji,
    formatDate,
    formatHour
} from "../api/previsao-tempo-api"
import { useWeatherDetail } from "../api"

export function PrevisaoTempoDetailPage() {
    const { coords } = useParams<{ coords: string }>()
    const location = useLocation()

    const locationData = location.state?.location

    // Parse coordinates from URL
    const { lat, lon } = useMemo(() => {
        if (!coords) return { lat: undefined, lon: undefined }
        const [latitude, longitude] = coords.split(',').map(Number)
        if (isNaN(latitude) || isNaN(longitude)) return { lat: undefined, lon: undefined }
        return { lat: latitude, lon: longitude }
    }, [coords])

    // Fetch weather data with React Query
    const { data: weather, isLoading, error } = useWeatherDetail(lat, lon)

    // Merge location data from navigation state
    const weatherWithLocation = useMemo(() => {
        if (!weather) return null
        if (locationData) {
            return { ...weather, location: locationData }
        }
        return weather
    }, [weather, locationData])

    if (isLoading) {
        return <DetailPageSkeleton />
    }

    if (error || !weatherWithLocation) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <h2 className="text-2xl font-bold mb-2">Erro ao carregar</h2>
                <p className="text-muted-foreground mb-4">
                    {error instanceof Error ? error.message : "Erro ao carregar previsão do tempo"}
                </p>
                <Link to="/exemplos/previsao-tempo">
                    <Button>Voltar para Busca</Button>
                </Link>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link to="/exemplos/previsao-tempo">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            {weatherWithLocation.location.name || "Localidade"}
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            {weatherWithLocation.location.country && `${weatherWithLocation.location.country} • `}
                            Atualizado em {formatHour(weatherWithLocation.current.time)}
                        </p>
                    </div>
                </div>
            </div>

            {/* Seção: Clima Atual */}
            <Section id="current" label="Clima Atual" icon={Info}>
                <Section.Header id="current" label="Clima Atual" icon={Info} />

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Temperatura Atual */}
                    <Card>
                        <CardContent className="p-8">
                            <div className="text-center">
                                <div className="text-6xl mb-4">
                                    {getWeatherEmoji(weatherWithLocation.current.weathercode)}
                                </div>
                                <div className="text-5xl font-bold mb-2">
                                    {Math.round(weatherWithLocation.current.temperature)}°C
                                </div>
                                <p className="text-muted-foreground">
                                    {getWeatherDescription(weatherWithLocation.current.weathercode)}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Condições */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Condições Atuais</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Vento</span>
                                <span className="text-lg font-semibold">
                                    {Math.round(weatherWithLocation.current.windspeed)} km/h
                                </span>
                            </div>
                            <Separator />
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Direção do Vento</span>
                                <span className="text-lg font-semibold">
                                    {Math.round(weatherWithLocation.current.winddirection)}°
                                </span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </Section>

            {/* Seção: Previsão Semanal */}
            <Section id="weekly" label="Próximos 7 Dias" icon={Calendar}>
                <Section.Header id="weekly" label="Próximos 7 Dias" icon={Calendar} />

                <Card>
                    <CardHeader>
                        <CardTitle>Previsão Semanal</CardTitle>
                        <CardDescription>
                            Temperaturas máximas e mínimas para os próximos dias
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {weatherWithLocation.daily.time.slice(0, 7).map((date, index) => (
                                <div key={date} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50 transition-colors">
                                    <div className="flex items-center gap-3 flex-1">
                                        <span className="text-2xl">
                                            {getWeatherEmoji(weatherWithLocation.daily.weathercode[index])}
                                        </span>
                                        <div>
                                            <p className="font-medium">{formatDate(date)}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {getWeatherDescription(weatherWithLocation.daily.weathercode[index])}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="text-right">
                                            <p className="text-sm text-muted-foreground">Máx</p>
                                            <p className="font-bold text-lg">
                                                {Math.round(weatherWithLocation.daily.temperature_2m_max[index])}°
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-sm text-muted-foreground">Mín</p>
                                            <p className="font-semibold">
                                                {Math.round(weatherWithLocation.daily.temperature_2m_min[index])}°
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </Section>

            {/* Seção: Previsão por Hora */}
            <Section id="hourly" label="Próximas 24 Horas" icon={Clock}>
                <Section.Header id="hourly" label="Próximas 24 Horas" icon={Clock} />

                <Card>
                    <CardHeader>
                        <CardTitle>Previsão Horária</CardTitle>
                        <CardDescription>
                            Temperatura e condições hora a hora
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-3 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                            {weatherWithLocation.hourly.time.slice(0, 24).map((time, index) => (
                                <Card key={time} className="text-center">
                                    <CardContent className="p-3">
                                        <p className="text-xs text-muted-foreground mb-2">
                                            {formatHour(time)}
                                        </p>
                                        <div className="text-2xl mb-2">
                                            {getWeatherEmoji(weatherWithLocation.hourly.weathercode[index])}
                                        </div>
                                        <p className="font-bold">
                                            {Math.round(weatherWithLocation.hourly.temperature_2m[index])}°
                                        </p>
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {Math.round(weatherWithLocation.hourly.precipitation[index])}mm
                                        </p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </Section>

            {/* Seção: Precipitação */}
            <Section id="precipitation" label="Precipitação" icon={CloudRain}>
                <Section.Header id="precipitation" label="Precipitação" icon={CloudRain} />

                <Card>
                    <CardHeader>
                        <CardTitle>Chuva Esperada</CardTitle>
                        <CardDescription>
                            Volume de precipitação previsto para os próximos dias
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {weatherWithLocation.daily.time.slice(0, 7).map((date, index) => (
                                <div key={date} className="flex items-center justify-between">
                                    <span className="text-sm font-medium">{formatDate(date)}</span>
                                    <div className="flex items-center gap-3">
                                        <div className="w-48 bg-muted rounded-full h-2">
                                            <div
                                                className="bg-blue-500 h-2 rounded-full transition-all"
                                                style={{
                                                    width: `${Math.min(100, (weatherWithLocation.daily.precipitation_sum[index] / 50) * 100)}%`
                                                }}
                                            />
                                        </div>
                                        <span className="text-sm font-semibold w-16 text-right">
                                            {weatherWithLocation.daily.precipitation_sum[index].toFixed(1)} mm
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </Section>
        </div>
    )
}

