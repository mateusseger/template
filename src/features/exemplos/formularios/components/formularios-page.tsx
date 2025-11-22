import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { motion } from "framer-motion"
import { CheckCircle2, FileText, User, Mail, Phone, Briefcase, Hash, FileCheck, Bell, Code } from "lucide-react"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/shadcn/card"
import { Button } from "@/shared/components/ui/shadcn/button"
import { Input } from "@/shared/components/ui/shadcn/input"
import { Label } from "@/shared/components/ui/shadcn/label"
import { Textarea } from "@/shared/components/ui/shadcn/textarea"
import { Checkbox } from "@/shared/components/ui/shadcn/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/shadcn/select"
import { Badge } from "@/shared/components/ui/shadcn/badge"
import { Alert, AlertDescription } from "@/shared/components/ui/shadcn/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/shadcn/tabs"

import { usuarioFormSchema, loginFormSchema, CARGOS_OPTIONS, SKILLS_OPTIONS } from "../formularios-types"
import type { UsuarioFormData, LoginFormData } from "../formularios-types"

export function FormulariosPage() {
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const [submittedData, setSubmittedData] = useState<UsuarioFormData | null>(null)
    const [loginSuccess, setLoginSuccess] = useState(false)

    // Form 1: Formulário completo de cadastro
    const {
        register: registerCadastro,
        handleSubmit: handleSubmitCadastro,
        formState: { errors: errorsCadastro, isSubmitting: isSubmittingCadastro },
        setValue: setValueCadastro,
        watch: watchCadastro,
        reset: resetCadastro,
    } = useForm<UsuarioFormData>({
        resolver: zodResolver(usuarioFormSchema),
        defaultValues: {
            nome: "",
            email: "",
            telefone: "",
            idade: undefined,
            cargo: "dev",
            aceitaTermos: false,
            bio: "",
            skills: [],
            notificacoes: {
                email: false,
                sms: false,
                push: false,
            },
        },
    })

    // Form 2: Formulário simples de login
    const {
        register: registerLogin,
        handleSubmit: handleSubmitLogin,
        formState: { errors: errorsLogin, isSubmitting: isSubmittingLogin },
        reset: resetLogin,
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            senha: "",
            lembrar: false,
        },
    })

    const selectedSkills = watchCadastro("skills") || []

    const onSubmitCadastro = async (data: UsuarioFormData) => {
        // Simular requisição async
        await new Promise((resolve) => setTimeout(resolve, 1500))

        console.log("✅ Dados validados:", data)
        setSubmittedData(data)
        setSubmitSuccess(true)

        // Reset após 5 segundos
        setTimeout(() => {
            setSubmitSuccess(false)
            setSubmittedData(null)
            resetCadastro()
        }, 5000)
    }

    const onSubmitLogin = async (data: LoginFormData) => {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        console.log("✅ Login:", data)
        setLoginSuccess(true)

        setTimeout(() => {
            setLoginSuccess(false)
            resetLogin()
        }, 3000)
    }

    const toggleSkill = (skill: string) => {
        const current = selectedSkills
        const updated = current.includes(skill)
            ? current.filter((s) => s !== skill)
            : [...current, skill]
        setValueCadastro("skills", updated)
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Formulários com Validação</h1>
                        <p className="text-muted-foreground">
                            Exemplos práticos usando React Hook Form + Zod para validação robusta e type-safe
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">React Hook Form</CardTitle>
                            <FileText className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">useForm</div>
                            <p className="text-xs text-muted-foreground">Performance otimizada</p>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Zod Schema</CardTitle>
                            <FileCheck className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">Type-safe</div>
                            <p className="text-xs text-muted-foreground">Validação runtime + compiletime</p>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">UX Fluida</CardTitle>
                            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">Feedback</div>
                            <p className="text-xs text-muted-foreground">Validação em tempo real</p>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Tabs com diferentes formulários */}
            <Tabs defaultValue="cadastro" className="w-full space-y-6">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="cadastro">Formulário Completo</TabsTrigger>
                    <TabsTrigger value="login">Login Simples</TabsTrigger>
                </TabsList>

                {/* TAB 1: Formulário completo de cadastro */}
                <TabsContent value="cadastro" className="space-y-6">
                    {submitSuccess && submittedData && (
                        <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
                            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                            <AlertDescription className="text-green-800 dark:text-green-200">
                                <strong>Cadastro enviado com sucesso!</strong>
                                <div className="mt-2 text-sm">
                                    <p>Nome: {submittedData.nome}</p>
                                    <p>Email: {submittedData.email}</p>
                                    <p>Cargo: {CARGOS_OPTIONS.find((c) => c.value === submittedData.cargo)?.label}</p>
                                </div>
                            </AlertDescription>
                        </Alert>
                    )}

                    <Card>
                        <CardHeader>
                            <CardTitle>Cadastro de Usuário</CardTitle>
                            <CardDescription>
                                Formulário completo com validações complexas: campos obrigatórios, regex, arrays, nested objects
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmitCadastro(onSubmitCadastro)} className="space-y-6">
                                {/* Nome */}
                                <div className="space-y-2">
                                    <Label htmlFor="nome" className="flex items-center gap-2">
                                        <User className="h-4 w-4" />
                                        Nome Completo *
                                    </Label>
                                    <Input
                                        id="nome"
                                        {...registerCadastro("nome")}
                                        placeholder="Ex: João da Silva"
                                        className={errorsCadastro.nome ? "border-destructive" : ""}
                                    />
                                    {errorsCadastro.nome && (
                                        <p className="text-sm text-destructive">{errorsCadastro.nome.message}</p>
                                    )}
                                </div>

                                {/* Email e Telefone (Grid) */}
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="flex items-center gap-2">
                                            <Mail className="h-4 w-4" />
                                            Email *
                                        </Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            {...registerCadastro("email")}
                                            placeholder="joao@exemplo.com"
                                            className={errorsCadastro.email ? "border-destructive" : ""}
                                        />
                                        {errorsCadastro.email && (
                                            <p className="text-sm text-destructive">{errorsCadastro.email.message}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="telefone" className="flex items-center gap-2">
                                            <Phone className="h-4 w-4" />
                                            Telefone
                                        </Label>
                                        <Input
                                            id="telefone"
                                            {...registerCadastro("telefone")}
                                            placeholder="(11) 98765-4321"
                                            className={errorsCadastro.telefone ? "border-destructive" : ""}
                                        />
                                        {errorsCadastro.telefone && (
                                            <p className="text-sm text-destructive">{errorsCadastro.telefone.message}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Idade e Cargo (Grid) */}
                                <div className="grid gap-4 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="idade" className="flex items-center gap-2">
                                            <Hash className="h-4 w-4" />
                                            Idade *
                                        </Label>
                                        <Input
                                            id="idade"
                                            type="number"
                                            {...registerCadastro("idade", { valueAsNumber: true })}
                                            placeholder="25"
                                            className={errorsCadastro.idade ? "border-destructive" : ""}
                                        />
                                        {errorsCadastro.idade && (
                                            <p className="text-sm text-destructive">{errorsCadastro.idade.message}</p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="cargo" className="flex items-center gap-2">
                                            <Briefcase className="h-4 w-4" />
                                            Cargo *
                                        </Label>
                                        <Select
                                            defaultValue="dev"
                                            onValueChange={(value) => setValueCadastro("cargo", value as UsuarioFormData["cargo"])}
                                        >
                                            <SelectTrigger className={errorsCadastro.cargo ? "border-destructive" : ""}>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {CARGOS_OPTIONS.map((cargo) => (
                                                    <SelectItem key={cargo.value} value={cargo.value}>
                                                        {cargo.label}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                        {errorsCadastro.cargo && (
                                            <p className="text-sm text-destructive">{errorsCadastro.cargo.message}</p>
                                        )}
                                    </div>
                                </div>

                                {/* Skills (Checkboxes como badges) */}
                                <div className="space-y-2">
                                    <Label className="flex items-center gap-2">
                                        <Code className="h-4 w-4" />
                                        Habilidades *
                                    </Label>
                                    <div className="flex flex-wrap gap-2">
                                        {SKILLS_OPTIONS.map((skill) => (
                                            <Badge
                                                key={skill}
                                                variant={selectedSkills.includes(skill) ? "default" : "outline"}
                                                className="cursor-pointer transition-all hover:scale-105"
                                                onClick={() => toggleSkill(skill)}
                                            >
                                                {skill}
                                            </Badge>
                                        ))}
                                    </div>
                                    {errorsCadastro.skills && (
                                        <p className="text-sm text-destructive">{errorsCadastro.skills.message}</p>
                                    )}
                                </div>

                                {/* Bio (Textarea) */}
                                <div className="space-y-2">
                                    <Label htmlFor="bio">Bio (Opcional)</Label>
                                    <Textarea
                                        id="bio"
                                        {...registerCadastro("bio")}
                                        placeholder="Conte um pouco sobre você..."
                                        className={errorsCadastro.bio ? "border-destructive" : ""}
                                        rows={3}
                                    />
                                    {errorsCadastro.bio && (
                                        <p className="text-sm text-destructive">{errorsCadastro.bio.message}</p>
                                    )}
                                </div>

                                {/* Notificações (Nested object) */}
                                <div className="space-y-3">
                                    <Label className="flex items-center gap-2">
                                        <Bell className="h-4 w-4" />
                                        Preferências de Notificação
                                    </Label>
                                    <div className="space-y-2 rounded-lg border p-4">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="notif-email"
                                                {...registerCadastro("notificacoes.email")}
                                            />
                                            <label htmlFor="notif-email" className="text-sm cursor-pointer">
                                                Receber por email
                                            </label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="notif-sms"
                                                {...registerCadastro("notificacoes.sms")}
                                            />
                                            <label htmlFor="notif-sms" className="text-sm cursor-pointer">
                                                Receber por SMS
                                            </label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <Checkbox
                                                id="notif-push"
                                                {...registerCadastro("notificacoes.push")}
                                            />
                                            <label htmlFor="notif-push" className="text-sm cursor-pointer">
                                                Notificações push
                                            </label>
                                        </div>
                                    </div>
                                </div>

                                {/* Termos */}
                                <div className="space-y-2">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="termos"
                                            checked={watchCadastro("aceitaTermos")}
                                            onCheckedChange={(checked) => setValueCadastro("aceitaTermos", checked === true)}
                                        />
                                        <label htmlFor="termos" className="text-sm cursor-pointer">
                                            Aceito os termos e condições *
                                        </label>
                                    </div>
                                    {errorsCadastro.aceitaTermos && (
                                        <p className="text-sm text-destructive">{errorsCadastro.aceitaTermos.message}</p>
                                    )}
                                </div>

                                {/* Botões */}
                                <div className="flex gap-3">
                                    <Button type="submit" disabled={isSubmittingCadastro} className="flex-1">
                                        {isSubmittingCadastro ? "Enviando..." : "Cadastrar"}
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={() => resetCadastro()}
                                        disabled={isSubmittingCadastro}
                                    >
                                        Limpar
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Info Card */}
                    <Card className="border-primary/20 bg-primary/5 -mb-6">
                        <CardHeader>
                            <CardTitle className="text-base">💡 Validações Implementadas</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            <p>✅ <strong>Nome:</strong> 3-100 caracteres</p>
                            <p>✅ <strong>Email:</strong> Formato válido + lowercase automático</p>
                            <p>✅ <strong>Telefone:</strong> Regex para formato brasileiro (opcional)</p>
                            <p>✅ <strong>Idade:</strong> Número inteiro entre 18-120</p>
                            <p>✅ <strong>Cargo:</strong> Enum com valores específicos</p>
                            <p>✅ <strong>Skills:</strong> Array com no mínimo 1 item</p>
                            <p>✅ <strong>Bio:</strong> Máximo 500 caracteres (opcional)</p>
                            <p>✅ <strong>Notificações:</strong> Objeto nested com booleans</p>
                            <p>✅ <strong>Termos:</strong> Refine custom (deve ser true)</p>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* TAB 2: Formulário simples de login */}
                <TabsContent value="login" className="space-y-6">
                    {loginSuccess && (
                        <Alert className="border-green-500 bg-green-50 dark:bg-green-950">
                            <CheckCircle2 className="h-4 w-4 text-green-600 dark:text-green-400" />
                            <AlertDescription className="text-green-800 dark:text-green-200">
                                <strong>Login realizado com sucesso!</strong>
                            </AlertDescription>
                        </Alert>
                    )}

                    <Card className="max-w-md mx-auto">
                        <CardHeader>
                            <CardTitle>Login</CardTitle>
                            <CardDescription>
                                Exemplo simples e direto com validação básica
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmitLogin(onSubmitLogin)} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="login-email">Email</Label>
                                    <Input
                                        id="login-email"
                                        type="email"
                                        {...registerLogin("email")}
                                        placeholder="seu@email.com"
                                        className={errorsLogin.email ? "border-destructive" : ""}
                                    />
                                    {errorsLogin.email && (
                                        <p className="text-sm text-destructive">{errorsLogin.email.message}</p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="login-senha">Senha</Label>
                                    <Input
                                        id="login-senha"
                                        type="password"
                                        {...registerLogin("senha")}
                                        placeholder="••••••"
                                        className={errorsLogin.senha ? "border-destructive" : ""}
                                    />
                                    {errorsLogin.senha && (
                                        <p className="text-sm text-destructive">{errorsLogin.senha.message}</p>
                                    )}
                                </div>

                                <div className="flex items-center space-x-2">
                                    <Checkbox id="lembrar" {...registerLogin("lembrar")} />
                                    <label htmlFor="lembrar" className="text-sm cursor-pointer">
                                        Lembrar de mim
                                    </label>
                                </div>

                                <Button type="submit" disabled={isSubmittingLogin} className="w-full">
                                    {isSubmittingLogin ? "Entrando..." : "Entrar"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>

                    <Card className="border-primary/20 bg-primary/5">
                        <CardHeader>
                            <CardTitle className="text-base">📝 Estrutura Mínima</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            <p>✅ Schema Zod simples (2 campos + opcional)</p>
                            <p>✅ useForm com zodResolver</p>
                            <p>✅ Validação de email nativa</p>
                            <p>✅ Senha com mínimo de caracteres</p>
                            <p>✅ Campo opcional (checkbox)</p>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            {/* Code Example Card */}
            <Card>
                <CardHeader>
                    <CardTitle>📚 Como Usar no Seu Projeto</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div>
                        <h3 className="font-semibold mb-2">1. Criar Schema Zod</h3>
                        <pre className="rounded-lg bg-muted p-4 text-sm overflow-x-auto">
                            {`import { z } from "zod"

export const meuSchema = z.object({
  campo: z.string().min(3, "Mínimo 3 caracteres"),
})

export type MeuFormData = z.infer<typeof meuSchema>`}
                        </pre>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">2. Setup useForm com Resolver</h3>
                        <pre className="rounded-lg bg-muted p-4 text-sm overflow-x-auto">
                            {`import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(meuSchema),
})`}
                        </pre>
                    </div>

                    <div>
                        <h3 className="font-semibold mb-2">3. Conectar ao Input</h3>
                        <pre className="rounded-lg bg-muted p-4 text-sm overflow-x-auto">
                            {`<Input {...register("campo")} />
{errors.campo && <p>{errors.campo.message}</p>}`}
                        </pre>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
