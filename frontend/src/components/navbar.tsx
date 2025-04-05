import Link from "next/link"
import { Button } from "@/components/ui/button"
import { PawPrint } from "lucide-react"

export function Navbar() {
    return (
        <nav className="border-b">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <PawPrint className="h-6 w-6" />
                        <span className="text-xl font-bold">Adote um Pet</span>
                    </Link>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" asChild>
                            <Link href="/ongs">ONGs</Link>
                        </Button>
                        <Button variant="ghost" asChild>
                            <Link href="/pets">Pets</Link>
                        </Button>
                        <Button asChild>
                            <Link href="/cadastro">Cadastre-se</Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href="/login">Login</Link>
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    )
}
