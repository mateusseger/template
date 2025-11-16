import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Textarea } from "@/shared/components/ui/textarea"
import { Badge } from "@/shared/components/ui/badge"
import { Separator } from "@/shared/components/ui/separator"
import { Skeleton } from "@/shared/components/ui/skeleton"
import { Checkbox } from "@/shared/components/ui/checkbox"
import { Label } from "@/shared/components/ui/label"
import { Switch } from "@/shared/components/ui/switch"
import { Progress } from "@/shared/components/ui/progress"
import { Alert, AlertDescription, AlertTitle } from "@/shared/components/ui/alert"
import { Avatar, AvatarFallback } from "@/shared/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
} from "@/shared/components/ui/dialog"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/shared/components/ui/tooltip"
import { useTheme } from "@/shared/theme"
import {
    Palette,
    Moon,
    Sun,
    Info,
    XCircle,
    Download,
    MoreVertical,
    User,
    Settings,
    LogOut,
    HelpCircle
} from "lucide-react"

export function DesignSystemPage() {
    const { theme, setThemeColor } = useTheme()
    const [progress, setProgress] = useState(45)
    const [checked, setChecked] = useState(false)
    const [switchOn, setSwitchOn] = useState(false)

    return (
        <div className="space-y-8">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Palette className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Design System</h1>
                        <p className="text-muted-foreground">
                            Biblioteca completa de componentes do template
                        </p>
                    </div>
                </div>
            </div>

            {/* Theme Switcher Section */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Palette className="h-5 w-5" />
                        Sistema de Temas
                    </CardTitle>
                    <CardDescription>
                        Três temas corporativos com suporte a modo claro e escuro
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-3 gap-3">
                        <Button
                            variant={theme.color === "herval" ? "default" : "outline"}
                            onClick={() => setThemeColor("herval")}
                            className="w-full"
                        >
                            Herval
                        </Button>
                        <Button
                            variant={theme.color === "taqi" ? "default" : "outline"}
                            onClick={() => setThemeColor("taqi")}
                            className="w-full"
                        >
                            Taqi
                        </Button>
                        <Button
                            variant={theme.color === "iplace" ? "default" : "outline"}
                            onClick={() => setThemeColor("iplace")}
                            className="w-full"
                        >
                            iPlace
                        </Button>
                    </div>

                    <div className="flex items-center justify-between p-4 rounded-lg border bg-muted/50">
                        <div className="flex items-center gap-2">
                            {theme.mode === "light" ? (
                                <Sun className="h-4 w-4 text-primary" />
                            ) : (
                                <Moon className="h-4 w-4 text-primary" />
                            )}
                            <span className="text-sm font-medium">
                                Modo: {theme.mode === "light" ? "Claro" : "Escuro"}
                            </span>
                        </div>
                        <Badge variant="outline">{theme.color}</Badge>
                    </div>
                </CardContent>
            </Card>

            <Separator />

            {/* Buttons Section */}
            <section className="space-y-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Botões</h2>
                    <p className="text-muted-foreground">Variações e tamanhos de botões</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Variantes</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex flex-wrap gap-2">
                                <Button>Default</Button>
                                <Button variant="secondary">Secondary</Button>
                                <Button variant="outline">Outline</Button>
                                <Button variant="ghost">Ghost</Button>
                                <Button variant="destructive">Destructive</Button>
                                <Button variant="link">Link</Button>
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Tamanhos</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex flex-wrap items-center gap-2">
                                <Button size="sm">Small</Button>
                                <Button size="default">Default</Button>
                                <Button size="lg">Large</Button>
                                <Button size="icon"><Download className="h-4 w-4" /></Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <Separator />

            {/* Inputs Section */}
            <section className="space-y-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Form Inputs</h2>
                    <p className="text-muted-foreground">Campos de formulário e controles</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Text Inputs</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="input1">Email</Label>
                                <Input id="input1" type="email" placeholder="email@example.com" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="input2">Desabilitado</Label>
                                <Input id="input2" disabled placeholder="Campo desabilitado" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="textarea1">Textarea</Label>
                                <Textarea id="textarea1" placeholder="Digite uma mensagem..." />
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Checkboxes e Switches</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="check1"
                                    checked={checked}
                                    onCheckedChange={(c) => setChecked(c as boolean)}
                                />
                                <Label htmlFor="check1" className="cursor-pointer">
                                    Aceito os termos e condições
                                </Label>
                            </div>

                            <div className="flex items-center justify-between">
                                <Label htmlFor="switch1">Notificações</Label>
                                <Switch
                                    id="switch1"
                                    checked={switchOn}
                                    onCheckedChange={setSwitchOn}
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <Separator />

            {/* Feedback Components */}
            <section className="space-y-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Feedback</h2>
                    <p className="text-muted-foreground">Alerts, badges e indicadores</p>
                </div>

                <div className="grid gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Alerts</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <Alert>
                                <Info className="h-4 w-4" />
                                <AlertTitle>Informação</AlertTitle>
                                <AlertDescription>
                                    Este é um alerta informativo padrão.
                                </AlertDescription>
                            </Alert>

                            <Alert variant="destructive">
                                <XCircle className="h-4 w-4" />
                                <AlertTitle>Erro</AlertTitle>
                                <AlertDescription>
                                    Ocorreu um erro ao processar sua solicitação.
                                </AlertDescription>
                            </Alert>
                        </CardContent>
                    </Card>

                    <div className="grid md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Badges</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex flex-wrap gap-2">
                                    <Badge>Default</Badge>
                                    <Badge variant="secondary">Secondary</Badge>
                                    <Badge variant="outline">Outline</Badge>
                                    <Badge variant="destructive">Error</Badge>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Progress</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Progresso</span>
                                        <span className="font-medium">{progress}%</span>
                                    </div>
                                    <Progress value={progress} />
                                    <div className="flex gap-2">
                                        <Button size="sm" variant="outline" onClick={() => setProgress(Math.max(0, progress - 10))}>-</Button>
                                        <Button size="sm" variant="outline" onClick={() => setProgress(Math.min(100, progress + 10))}>+</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </section>

            <Separator />

            {/* Interactive Components */}
            <section className="space-y-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Componentes Interativos</h2>
                    <p className="text-muted-foreground">Dialogs, dropdowns e tooltips</p>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Dialog</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline" className="w-full">Abrir Dialog</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Título do Dialog</DialogTitle>
                                        <DialogDescription>
                                            Este é um exemplo de dialog modal com conteúdo.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="space-y-4 py-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Nome</Label>
                                            <Input id="name" placeholder="Digite seu nome" />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit">Salvar</Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Dropdown Menu</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="outline" className="w-full">
                                        <MoreVertical className="h-4 w-4 mr-2" />
                                        Menu
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="w-56">
                                    <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <User className="mr-2 h-4 w-4" />
                                        <span>Perfil</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Settings className="mr-2 h-4 w-4" />
                                        <span>Configurações</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Sair</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Tooltip</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="outline" className="w-full">
                                            <HelpCircle className="h-4 w-4 mr-2" />
                                            Hover me
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p>Este é um tooltip de ajuda</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <Separator />

            {/* Display Components */}
            <section className="space-y-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Display</h2>
                    <p className="text-muted-foreground">Tabs, tables e avatars</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Tabs</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="tab1" className="w-full">
                            <TabsList className="w-full">
                                <TabsTrigger value="tab1" className="flex-1">Tab 1</TabsTrigger>
                                <TabsTrigger value="tab2" className="flex-1">Tab 2</TabsTrigger>
                                <TabsTrigger value="tab3" className="flex-1">Tab 3</TabsTrigger>
                            </TabsList>
                            <TabsContent value="tab1" className="space-y-4">
                                <p className="text-sm text-muted-foreground">
                                    Conteúdo da primeira tab
                                </p>
                            </TabsContent>
                            <TabsContent value="tab2">
                                <p className="text-sm text-muted-foreground">
                                    Conteúdo da segunda tab
                                </p>
                            </TabsContent>
                            <TabsContent value="tab3">
                                <p className="text-sm text-muted-foreground">
                                    Conteúdo da terceira tab
                                </p>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Avatars</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex gap-4 items-center">
                            <Avatar>
                                <AvatarFallback>JD</AvatarFallback>
                            </Avatar>
                            <Avatar>
                                <AvatarFallback className="bg-primary text-primary-foreground">AB</AvatarFallback>
                            </Avatar>
                            <Avatar className="h-12 w-12">
                                <AvatarFallback className="bg-secondary">XY</AvatarFallback>
                            </Avatar>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Table</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableCaption>Lista de usuários do sistema</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Nome</TableHead>
                                    <TableHead>Email</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead className="text-right">Ações</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell className="font-medium">João Silva</TableCell>
                                    <TableCell>joao@example.com</TableCell>
                                    <TableCell><Badge>Ativo</Badge></TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">Editar</Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">Maria Santos</TableCell>
                                    <TableCell>maria@example.com</TableCell>
                                    <TableCell><Badge variant="secondary">Pendente</Badge></TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">Editar</Button>
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell className="font-medium">Pedro Costa</TableCell>
                                    <TableCell>pedro@example.com</TableCell>
                                    <TableCell><Badge>Ativo</Badge></TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">Editar</Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </section>

            <Separator />

            {/* Loading States */}
            <section className="space-y-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Loading States</h2>
                    <p className="text-muted-foreground">Skeletons e placeholders</p>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Skeleton Loaders</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                        </div>
                        <div className="flex items-center space-x-4">
                            <Skeleton className="h-12 w-12 rounded-full" />
                            <div className="space-y-2 flex-1">
                                <Skeleton className="h-4 w-full" />
                                <Skeleton className="h-4 w-2/3" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Color Palette */}
            <section className="space-y-4">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Paleta de Cores</h2>
                    <p className="text-muted-foreground">Tokens de cor do tema atual</p>
                </div>

                <Card>
                    <CardContent className="pt-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { name: "Primary", class: "bg-primary", fg: "text-primary-foreground" },
                                { name: "Secondary", class: "bg-secondary", fg: "text-secondary-foreground" },
                                { name: "Accent", class: "bg-accent", fg: "text-accent-foreground" },
                                { name: "Muted", class: "bg-muted", fg: "text-muted-foreground" },
                                { name: "Card", class: "bg-card border", fg: "text-card-foreground" },
                                { name: "Popover", class: "bg-popover border", fg: "text-popover-foreground" },
                                { name: "Destructive", class: "bg-destructive", fg: "text-destructive-foreground" },
                                { name: "Border", class: "border-4 border-border bg-background", fg: "text-foreground" },
                            ].map((color) => (
                                <div key={color.name} className="space-y-2">
                                    <div className={`h-20 rounded-md ${color.class} flex items-center justify-center ${color.fg}`}>
                                        <span className="text-xs font-medium">{color.name}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </section>

            {/* Best Practices */}
            <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                    <CardTitle>💡 Boas Práticas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                    <p>✅ Sempre use componentes shadcn/ui ao invés de HTML puro</p>
                    <p>✅ Utilize tokens de cor (bg-primary, text-foreground) ao invés de cores hardcoded</p>
                    <p>✅ Adicione transições suaves para melhor UX (transition-all duration-200)</p>
                    <p>✅ Mantenha acessibilidade com aria-labels e roles apropriados</p>
                    <p>✅ Teste todos os componentes em light e dark mode</p>
                </CardContent>
            </Card>
        </div>
    )
}
