import { useMemo } from "react"
import { useParams, useLocation, Link } from "react-router-dom"
import { Info, Calendar, Clock, CloudRain } from "lucide-react"
import { Skeleton } from "@herval/react-core"
import { ItemDetailLayout, type SecaoItem } from "@/shared/components"
import { useWeatherDetail } from "../api"
import { formatHour } from "../api/previsao-tempo-api"

const secoes: SecaoItem[] = [
    { id: "clima-atual", label: "Clima Atual", icon: Info },
    { id: "previsao-semanal", label: "Próximos 7 Dias", icon: Calendar },
    { id: "previsao-horaria", label: "Próximas 24 Horas", icon: Clock },
    { id: "precipitacao", label: "Precipitação", icon: CloudRain },
]

export function PrevisaoTempoDetailLayout() {
    const { coords } = useParams<{ coords: string }>()
    const location = useLocation()
    const locationData = location.state?.location

    const { lat, lon } = useMemo(() => {
        if (!coords) return { lat: undefined, lon: undefined }
        const [latitude, longitude] = coords.split(',').map(Number)
        if (isNaN(latitude) || isNaN(longitude)) return { lat: undefined, lon: undefined }
        return { lat: latitude, lon: longitude }
    }, [coords])

    const { data: weather, isLoading, error } = useWeatherDetail(lat, lon)

    const weatherWithLocation = useMemo(() => {
        if (!weather) return null
        if (locationData) {
            return { ...weather, location: locationData }
        }
        return weather
    }, [weather, locationData])

    if (isLoading) {
        return (
            <div className="space-y-4">
                <Skeleton className="h-8 w-48" />
                <Skeleton className="h-64 w-full" />
            </div>
        )
    }

    if (error || !weatherWithLocation) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px]">
                <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
                    <CloudRain className="h-8 w-8 text-destructive" />
                </div>
                <h2 className="text-2xl font-bold mb-2">Erro ao carregar</h2>
                <p className="text-muted-foreground mb-4 text-center max-w-md">
                    {error instanceof Error ? error.message : "Não foi possível carregar a previsão do tempo para esta localização."}
                </p>
                <Link to="/previsao-tempo" className="text-primary hover:underline">
                    Voltar para Busca
                </Link>
            </div>
        )
    }

    return (
        <ItemDetailLayout
            secoes={secoes}
            tituloVoltar="Previsão do Tempo"
            rotaVoltar="/previsao-tempo"
        >
            <div className="mb-6">
                <h1 className="text-2xl sm:text-3xl font-bold">
                    {weatherWithLocation.location.name || "Localidade"}
                </h1>
                <p className="text-muted-foreground mt-1">
                    {weatherWithLocation.location.country && `${weatherWithLocation.location.country} • `}
                    Atualizado em {formatHour(weatherWithLocation.current.time)}
                </p>
            </div>
        </ItemDetailLayout>
    )
}
