import { Controller } from "react-hook-form"
import { Mail, Lock } from "lucide-react"
import { toast } from "sonner"

import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    Input,
    Checkbox,
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@herval/react-core"

import { useLoginForm, type LoginFormData } from "../hooks/use-login-form"

export function LoginForm() {
    const form = useLoginForm()
    const { isSubmitting } = form.formState

    const onSubmit = async (_data: LoginFormData) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1000))
            toast.success("Login realizado com sucesso!", {
                description: `Bem-vindo de volta!`,
            })
            form.reset()
        } catch (error) {
            toast.error("Erro ao fazer login")
        }
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Login</CardTitle>
                <CardDescription>
                    Entre com suas credenciais para acessar
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="login-email">
                                        <Mail className="h-4 w-4" />
                                        Email
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="login-email"
                                        type="email"
                                        placeholder="seu@email.com"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="senha"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor="login-senha">
                                        <Lock className="h-4 w-4" />
                                        Senha
                                    </FieldLabel>
                                    <Input
                                        {...field}
                                        id="login-senha"
                                        type="password"
                                        placeholder="••••••"
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />

                        <Controller
                            name="lembrar"
                            control={form.control}
                            render={({ field }) => (
                                <Field orientation="horizontal">
                                    <Checkbox
                                        id="login-lembrar"
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                    <FieldContent>
                                        <FieldLabel htmlFor="login-lembrar">
                                            Lembrar de mim
                                        </FieldLabel>
                                        <FieldDescription>
                                            Mantenha-me conectado neste dispositivo
                                        </FieldDescription>
                                    </FieldContent>
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter>
                <Button
                    type="submit"
                    form="login-form"
                    disabled={isSubmitting}
                    className="w-full"
                >
                    {isSubmitting ? "Entrando..." : "Entrar"}
                </Button>
            </CardFooter>
        </Card>
    )
}
