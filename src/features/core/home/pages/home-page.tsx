import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/shadcn/card"
import { Button } from "@/shared/components/ui/shadcn/button"
import { Badge } from "@/shared/components/ui/shadcn/badge"
import { useAuth } from "@/features/core/auth"
import {
    Sparkles,
    Rocket,
    Code2,
    Layers,
    ShieldCheck,
    Palette,
    Zap,
    ArrowRight,
    CheckCircle2,
    BookOpen,
    FolderTree,
    Package,
    FileCode,
    ListTodo,
    CloudSun,
    FileText,
    Database,
    XCircle,
} from "lucide-react"

/**
 * HomePage - Dashboard principal do template
 * 
 * Esta página serve como ponto de entrada e documentação interativa do template,
 * apresentando os principais recursos, arquitetura, exemplos práticos e guias de uso.
 * 
 * Estrutura:
 * - Hero Section: Apresentação e CTAs principais
 * - Stack Cards: Tecnologias utilizadas
 * - Arquitetura: Princípios feature-first e co-location
 * - Exemplos Práticos: Links para features de exemplo
 * - Nova Feature: Guia rápido de como adicionar novas features
 */
export function HomePage() {
    const { user } = useAuth()

    return (
        <div className="container mx-auto space-y-8 pb-8">
            {/* Hero Section */}
            <div
                className="relative overflow-hidden rounded-xl bg-linear-to-br from-primary/10 via-primary/5 to-background border p-8 md:p-12"
            >
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center">
                            <Rocket className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <Badge variant="secondary" className="gap-1">
                            <Sparkles className="h-3 w-3" />
                            Template v1.0
                        </Badge>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                        Bem-vindo{user?.name ? `, ${user.name.split(" ")[0]}` : ""}! 👋
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mb-6">
                        Este é o <strong>Template React Corporativo</strong> — uma base profissional, escalável e moderna
                        para construir aplicações enterprise com as melhores práticas da indústria.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <Button asChild size="lg" className="gap-2">
                            <Link to="/design-system">
                                <Palette className="h-4 w-4" />
                                Explorar Design System
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="gap-2">
                            <Link to="/exemplos/to-do-list">
                                <Code2 className="h-4 w-4" />
                                Ver Exemplos
                            </Link>
                        </Button>
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
            </div>

            {/* Stack Tecnológica */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-lg bg-orange-500/10 flex items-center justify-center">
                            <Package className="h-5 w-5 text-orange-500" />
                        </div>
                        <div>
                            <CardTitle>Stack Tecnológica</CardTitle>
                            <CardDescription>Ferramentas modernas e consolidadas</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                        {[
                            { name: "React", version: "19.2", desc: "Framework UI" },
                            { name: "TypeScript", version: "5.9", desc: "Tipagem estática" },
                            { name: "Vite", version: "7.2", desc: "Build tool" },
                            { name: "Tanstack Query", version: "5.90", desc: "Server state" },
                            { name: "React Router", version: "7.9", desc: "Roteamento" },
                            { name: "Tailwind CSS", version: "4.1", desc: "Estilização" },
                            { name: "shadcn/ui", version: "latest", desc: "Componentes" },
                            { name: "Framer Motion", version: "12.23", desc: "Animações" },
                        ].map((tech) => (
                            <div key={tech.name} className="p-3 rounded-lg border bg-card">
                                <p className="font-semibold text-sm">{tech.name}</p>
                                <p className="text-xs text-muted-foreground">{tech.version}</p>
                                <p className="text-xs text-muted-foreground mt-1">{tech.desc}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Stack Cards - Principais características */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                    {
                        icon: Layers,
                        label: "Feature-First",
                        value: "Arquitetura",
                        color: "text-blue-500",
                        bgColor: "bg-blue-500/10",
                    },
                    {
                        icon: ShieldCheck,
                        label: "Auth OIDC",
                        value: "Keycloak",
                        color: "text-green-500",
                        bgColor: "bg-green-500/10",
                    },
                    {
                        icon: Palette,
                        label: "Multi-Tema",
                        value: "3 Temas",
                        color: "text-purple-500",
                        bgColor: "bg-purple-500/10",
                    },
                    {
                        icon: Zap,
                        label: "React Query",
                        value: "Server State",
                        color: "text-yellow-500",
                        bgColor: "bg-yellow-500/10",
                    },
                ].map((stat, index) => (

                    <Card className="h-full">
                        <CardContent className="p-6">
                            <div className="flex items-center gap-3">
                                <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${stat.bgColor}`}>
                                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                                </div>
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                                    <p className="font-semibold">{stat.value}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Arquitetura Feature-First */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                            <Layers className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                            <CardTitle>Arquitetura Feature-First</CardTitle>
                            <CardDescription>
                                Código organizado por domínio de negócio, não por tipo técnico
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-4 rounded-lg bg-muted/50 border">
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            Princípios Fundamentais
                        </h4>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2 text-sm">
                                <p>
                                    <strong className="text-foreground">🔍 Co-location:</strong>{" "}
                                    <span className="text-muted-foreground">
                                        Mantenha arquivos relacionados próximos. Componente usado só na feature? Fica lá.
                                    </span>
                                </p>
                                <p>
                                    <strong className="text-foreground">📦 Separation of Concerns:</strong>{" "}
                                    <span className="text-muted-foreground">
                                        Três camadas claras - app/ (setup), features/ (domínio), shared/ (infraestrutura).
                                    </span>
                                </p>
                            </div>
                            <div className="space-y-2 text-sm">
                                <p>
                                    <strong className="text-foreground">📢 Screaming Architecture:</strong>{" "}
                                    <span className="text-muted-foreground">
                                        A estrutura revela o propósito. Olhe as pastas e saiba o que o app faz.
                                    </span>
                                </p>
                                <p>
                                    <strong className="text-foreground">✨ Simplicidade:</strong>{" "}
                                    <span className="text-muted-foreground">
                                        Sem abstrações prematuras. Evite padrões complexos sem ganho real.
                                    </span>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        {/* Exemplo Correto */}
                        <div className="p-4 rounded-lg border bg-card flex flex-col justify-between">
                            <div>
                                <h4 className="font-semibold mb-2 text-green-600 dark:text-green-400 flex items-center gap-2">
                                    <CheckCircle2 className="h-4 w-4" />
                                    ✅ Faça Assim
                                </h4>
                                <pre className="text-xs font-mono bg-muted p-3 rounded overflow-x-auto">
                                    {`src/features/business/pedidos/
  ├── pages/
  │   ├── pedidos-list-page.tsx
  │   └── pedido-detail-page.tsx
  ├── api/
  │   ├── pedidos-api.ts
  │   ├── queries.ts
  │   ├── mutations.ts
  │   └── index.ts
  ├── components/
  │   └── pedido-card.tsx
  ├── types/
  │   └── pedidos-types.ts
  ├── routes.tsx
  └── index.ts`}
                                </pre>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                                ✓ Tudo relacionado a pedidos em um único lugar
                            </p>
                        </div>

                        {/* Exemplo Incorreto */}
                        <div className="p-4 rounded-lg border bg-card flex flex-col justify-between">
                            <div>
                                <h4 className="font-semibold mb-2 text-red-600 dark:text-red-400 flex items-center gap-2">
                                    <XCircle className="h-4 w-4" />
                                    ❌ Evite Isso
                                </h4>
                                <pre className="text-xs font-mono bg-muted p-3 rounded overflow-x-auto line-through opacity-60">
                                    {`src/
  ├── components/
  │   └── pedidos/
  ├── services/
  │   └── pedidos/
  ├── types/
  │   └── pedidos/
  └── hooks/
      └── pedidos/`}
                                </pre>
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">
                                ✗ Separação por tipo técnico dificulta manutenção
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Estrutura de Pastas */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                            <FolderTree className="h-5 w-5 text-purple-500" />
                        </div>
                        <div>
                            <CardTitle>Estrutura do Projeto</CardTitle>
                            <CardDescription>Três camadas principais: app, features e shared</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="p-4 rounded-lg border bg-card">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                    <Package className="h-4 w-4 text-blue-500" />
                                </div>
                                <code className="font-semibold">app/</code>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                                Configuração global da aplicação
                            </p>
                            <ul className="space-y-1 text-xs">
                                <li className="flex items-center gap-1">
                                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                                    Providers (Auth, Theme, Query)
                                </li>
                                <li className="flex items-center gap-1">
                                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                                    Router principal
                                </li>
                                <li className="flex items-center gap-1">
                                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                                    Estilos globais
                                </li>
                            </ul>
                        </div>

                        <div className="p-4 rounded-lg border bg-card">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="h-8 w-8 rounded-lg bg-green-500/10 flex items-center justify-center">
                                    <Layers className="h-4 w-4 text-green-500" />
                                </div>
                                <code className="font-semibold">features/</code>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">Features por domínio de negócio</p>
                            <ul className="space-y-1 text-xs">
                                <li className="flex items-center gap-1">
                                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                                    core/ (auth, theme, home)
                                </li>
                                <li className="flex items-center gap-1">
                                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                                    business/ (suas features)
                                </li>
                                <li className="flex items-center gap-1">
                                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                                    Cada uma com pages/, api/, etc
                                </li>
                            </ul>
                        </div>

                        <div className="p-4 rounded-lg border bg-card">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="h-8 w-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                    <FileCode className="h-4 w-4 text-purple-500" />
                                </div>
                                <code className="font-semibold">shared/</code>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">Código compartilhado</p>
                            <ul className="space-y-1 text-xs">
                                <li className="flex items-center gap-1">
                                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                                    UI components (shadcn)
                                </li>
                                <li className="flex items-center gap-1">
                                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                                    Layout (header, sidebar)
                                </li>
                                <li className="flex items-center gap-1">
                                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                                    Hooks, utils, constants
                                </li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Autenticação e Autorização */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                            <ShieldCheck className="h-5 w-5 text-green-500" />
                        </div>
                        <div>
                            <CardTitle>Autenticação e Autorização</CardTitle>
                            <CardDescription>OIDC com Keycloak e controle de acesso por roles</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg border bg-card">
                            <h4 className="font-semibold mb-2">Modo Produção</h4>
                            <div className="space-y-2 text-sm">
                                <p className="text-muted-foreground">Configure as variáveis no .env:</p>
                                <code className="text-xs block bg-muted p-2 rounded">
                                    VITE_APP_AUTHORITY=https://...<br />
                                    VITE_APP_CLIENT_ID=your-client
                                </code>
                            </div>
                        </div>

                        <div className="p-4 rounded-lg border bg-card">
                            <h4 className="font-semibold mb-2">Modo Desenvolvimento</h4>
                            <div className="space-y-2 text-sm">
                                <p className="text-muted-foreground">Bypass para dev local:</p>
                                <code className="text-xs block bg-muted p-2 rounded">
                                    VITE_DEV_AUTH_BYPASS=true<br />
                                    VITE_DEV_MOCK_ROLES=admin,user
                                </code>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 rounded-lg bg-muted/50 border">
                        <h4 className="font-semibold mb-2">Hierarquia de Roles</h4>
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="default">ADMIN</Badge>
                            <span className="text-muted-foreground">→</span>
                            <Badge variant="secondary">USER</Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                            ADMIN herda permissões de USER. Configurável em{" "}
                            <code className="bg-background px-1 rounded">shared/constants/permissions.ts</code>
                        </p>
                    </div>

                    <div className="p-4 rounded-lg bg-green-500/10 border border-green-500/20">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            Proteger Rotas
                        </h4>
                        <p className="text-sm text-muted-foreground">
                            Use <code className="bg-background px-1 rounded">AppProtectedRoute</code> com{" "}
                            <code className="bg-background px-1 rounded">requiredRoles</code> para restringir acesso
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Sistema de Temas */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                            <Palette className="h-5 w-5 text-purple-500" />
                        </div>
                        <div>
                            <CardTitle>Sistema de Temas</CardTitle>
                            <CardDescription>3 temas corporativos com troca em tempo real</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="p-4 rounded-lg border bg-card">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="h-4 w-4 rounded-full bg-red-600" />
                                <h4 className="font-semibold">Herval</h4>
                            </div>
                            <p className="text-xs text-muted-foreground">
                                Minimalista, corporativo, elegante
                            </p>
                        </div>

                        <div className="p-4 rounded-lg border bg-card">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="h-4 w-4 rounded-full bg-orange-600" />
                                <h4 className="font-semibold">Taqi</h4>
                            </div>
                            <p className="text-xs text-muted-foreground">Clean, moderno, sofisticado</p>
                        </div>

                        <div className="p-4 rounded-lg border bg-card">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="h-4 w-4 rounded-full bg-lime-500" />
                                <h4 className="font-semibold">iPlace</h4>
                            </div>
                            <p className="text-xs text-muted-foreground">Tech, vibrante, contemporâneo</p>
                        </div>
                    </div>

                    <div className="p-4 rounded-lg bg-muted/50 border">
                        <h4 className="font-semibold mb-2">3 Formas de Configurar</h4>
                        <div className="space-y-2">
                            <div className="flex items-start gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <strong>Script interativo:</strong>{" "}
                                    <code className="text-xs bg-background px-1 rounded">npm run setup</code>
                                </div>
                            </div>
                            <div className="flex items-start gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <strong>Manual (.env):</strong>{" "}
                                    <code className="text-xs bg-background px-1 rounded">VITE_APP_THEME=herval</code>
                                </div>
                            </div>
                            <div className="flex items-start gap-2 text-sm">
                                <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                                <div>
                                    <strong>Via interface:</strong> Acesse <code className="text-xs bg-background px-1 rounded">/themes</code>
                                </div>
                            </div>
                        </div>
                    </div>

                    <Button asChild variant="outline" className="w-full">
                        <Link to="/themes">
                            <Palette className="h-4 w-4 mr-2" />
                            Configurar Tema
                        </Link>
                    </Button>
                </CardContent>
            </Card>

            {/* Adicionar Nova Feature */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                            <Code2 className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                            <CardTitle>Como Adicionar Nova Feature</CardTitle>
                            <CardDescription>4 passos para criar funcionalidades</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {[
                            {
                                step: "1",
                                title: "Criar Estrutura",
                                description: "Crie a pasta em features/business/ com pages/, api/, types/, routes.tsx",
                            },
                            {
                                step: "2",
                                title: "Configurar Rotas",
                                description: "Adicione as rotas no app/router/index.tsx importando o routes.tsx da feature",
                            },
                            {
                                step: "3",
                                title: "Adicionar ao Menu",
                                description: "Configure o item em shared/constants/menu.ts com nome, url e ícone",
                            },
                            {
                                step: "4",
                                title: "Desenvolver",
                                description:
                                    "Crie páginas, configure API com queries/mutations, adicione components conforme necessário",
                            },
                        ].map((item) => (
                            <div key={item.step} className="flex items-start gap-4 p-4 rounded-lg border bg-card">
                                <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0 text-sm">
                                    {item.step}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-semibold mb-1">{item.title}</h4>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-6 p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-purple-500" />
                            Páginas de Detalhe com Seções
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">
                            Para páginas complexas, use o sistema <strong>Detail Sections</strong> com navegação automática:
                        </p>
                        <ul className="space-y-1 text-sm">
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                Sidebar terciária aparece automaticamente
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                Scroll suave entre seções
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                Highlight da seção visível
                            </li>
                        </ul>
                        <div className="flex gap-2 mt-3">
                            <Button asChild variant="outline" size="sm">
                                <Link to="/exemplos/pokedex">Ver Pokédex →</Link>
                            </Button>
                            <Button asChild variant="outline" size="sm">
                                <Link to="/exemplos/previsao-tempo">Ver Clima →</Link>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* React Query Pattern */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                            <Database className="h-5 w-5 text-yellow-500" />
                        </div>
                        <div>
                            <CardTitle>React Query: Queries e Mutations</CardTitle>
                            <CardDescription>
                                Server state management com cache, otimistic updates e error handling
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-4 rounded-lg bg-muted/50 border">
                        <h4 className="font-semibold mb-2">Estrutura Padrão: api/ folder</h4>
                        <pre className="text-xs font-mono bg-background p-3 rounded overflow-x-auto">
                            {`feature/api/
├── minha-feature-api.ts     // Funções HTTP (fetch/axios)
├── queries.ts               // Hooks useQuery (GET)
├── mutations.ts             // Hooks useMutation (POST/PUT/DELETE)
└── index.ts                 // Barrel export`}
                        </pre>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg border bg-card">
                            <div className="flex items-center gap-2 mb-2">
                                <Badge variant="secondary">GET</Badge>
                                <h4 className="font-semibold text-sm">Queries</h4>
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">Para leitura de dados (useQuery)</p>
                            <ul className="space-y-1 text-xs">
                                <li className="flex items-center gap-1">
                                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                                    Cache automático (staleTime)
                                </li>
                                <li className="flex items-center gap-1">
                                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                                    Refetch em background
                                </li>
                                <li className="flex items-center gap-1">
                                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                                    Loading/Error states
                                </li>
                            </ul>
                        </div>

                        <div className="p-4 rounded-lg border bg-card">
                            <div className="flex items-center gap-2 mb-2">
                                <Badge variant="secondary">POST/PUT/DELETE</Badge>
                                <h4 className="font-semibold text-sm">Mutations</h4>
                            </div>
                            <p className="text-xs text-muted-foreground mb-2">
                                Para escrita de dados (useMutation)
                            </p>
                            <ul className="space-y-1 text-xs">
                                <li className="flex items-center gap-1">
                                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                                    Invalidação de cache
                                </li>
                                <li className="flex items-center gap-1">
                                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                                    Optimistic updates
                                </li>
                                <li className="flex items-center gap-1">
                                    <CheckCircle2 className="h-3 w-3 text-green-500" />
                                    Rollback automático
                                </li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Padrões e Nomenclatura */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-lg bg-pink-500/10 flex items-center justify-center">
                            <FileCode className="h-5 w-5 text-pink-500" />
                        </div>
                        <div>
                            <CardTitle>Padrões e Nomenclatura</CardTitle>
                            <CardDescription>Convenções para manter o código consistente</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="p-4 rounded-lg border bg-card">
                            <h4 className="font-semibold mb-3">Nomenclatura de Arquivos</h4>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Arquivos:</span>
                                    <code className="text-xs bg-muted px-2 py-1 rounded">kebab-case</code>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Componentes:</span>
                                    <code className="text-xs bg-muted px-2 py-1 rounded">PascalCase</code>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Funções/Hooks:</span>
                                    <code className="text-xs bg-muted px-2 py-1 rounded">camelCase</code>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-muted-foreground">Constantes:</span>
                                    <code className="text-xs bg-muted px-2 py-1 rounded">UPPER_SNAKE</code>
                                </div>
                            </div>
                        </div>

                        <div className="p-4 rounded-lg border bg-card">
                            <h4 className="font-semibold mb-2">Comentários em Português</h4>
                            <div className="space-y-2">
                                <div className="flex items-start gap-2 text-sm">
                                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                                    <div>
                                        <strong>Bom:</strong> Conciso e útil
                                        <code className="block text-xs bg-background p-2 rounded mt-1">
                                            // Busca pedidos por status ativo
                                        </code>
                                    </div>
                                </div>
                                <div className="flex items-start gap-2 text-sm">
                                    <XCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                                    <div>
                                        <strong>Evite:</strong> Óbvio demais
                                        <code className="block text-xs bg-background p-2 rounded mt-1 opacity-60">
                                            // Esta função filtra os pedidos
                                        </code>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Exemplos Práticos */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                            <Code2 className="h-5 w-5 text-green-500" />
                        </div>
                        <div>
                            <CardTitle>Exemplos Práticos</CardTitle>
                            <CardDescription>
                                Features de exemplo para estudar e usar como referência
                            </CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                        <Link to="/exemplos/formularios" className="group">
                            <div className="p-4 rounded-lg border bg-card hover:bg-accent transition-colors cursor-pointer h-full">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                        <FileText className="h-5 w-5 text-purple-500" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold group-hover:text-primary transition-colors">
                                            Formulários
                                        </h4>
                                        <p className="text-xs text-muted-foreground">Validação e submissão</p>
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                </div>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    <Badge variant="secondary" className="text-xs">
                                        React Hook Form
                                    </Badge>
                                    <Badge variant="secondary" className="text-xs">
                                        Validação
                                    </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Exemplos de formulários com validação, diferentes tipos de inputs e submissão.
                                </p>
                            </div>
                        </Link>

                        <Link to="/exemplos/to-do-list" className="group">
                            <div className="p-4 rounded-lg border bg-card hover:bg-accent transition-colors cursor-pointer h-full">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <ListTodo className="h-5 w-5 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold group-hover:text-primary transition-colors">
                                            To-Do List
                                        </h4>
                                        <p className="text-xs text-muted-foreground">CRUD completo com React Query</p>
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                </div>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    <Badge variant="secondary" className="text-xs">
                                        Queries
                                    </Badge>
                                    <Badge variant="secondary" className="text-xs">
                                        Mutations
                                    </Badge>
                                    <Badge variant="secondary" className="text-xs">
                                        Optimistic Updates
                                    </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Exemplo completo com create, update, delete, toggle. Mock API com delays simulados.
                                </p>
                            </div>
                        </Link>

                        <Link to="/exemplos/pokedex" className="group">
                            <div className="p-4 rounded-lg border bg-card hover:bg-accent transition-colors cursor-pointer h-full">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="h-10 w-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                                        <Sparkles className="h-5 w-5 text-red-500" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold group-hover:text-primary transition-colors">
                                            Pokédex
                                        </h4>
                                        <p className="text-xs text-muted-foreground">API externa com paginação</p>
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                </div>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    <Badge variant="secondary" className="text-xs">
                                        PokeAPI
                                    </Badge>
                                    <Badge variant="secondary" className="text-xs">
                                        Detail Sections
                                    </Badge>
                                    <Badge variant="secondary" className="text-xs">
                                        Queries
                                    </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Lista com paginação e páginas de detalhe com sidebar terciária de navegação.
                                </p>
                            </div>
                        </Link>

                        <Link to="/exemplos/previsao-tempo" className="group">
                            <div className="p-4 rounded-lg border bg-card hover:bg-accent transition-colors cursor-pointer h-full">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                        <CloudSun className="h-5 w-5 text-blue-500" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold group-hover:text-primary transition-colors">
                                            Previsão do Tempo
                                        </h4>
                                        <p className="text-xs text-muted-foreground">Busca e queries condicionais</p>
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                </div>
                                <div className="flex flex-wrap gap-2 mb-3">
                                    <Badge variant="secondary" className="text-xs">
                                        OpenWeather API
                                    </Badge>
                                    <Badge variant="secondary" className="text-xs">
                                        Conditional Queries
                                    </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Busca por cidade com queries condicionais e detail sections para navegação.
                                </p>
                            </div>
                        </Link>
                    </div>
                </CardContent>
            </Card>

            {/* Quick Start */}
            <Card className="bg-linear-to-br from-primary/5 to-background border-primary/20">
                <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                            <Rocket className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <div>
                            <CardTitle>Quick Start</CardTitle>
                            <CardDescription>Comece em minutos com este guia rápido</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                        {[
                            {
                                title: "1. Instalar",
                                code: "npm install",
                                description: "Instale todas as dependências",
                            },
                            {
                                title: "2. Configurar Tema",
                                code: "npm run setup",
                                description: "Script interativo para escolher tema",
                            },
                            {
                                title: "3. Configurar Auth",
                                code: "cp .env.example .env",
                                description: "Configure Keycloak ou use modo dev",
                            },
                            {
                                title: "4. Iniciar",
                                code: "npm run dev",
                                description: "Servidor em http://localhost:3000",
                            },
                        ].map((item) => (
                            <div key={item.title} className="p-4 rounded-lg border bg-card">
                                <h4 className="font-semibold mb-2">{item.title}</h4>
                                <code className="text-xs block bg-muted p-2 rounded mb-2">{item.code}</code>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Call to Action Final */}
            <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-8 text-center">
                    <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Pronto para começar?</h3>
                    <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                        Explore os exemplos, estude o código e crie suas próprias features seguindo os padrões do template.
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center">
                        <Button asChild size="lg" className="gap-2">
                            <Link to="/exemplos/to-do-list">
                                <Code2 className="h-4 w-4" />
                                Ver To-Do List
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="gap-2">
                            <Link to="/design-system">
                                <Palette className="h-4 w-4" />
                                Design System
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="gap-2">
                            <Link to="/themes">
                                <Layers className="h-4 w-4" />
                                Configurar Tema
                            </Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
