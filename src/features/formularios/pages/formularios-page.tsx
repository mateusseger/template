import { FileText } from "lucide-react"
import { PageHeader } from "@/shared/components"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@herval/react-core"

import { UserRegistrationForm } from "../components/user-registration-form"
import { LoginForm } from "../components/login-form"

export function FormulariosPage() {
    return (
        <div className="space-y-8">
            <PageHeader
                icon={FileText}
                iconClassName="text-violet-500"
                title="Formulários com Validação"
                description="Exemplos práticos usando React Hook Form + Zod + Field Components"
            />

            <Tabs defaultValue="cadastro" className="w-full space-y-6">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="cadastro">Formulário Completo</TabsTrigger>
                    <TabsTrigger value="login">Login Simples</TabsTrigger>
                </TabsList>

                <TabsContent value="cadastro" className="flex justify-center">
                    <UserRegistrationForm />
                </TabsContent>

                <TabsContent value="login" className="flex justify-center">
                    <LoginForm />
                </TabsContent>
            </Tabs>
        </div>
    )
}

