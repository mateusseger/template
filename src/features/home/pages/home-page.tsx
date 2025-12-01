import { Link } from "react-router-dom"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Button,
    Badge,
    useAuth,
    Separator
} from "@herval/react-core"
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
    XCircle,
    Box,
    Settings,
    LayoutDashboard,
    Component,
    Plug,
    Terminal,
    Copy,
    ExternalLink,
    ArrowLeft
} from "lucide-react"

/**
 * HomePage - Ponto de entrada do React Template
 *
 * Apresenta o template e sua arquitetura baseada em @herval/react-core,
 * com documentação interativa, exemplos práticos e guias de uso.
 */
export function HomePage() {
    const { user } = useAuth()

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 via-primary/5 to-background border p-6 md:p-10">
                <div className="relative z-10">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="h-12 w-12 rounded-xl bg-primary flex items-center justify-center">
                            <Rocket className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <Badge variant="secondary" className="gap-1">
                            <Sparkles className="h-3 w-3" />
                            Powered by @herval/react-core
                        </Badge>
                    </div>
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                        Bem-vindo{user?.profile.name ? `, ${user.profile.name.split(" ")[0]}` : ""}! 👋
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-6">
                        Este é o <strong>React Template</strong> — uma base profissional e escalável
                        construída sobre a biblioteca <code className="bg-muted px-1.5 py-0.5 rounded text-sm">@herval/react-core</code>.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <Button asChild size="lg" className="gap-2">
                            <Link to="/design-system">
                                <Component className="h-4 w-4" />
                                Explorar Componentes
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="gap-2">
                            <Link to="/temas">
                                <Palette className="h-4 w-4" />
                                Configurar Tema
                            </Link>
                        </Button>
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-72 h-72 md:w-96 md:h-96 bg-primary/5 rounded-full blur-3xl -z-0" />
            </div>

            {/* O que é o Template */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                            <BookOpen className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                            <CardTitle>O que é o React Template?</CardTitle>
                            <CardDescription>Propósito e público-alvo</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">
                        O <strong>React Template</strong> é uma base de projeto pronta para produção,
                        desenvolvida para acelerar a criação de aplicações enterprise no grupo Herval.
                        Ele consome a biblioteca centralizada <code className="bg-muted px-1.5 py-0.5 rounded text-sm">@herval/react-core</code>,
                        que fornece toda a infraestrutura necessária.
                    </p>

                    <div className="grid gap-4 md:grid-cols-2">
                        <div className="p-4 rounded-lg border bg-card">
                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                                <Box className="h-4 w-4 text-primary" />
                                React Template (Este projeto)
                            </h4>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                                <li>• Estrutura de pastas pronta</li>
                                <li>• Configurações de build otimizadas</li>
                                <li>• Features de exemplo funcionais</li>
                                <li>• Documentação interativa</li>
                            </ul>
                        </div>

                        <div className="p-4 rounded-lg border bg-card">
                            <h4 className="font-semibold mb-2 flex items-center gap-2">
                                <Package className="h-4 w-4 text-primary" />
                                @herval/react-core (Biblioteca)
                            </h4>
                            <ul className="space-y-1 text-sm text-muted-foreground">
                                <li>• Autenticação OIDC completa</li>
                                <li>• Sistema de temas multi-marca</li>
                                <li>• Layout responsivo (Sidebar, Header)</li>
                                <li>• 30+ componentes UI (shadcn/ui)</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Arquitetura: react-core */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                            <Plug className="h-5 w-5 text-purple-500" />
                        </div>
                        <div>
                            <CardTitle>Arquitetura com @herval/react-core</CardTitle>
                            <CardDescription>Como o template consome a biblioteca centralizada</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Diagrama Visual */}
                    <div className="p-4 rounded-lg bg-muted/50 border">
                        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                            <div className="p-4 rounded-lg border-2 border-primary bg-card text-center min-w-[180px]">
                                <Box className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                                <p className="font-bold">@herval/react-template</p>
                                <p className="text-xs text-muted-foreground">Sua Aplicação</p>
                            </div>
                            <ArrowLeft className="h-6 w-6 text-muted-foreground rotate-90 md:rotate-0" />
                            <div className="p-4 rounded-lg border-2 border-dashed border-muted-foreground bg-card text-center min-w-[180px]">
                                <Package className="h-8 w-8 text-primary mx-auto mb-2" />
                                <p className="font-bold">@herval/react-core</p>
                                <p className="text-xs text-muted-foreground">Biblioteca NPM</p>
                            </div>
                        </div>
                    </div>

                    {/* Features do Core */}
                    <div>
                        <h4 className="font-semibold mb-4">Features centralizadas no @herval/react-core:</h4>
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {[
                                { icon: ShieldCheck, label: "Autenticação", desc: "OIDC + Keycloak + RBAC", color: "text-green-500", bg: "bg-green-500/10" },
                                { icon: Palette, label: "Temas", desc: "Herval, Taqi, iPlace", color: "text-purple-500", bg: "bg-purple-500/10" },
                                { icon: LayoutDashboard, label: "Layout", desc: "Sidebar + Header + Breadcrumb", color: "text-blue-500", bg: "bg-blue-500/10" },
                                { icon: Component, label: "Componentes UI", desc: "30+ shadcn/ui components", color: "text-orange-500", bg: "bg-orange-500/10" },
                                { icon: Zap, label: "Hooks", desc: "useAuth, useTheme, useMobile", color: "text-yellow-500", bg: "bg-yellow-500/10" },
                                { icon: XCircle, label: "Erros", desc: "ErrorFallback, NotFoundPage", color: "text-red-500", bg: "bg-red-500/10" },
                            ].map((item) => (
                                <div key={item.label} className="flex items-center gap-3 p-3 rounded-lg border bg-card">
                                    <div className={`h-9 w-9 rounded-lg ${item.bg} flex items-center justify-center shrink-0`}>
                                        <item.icon className={`h-4 w-4 ${item.color}`} />
                                    </div>
                                    <div className="min-w-0">
                                        <p className="font-medium text-sm">{item.label}</p>
                                        <p className="text-xs text-muted-foreground truncate">{item.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Import Example */}
                    <div className="p-4 rounded-lg bg-muted/50 border">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <Code2 className="h-4 w-4" />
                            Como importar
                        </h4>
                        <pre className="text-xs md:text-sm font-mono bg-background p-3 rounded overflow-x-auto">
                            {`import {
  // Providers
  AuthProvider, ThemeProvider,
  // Layout
  AppLayout, Section, DetailPageSkeleton,
  // Componentes UI
  Button, Card, Input, Dialog, Badge,
  // Hooks
  useAuth, useTheme, useMobile, useBreakpoint,
  // Utils
  cn
} from "@herval/react-core"

// Estilos (importar no main.tsx)
import "@herval/react-core/styles"`}
                        </pre>
                    </div>
                </CardContent>
            </Card>

            {/* Stack Tecnológica */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
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
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                        {[
                            { name: "React", version: "19", desc: "Framework UI" },
                            { name: "TypeScript", version: "5.x", desc: "Tipagem estática" },
                            { name: "Vite", version: "7.x", desc: "Build tool" },
                            { name: "TanStack Query", version: "5.x", desc: "Server state" },
                            { name: "React Router", version: "7.x", desc: "Roteamento" },
                            { name: "Tailwind CSS", version: "4.x", desc: "Estilização" },
                            { name: "shadcn/ui", version: "latest", desc: "Componentes" },
                            { name: "Framer Motion", version: "12.x", desc: "Animações" },
                        ].map((tech) => (
                            <div key={tech.name} className="p-3 rounded-lg border bg-card hover:shadow-sm transition-shadow">
                                <p className="font-semibold text-sm">{tech.name}</p>
                                <p className="text-xs text-muted-foreground">{tech.version}</p>
                                <p className="text-xs text-muted-foreground mt-1">{tech.desc}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Arquitetura Feature-First */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
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
                                        Três camadas claras: app/ (setup), features/ (domínio), shared/ (compartilhado).
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
                        <div className="p-4 rounded-lg border bg-card">
                            <h4 className="font-semibold mb-2 text-green-600 dark:text-green-400 flex items-center gap-2">
                                <CheckCircle2 className="h-4 w-4" />
                                ✅ Faça Assim
                            </h4>
                            <pre className="text-xs font-mono bg-muted p-3 rounded overflow-x-auto">
                                {`src/features/pedidos/
├── pages/
│   ├── pedidos-list-page.tsx
│   └── pedido-detail-page.tsx
├── api/
│   ├── pedidos-api.ts
│   ├── queries.ts
│   └── mutations.ts
├── components/
│   └── pedido-card.tsx
├── types/
│   └── pedidos-types.ts
├── routes.tsx
└── index.ts`}
                            </pre>
                            <p className="text-xs text-muted-foreground mt-2">
                                ✓ Tudo relacionado a pedidos em um único lugar
                            </p>
                        </div>

                        {/* Exemplo Incorreto */}
                        <div className="p-4 rounded-lg border bg-card">
                            <h4 className="font-semibold mb-2 text-red-600 dark:text-red-400 flex items-center gap-2">
                                <XCircle className="h-4 w-4" />
                                ❌ Evite Isso
                            </h4>
                            <pre className="text-xs font-mono bg-muted p-3 rounded overflow-x-auto opacity-60 line-through">
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
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                            <FolderTree className="h-5 w-5 text-purple-500" />
                        </div>
                        <div>
                            <CardTitle>Estrutura do Projeto</CardTitle>
                            <CardDescription>Três camadas principais: app, features e shared</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Resumo das 3 camadas */}
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="p-4 rounded-lg border bg-card">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                    <Settings className="h-4 w-4 text-blue-500" />
                                </div>
                                <code className="font-semibold">app/</code>
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">
                                Configuração global da aplicação
                            </p>
                            <ul className="space-y-1 text-xs">
                                <li className="flex items-center gap-1">
                                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                                    main.tsx (entry point)
                                </li>
                                <li className="flex items-center gap-1">
                                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                                    app-router.tsx
                                </li>
                                <li className="flex items-center gap-1">
                                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                                    app-config.ts
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
                                    home/, pokedex/, to-do-list/
                                </li>
                                <li className="flex items-center gap-1">
                                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                                    Cada uma com pages/, api/, etc
                                </li>
                                <li className="flex items-center gap-1">
                                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                                    routes.tsx + index.ts
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
                            <p className="text-sm text-muted-foreground mb-2">Código compartilhado local</p>
                            <ul className="space-y-1 text-xs">
                                <li className="flex items-center gap-1">
                                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                                    Hooks customizados
                                </li>
                                <li className="flex items-center gap-1">
                                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                                    Utils e helpers
                                </li>
                                <li className="flex items-center gap-1">
                                    <ArrowRight className="h-3 w-3 text-muted-foreground" />
                                    Configurações
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Info sobre core vs local */}
                    <div className="p-4 rounded-lg bg-primary/5 border border-primary/20">
                        <p className="text-sm">
                            💡 <strong>Importante:</strong> Componentes UI, Layout, Auth e Temas vêm do{" "}
                            <code className="bg-muted px-1.5 py-0.5 rounded text-xs">@herval/react-core</code>.
                            A pasta <code className="bg-muted px-1.5 py-0.5 rounded text-xs">shared/</code> é para código
                            específico da sua aplicação que precisa ser compartilhado entre features.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Como Adicionar Nova Feature */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                            <Code2 className="h-5 w-5 text-green-500" />
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
                                description: "Crie a pasta em features/ com pages/, api/, types/, routes.tsx e index.ts",
                            },
                            {
                                step: "2",
                                title: "Configurar Rotas",
                                description: "Adicione as rotas no app/app-router.tsx importando o routes.tsx da feature",
                            },
                            {
                                step: "3",
                                title: "Adicionar ao Menu",
                                description: "Configure o item em app/app-config.ts com nome, url, ícone e roles (se protegida)",
                            },
                            {
                                step: "4",
                                title: "Desenvolver",
                                description: "Crie páginas, configure API com queries/mutations, adicione componentes",
                            },
                        ].map((item) => (
                            <div key={item.step} className="flex items-start gap-4 p-4 rounded-lg border bg-card">
                                <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0 text-sm">
                                    {item.step}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-semibold mb-1">{item.title}</h4>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Separator className="my-6" />

                    <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                        <h4 className="font-semibold mb-2 flex items-center gap-2">
                            <BookOpen className="h-4 w-4 text-purple-500" />
                            Páginas de Detalhe com Seções
                        </h4>
                        <p className="text-sm text-muted-foreground mb-3">
                            Para páginas complexas, use o sistema <strong>Detail Sections</strong> do core:
                        </p>
                        <pre className="text-xs font-mono bg-background p-3 rounded overflow-x-auto mb-3">
                            {`import { Section } from "@herval/react-core"

<Section id="info" label="Informações" icon={Info}>
  <Section.Header id="info" label="Informações" icon={Info} />
  <Card>...</Card>
</Section>`}
                        </pre>
                        <ul className="space-y-1 text-sm">
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                Sidebar terciária aparece automaticamente
                            </li>
                            <li className="flex items-center gap-2">
                                <CheckCircle2 className="h-3 w-3 text-green-500" />
                                Scroll suave entre seções
                            </li>
                        </ul>
                        <div className="flex gap-2 mt-4">
                            <Button asChild variant="outline" size="sm">
                                <Link to="/pokedex/25">
                                    <Zap className="h-3 w-3 mr-1" />
                                    Ver Pokédex →
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="sm">
                                <Link to="/previsao-tempo/-23.5505,-46.6333">
                                    <CloudSun className="h-3 w-3 mr-1" />
                                    Ver Clima →
                                </Link>
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Exemplos Práticos */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Sparkles className="h-5 w-5 text-primary" />
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
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Link to="/to-do-list" className="group">
                            <div className="p-4 rounded-lg border bg-card hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer h-full">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <ListTodo className="h-5 w-5 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold group-hover:text-primary transition-colors">
                                            To-Do List
                                        </h4>
                                        <p className="text-xs text-muted-foreground">CRUD com React Query</p>
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                </div>
                                <div className="flex flex-wrap gap-1.5 mb-3">
                                    <Badge variant="secondary" className="text-xs">Queries</Badge>
                                    <Badge variant="secondary" className="text-xs">Mutations</Badge>
                                    <Badge variant="secondary" className="text-xs">Optimistic Updates</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Exemplo completo com create, update, delete e toggle.
                                </p>
                            </div>
                        </Link>

                        <Link to="/pokedex" className="group">
                            <div className="p-4 rounded-lg border bg-card hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer h-full">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="h-10 w-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                                        <Zap className="h-5 w-5 text-red-500" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold group-hover:text-primary transition-colors">
                                            Pokédex
                                        </h4>
                                        <p className="text-xs text-muted-foreground">API externa + Detail Sections</p>
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                </div>
                                <div className="flex flex-wrap gap-1.5 mb-3">
                                    <Badge variant="secondary" className="text-xs">PokeAPI</Badge>
                                    <Badge variant="secondary" className="text-xs">Paginação</Badge>
                                    <Badge variant="secondary" className="text-xs">Busca</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Lista com paginação e páginas de detalhe navegáveis.
                                </p>
                            </div>
                        </Link>

                        <Link to="/previsao-tempo" className="group">
                            <div className="p-4 rounded-lg border bg-card hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer h-full">
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
                                <div className="flex flex-wrap gap-1.5 mb-3">
                                    <Badge variant="secondary" className="text-xs">Open-Meteo API</Badge>
                                    <Badge variant="secondary" className="text-xs">Geocoding</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Busca por cidade com queries condicionais e seções.
                                </p>
                            </div>
                        </Link>

                        <Link to="/formularios" className="group">
                            <div className="p-4 rounded-lg border bg-card hover:shadow-md hover:-translate-y-1 transition-all cursor-pointer h-full">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                        <FileText className="h-5 w-5 text-purple-500" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold group-hover:text-primary transition-colors">
                                            Formulários
                                        </h4>
                                        <p className="text-xs text-muted-foreground">Validação type-safe</p>
                                    </div>
                                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                </div>
                                <div className="flex flex-wrap gap-1.5 mb-3">
                                    <Badge variant="secondary" className="text-xs">React Hook Form</Badge>
                                    <Badge variant="secondary" className="text-xs">Zod</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Exemplos de formulários com validação robusta.
                                </p>
                            </div>
                        </Link>
                    </div>
                </CardContent>
            </Card>

            {/* Quick Start */}
            <Card className="bg-gradient-to-br from-primary/5 to-background border-primary/20">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-primary flex items-center justify-center">
                            <Terminal className="h-5 w-5 text-primary-foreground" />
                        </div>
                        <div>
                            <CardTitle>Quick Start</CardTitle>
                            <CardDescription>Comece em minutos</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {[
                            { title: "1. Instalar", code: "npm install", desc: "Instale as dependências" },
                            { title: "2. Configurar Tema", code: "npm run setup", desc: "Escolha herval, taqi ou iplace" },
                            { title: "3. Configurar Auth", code: "cp .env.example .env", desc: "Configure ou use modo dev" },
                            { title: "4. Iniciar", code: "npm run dev", desc: "http://localhost:3000" },
                        ].map((item) => (
                            <div key={item.title} className="p-4 rounded-lg border bg-card">
                                <h4 className="font-semibold mb-2">{item.title}</h4>
                                <div className="flex items-center gap-2 mb-2">
                                    <code className="text-xs flex-1 bg-muted p-2 rounded font-mono">{item.code}</code>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="h-8 w-8 shrink-0"
                                        onClick={() => navigator.clipboard.writeText(item.code)}
                                    >
                                        <Copy className="h-3 w-3" />
                                    </Button>
                                </div>
                                <p className="text-sm text-muted-foreground">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Call to Action */}
            <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-6 md:p-8 text-center">
                    <Sparkles className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Pronto para começar?</h3>
                    <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
                        Explore os exemplos, estude o código e crie suas próprias features.
                    </p>
                    <div className="flex flex-wrap gap-3 justify-center">
                        <Button asChild size="lg" className="gap-2">
                            <Link to="/design-system">
                                <Component className="h-4 w-4" />
                                Design System
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="gap-2">
                            <Link to="/to-do-list">
                                <Code2 className="h-4 w-4" />
                                Ver Exemplo
                            </Link>
                        </Button>
                        <Button asChild variant="outline" size="lg" className="gap-2">
                            <a href="https://github.com/mateusseger/react-core" target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4" />
                                GitHub
                            </a>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
