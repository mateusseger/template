// Página de busca e seleção de localidades para previsão do tempo

import { useState } from "react"
import { Link } from "react-router-dom"
import { Search, MapPin, Loader2, CloudSun } from "lucide-react"

import {
    Input,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from "@herval/react-core"

import { useSearchLocations } from "../api"

const POPULAR_CITIES = [
    { name: "São Paulo", lat: -23.5505, lon: -46.6333, country: "Brasil" },
    { name: "Rio de Janeiro", lat: -22.9068, lon: -43.1729, country: "Brasil" },
    { name: "Porto Alegre", lat: -30.0346, lon: -51.2177, country: "Brasil" },
    { name: "Curitiba", lat: -25.4284, lon: -49.2733, country: "Brasil" },
    { name: "Florianópolis", lat: -27.5954, lon: -48.5480, country: "Brasil" },
    { name: "Brasília", lat: -15.8267, lon: -47.9218, country: "Brasil" },
]

export function PrevisaoTempoListPage() {
    const [searchTerm, setSearchTerm] = useState("")

    // React Query hook for location search
    const { data: locations = [], isLoading } = useSearchLocations(searchTerm)

    function handleKeyDown(e: React.KeyboardEvent) {
        if (e.key === "Enter") {
            e.preventDefault()
        }
    }

    return (
        <div className="space-y-6">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <CloudSun className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Previsão do Tempo</h1>
                        <p className="text-muted-foreground">
                            Busque por uma cidade para ver a previsão detalhada
                        </p>
                    </div>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Buscar Localidade</CardTitle>
                    <CardDescription>
                        Digite o nome de uma cidade para encontrar a previsão do tempo
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Ex: São Paulo, Rio de Janeiro..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className="pl-9"
                                disabled={isLoading}
                            />
                        </div>
                        {isLoading && (
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span className="text-sm">Buscando...</span>
                            </div>
                        )}
                    </div>
                </CardContent>
            </Card>

            {locations.length > 0 && (
                <div>
                    <h2 className="text-xl font-semibold mb-4">Resultados da Busca</h2>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {locations.map((location) => (
                            <Link
                                key={location.id}
                                to={`/previsao-tempo/${location.latitude},${location.longitude}`}
                                state={{ location }}
                            >
                                <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer group">
                                    <CardContent className="p-4">
                                        <div className="flex items-start gap-3">
                                            <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-semibold">{location.name}</h3>
                                                <p className="text-sm text-muted-foreground">
                                                    {location.admin1 && `${location.admin1}, `}
                                                    {location.country}
                                                </p>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </Link>
                        ))}
                    </div>
                </div>
            )}

            <div>
                <h2 className="text-xl font-semibold mb-4">Cidades Populares</h2>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {POPULAR_CITIES.map((city, index) => (
                        <Link
                            key={index}
                            to={`/previsao-tempo/${city.lat},${city.lon}`}
                            state={{
                                location: {
                                    name: city.name,
                                    country: city.country,
                                    latitude: city.lat,
                                    longitude: city.lon
                                }
                            }}
                        >
                            <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer group">
                                <CardContent className="p-4">
                                    <div className="flex items-start gap-3">
                                        <MapPin className="h-5 w-5 text-primary mt-0.5" />
                                        <div>
                                            <h3 className="font-semibold">{city.name}</h3>
                                            <p className="text-sm text-muted-foreground">{city.country}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

