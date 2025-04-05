import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Search, Heart, PawPrint } from "lucide-react"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Seção Hero */}
      <section className="relative h-[600px] flex items-center justify-center bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Encontre seu novo melhor amigo
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Conectamos pessoas que querem adotar com ONGs e abrigos que precisam de ajuda.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/pets">
                <Search className="mr-2 h-4 w-4" />
                Ver Pets Disponíveis
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/ongs">
                <Heart className="mr-2 h-4 w-4" />
                Encontrar ONGs
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Seção de Benefícios */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Por que adotar?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="text-center p-6">
              <PawPrint className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Dê um Lar</h3>
              <p className="text-muted-foreground">
                Muitos animais precisam de um lar amoroso. Adotar é dar uma segunda chance.
              </p>
            </div>
            {/* Card 2 */}
            <div className="text-center p-6">
              <Heart className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Ganhe Amor</h3>
              <p className="text-muted-foreground">
                Pets adotados são muito gratos e retribuem todo o amor que recebem.
              </p>
            </div>
            {/* Card 3 */}
            <div className="text-center p-6">
              <Search className="h-12 w-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Encontre o Match</h3>
              <p className="text-muted-foreground">
                Conectamos você com o pet perfeito para seu estilo de vida.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção CTA */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Pronto para adotar?</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Crie sua conta e comece sua jornada para encontrar seu novo melhor amigo.
          </p>
          <Button size="lg" asChild>
            <Link href="/cadastro">Cadastre-se Agora</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
