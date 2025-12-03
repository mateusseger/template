import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { REGEX } from "@herval/react-core"

const userRegistrationSchema = z.object({
    nome: z
        .string()
        .min(3, "Nome deve ter no mínimo 3 caracteres")
        .max(100, "Nome deve ter no máximo 100 caracteres"),
    email: z
        .email("Email inválido"),
    telefone: z
        .string()
        .regex(REGEX.PHONE_BR, "Formato: (11) 98765-4321")
        .optional()
        .or(z.literal("")),
    idade: z
        .number({ message: "Idade é obrigatória" })
        .int("Idade deve ser um número inteiro")
        .min(18, "Idade mínima: 18 anos")
        .max(120, "Idade máxima: 120 anos"),
    cargo: z.enum(["dev", "designer", "gerente", "analista"], {
        message: "Selecione um cargo válido",
    }),
    aceitaTermos: z
        .boolean()
        .refine((val) => val === true, {
            message: "Você deve aceitar os termos",
        }),
    bio: z
        .string()
        .max(500, "Bio deve ter no máximo 500 caracteres")
        .optional(),
    skills: z
        .array(z.string())
        .min(1, "Selecione pelo menos uma habilidade"),
    notificacoes: z.object({
        email: z.boolean(),
        sms: z.boolean(),
        push: z.boolean(),
    }),
})

export type UserRegistrationFormData = z.infer<typeof userRegistrationSchema>

const defaultValues: UserRegistrationFormData = {
    nome: "",
    email: "",
    telefone: "",
    idade: 0,
    cargo: "dev",
    aceitaTermos: false,
    bio: "",
    skills: [],
    notificacoes: {
        email: false,
        sms: false,
        push: false,
    },
}

export function useUserRegistrationForm() {
    return useForm<UserRegistrationFormData>({
        resolver: zodResolver(userRegistrationSchema),
        defaultValues,
        mode: "onBlur",
    })
}
