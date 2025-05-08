"use client"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MapPin, Search, X } from "lucide-react"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue 
} from "@/components/ui/select"
import { toast } from "sonner"

interface LocationSelectorProps {
  onSearch: (estado: string, cidade: string) => void
  onSearchNearby?: () => void
  isLoading?: boolean
  hasLocation?: boolean
}

const ESTADOS_BRASILEIROS = [
  { sigla: "AC", nome: "Acre" },
  { sigla: "AL", nome: "Alagoas" },
  { sigla: "AP", nome: "Amapá" },
  { sigla: "AM", nome: "Amazonas" },
  { sigla: "BA", nome: "Bahia" },
  { sigla: "CE", nome: "Ceará" },
  { sigla: "DF", nome: "Distrito Federal" },
  { sigla: "ES", nome: "Espírito Santo" },
  { sigla: "GO", nome: "Goiás" },
  { sigla: "MA", nome: "Maranhão" },
  { sigla: "MT", nome: "Mato Grosso" },
  { sigla: "MS", nome: "Mato Grosso do Sul" },
  { sigla: "MG", nome: "Minas Gerais" },
  { sigla: "PA", nome: "Pará" },
  { sigla: "PB", nome: "Paraíba" },
  { sigla: "PR", nome: "Paraná" },
  { sigla: "PE", nome: "Pernambuco" },
  { sigla: "PI", nome: "Piauí" },
  { sigla: "RJ", nome: "Rio de Janeiro" },
  { sigla: "RN", nome: "Rio Grande do Norte" },
  { sigla: "RS", nome: "Rio Grande do Sul" },
  { sigla: "RO", nome: "Rondônia" },
  { sigla: "RR", nome: "Roraima" },
  { sigla: "SC", nome: "Santa Catarina" },
  { sigla: "SP", nome: "São Paulo" },
  { sigla: "SE", nome: "Sergipe" },
  { sigla: "TO", nome: "Tocantins" }
]

export function LocationSelector({ onSearch, onSearchNearby, isLoading = false, hasLocation = false }: LocationSelectorProps) {
  const [estado, setEstado] = useState("")
  const [cidade, setCidade] = useState("")
  const [cidadeInput, setCidadeInput] = useState("")
  const [cidades, setCidades] = useState<string[]>([])
  const [filteredCidades, setFilteredCidades] = useState<string[]>([])
  const [loadingCidades, setLoadingCidades] = useState(false)
  const [showSuggestions, setShowSuggestions] = useState(false)
  const suggestionsRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Buscar cidades quando o estado mudar
  useEffect(() => {
    async function buscarCidades() {
      if (!estado) {
        setCidades([])
        setCidade("")
        setCidadeInput("")
        return
      }

      setLoadingCidades(true)
      try {
        // Usando a API do IBGE para buscar cidades
        const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estado}/municipios`)
        const data = await response.json()
        const nomesCidades = data.map((cidade: { nome: string }) => cidade.nome).sort()
        setCidades(nomesCidades)
        setCidade("") // Limpa a cidade quando muda o estado
        setCidadeInput("")
      } catch (error) {
        console.error("Erro ao buscar cidades:", error)
        toast.error("Erro ao carregar a lista de cidades. Tente novamente.")
        setCidades([])
      } finally {
        setLoadingCidades(false)
      }
    }

    buscarCidades()
  }, [estado])

  // Filtrar cidades com base no input
  useEffect(() => {
    if (cidadeInput.trim() === "") {
      setFilteredCidades(cidades.slice(0, 10)) // Mostra as primeiras 10 quando não há texto
    } else {
      const normalizeString = (str: string) => 
        str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase()
      
      const normalizedInput = normalizeString(cidadeInput)
      
      const filtered = cidades
        .filter(cidade => normalizeString(cidade).includes(normalizedInput))
        .slice(0, 10) // Limita a 10 resultados para melhor performance
      
      setFilteredCidades(filtered)
    }
  }, [cidadeInput, cidades])

  // Fechar sugestões ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (suggestionsRef.current && 
          !suggestionsRef.current.contains(event.target as Node) &&
          !inputRef.current?.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  function handleSearch() {
    if (!estado) {
      toast.error("Por favor, selecione um estado.")
      return
    }

    if (!cidade) {
      toast.error("Por favor, selecione uma cidade.")
      return
    }

    onSearch(estado, cidade)
  }

  function handleCidadeSelect(selectedCidade: string) {
    setCidade(selectedCidade)
    setCidadeInput(selectedCidade)
    setShowSuggestions(false)
  }

  function clearCidade() {
    setCidade("")
    setCidadeInput("")
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div className="bg-card p-6 rounded-lg shadow-sm mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Estado</label>
          <Select value={estado} onValueChange={setEstado}>
            <SelectTrigger className="w-full">
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4 text-muted-foreground" />
                <SelectValue placeholder="Selecione um estado" />
              </div>
            </SelectTrigger>
            <SelectContent>
              {ESTADOS_BRASILEIROS.map((estado) => (
                <SelectItem key={estado.sigla} value={estado.sigla}>
                  {estado.nome} ({estado.sigla})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2 relative">
          <label className="text-sm font-medium">Cidade</label>
          {loadingCidades ? (
            <div className="w-full h-10 flex items-center justify-center bg-muted rounded-md">
              <span className="text-sm text-muted-foreground">Carregando cidades...</span>
            </div>
          ) : (
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                ref={inputRef}
                placeholder={estado ? "Digite para buscar uma cidade" : "Selecione um estado primeiro"}
                value={cidadeInput}
                onChange={(e) => {
                  setCidadeInput(e.target.value)
                  setShowSuggestions(true)
                  if (e.target.value !== cidade) {
                    setCidade("")
                  }
                }}
                onFocus={() => setShowSuggestions(true)}
                className="pl-10 pr-8"
                disabled={!estado}
              />
              {cidadeInput && (
                <button 
                  type="button"
                  onClick={clearCidade}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <X className="h-4 w-4 text-muted-foreground hover:text-foreground" />
                </button>
              )}
              
              {showSuggestions && estado && filteredCidades.length > 0 && (
                <div 
                  ref={suggestionsRef}
                  className="absolute z-10 mt-1 w-full bg-popover border rounded-md shadow-md max-h-60 overflow-auto"
                >
                  <ul className="py-1">
                    {filteredCidades.map((cidadeItem) => (
                      <li 
                        key={cidadeItem}
                        className={`px-3 py-2 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground ${
                          cidadeItem === cidade ? 'bg-accent text-accent-foreground' : ''
                        }`}
                        onClick={() => handleCidadeSelect(cidadeItem)}
                      >
                        {cidadeItem}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="flex items-end gap-2">
          <Button
            onClick={handleSearch}
            disabled={isLoading || !estado || !cidade}
            className="flex-1"
          >
            <Search className="mr-2 h-4 w-4" />
            {isLoading ? "Buscando..." : "Buscar"}
          </Button>
          
          {onSearchNearby && (
            <Button
              onClick={onSearchNearby}
              disabled={isLoading || !hasLocation}
              variant="outline"
              className="flex-1"
            >
              <MapPin className="mr-2 h-4 w-4" />
              Próximos
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}