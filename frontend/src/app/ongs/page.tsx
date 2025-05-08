"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { MapPin, Mail, Phone } from "lucide-react"
import { OngSchema } from "@/types/api"
import api from "@/lib/axios"
import { toast } from "sonner"
import { LocationSelector } from "@/components/LocationSelector"

export default function OngsPage() {
    const [ongs, setOngs] = useState<OngSchema[]>([])
    const [loading, setLoading] = useState(false)

    async function buscarOngs(estado: string, cidade: string) {
        setLoading(true)
        try {
            const response = await api.get("/api/v1/ongs/ongs/", {
                params: {
                    city: cidade,
                    state: estado
                }
            })
            setOngs(response.data)
            
            // Mensagem de sucesso com contagem
            if (response.data.length > 0) {
                toast.success(`${response.data.length} ONGs encontradas!`)
            } else {
                toast.info("Nenhuma ONG encontrada para esta localização.")
            }
        } catch (error: unknown) {
            console.error("Erro ao buscar ONGs:", error)
            if (error instanceof Error) {
                toast.error(error.message || "Erro ao buscar ONGs. Tente novamente.")
            } else {
                toast.error("Erro ao buscar ONGs. Tente novamente.")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold mb-8">Encontre uma ONG</h1>

            {/* Componente de seleção de localização */}
            <LocationSelector onSearch={buscarOngs} isLoading={loading} />

            {/* Lista de ONGs */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ongs.map((ong) => (
                    <Card key={ong.name} className="hover:shadow-md transition-shadow">
                        <CardHeader>
                            <CardTitle>{ong.name}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPin className="h-4 w-4" />
                                <span>
                                    {ong.address_line1}, {ong.address_number}
                                    <br />
                                    {ong.neighborhood}
                                    <br />
                                    {ong.city}, {ong.state} - {ong.postal_code}
                                </span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Phone className="h-4 w-4" />
                                <span>{ong.phone}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Mail className="h-4 w-4" />
                                <span>{ong.email}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Mensagem quando não há resultados */}
            {ongs.length === 0 && !loading && (
                <div className="text-center text-muted-foreground py-12">
                    <p>Nenhuma ONG encontrada. Tente ajustar sua busca.</p>
                </div>
            )}
        </main>
    )
}