import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const loginSchema = z.object({
    email: z
        .email("Email inválido"),

    senha: z
        .string()
        .min(6, "Senha deve ter no mínimo 6 caracteres"),
    lembrar: z.boolean().optional(),
})

export type LoginFormData = z.infer<typeof loginSchema>

const defaultValues: LoginFormData = {
    email: "",
    senha: "",
    lembrar: false,
}

export function useLoginForm() {
    return useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues,
        mode: "onBlur",
    })
}
