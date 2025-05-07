"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PawPrint, Menu } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="border-b relative">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <PawPrint className="h-6 w-6" />
          <span className="text-xl font-bold">Adote um Pet</span>
        </Link>
        {/* Botão para mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-500 focus:outline-none"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
        {/* Menu para desktop */}
        <div className="hidden md:flex items-center gap-4">
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
      {/* Menu mobile flutuante */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white shadow-lg flex flex-col gap-4 p-4 md:hidden z-50">
          <Button variant="ghost" asChild>
            <Link href="/ongs" onClick={() => setIsOpen(false)}>
              ONGs
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/pets" onClick={() => setIsOpen(false)}>
              Pets
            </Link>
          </Button>
          <Button asChild>
            <Link href="/cadastro" onClick={() => setIsOpen(false)}>
              Cadastre-se
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/login" onClick={() => setIsOpen(false)}>
              Login
            </Link>
          </Button>
        </div>
      )}
    </nav>
  );
}
