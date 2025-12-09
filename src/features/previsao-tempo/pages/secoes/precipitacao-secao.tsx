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
import { formatDate } from "../../api/previsao-tempo-api"

export function PrecipitacaoSecao() {
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
    )
}
