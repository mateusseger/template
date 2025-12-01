// Página de busca e seleção de localidades para previsão do tempo

import { useState } from "react"
import { Link } from "react-router-dom"
import { Search, MapPin, Loader2, CloudSun, Globe, Star } from "lucide-react"
import { PageHeader } from "@/shared/components"

import {
    Input,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Badge
} from "@herval/react-core"

import { useSearchLocations } from "../api"

const POPULAR_CITIES = [
    { name: "São Paulo", lat: -23.5505, lon: -46.6333, country: "Brasil", state: "SP" },
    { name: "Rio de Janeiro", lat: -22.9068, lon: -43.1729, country: "Brasil", state: "RJ" },
    { name: "Porto Alegre", lat: -30.0346, lon: -51.2177, country: "Brasil", state: "RS" },
    { name: "Curitiba", lat: -25.4284, lon: -49.2733, country: "Brasil", state: "PR" },
    { name: "Florianópolis", lat: -27.5954, lon: -48.5480, country: "Brasil", state: "SC" },
    { name: "Brasília", lat: -15.8267, lon: -47.9218, country: "Brasil", state: "DF" },
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
        <div className="space-y-8">
            <PageHeader
                icon={CloudSun}
                iconClassName="text-blue-500"
                title="Previsão do Tempo"
                description="Busque por uma cidade para ver a previsão detalhada"
            />

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Cidades Populares</p>
                                <p className="text-2xl font-bold mt-1">{POPULAR_CITIES.length}</p>
                            </div>
                            <div className="h-12 w-12 rounded-full bg-yellow-500/10 flex items-center justify-center">
                                <Star className="h-6 w-6 text-yellow-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Resultados</p>
                                <p className="text-2xl font-bold mt-1">{locations.length}</p>
                            </div>
                            <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                                <Search className="h-6 w-6 text-green-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">API</p>
                                <p className="text-2xl font-bold mt-1">Open-Meteo</p>
                            </div>
                            <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                                <Globe className="h-6 w-6 text-blue-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
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
                                <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1 cursor-pointer group border-primary/20">
                                    <CardContent className="p-4">
                                        <div className="flex items-start gap-3">
                                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                                                <MapPin className="h-5 w-5 text-primary" />
                                            </div>
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
                                        <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center shrink-0">
                                            <MapPin className="h-5 w-5 text-blue-500" />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2">
                                                <h3 className="font-semibold">{city.name}</h3>
                                                <Badge variant="secondary" className="shrink-0">
                                                    {city.state}
                                                </Badge>
                                            </div>
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

