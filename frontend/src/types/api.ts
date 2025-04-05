import { z } from "zod";

export interface StatusSchema {
    status: string
}

export interface UserCreateSchema {
    username: string
    email?: string | null
    password: string
    first_name?: string | null
    last_name?: string | null
}

export interface OngSchema {
    name: string
    address_line1: string
    address_number: string
    neighborhood: string
    city: string
    state: string
    postal_code: string
    phone: string
    email: string
}

export interface AnimalPhotoSchema {
    photo?: string | null
}

export interface AnimalSchema {
    photos: AnimalPhotoSchema[]
    ong: OngSchema
    name: string
    species: string
    breed?: string | null
    age: number
    description: string
    is_adopted?: boolean
    city?: string | null
    state?: string | null
}

export const UserCreateSchema = z.object({
    "Nome de usuário": z.string(),
    "E-mail": z.string().email(),
    "Senha": z.string(),
    "Nome": z.string(),
    "Sobrenome": z.string(),
});

export type UserCreate = z.infer<typeof UserCreateSchema>;

export const OngSchema = z.object({
    "Nome": z.string(),
    "Logradouro": z.string(),
    "Número": z.string(),
    "Bairro": z.string(),
    "Cidade": z.string(),
    "Estado": z.string(),
    "CEP": z.string(),
    "Telefone": z.string(),
    "E-mail": z.string().email(),
});

export type Ong = z.infer<typeof OngSchema>;

export const AnimalPhotoSchema = z.object({
    "URL da Foto": z.string().url(),
});

export type AnimalPhoto = z.infer<typeof AnimalPhotoSchema>;

export const AnimalSchema = z.object({
    "Nome": z.string(),
    "Espécie": z.string(),
    "Raça": z.string().optional(),
    "Idade": z.number(),
    "Descrição": z.string(),
    "Adotado": z.boolean(),
    "Cidade": z.string().optional(),
    "Estado": z.string().optional(),
    "Fotos": z.array(AnimalPhotoSchema),
});

export type Animal = z.infer<typeof AnimalSchema>; 