import { useState } from "react"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Button,
    Input,
    Textarea,
    Badge,
    Skeleton,
    Checkbox,
    Label,
    Switch,
    Progress,
    Alert,
    AlertDescription,
    AlertTitle,
    Avatar,
    AvatarFallback,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    Calendar,
    Popover,
    PopoverContent,
    PopoverTrigger,
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Spinner,
    useTheme
} from "@herval/react-core"

import {
    Component,
    Search,
    Info,
    XCircle,
    Download,
    MoreVertical,
    User,
    Settings,
    LogOut,
    HelpCircle,
    ChevronDownIcon,
    FormInput,
    Bell,
    Layers,
    LayoutGrid
} from "lucide-react"

import { toast } from "sonner"
import { PageHeader } from "@/shared/components"

type ComponentCategory = "all" | "form" | "feedback" | "overlay" | "display" | "loading"

const CATEGORIES: { id: ComponentCategory; label: string; icon: React.ElementType }[] = [
    { id: "all", label: "Todos", icon: LayoutGrid },
    { id: "form", label: "Form", icon: FormInput },
    { id: "feedback", label: "Feedback", icon: Bell },
    { id: "overlay", label: "Overlay", icon: Layers },
    { id: "display", label: "Display", icon: Component },
    { id: "loading", label: "Loading", icon: Spinner },
]

