"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Mail, Lock, User } from "lucide-react"
import { useRouter } from "next/navigation"
import api from "@/lib/axios"
import { toast } from "sonner"
import { UserCreateSchema } from "@/types/api"

type FormData = {
    username: string
    email: string
    password: string
    confirmarSenha: string
    first_name: string
    last_name: string
}

export default function CadastroPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState<FormData>({
        username: "",
        email: "",
        password: "",
        confirmarSenha: "",
        first_name: "",
        last_name: ""
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (formData.password !== formData.confirmarSenha) {
            toast.error("As senhas não coincidem")
            return
        }

        setLoading(true)
        try {
            const userData: UserCreateSchema = {
                username: formData.username,
                email: formData.email,
                password: formData.password,
                first_name: formData.first_name,
                last_name: formData.last_name
            }

            await api.post("/api/v1/users/create_user/", userData)

            toast.success("Cadastro realizado com sucesso!")
            router.push("/login")
        } catch (error: unknown) {
            console.error("Erro ao cadastrar:", error)
            if (error instanceof Error) {
                toast.error(error.message || "Erro ao cadastrar. Tente novamente.")
            } else {
                toast.error("Erro ao cadastrar. Tente novamente.")
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className="container mx-auto px-4 py-8">
            <Card className="max-w-2xl mx-auto">
                <CardHeader>
                    <CardTitle className="text-2xl">Criar Conta</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Dados Pessoais */}
                        <div className="space-y-4">
                            <h3 className="font-semibold">Dados Pessoais</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Nome</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            name="first_name"
                                            value={formData.first_name}
                                            onChange={handleChange}
                                            placeholder="Seu nome"
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Sobrenome</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            name="last_name"
                                            value={formData.last_name}
                                            onChange={handleChange}
                                            placeholder="Seu sobrenome"
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Dados de Acesso */}
                        <div className="space-y-4">
                            <h3 className="font-semibold">Dados de Acesso</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Nome de Usuário</label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            name="username"
                                            value={formData.username}
                                            onChange={handleChange}
                                            placeholder="Escolha um nome de usuário"
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">E-mail</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="seu@email.com"
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Senha */}
                        <div className="space-y-4">
                            <h3 className="font-semibold">Senha</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Senha</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            type="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleChange}
                                            placeholder="Mínimo 8 caracteres"
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Confirmar Senha</label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            type="password"
                                            name="confirmarSenha"
                                            value={formData.confirmarSenha}
                                            onChange={handleChange}
                                            placeholder="Confirme sua senha"
                                            className="pl-10"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Button type="submit" className="w-full" disabled={loading}>
                            {loading ? "Cadastrando..." : "Criar Conta"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </main>
    )
} 