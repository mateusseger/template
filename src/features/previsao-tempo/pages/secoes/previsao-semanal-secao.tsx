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
import { getWeatherDescription, getWeatherEmoji, formatDate } from "../../api/previsao-tempo-api"

export function PrevisaoSemanalSecao() {
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
    )
}