export function DesignSystemPage() {
    const [progress, setProgress] = useState(45)
    const [checked, setChecked] = useState(false)
    const [switchOn, setSwitchOn] = useState(false)
    const [dateOpen, setDateOpen] = useState(false)
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [searchTerm, setSearchTerm] = useState("")
    const [activeCategory, setActiveCategory] = useState<ComponentCategory>("all")
    const { theme, setThemeMode } = useTheme()

    const shouldShow = (category: ComponentCategory, keywords: string[]) => {
        const matchesCategory = activeCategory === "all" || activeCategory === category
        const matchesSearch = searchTerm === "" || keywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()))
        return matchesCategory && matchesSearch
    }

    return (
        <div className="space-y-8">
            <PageHeader
                icon={Component}
                iconClassName="text-primary"
                title="Design System"
                description="Biblioteca completa de componentes do @herval/react-core"
            />

            {/* Search and Filter */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none z-10" />
                            <Input
                                placeholder="Buscar componentes..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="!pl-10"
                            />
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            {CATEGORIES.map((cat) => (
                                <Button
                                    key={cat.id}
                                    variant={activeCategory === cat.id ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setActiveCategory(cat.id)}
                                    className="gap-1.5"
                                >
                                    <cat.icon className="h-3.5 w-3.5" />
                                    <span className="hidden sm:inline">{cat.label}</span>
                                </Button>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* ==================== FORM COMPONENTS ==================== */}
            {shouldShow("form", ["button", "botão", "botoes"]) && (
                <section className="space-y-4">
                    <div>
                        <h2 className="text-2xl font-bold tracking-tight">Botões</h2>
                        <p className="text-muted-foreground">Variações e tamanhos de botões</p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Variantes</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    <Button>Default</Button>
                                    <Button variant="secondary">Secondary</Button>
                                    <Button variant="outline">Outline</Button>
                                    <Button variant="ghost">Ghost</Button>
                                    <Button variant="destructive">Destructive</Button>
                                    <Button variant="link">Link</Button>
                                    <Button disabled>Disabled</Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Tamanhos</CardTitle>
                            </CardHeader>
                            <CardContent>
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
            )}

            {shouldShow("form", ["input", "text", "textarea", "form", "campo", "email"]) && (
                <>
                    <section className="space-y-4">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">Form Inputs</h2>
                            <p className="text-muted-foreground">Campos de formulário e controles</p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">Text Inputs</CardTitle>
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
                                    <CardTitle className="text-base">Select e Date Picker</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="theme">Tema</Label>
                                        <Select value={theme.mode} onValueChange={(value) => setThemeMode(value as "light" | "dark")}>
                                            <SelectTrigger id="theme">
                                                <SelectValue placeholder="Selecione um tema" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="light">Light</SelectItem>
                                                <SelectItem value="dark">Dark</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="date">Data</Label>
                                        <Popover open={dateOpen} onOpenChange={setDateOpen}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    id="date"
                                                    className="w-full justify-between font-normal"
                                                >
                                                    {date ? date.toLocaleDateString() : "Selecione"}
                                                    <ChevronDownIcon className="h-4 w-4" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={date}
                                                    captionLayout="dropdown"
                                                    onSelect={(d) => {
                                                        setDate(d)
                                                        setDateOpen(false)
                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">Checkboxes e Switches</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-6">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox
                                            id="check1"
                                            checked={checked}
                                            onCheckedChange={(c) => setChecked(c as boolean)}
                                        />
                                        <Label htmlFor="check1" className="cursor-pointer">
                                            Aceito os termos
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
                </>
            )}

            {/* ==================== FEEDBACK COMPONENTS ==================== */}
            {shouldShow("feedback", ["alert", "toast", "badge", "progress", "feedback"]) && (
                <>
                    <section className="space-y-4">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">Feedback</h2>
                            <p className="text-muted-foreground">Alerts, toasts, badges e indicadores</p>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Alerts</CardTitle>
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

                        <div className="grid gap-4 md:grid-cols-3">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">Toaster (Sonner)</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => toast.success("Operação realizada!")}
                                    >
                                        Success Toast
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => toast.error("Erro ao processar")}
                                    >
                                        Error Toast
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => toast.info("Informação importante")}
                                    >
                                        Info Toast
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => toast.warning("Atenção!")}
                                    >
                                        Warning Toast
                                    </Button>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">Badges</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge>Default</Badge>
                                        <Badge variant="secondary">Secondary</Badge>
                                        <Badge variant="outline">Outline</Badge>
                                        <Badge variant="destructive">Destructive</Badge>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">Progress</CardTitle>
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
                    </section>
                </>
            )}

            {/* ==================== OVERLAY COMPONENTS ==================== */}
            {shouldShow("overlay", ["dialog", "modal", "dropdown", "menu", "tooltip", "sheet", "drawer", "popover"]) && (
                <>
                    <section className="space-y-4">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">Overlay Components</h2>
                            <p className="text-muted-foreground">Dialogs, dropdowns, sheets e tooltips</p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">Dialog</CardTitle>
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
                                                    Este é um exemplo de dialog modal.
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
                                    <CardTitle className="text-base">Dropdown Menu</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="outline" className="w-full gap-2">
                                                <MoreVertical className="h-4 w-4" />
                                                Menu
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent className="w-56">
                                            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <User className="mr-2 h-4 w-4" />
                                                Perfil
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Settings className="mr-2 h-4 w-4" />
                                                Configurações
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem>
                                                <LogOut className="mr-2 h-4 w-4" />
                                                Sair
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">Tooltip</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <TooltipProvider>
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="outline" className="w-full">
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

                        <div className="grid gap-4 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">Sheet (Lateral)</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Sheet>
                                        <SheetTrigger asChild>
                                            <Button variant="outline" className="w-full">
                                                Abrir Sheet
                                            </Button>
                                        </SheetTrigger>
                                        <SheetContent>
                                            <SheetHeader>
                                                <SheetTitle>Painel Lateral</SheetTitle>
                                                <SheetDescription>
                                                    Conteúdo do sheet lateral.
                                                </SheetDescription>
                                            </SheetHeader>
                                            <div className="py-4">
                                                <p className="text-sm text-muted-foreground">
                                                    Use sheets para painéis de configuração, filtros ou detalhes.
                                                </p>
                                            </div>
                                            <SheetFooter>
                                                <SheetClose asChild>
                                                    <Button variant="outline">Fechar</Button>
                                                </SheetClose>
                                                <Button>Salvar</Button>
                                            </SheetFooter>
                                        </SheetContent>
                                    </Sheet>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">Drawer (Mobile)</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Drawer>
                                        <DrawerTrigger asChild>
                                            <Button variant="outline" className="w-full gap-2">
                                                <HelpCircle className="h-4 w-4" />
                                                Abrir Drawer
                                            </Button>
                                        </DrawerTrigger>
                                        <DrawerContent>
                                            <DrawerHeader>
                                                <DrawerTitle>Confirmar Ação</DrawerTitle>
                                                <DrawerDescription>
                                                    Esta ação não pode ser desfeita.
                                                </DrawerDescription>
                                            </DrawerHeader>
                                            <DrawerFooter>
                                                <Button>Confirmar</Button>
                                                <DrawerClose asChild>
                                                    <Button variant="outline">Cancelar</Button>
                                                </DrawerClose>
                                            </DrawerFooter>
                                        </DrawerContent>
                                    </Drawer>
                                </CardContent>
                            </Card>
                        </div>
                    </section>
                </>
            )}

            {/* ==================== DISPLAY COMPONENTS ==================== */}
            {shouldShow("display", ["tabs", "table", "avatar", "card", "display"]) && (
                <>
                    <section className="space-y-4">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">Data Display</h2>
                            <p className="text-muted-foreground">Tabs, tabelas e avatar</p>
                        </div>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Tabs</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Tabs defaultValue="tab1" className="w-full">
                                    <TabsList className="w-full">
                                        <TabsTrigger value="tab1" className="flex-1">Tab 1</TabsTrigger>
                                        <TabsTrigger value="tab2" className="flex-1">Tab 2</TabsTrigger>
                                        <TabsTrigger value="tab3" className="flex-1">Tab 3</TabsTrigger>
                                    </TabsList>
                                    <TabsContent value="tab1" className="p-4">
                                        <p className="text-sm text-muted-foreground">
                                            Conteúdo da primeira tab
                                        </p>
                                    </TabsContent>
                                    <TabsContent value="tab2" className="p-4">
                                        <p className="text-sm text-muted-foreground">
                                            Conteúdo da segunda tab
                                        </p>
                                    </TabsContent>
                                    <TabsContent value="tab3" className="p-4">
                                        <p className="text-sm text-muted-foreground">
                                            Conteúdo da terceira tab
                                        </p>
                                    </TabsContent>
                                </Tabs>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Avatar</CardTitle>
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
                                <CardTitle className="text-base">Table</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableCaption>Lista de usuários</TableCaption>
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
                </>
            )}

            {/* ==================== LOADING COMPONENTS ==================== */}
            {shouldShow("loading", ["skeleton", "spinner", "loading", "carregando"]) && (
                <>
                    <section className="space-y-4">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">Estados de Carregamento</h2>
                            <p className="text-muted-foreground">Skeletons e spinners</p>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">Skeleton</CardTitle>
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

                            <Card>
                                <CardHeader>
                                    <CardTitle className="text-base">Spinner</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-center gap-6">
                                        <Spinner />
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="outline" className="gap-2">
                                            <Spinner />
                                            Carregando...
                                        </Badge>
                                        <Button variant="outline" disabled>
                                            <Spinner />
                                            Processando...
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </section>
                </>
            )}

            {/* ==================== COLOR PALETTE ==================== */}
            {shouldShow("display", ["color", "cor", "paleta", "palette", "tema", "theme"]) && (
                <>
                    <section className="space-y-4">
                        <div>
                            <h2 className="text-2xl font-bold tracking-tight">Paleta de Cores</h2>
                            <p className="text-muted-foreground">Tokens de cor do tema atual</p>
                        </div>

                        <Card>
                            <CardContent className="pt-6">
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
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
                                            <div className={`h-16 rounded-lg ${color.class} flex items-center justify-center ${color.fg}`}>
                                                <span className="text-xs font-medium">{color.name}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </section>
                </>
            )}

            {/* Best Practices */}
            <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                    <CardTitle className="text-base">💡 Boas Práticas</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                    <p>✅ Sempre importe componentes de <code className="bg-muted px-1 rounded">@herval/react-core</code></p>
                    <p>✅ Use tokens de cor (bg-primary, text-foreground) ao invés de cores fixas</p>
                    <p>✅ Adicione transições suaves (transition-all duration-200)</p>
                    <p>✅ Mantenha acessibilidade com aria-labels e roles</p>
                    <p>✅ Teste todos os componentes em light e dark mode</p>
                </CardContent>
            </Card>
        </div>
    )
}
