"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { MapPin, PawPrint, Building2, Phone, Mail, ChevronDown } from "lucide-react"
import { AnimalSchema } from "@/types/api"
import api from "@/lib/axios"
import { toast } from "sonner"
import Image from "next/image"
import { LocationSelector } from "@/components/LocationSelector" // Importe o componente

interface Location {
    lat: number
    lon: number
}

export default function PetsPage() {
    const [animais, setAnimais] = useState<AnimalSchema[]>([])
    const [cidade, setCidade] = useState("")
    const [estado, setEstado] = useState("")
    const [loading, setLoading] = useState(false)
    const [location, setLocation] = useState<Location | null>(null)
    const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set())

    const buscarAnimais = useCallback(async (location?: Location) => {
        setLoading(true)
        try {
            const response = await api.get("/api/v1/animals/animals/", {
                params: {
                    city: cidade || undefined,
                    state: estado || undefined,
                    lat: location?.lat || undefined,
                    lon: location?.lon || undefined,
                    radius: 10 // Raio de 10km
                }
            })
            setAnimais(response.data)
        } catch (error: unknown) {
            console.error("Erro ao buscar animais:", error)
            if (error instanceof Error) {
                toast.error(error.message || "Erro ao buscar animais. Tente novamente.")
            } else {
                toast.error("Erro ao buscar animais. Tente novamente.")
            }
        } finally {
            setLoading(false)
        }
    }, [cidade, estado])

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    })
                    // Busca automática com a localização
                    buscarAnimais({
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    })
                },
                (error) => {
                    console.error("Erro ao obter localização:", error)
                    toast.error("Não foi possível obter sua localização. Você pode buscar por cidade e estado.")
                }
            )
        }
    }, [buscarAnimais])

    const toggleCard = (animalId: string) => {
        setExpandedCards(prev => {
            const newSet = new Set(prev)
            if (newSet.has(animalId)) {
                newSet.delete(animalId)
            } else {
                newSet.add(animalId)
            }
            return newSet
        })
    }

    // Função para lidar com a busca do LocationSelector
    const handleLocationSearch = (estadoSelecionado: string, cidadeSelecionada: string) => {
        setEstado(estadoSelecionado)
        setCidade(cidadeSelecionada)
        buscarAnimais()
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">Encontre seu Pet</h1>

            {/* LocationSelector integrado com botão de proximidade */}
            <LocationSelector 
                onSearch={handleLocationSearch}
                onSearchNearby={() => buscarAnimais(location || undefined)}
                isLoading={loading}
                hasLocation={!!location}
            />

            {/* Lista de Animais */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {animais.map((animal) => {
                    const isExpanded = expandedCards.has(animal.name)
                    return (
                        <Card
                            key={animal.name}
                            className="hover:shadow-md transition-shadow cursor-pointer"
                            onClick={() => toggleCard(animal.name)}
                        >
                            <CardHeader className="p-0">
                                <div className="relative h-48 w-full">
                                    {animal.photos && animal.photos[0]?.photo ? (
                                        <Image
                                            src={animal.photos[0].photo.replace(/^http:\/\//i, 'https://')}
                                            alt={animal.name}
                                            fill
                                            className="object-cover rounded-t-lg"
                                        />
                                    ) : (
                                        <div className="h-full w-full bg-muted flex items-center justify-center rounded-t-lg">
                                            <PawPrint className="h-12 w-12 text-muted-foreground" />
                                        </div>
                                    )}
                                    {animal.is_adopted && (
                                        <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded-full text-xs font-medium">
                                            Adotado
                                        </div>
                                    )}
                                </div>
                            </CardHeader>
                            <CardContent className="pt-4">
                                <div className="space-y-4">
                                    {/* Informações do Animal */}
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-xl">{animal.name}</CardTitle>
                                            <span className="text-sm text-muted-foreground">{animal.age} anos</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <PawPrint className="h-4 w-4" />
                                            <span>{animal.species}</span>
                                            {animal.breed && (
                                                <>
                                                    <span>•</span>
                                                    <span>{animal.breed}</span>
                                                </>
                                            )}
                                        </div>
                                        <p className={`text-sm text-muted-foreground ${!isExpanded ? 'line-clamp-2' : ''}`}>
                                            {animal.description}
                                        </p>
                                    </div>

                                    {/* Informações da ONG */}
                                    <div className={`space-y-2 pt-2 border-t transition-all duration-300 ${isExpanded ? 'opacity-100 max-h-[500px]' : 'opacity-0 max-h-0 overflow-hidden'}`}>
                                        <div className="flex items-center gap-2 text-sm font-medium">
                                            <Building2 className="h-4 w-4" />
                                            <span>{animal.ong.name}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <MapPin className="h-4 w-4" />
                                            <span>
                                                {animal.ong.address_line1}, {animal.ong.address_number}
                                                <br />
                                                {animal.ong.neighborhood}
                                                <br />
                                                {animal.ong.city}, {animal.ong.state} - {animal.ong.postal_code}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Phone className="h-4 w-4" />
                                            <span>{animal.ong.phone}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Mail className="h-4 w-4" />
                                            <span>{animal.ong.email}</span>
                                        </div>
                                    </div>

                                    {/* Botão de Expandir */}
                                    <div className="flex justify-center pt-2">
                                        <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    )
                })}
            </div>

            {/* Mensagem quando não há resultados */}
            {animais.length === 0 && !loading && (
                <div className="text-center text-muted-foreground py-12">
                    <p>Nenhum animal encontrado. Tente ajustar sua busca.</p>
                </div>
            )}
        </main>
    )
}