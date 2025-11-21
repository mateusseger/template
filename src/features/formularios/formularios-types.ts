import { z } from "zod"

// Schema de validação do formulário de cadastro de usuário
export const usuarioFormSchema = z.object({
    nome: z
        .string()
        .min(3, "Nome deve ter no mínimo 3 caracteres")
        .max(100, "Nome deve ter no máximo 100 caracteres"),
    email: z
        .string()
        .email("Email inválido")
        .toLowerCase(),
    telefone: z
        .string()
        .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, "Formato: (11) 98765-4321")
        .optional()
        .or(z.literal("")),
    idade: z
        .number({ message: "Idade deve ser um número" })
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

// Tipo inferido do schema
export type UsuarioFormData = z.infer<typeof usuarioFormSchema>

// Schema para formulário de login simples
export const loginFormSchema = z.object({
    email: z.string().email("Email inválido"),
    senha: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
    lembrar: z.boolean().optional(),
})

export type LoginFormData = z.infer<typeof loginFormSchema>

// Dados mockados para exemplos
export const CARGOS_OPTIONS = [
    { value: "dev", label: "Desenvolvedor" },
    { value: "designer", label: "Designer" },
    { value: "gerente", label: "Gerente" },
    { value: "analista", label: "Analista" },
] as const

export const SKILLS_OPTIONS = [
    "React",
    "TypeScript",
    "Node.js",
    "Python",
    "Design",
    "UX/UI",
    "Gestão",
    "Análise de Dados",
] as const
