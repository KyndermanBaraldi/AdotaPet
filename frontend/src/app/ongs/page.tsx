"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Search, MapPin, Mail, Phone } from "lucide-react"
import { OngSchema } from "@/types/api"
import api from "@/lib/axios"
import { toast } from "sonner"

export default function OngsPage() {
    const [ongs, setOngs] = useState<OngSchema[]>([])
    const [cidade, setCidade] = useState("")
    const [estado, setEstado] = useState("")
    const [loading, setLoading] = useState(false)

    async function buscarOngs() {
        if (!cidade || !estado) {
            toast.error("Por favor, preencha a cidade e o estado.")
            return
        }

        setLoading(true)
        try {
            const response = await api.get("/api/v1/ongs/ongs/", {
                params: {
                    city: cidade,
                    state: estado
                }
            })
            setOngs(response.data)
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

            {/* Seção de Busca */}
            <div className="bg-card p-6 rounded-lg shadow-sm mb-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Cidade</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Digite a cidade"
                                value={cidade}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCidade(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Estado</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Digite o estado (UF)"
                                value={estado}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEstado(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>
                    <div className="flex items-end">
                        <Button
                            onClick={buscarOngs}
                            disabled={loading}
                            className="flex-1"
                        >
                            <Search className="mr-2 h-4 w-4" />
                            {loading ? "Buscando..." : "Buscar"}
                        </Button>
                    </div>
                </div>
            </div>

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