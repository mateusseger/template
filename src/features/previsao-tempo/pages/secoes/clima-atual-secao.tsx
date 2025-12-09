import { useMemo } from "react"
import { useParams, useLocation } from "react-router-dom"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Separator,
    Skeleton,
} from "@herval/react-core"
import { useWeatherDetail } from "../../api"
import { getWeatherDescription, getWeatherEmoji } from "../../api/previsao-tempo-api"

export function ClimaAtualSecao() {
    const { coords } = useParams<{ coords: string }>()
    const location = useLocation()
    const locationData = location.state?.location

    const { lat, lon } = useMemo(() => {
        if (!coords) return { lat: undefined, lon: undefined }
        const [latitude, longitude] = coords.split(',').map(Number)
        if (isNaN(latitude) || isNaN(longitude)) return { lat: undefined, lon: undefined }
        return { lat: latitude, lon: longitude }
    }, [coords])

    const { data: weather, isLoading } = useWeatherDetail(lat, lon)

    const weatherWithLocation = useMemo(() => {
        if (!weather) return null
        if (locationData) {
            return { ...weather, location: locationData }
        }
        return weather
    }, [weather, locationData])

    if (isLoading) {
        return <Skeleton className="h-64 w-full" />
    }

    if (!weatherWithLocation) return null

    return (
        <div className="grid gap-6 md:grid-cols-2">
            <Card className="overflow-hidden">
                <CardContent className="p-8">
                    <div className="text-center">
                        <div className="text-7xl mb-4">
                            {getWeatherEmoji(weatherWithLocation.current.weathercode)}
                        </div>
                        <div className="text-6xl font-bold mb-2">
                            {Math.round(weatherWithLocation.current.temperature)}°C
                        </div>
                        <p className="text-lg text-muted-foreground">
                            {getWeatherDescription(weatherWithLocation.current.weathercode)}
                        </p>
                    </div>
                </CardContent>
            </Card>

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
    )
}
