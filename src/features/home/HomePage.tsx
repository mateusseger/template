import { useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Badge } from "@/shared/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/shared/components/ui/collapsible"
import { useAuth } from "@/features/auth"
import {
    Sparkles,
    Rocket,
    Code2,
    Layers,
    FolderTree,
    ShieldCheck,
    Palette,
    Zap,
    GitBranch,
    CheckCircle2,
    ChevronRight,
    ChevronDown,
    BookOpen,
    Lightbulb,
    Target,
    Settings,
    Layout,
    Box,
} from "lucide-react"

export function HomePage() {
    const { user } = useAuth()
    const [expandedSection, setExpandedSection] = useState<string | null>("architecture")

    return (
        <div className="space-y-8">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-xl bg-linear-to-br from-primary/10 via-primary/5 to-background border p-8 md:p-12">
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
                        Bem-vindo{user?.name ? `, ${user.name}` : ""}! 👋
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
                            <Link to="/tarefas">
                                <Code2 className="h-4 w-4" />
                                Ver Exemplos
                            </Link>
                        </Button>
                    </div>
                </div>
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl z-0" />
            </div>

            {/* Quick Stats */}
            <div className="grid gap-4 md:grid-cols-4">
                {[
                    { icon: Layers, label: "Feature-First", value: "Arquitetura", color: "text-blue-500" },
                    { icon: ShieldCheck, label: "Auth OIDC", value: "Keycloak", color: "text-green-500" },
                    { icon: Palette, label: "Multi-Tema", value: "3 Temas", color: "text-purple-500" },
                    { icon: Zap, label: "Performance", value: "Otimizado", color: "text-yellow-500" },
                ].map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 * (index + 1) }}
                    >
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center gap-3">
                                    <div className={`h-10 w-10 rounded-lg bg-muted flex items-center justify-center ${stat.color}`}>
                                        <stat.icon className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                                        <p className="font-semibold">{stat.value}</p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* Main Content Tabs */}
            <Tabs defaultValue="guide" className="space-y-6">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="guide" className="gap-2">
                        <BookOpen className="h-4 w-4" />
                        Guia Completo
                    </TabsTrigger>
                    <TabsTrigger value="concepts" className="gap-2">
                        <Lightbulb className="h-4 w-4" />
                        Conceitos
                    </TabsTrigger>
                    <TabsTrigger value="quickstart" className="gap-2">
                        <Target className="h-4 w-4" />
                        Quick Start
                    </TabsTrigger>
                </TabsList>

                {/* Guide Tab */}
                <TabsContent value="guide">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        {/* Architecture Section */}
                        <Collapsible
                            open={expandedSection === "architecture"}
                            onOpenChange={() =>
                                setExpandedSection(expandedSection === "architecture" ? null : "architecture")
                            }
                        >
                            <Card className="gap-0">
                                <CollapsibleTrigger className="w-full">
                                    <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                                                    <Layers className="h-5 w-5 text-blue-500" />
                                                </div>
                                                <div className="text-left">
                                                    <CardTitle>Arquitetura Feature-First</CardTitle>
                                                    <CardDescription>
                                                        Organização por domínio de negócio, não por tipo técnico
                                                    </CardDescription>
                                                </div>
                                            </div>
                                            {expandedSection === "architecture" ? (
                                                <ChevronDown className="h-5 w-5 text-muted-foreground" />
                                            ) : (
                                                <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                            )}
                                        </div>
                                    </CardHeader>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <motion.div
                                        initial={{ opacity: 0, y: 0 }}
                                        animate={{ opacity: 1, y: 20 }}
                                        className="mb-4"
                                    >
                                        <CardContent className="space-y-4 pt-0">
                                            <div className="p-4 rounded-lg bg-muted/50 border">
                                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                                                    Princípios Fundamentais
                                                </h4>
                                                <ul className="space-y-2 text-sm text-muted-foreground">
                                                    <li className="flex items-start gap-2">
                                                        <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                                                        <span>
                                                            <strong>Co-location:</strong> Mantenha arquivos relacionados próximos.
                                                            Se um componente é usado apenas em uma feature, ele deve estar lá.
                                                        </span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                                                        <span>
                                                            <strong>Separation of Concerns:</strong> Três camadas claras -
                                                            app (setup), features (domínio), shared (infraestrutura).
                                                        </span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                                                        <span>
                                                            <strong>Screaming Architecture:</strong> A estrutura revela o propósito.
                                                            Olhe para as pastas e saiba instantaneamente o que o app faz.
                                                        </span>
                                                    </li>
                                                    <li className="flex items-start gap-2">
                                                        <ChevronRight className="h-4 w-4 mt-0.5 shrink-0" />
                                                        <span>
                                                            <strong>Simplicidade:</strong> Sem abstrações prematuras.
                                                            Evite padrões complexos sem ganho real.
                                                        </span>
                                                    </li>
                                                </ul>
                                            </div>

                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div className="p-4 rounded-lg border bg-card flex flex-col justify-between">
                                                    <div>
                                                        <h4 className="font-semibold mb-2 text-green-600 dark:text-green-400">
                                                            ✅ Faça Assim
                                                        </h4>
                                                        <code className="text-xs block whitespace-pre font-mono">
                                                            {`src/features/pedidos/
  ├── components/
  │   ├── PedidosListPage.tsx
  │   └── PedidoDetailPage.tsx
  ├── pedidos-service.ts
  ├── pedidos-types.ts
  └── index.ts`}
                                                        </code>
                                                    </div>
                                                    <p className="text-xs text-muted-foreground mt-2">
                                                        Tudo relacionado a pedidos em um único lugar
                                                    </p>
                                                </div>
                                                <div className="p-4 rounded-lg border bg-card flex flex-col justify-between">
                                                    <div>
                                                        <h4 className="font-semibold mb-2 text-red-600 dark:text-red-400">
                                                            ❌ Evite Isso
                                                        </h4>
                                                        <code className="text-xs block whitespace-pre font-mono text-muted-foreground line-through">
                                                            {`src/
  ├── components/pedidos/
  ├── services/pedidos/
  ├── types/pedidos/
  └── hooks/pedidos/`}
                                                        </code>
                                                    </div>
                                                    <p className="text-xs text-muted-foreground mt-2">
                                                        Separação por tipo técnico dificulta manutenção
                                                    </p>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </motion.div>
                                </CollapsibleContent>
                            </Card>
                        </Collapsible>

                        {/* Structure Section */}
                        <Collapsible
                            open={expandedSection === "structure"}
                            onOpenChange={() =>
                                setExpandedSection(expandedSection === "structure" ? null : "structure")
                            }
                        >
                            <Card className="gap-0">
                                <CollapsibleTrigger className="w-full">
                                    <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                                                    <FolderTree className="h-5 w-5 text-purple-500" />
                                                </div>
                                                <div className="text-left">
                                                    <CardTitle>Estrutura de Pastas</CardTitle>
                                                    <CardDescription>
                                                        Organização clara e escalável do projeto
                                                    </CardDescription>
                                                </div>
                                            </div>
                                            {expandedSection === "structure" ? (
                                                <ChevronDown className="h-5 w-5 text-muted-foreground" />
                                            ) : (
                                                <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                            )}
                                        </div>
                                    </CardHeader>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <motion.div
                                        initial={{ opacity: 0, y: 0 }}
                                        animate={{ opacity: 1, y: 20 }}
                                        className="mb-4"
                                    >
                                        <CardContent className="space-y-4 pt-0">
                                            <div className="space-y-3">
                                                {[
                                                    {
                                                        folder: "app/",
                                                        description: "Configuração da aplicação (providers, router, App.tsx)",
                                                        icon: Settings,
                                                        color: "text-blue-500",
                                                    },
                                                    {
                                                        folder: "features/",
                                                        description: "Features de negócio organizadas por domínio",
                                                        icon: Box,
                                                        color: "text-green-500",
                                                    },
                                                    {
                                                        folder: "shared/",
                                                        description: "Recursos compartilhados (components, hooks, utils)",
                                                        icon: Layout,
                                                        color: "text-purple-500",
                                                    },
                                                ].map((item) => (
                                                    <div key={item.folder} className="p-4 rounded-lg border bg-card">
                                                        <div className="flex items-start gap-3">
                                                            <div
                                                                className={`h-10 w-10 rounded-lg bg-muted flex items-center justify-center ${item.color} shrink-0`}
                                                            >
                                                                <item.icon className="h-5 w-5" />
                                                            </div>
                                                            <div className="flex-1">
                                                                <code className="text-sm font-semibold">{item.folder}</code>
                                                                <p className="text-sm text-muted-foreground mt-1">
                                                                    {item.description}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                                    <Lightbulb className="h-4 w-4 text-blue-500" />
                                                    Regra de Organização
                                                </h4>
                                                <ul className="space-y-1 text-sm text-muted-foreground">
                                                    <li>• <strong>1 componente:</strong> Manter na raiz da feature</li>
                                                    <li>• <strong>2+ componentes:</strong> Agrupar em pasta <code>components/</code></li>
                                                    <li>• <strong>Service:</strong> Sempre consolidado (lógica + API + config)</li>
                                                    <li>• <strong>Types:</strong> Arquivo separado quando necessário</li>
                                                </ul>
                                            </div>
                                        </CardContent>
                                    </motion.div>
                                </CollapsibleContent>
                            </Card>
                        </Collapsible>

                        {/* Features Section */}
                        <Collapsible
                            open={expandedSection === "features"}
                            onOpenChange={() =>
                                setExpandedSection(expandedSection === "features" ? null : "features")
                            }
                        >
                            <Card className="gap-0">
                                <CollapsibleTrigger className="w-full">
                                    <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                                                    <Box className="h-5 w-5 text-green-500" />
                                                </div>
                                                <div className="text-left">
                                                    <CardTitle>Criar Novas Features</CardTitle>
                                                    <CardDescription>
                                                        Passo a passo para adicionar funcionalidades
                                                    </CardDescription>
                                                </div>
                                            </div>
                                            {expandedSection === "features" ? (
                                                <ChevronDown className="h-5 w-5 text-muted-foreground" />
                                            ) : (
                                                <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                            )}
                                        </div>
                                    </CardHeader>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <motion.div
                                        initial={{ opacity: 0, y: 0 }}
                                        animate={{ opacity: 1, y: 20 }}
                                        className="mb-4"
                                    >
                                        <CardContent className="space-y-4 pt-0">
                                            <div className="space-y-3">
                                                {[
                                                    {
                                                        step: "1",
                                                        title: "Criar Estrutura",
                                                        description: "Crie a pasta em features/ seguindo as regras de organização",
                                                    },
                                                    {
                                                        step: "2",
                                                        title: "Adicionar Rota",
                                                        description: "Configure a rota em app/router/index.tsx",
                                                    },
                                                    {
                                                        step: "3",
                                                        title: "Incluir no Menu",
                                                        description: "Adicione o item em shared/lib/menu/index.ts",
                                                    },
                                                    {
                                                        step: "4",
                                                        title: "Proteger (Opcional)",
                                                        description: "Use ProtectedRoute se precisar de controle de acesso",
                                                    },
                                                ].map((item) => (
                                                    <div key={item.step} className="flex items-start gap-4 p-4 rounded-lg border bg-card">
                                                        <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0">
                                                            {item.step}
                                                        </div>
                                                        <div className="flex-1">
                                                            <h4 className="font-semibold mb-1">{item.title}</h4>
                                                            <p className="text-sm text-muted-foreground">{item.description}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="p-4 rounded-lg bg-muted/50 border">
                                                <h4 className="font-semibold mb-2">Exemplo Prático</h4>
                                                <code className="text-xs block whitespace-pre font-mono mb-2">
                                                    {`// 1. Criar estrutura
src/features/relatorios/
  ├── components/
  │   ├── RelatoriosListPage.tsx
  │   └── RelatorioDetailPage.tsx
  ├── relatorios-service.ts
  └── relatorios-types.ts

// 2. Adicionar rota (app/router/index.tsx)
{
  path: "/relatorios",
  element: <RelatoriosListPage />,
}

// 3. Menu (shared/lib/menu/index.ts)
{
  name: "Relatórios",
  url: "/relatorios",
  icon: FileText,
}`}
                                                </code>
                                            </div>

                                            <div className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20">
                                                <h4 className="font-semibold mb-2 flex items-center gap-2">
                                                    <Layers className="h-4 w-4 text-purple-500" />
                                                    Páginas de Detalhe com Seções
                                                </h4>
                                                <p className="text-sm text-muted-foreground mb-2">
                                                    Para páginas complexas, use o sistema de <strong>Detail Sections</strong> com navegação automática:
                                                </p>
                                                <ul className="space-y-1 text-sm text-muted-foreground">
                                                    <li>• Sidebar terciária aparece automaticamente</li>
                                                    <li>• Scroll suave entre seções</li>
                                                    <li>• Highlight da seção visível</li>
                                                    <li>• Exemplos: Pokemon e Previsão do Tempo</li>
                                                </ul>
                                                <div className="flex gap-2 mt-3">
                                                    <Button asChild variant="outline" size="sm">
                                                        <Link to="/pokemon/1">Ver Pokemon →</Link>
                                                    </Button>
                                                    <Button asChild variant="outline" size="sm">
                                                        <Link to="/previsao-tempo/-23.5505,-46.6333">Ver Clima →</Link>
                                                    </Button>
                                                </div>
                                            </div>
                                        </CardContent>
                                    </motion.div>
                                </CollapsibleContent>
                            </Card>
                        </Collapsible>

                        {/* Components Section */}
                        <Collapsible
                            open={expandedSection === "components"}
                            onOpenChange={() =>
                                setExpandedSection(expandedSection === "components" ? null : "components")
                            }
                        >
                            <Card className="gap-0">
                                <CollapsibleTrigger className="w-full">
                                    <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                                                    <Palette className="h-5 w-5 text-yellow-500" />
                                                </div>
                                                <div className="text-left">
                                                    <CardTitle>Design System (shadcn/ui)</CardTitle>
                                                    <CardDescription>
                                                        Componentes UI modernos e acessíveis
                                                    </CardDescription>
                                                </div>
                                            </div>
                                            {expandedSection === "components" ? (
                                                <ChevronDown className="h-5 w-5 text-muted-foreground" />
                                            ) : (
                                                <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                            )}
                                        </div>
                                    </CardHeader>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <motion.div
                                        initial={{ opacity: 0, y: 0 }}
                                        animate={{ opacity: 1, y: 20 }}
                                        className="mb-4"
                                    >
                                        <CardContent className="space-y-4 pt-0">
                                            <div className="p-4 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
                                                <p className="text-sm">
                                                    ⚠️ <strong>Importante:</strong> Os componentes em{" "}
                                                    <code>shared/components/ui/</code> são gerenciados pelo shadcn/ui.
                                                    <strong> Não modifique diretamente</strong>.
                                                </p>
                                            </div>

                                            <div className="space-y-2">
                                                <h4 className="font-semibold">Adicionar Novos Componentes</h4>
                                                <div className="p-4 rounded-lg border bg-card">
                                                    <code className="text-sm block mb-2">npx shadcn@latest add [component-name]</code>
                                                    <p className="text-xs text-muted-foreground">
                                                        Exemplos: button, card, dialog, dropdown-menu, etc.
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="space-y-2">
                                                <h4 className="font-semibold">Componentes Disponíveis</h4>
                                                <div className="flex flex-wrap gap-2">
                                                    {[
                                                        "Alert",
                                                        "Avatar",
                                                        "Badge",
                                                        "Button",
                                                        "Card",
                                                        "Checkbox",
                                                        "Dialog",
                                                        "Input",
                                                        "Label",
                                                        "Select",
                                                        "Switch",
                                                        "Table",
                                                        "Tabs",
                                                        "Tooltip",
                                                    ].map((comp) => (
                                                        <Badge key={comp} variant="secondary">
                                                            {comp}
                                                        </Badge>
                                                    ))}
                                                </div>
                                                <Button asChild variant="link" className="p-0 h-auto">
                                                    <Link to="/design-system">Ver todos os componentes →</Link>
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </motion.div>
                                </CollapsibleContent>
                            </Card>
                        </Collapsible>

                        {/* Patterns Section */}
                        <Collapsible
                            open={expandedSection === "patterns"}
                            onOpenChange={() =>
                                setExpandedSection(expandedSection === "patterns" ? null : "patterns")
                            }
                        >
                            <Card className="gap-0">
                                <CollapsibleTrigger className="w-full">
                                    <CardHeader className="cursor-pointer hover:bg-accent/50 transition-colors">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                                                    <Code2 className="h-5 w-5 text-red-500" />
                                                </div>
                                                <div className="text-left">
                                                    <CardTitle>Padrões e Convenções</CardTitle>
                                                    <CardDescription>
                                                        Boas práticas e nomenclaturas
                                                    </CardDescription>
                                                </div>
                                            </div>
                                            {expandedSection === "patterns" ? (
                                                <ChevronDown className="h-5 w-5 text-muted-foreground" />
                                            ) : (
                                                <ChevronRight className="h-5 w-5 text-muted-foreground" />
                                            )}
                                        </div>
                                    </CardHeader>
                                </CollapsibleTrigger>
                                <CollapsibleContent>
                                    <motion.div
                                        initial={{ opacity: 0, y: 0 }}
                                        animate={{ opacity: 1, y: 20 }}
                                        className="mb-4"
                                    >
                                        <CardContent className="space-y-4 pt-0">
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <div className="p-4 rounded-lg border bg-card">
                                                    <h4 className="font-semibold mb-3">Nomenclatura de Arquivos</h4>
                                                    <ul className="space-y-2 text-sm">
                                                        <li>
                                                            <code>kebab-case</code> para arquivos
                                                        </li>
                                                        <li>
                                                            <code>PascalCase</code> para componentes
                                                        </li>
                                                        <li>
                                                            <code>camelCase</code> para funções/hooks
                                                        </li>
                                                        <li>
                                                            <code>UPPER_SNAKE</code> para constantes
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div className="p-4 rounded-lg border bg-card">
                                                    <h4 className="font-semibold mb-3">Ordem de Imports</h4>
                                                    <ul className="space-y-2 text-sm">
                                                        <li>1. React e externos</li>
                                                        <li>2. Features (barrel exports)</li>
                                                        <li>3. Shared (components, lib)</li>
                                                        <li>4. Relativos (./)</li>
                                                    </ul>
                                                </div>
                                            </div>

                                            <div className="p-4 rounded-lg bg-muted/50 border">
                                                <h4 className="font-semibold mb-2">Comentários em Português</h4>
                                                <p className="text-sm text-muted-foreground mb-2">
                                                    Todos os comentários devem ser em português brasileiro, curtos e úteis:
                                                </p>
                                                <code className="text-xs block whitespace-pre font-mono">
                                                    {`// ✅ Bom: conciso e útil
// Busca pedidos por status

// ❌ Evitar: óbvio
// Esta função retorna os pedidos`}
                                                </code>
                                            </div>
                                        </CardContent>
                                    </motion.div>
                                </CollapsibleContent>
                            </Card>
                        </Collapsible>
                    </motion.div>
                </TabsContent>

                {/* Concepts Tab */}
                <TabsContent value="concepts" className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                        {[
                            {
                                icon: ShieldCheck,
                                title: "Autenticação OIDC",
                                description: "Keycloak integrado com suporte a roles e proteção de rotas",
                                features: ["Login automático", "Controle por roles", "Mock para dev"],
                            },
                            {
                                icon: Palette,
                                title: "Sistema de Temas",
                                description: "Design minimalista - cores secundárias unificadas, apenas primary diferente",
                                features: ["Herval, Taqi, iPlace", "Modo dark/light", "Troca sem contraste visual"],
                            },
                            {
                                icon: GitBranch,
                                title: "Roteamento",
                                description: "React Router v7 com rotas protegidas e breadcrumbs",
                                features: ["Lazy loading", "Protected routes", "Breadcrumbs automáticos"],
                            },
                            {
                                icon: Zap,
                                title: "State Management",
                                description: "Tanstack Query para server state e Context API para UI",
                                features: ["Cache inteligente", "Otimistic updates", "Error handling"],
                            },
                        ].map((concept, index) => (
                            <motion.div
                                key={concept.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 * index }}
                            >
                                <Card className="h-full">
                                    <CardHeader>
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                                <concept.icon className="h-5 w-5 text-primary" />
                                            </div>
                                            <CardTitle className="text-lg">{concept.title}</CardTitle>
                                        </div>
                                        <CardDescription>{concept.description}</CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <ul className="space-y-1">
                                            {concept.features.map((feature) => (
                                                <li key={feature} className="flex items-center gap-2 text-sm">
                                                    <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0" />
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle>Stack Tecnológica</CardTitle>
                                <CardDescription>Ferramentas modernas e consolidadas</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid md:grid-cols-3 gap-3">
                                    {[
                                        { name: "React 19.2", desc: "Framework UI" },
                                        { name: "TypeScript 5.9", desc: "Tipagem estática" },
                                        { name: "Vite 7.2", desc: "Build tool" },
                                        { name: "Tailwind CSS 4.1", desc: "Estilização" },
                                        { name: "shadcn/ui", desc: "Componentes" },
                                        { name: "Tanstack Query 5.90", desc: "Server state" },
                                        { name: "Framer Motion 12.23", desc: "Animações" },
                                        { name: "React Router 7.9", desc: "Roteamento" },
                                        { name: "oidc-client 1.11", desc: "Autenticação" },
                                    ].map((tech) => (
                                        <div key={tech.name} className="p-3 rounded-lg border bg-card">
                                            <p className="font-semibold text-sm">{tech.name}</p>
                                            <p className="text-xs text-muted-foreground">{tech.desc}</p>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Filosofia do Template</CardTitle>
                                <CardDescription>Princípios que guiam o desenvolvimento</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-3">
                                    <div className="p-4 rounded-lg border bg-card">
                                        <h4 className="font-semibold mb-2">Simplicidade &gt; Complexidade</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Código direto e legível, sem abstrações prematuras. Padrões claros e previsíveis.
                                        </p>
                                    </div>
                                    <div className="p-4 rounded-lg border bg-card">
                                        <h4 className="font-semibold mb-2">Escalabilidade sem Over-Engineering</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Fácil adicionar features sem refatoração estrutural. Evite "factory", "manager" sem ganho real.
                                        </p>
                                    </div>
                                    <div className="p-4 rounded-lg border bg-card">
                                        <h4 className="font-semibold mb-2">Developer Experience (DX)</h4>
                                        <p className="text-sm text-muted-foreground">
                                            Onboarding rápido, tempo reduzido para localizar código, produtividade maximizada.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </TabsContent>

                {/* Quick Start Tab */}
                <TabsContent value="quickstart" >
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4 mb-6"
                    >
                        <Card>
                            <CardHeader>
                                <CardTitle>Primeiros Passos</CardTitle>
                                <CardDescription>Comece a desenvolver em minutos</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {[
                                    {
                                        title: "1. Configure o Tema",
                                        description: "Execute o script de setup ou configure manualmente no .env",
                                        command: "npm run setup",
                                        link: "/settings/preferences",
                                    },
                                    {
                                        title: "2. Configure Autenticação",
                                        description: "Adicione as credenciais do Keycloak no .env ou use o modo dev",
                                        command: "VITE_DEV_AUTH_BYPASS=true",
                                    },
                                    {
                                        title: "3. Explore os Exemplos",
                                        description: "Tarefas (CRUD), Pokémon/Clima (APIs), Preferências (Temas)",
                                        link: "/tarefas",
                                    },
                                    {
                                        title: "4. Crie Sua Feature",
                                        description: "Siga o guia completo para adicionar sua primeira funcionalidade",
                                    },
                                ].map((step) => (
                                    <div key={step.title} className="p-4 rounded-lg border bg-card">
                                        <h4 className="font-semibold mb-1">{step.title}</h4>
                                        <p className="text-sm text-muted-foreground mb-2">{step.description}</p>
                                        {step.command && (
                                            <code className="text-xs block p-2 rounded bg-muted">{step.command}</code>
                                        )}
                                        {step.link && (
                                            <Button asChild variant="link" className="p-0 h-auto mt-2">
                                                <Link to={step.link}>Ver exemplo →</Link>
                                            </Button>
                                        )}
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Recursos Úteis</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid md:grid-cols-3 gap-3">
                                    <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
                                        <Link to="/design-system">
                                            <Palette className="h-5 w-5" />
                                            <span>Design System</span>
                                        </Link>
                                    </Button>
                                    <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
                                        <Link to="/tarefas">
                                            <Code2 className="h-5 w-5" />
                                            <span>Exemplos</span>
                                        </Link>
                                    </Button>
                                    <Button asChild variant="outline" className="h-auto py-4 flex-col gap-2">
                                        <Link to="/settings/preferences">
                                            <Settings className="h-5 w-5" />
                                            <span>Preferências</span>
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
