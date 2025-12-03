import { Controller } from "react-hook-form"
import { User, Mail, Phone, Briefcase, Hash, Code, Bell, FileText } from "lucide-react"
import { toast } from "sonner"

import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
    Input,
    Textarea,
    Checkbox,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Button,
    Badge,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    maskPhone,
} from "@herval/react-core"

import { useUserRegistrationForm, type UserRegistrationFormData } from "../hooks/use-user-registration-form"
import { CARGOS_OPTIONS, SKILLS_OPTIONS } from "../constants/form-options"

export function UserRegistrationForm() {
    const form = useUserRegistrationForm()
    const selectedSkills = form.watch("skills")
    const { isSubmitting } = form.formState

    const onSubmit = async (data: UserRegistrationFormData) => {
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500))
            toast.success("Cadastro realizado com sucesso!", {
                description: `Usuário ${data.nome} cadastrado.`,
            })
            form.reset()
        } catch (error) {
            toast.error("Erro ao cadastrar usuário")
        }
    }

    const toggleSkill = (skill: string) => {
        const current = form.getValues("skills")
        const updated = current.includes(skill)
            ? current.filter((s) => s !== skill)
            : [...current, skill]
        form.setValue("skills", updated, { shouldValidate: true })
    }

    return (
        <Card className="w-full max-w-2xl">
            <CardHeader>
                <CardTitle>Cadastro de Usuário</CardTitle>
                <CardDescription>
                    Preencha os dados para criar sua conta
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form id="user-registration-form" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <FieldSet>
                            <FieldLegend className="flex items-center gap-2">
                                <User className="h-4 w-4" />
                                Dados Pessoais
                            </FieldLegend>
                            <FieldDescription>
                                Informações básicas para identificação
                            </FieldDescription>

                            <FieldGroup>
                                <Controller
                                    name="nome"
                                    control={form.control}
                                    render={({ field, fieldState }) => (
                                        <Field data-invalid={fieldState.invalid}>
                                            <FieldLabel htmlFor="user-registration-nome">
                                                Nome Completo
                                            </FieldLabel>
                                            <Input
                                                {...field}
                                                id="user-registration-nome"
                                                placeholder="Ex: João da Silva"
                                            />
                                            <FieldDescription>
                                                Digite seu nome completo como consta em documento oficial
                                            </FieldDescription>
                                            {fieldState.invalid && (
                                                <FieldError errors={[fieldState.error]} />
                                            )}
                                        </Field>
                                    )}
                                />

                                <div className="grid gap-4 md:grid-cols-2">
                                    <Controller
                                        name="email"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor="user-registration-email">
                                                    <Mail className="h-4 w-4" />
                                                    Email
                                                </FieldLabel>
                                                <Input
                                                    {...field}
                                                    id="user-registration-email"
                                                    type="email"
                                                    placeholder="joao@exemplo.com"
                                                />
                                                {fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]} />
                                                )}
                                            </Field>
                                        )}
                                    />

                                    <Controller
                                        name="telefone"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor="user-registration-telefone">
                                                    <Phone className="h-4 w-4" />
                                                    Telefone
                                                </FieldLabel>
                                                <Input
                                                    {...field}
                                                    id="user-registration-telefone"
                                                    placeholder="(11) 98765-4321"
                                                    onChange={(e) => field.onChange(maskPhone(e.target.value))}
                                                />
                                                <FieldDescription>Opcional</FieldDescription>
                                                {fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]} />
                                                )}
                                            </Field>
                                        )}
                                    />
                                </div>

                                <div className="grid gap-4 md:grid-cols-2">
                                    <Controller
                                        name="idade"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor="user-registration-idade">
                                                    <Hash className="h-4 w-4" />
                                                    Idade
                                                </FieldLabel>
                                                <Input
                                                    {...field}
                                                    id="user-registration-idade"
                                                    type="number"
                                                    placeholder="25"
                                                    onChange={(e) => field.onChange(e.target.valueAsNumber)}
                                                />
                                                {fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]} />
                                                )}
                                            </Field>
                                        )}
                                    />

                                    <Controller
                                        name="cargo"
                                        control={form.control}
                                        render={({ field, fieldState }) => (
                                            <Field data-invalid={fieldState.invalid}>
                                                <FieldLabel htmlFor="user-registration-cargo">
                                                    <Briefcase className="h-4 w-4" />
                                                    Cargo
                                                </FieldLabel>
                                                <Select
                                                    name={field.name}
                                                    value={field.value}
                                                    onValueChange={field.onChange}
                                                >
                                                    <SelectTrigger id="user-registration-cargo">
                                                        <SelectValue placeholder="Selecione" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {CARGOS_OPTIONS.map((cargo) => (
                                                            <SelectItem key={cargo.value} value={cargo.value}>
                                                                {cargo.label}
                                                            </SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                                {fieldState.invalid && (
                                                    <FieldError errors={[fieldState.error]} />
                                                )}
                                            </Field>
                                        )}
                                    />
                                </div>
                            </FieldGroup>
                        </FieldSet>

                        <FieldSeparator />

                        <FieldSet>
                            <FieldLegend className="flex items-center gap-2">
                                <Code className="h-4 w-4" />
                                Habilidades
                            </FieldLegend>
                            <FieldDescription>
                                Selecione suas principais competências técnicas
                            </FieldDescription>

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
                            {form.formState.errors.skills && (
                                <FieldError errors={[form.formState.errors.skills]} />
                            )}
                        </FieldSet>

                        <FieldSeparator />

                        <FieldSet>
                            <FieldLegend className="flex items-center gap-2">
                                <FileText className="h-4 w-4" />
                                Biografia
                            </FieldLegend>
                            <Controller
                                name="bio"
                                control={form.control}
                                render={({ field, fieldState }) => (
                                    <Field data-invalid={fieldState.invalid}>
                                        <Textarea
                                            {...field}
                                            id="user-registration-bio"
                                            placeholder="Conte um pouco sobre você..."
                                            rows={3}
                                        />
                                        <FieldDescription>
                                            Máximo 500 caracteres (opcional)
                                        </FieldDescription>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </Field>
                                )}
                            />
                        </FieldSet>

                        <FieldSeparator />

                        <FieldSet>
                            <FieldLegend className="flex items-center gap-2">
                                <Bell className="h-4 w-4" />
                                Preferências de Notificação
                            </FieldLegend>
                            <FieldDescription>
                                Escolha como deseja receber atualizações
                            </FieldDescription>

                            <FieldGroup data-slot="checkbox-group">
                                <Controller
                                    name="notificacoes.email"
                                    control={form.control}
                                    render={({ field }) => (
                                        <Field orientation="horizontal">
                                            <Checkbox
                                                id="user-registration-notif-email"
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                            <FieldContent>
                                                <FieldLabel htmlFor="user-registration-notif-email">
                                                    Receber por email
                                                </FieldLabel>
                                                <FieldDescription>
                                                    Notificações enviadas para seu email cadastrado
                                                </FieldDescription>
                                            </FieldContent>
                                        </Field>
                                    )}
                                />

                                <Controller
                                    name="notificacoes.sms"
                                    control={form.control}
                                    render={({ field }) => (
                                        <Field orientation="horizontal">
                                            <Checkbox
                                                id="user-registration-notif-sms"
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                            <FieldContent>
                                                <FieldLabel htmlFor="user-registration-notif-sms">
                                                    Receber por SMS
                                                </FieldLabel>
                                                <FieldDescription>
                                                    Mensagens de texto para seu telefone
                                                </FieldDescription>
                                            </FieldContent>
                                        </Field>
                                    )}
                                />

                                <Controller
                                    name="notificacoes.push"
                                    control={form.control}
                                    render={({ field }) => (
                                        <Field orientation="horizontal">
                                            <Checkbox
                                                id="user-registration-notif-push"
                                                checked={field.value}
                                                onCheckedChange={field.onChange}
                                            />
                                            <FieldContent>
                                                <FieldLabel htmlFor="user-registration-notif-push">
                                                    Notificações push
                                                </FieldLabel>
                                                <FieldDescription>
                                                    Alertas no navegador ou app mobile
                                                </FieldDescription>
                                            </FieldContent>
                                        </Field>
                                    )}
                                />
                            </FieldGroup>
                        </FieldSet>

                        <FieldSeparator />

                        <Controller
                            name="aceitaTermos"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                                    <Checkbox
                                        id="user-registration-termos"
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                    />
                                    <FieldContent>
                                        <FieldLabel htmlFor="user-registration-termos">
                                            Aceito os termos e condições
                                        </FieldLabel>
                                        <FieldDescription>
                                            Ao marcar, você concorda com nossa{" "}
                                            <a href="#">política de privacidade</a> e{" "}
                                            <a href="#">termos de uso</a>.
                                        </FieldDescription>
                                        {fieldState.invalid && (
                                            <FieldError errors={[fieldState.error]} />
                                        )}
                                    </FieldContent>
                                </Field>
                            )}
                        />
                    </FieldGroup>
                </form>
            </CardContent>
            <CardFooter className="border-t pt-6">
                <Field orientation="horizontal">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => form.reset()}
                        disabled={isSubmitting}
                    >
                        Limpar
                    </Button>
                    <Button
                        type="submit"
                        form="user-registration-form"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? "Cadastrando..." : "Cadastrar"}
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    )
}
