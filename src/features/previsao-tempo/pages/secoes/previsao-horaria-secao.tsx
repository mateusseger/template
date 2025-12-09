import { useMemo } from "react"
import { useParams, useLocation } from "react-router-dom"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Skeleton,
} from "@herval/react-core"
import { useWeatherDetail } from "../../api"
import { getWeatherEmoji, formatHour } from "../../api/previsao-tempo-api"

export function PrevisaoHorariaSecao() {
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
    )
}
