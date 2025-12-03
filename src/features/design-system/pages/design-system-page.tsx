import { useState } from "react"
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    ScrollArea,
    Button,
    ButtonGroup,
    Input,
    InputGroup,
    InputGroupAddon,
    InputGroupInput,
    Textarea,
    Label,
    Checkbox,
    Switch,
    RadioGroup,
    RadioGroupItem,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Slider,
    Toggle,
    ToggleGroup,
    ToggleGroupItem,
    Calendar,
    Avatar,
    AvatarFallback,
    Badge,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
    Alert,
    AlertDescription,
    AlertTitle,
    Progress,
    Skeleton,
    Spinner,
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
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
    Popover,
    PopoverContent,
    PopoverTrigger,
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
    Separator,
    useTheme,
    cn,
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
    Bold,
    Italic,
    Underline,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Mail,
    CalendarIcon,
    Trash2,
    Eye,
    Check,
    ChevronsUpDown,
    Edit,
    MoreHorizontal,
    FileText,
    BookOpen,
    Code,
    Rocket,
    Github,
    Zap,
} from "lucide-react"

import { toast } from "sonner"
import { PageHeader } from "@/shared/components"

const FRAMEWORKS = [
    { value: "react", label: "React" },
    { value: "vue", label: "Vue" },
    { value: "angular", label: "Angular" },
    { value: "svelte", label: "Svelte" },
    { value: "nextjs", label: "Next.js" },
]

export function DesignSystemPage() {
    const [progress, setProgress] = useState(45)
    const [checked, setChecked] = useState(false)
    const [switchOn, setSwitchOn] = useState(false)
    const [dateOpen, setDateOpen] = useState(false)
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [searchTerm, setSearchTerm] = useState("")
    const [sliderValue, setSliderValue] = useState([50])
    const { theme, setThemeMode } = useTheme()

    const [comboOpen, setComboOpen] = useState(false)
    const [comboValue, setComboValue] = useState("")

    const shouldShow = (keywords: string[]) => {
        return searchTerm === "" || keywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    return (
        <TooltipProvider delayDuration={300}>
            <div className="space-y-6 md:space-y-8">
                <PageHeader
                    icon={Component}
                    iconClassName="text-primary"
                    title="Design System"
                    description="Biblioteca completa de componentes do @herval/react-core"
                />

                <InputGroup>
                    <InputGroupAddon>
                        <Search className="h-4 w-4" />
                    </InputGroupAddon>
                    <InputGroupInput
                        placeholder="Digite para filtrar..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </InputGroup>

                {/* Color Palette */}
                {shouldShow(["color", "cor", "paleta", "tema", "theme"]) && (
                    <section className="space-y-4">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2">
                                Paleta de Cores
                            </h2>
                            <p className="text-sm text-muted-foreground">Tokens de cor do tema atual</p>
                        </div>

                        <Card>
                            <CardContent className="pt-4 sm:pt-6">
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
                                    {[
                                        { name: "Primary", bgClass: "bg-primary", fgClass: "text-primary-foreground" },
                                        { name: "Secondary", bgClass: "bg-secondary", fgClass: "text-secondary-foreground" },
                                        { name: "Accent", bgClass: "bg-accent", fgClass: "text-accent-foreground" },
                                        { name: "Muted", bgClass: "bg-muted", fgClass: "text-muted-foreground" },
                                        { name: "Card", bgClass: "bg-card border", fgClass: "text-card-foreground" },
                                        { name: "Popover", bgClass: "bg-popover border", fgClass: "text-popover-foreground" },
                                        { name: "Destructive", bgClass: "bg-destructive", fgClass: "text-destructive-foreground" },
                                        { name: "Border", bgClass: "border-4 border-border bg-background", fgClass: "text-foreground" },
                                    ].map((color) => (
                                        <div key={color.name} className={`h-14 sm:h-16 rounded-lg ${color.bgClass} flex items-center justify-center ${color.fgClass}`}>
                                            <span className="text-xs font-medium">{color.name}</span>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </section>
                )}

                {/* Buttons Section */}
                {shouldShow(["button", "botão", "botoes", "acao"]) && (
                    <section className="space-y-4">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Botões</h2>
                            <p className="text-sm text-muted-foreground">Variações, tamanhos e agrupamentos de botões</p>
                        </div>

                        <div className="grid gap-4">
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-base">Button (Variantes)</CardTitle>
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

                            <div className="grid gap-4 sm:grid-cols-2">
                                <Card>
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-base">Button (Tamanhos)</CardTitle>
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

                                <Card>
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-base">Button Group</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-3">
                                            <ButtonGroup>
                                                <Button variant="outline">Left</Button>
                                                <Button variant="outline">Center</Button>
                                                <Button variant="outline">Right</Button>
                                            </ButtonGroup>
                                            <ButtonGroup>
                                                <Button size="icon" variant="outline"><Bold className="h-4 w-4" /></Button>
                                                <Button size="icon" variant="outline"><Italic className="h-4 w-4" /></Button>
                                                <Button size="icon" variant="outline"><Underline className="h-4 w-4" /></Button>
                                            </ButtonGroup>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </section>
                )}

                {/* Text Inputs Section */}
                {shouldShow(["input", "text", "textarea", "form", "campo", "email", "grupo"]) && (
                    <section className="space-y-4">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Campos de Texto</h2>
                            <p className="text-sm text-muted-foreground">Inputs, textareas e grupos de input</p>
                        </div>

                        <div className="grid gap-4 lg:grid-cols-2">
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-base">Input</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email-input">Email</Label>
                                        <Input id="email-input" type="email" placeholder="email@exemplo.com" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="disabled-input">Desabilitado</Label>
                                        <Input id="disabled-input" disabled placeholder="Campo desabilitado" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="textarea-input">Textarea</Label>
                                        <Textarea id="textarea-input" placeholder="Digite uma mensagem..." />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-base">Input Group</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <InputGroup>
                                        <InputGroupAddon><Mail className="h-4 w-4" /></InputGroupAddon>
                                        <InputGroupInput placeholder="email@exemplo.com" />
                                    </InputGroup>
                                    <InputGroup>
                                        <InputGroupAddon><Search className="h-4 w-4" /></InputGroupAddon>
                                        <InputGroupInput placeholder="Buscar..." />
                                    </InputGroup>
                                    <InputGroup>
                                        <InputGroupAddon>https://</InputGroupAddon>
                                        <InputGroupInput placeholder="meusite.com" />
                                    </InputGroup>
                                    <InputGroup>
                                        <InputGroupInput placeholder="0.00" />
                                        <InputGroupAddon align="inline-end">BRL</InputGroupAddon>
                                    </InputGroup>
                                </CardContent>
                            </Card>
                        </div>
                    </section>
                )}

                {/* Selection Controls */}
                {shouldShow(["select", "checkbox", "switch", "radio", "toggle", "slider", "calendario", "date"]) && (
                    <section className="space-y-4">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Controles de Seleção</h2>
                            <p className="text-sm text-muted-foreground">Selects, checkboxes, radios, toggles e sliders</p>
                        </div>

                        <div className="grid gap-4">
                            {/* Row 1: Select, Date, Checkbox/Switch */}
                            <div className="grid gap-4 sm:grid-cols-3">
                                <Card>
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-base">Select</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            <Label htmlFor="theme-select">Tema</Label>
                                            <Select value={theme.mode} onValueChange={(v) => setThemeMode(v as "light" | "dark")}>
                                                <SelectTrigger id="theme-select">
                                                    <SelectValue placeholder="Selecione" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="light">Light</SelectItem>
                                                    <SelectItem value="dark">Dark</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-base">Date Picker (Popover + Calendar)</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="space-y-2">
                                            <Label htmlFor="date-picker">Data</Label>
                                            <Popover open={dateOpen} onOpenChange={setDateOpen}>
                                                <PopoverTrigger asChild>
                                                    <Button
                                                        variant="outline"
                                                        id="date-picker"
                                                        className="w-full justify-between font-normal"
                                                    >
                                                        {date ? date.toLocaleDateString("pt-BR") : "Selecione"}
                                                        <ChevronDownIcon className="h-4 w-4" />
                                                    </Button>
                                                </PopoverTrigger>
                                                <PopoverContent className="w-auto p-0" align="start">
                                                    <Calendar
                                                        mode="single"
                                                        selected={date}
                                                        captionLayout="dropdown"
                                                        onSelect={(d) => { setDate(d); setDateOpen(false) }}
                                                    />
                                                </PopoverContent>
                                            </Popover>
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-base">Checkbox & Switch</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex items-center space-x-2">
                                            <Checkbox id="terms" checked={checked} onCheckedChange={(c) => setChecked(c as boolean)} />
                                            <Label htmlFor="terms" className="cursor-pointer text-sm">Aceito os termos</Label>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <Label htmlFor="notifications" className="text-sm">Notificações</Label>
                                            <Switch id="notifications" checked={switchOn} onCheckedChange={setSwitchOn} />
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Row 2: Radio, Toggle, Slider */}
                            <div className="grid gap-4 sm:grid-cols-3">
                                <Card>
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-base">Radio Group</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <RadioGroup defaultValue="standard" className="space-y-2">
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="basic" id="plan-basic" />
                                                <Label htmlFor="plan-basic" className="text-sm">Básico</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="standard" id="plan-standard" />
                                                <Label htmlFor="plan-standard" className="text-sm">Padrão</Label>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <RadioGroupItem value="premium" id="plan-premium" />
                                                <Label htmlFor="plan-premium" className="text-sm">Premium</Label>
                                            </div>
                                        </RadioGroup>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-base">Toggle & Toggle Group</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="flex flex-wrap gap-2">
                                            <Toggle aria-label="Bold"><Bold className="h-4 w-4" /></Toggle>
                                            <Toggle aria-label="Italic"><Italic className="h-4 w-4" /></Toggle>
                                            <Toggle variant="outline" aria-label="Underline"><Underline className="h-4 w-4" /></Toggle>
                                        </div>
                                        <ToggleGroup type="single" defaultValue="center" variant="outline">
                                            <ToggleGroupItem value="left" aria-label="Left"><AlignLeft className="h-4 w-4" /></ToggleGroupItem>
                                            <ToggleGroupItem value="center" aria-label="Center"><AlignCenter className="h-4 w-4" /></ToggleGroupItem>
                                            <ToggleGroupItem value="right" aria-label="Right"><AlignRight className="h-4 w-4" /></ToggleGroupItem>
                                        </ToggleGroup>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="pb-3">
                                        <CardTitle className="text-base">Slider</CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-4">
                                        <div className="space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-muted-foreground">Volume</span>
                                                <span className="font-medium">{sliderValue[0]}%</span>
                                            </div>
                                            <Slider value={sliderValue} onValueChange={setSliderValue} max={100} step={1} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-sm">Desabilitado</Label>
                                            <Slider defaultValue={[50]} disabled />
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>

                            {/* Row 3: Combobox */}
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-base">Combobox (Popover + Command)</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <Label>Framework</Label>
                                        <Popover open={comboOpen} onOpenChange={setComboOpen}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    role="combobox"
                                                    aria-expanded={comboOpen}
                                                    className="w-full justify-between"
                                                >
                                                    {comboValue
                                                        ? FRAMEWORKS.find((f) => f.value === comboValue)?.label
                                                        : "Selecione um framework..."}
                                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-full p-0" align="start">
                                                <Command>
                                                    <CommandInput placeholder="Buscar framework..." />
                                                    <CommandList>
                                                        <CommandEmpty>Nenhum framework encontrado.</CommandEmpty>
                                                        <CommandGroup>
                                                            {FRAMEWORKS.map((framework) => (
                                                                <CommandItem
                                                                    key={framework.value}
                                                                    value={framework.value}
                                                                    onSelect={(currentValue) => {
                                                                        setComboValue(currentValue === comboValue ? "" : currentValue)
                                                                        setComboOpen(false)
                                                                    }}
                                                                >
                                                                    <Check
                                                                        className={cn(
                                                                            "mr-2 h-4 w-4",
                                                                            comboValue === framework.value ? "opacity-100" : "opacity-0"
                                                                        )}
                                                                    />
                                                                    {framework.label}
                                                                </CommandItem>
                                                            ))}
                                                        </CommandGroup>
                                                    </CommandList>
                                                </Command>
                                            </PopoverContent>
                                        </Popover>
                                        <p className="text-xs text-muted-foreground">
                                            Combina Popover com Command para criar um select com busca.
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </section>
                )}

                {/* Tabs, Accordion & Collapsible */}
                {shouldShow(["tabs", "accordion", "collapsible", "faq", "aba", "expandir", "colapsar"]) && (
                    <section className="space-y-4">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Organização de Conteúdo</h2>
                            <p className="text-sm text-muted-foreground">Tabs, accordions e collapsibles para estruturar informações</p>
                        </div>

                        <div className="grid gap-4 lg:grid-cols-3">
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-base">Tabs</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Tabs defaultValue="tab1" className="w-full">
                                        <TabsList className="w-full grid grid-cols-3">
                                            <TabsTrigger value="tab1">Geral</TabsTrigger>
                                            <TabsTrigger value="tab2">Detalhes</TabsTrigger>
                                            <TabsTrigger value="tab3">Config</TabsTrigger>
                                        </TabsList>
                                        <TabsContent value="tab1" className="p-3 text-sm text-muted-foreground">
                                            Conteúdo da aba geral
                                        </TabsContent>
                                        <TabsContent value="tab2" className="p-3 text-sm text-muted-foreground">
                                            Conteúdo dos detalhes
                                        </TabsContent>
                                        <TabsContent value="tab3" className="p-3 text-sm text-muted-foreground">
                                            Conteúdo de configurações
                                        </TabsContent>
                                    </Tabs>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-base">Accordion</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Accordion type="single" collapsible className="w-full">
                                        <AccordionItem value="item-1">
                                            <AccordionTrigger className="text-sm">O que é @herval/react-core?</AccordionTrigger>
                                            <AccordionContent className="text-sm">
                                                Uma biblioteca de componentes React baseada em shadcn/ui.
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-2">
                                            <AccordionTrigger className="text-sm">Como instalar?</AccordionTrigger>
                                            <AccordionContent className="text-sm">
                                                Execute <code className="bg-muted px-1 rounded">npm install @herval/react-core</code>
                                            </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-3">
                                            <AccordionTrigger className="text-sm">É compatível com TypeScript?</AccordionTrigger>
                                            <AccordionContent className="text-sm">
                                                Sim! Todos os componentes incluem tipos completos.
                                            </AccordionContent>
                                        </AccordionItem>
                                    </Accordion>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-base">Collapsible</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Collapsible className="w-full space-y-2">
                                        <div className="flex items-center justify-between space-x-4">
                                            <h4 className="text-sm font-semibold">@herval/react-core</h4>
                                            <CollapsibleTrigger asChild>
                                                <Button variant="ghost" size="sm">
                                                    <ChevronsUpDown className="h-4 w-4" />
                                                    <span className="sr-only">Toggle</span>
                                                </Button>
                                            </CollapsibleTrigger>
                                        </div>
                                        <div className="rounded-md border px-4 py-2 font-mono text-sm">
                                            Item sempre visível
                                        </div>
                                        <CollapsibleContent className="space-y-2">
                                            <div className="rounded-md border px-4 py-2 font-mono text-sm">
                                                Item expansível 1
                                            </div>
                                            <div className="rounded-md border px-4 py-2 font-mono text-sm">
                                                Item expansível 2
                                            </div>
                                        </CollapsibleContent>
                                    </Collapsible>
                                </CardContent>
                            </Card>
                        </div>
                    </section>
                )}

                {/* Table & Avatar & Badges & Separator */}
                {shouldShow(["table", "tabela", "avatar", "badge", "lista", "dados", "separator", "separador", "divisor"]) && (
                    <section className="space-y-4">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Exibição de Dados</h2>
                            <p className="text-sm text-muted-foreground">Tabelas, avatares, badges e separadores</p>
                        </div>

                        <Card>
                            <CardHeader className="pb-3">
                                <CardTitle className="text-base">Table</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow className="bg-muted/50">
                                            <TableHead className="w-[50px]">#</TableHead>
                                            <TableHead>Usuário</TableHead>
                                            <TableHead className="hidden md:table-cell">Email</TableHead>
                                            <TableHead className="hidden lg:table-cell">Cargo</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead className="text-right">Ações</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {[
                                            { id: 1, name: "João Silva", email: "joao@example.com", role: "Admin", status: "Ativo", initials: "JS" },
                                            { id: 2, name: "Maria Santos", email: "maria@example.com", role: "Editor", status: "Pendente", initials: "MS" },
                                            { id: 3, name: "Pedro Costa", email: "pedro@example.com", role: "Viewer", status: "Inativo", initials: "PC" },
                                            { id: 4, name: "Ana Oliveira", email: "ana@example.com", role: "Editor", status: "Ativo", initials: "AO" },
                                        ].map((user) => (
                                            <TableRow key={user.id} className="hover:bg-muted/30 transition-colors">
                                                <TableCell className="text-muted-foreground text-sm">{user.id}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <Avatar className="h-8 w-8">
                                                            <AvatarFallback className="text-xs">{user.initials}</AvatarFallback>
                                                        </Avatar>
                                                        <span className="font-medium">{user.name}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell text-muted-foreground">{user.email}</TableCell>
                                                <TableCell className="hidden lg:table-cell">
                                                    <Badge variant="outline" className="text-xs">{user.role}</Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        variant={user.status === "Ativo" ? "default" : user.status === "Pendente" ? "secondary" : "outline"}
                                                        className="text-xs"
                                                    >
                                                        {user.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuItem><Eye className="mr-2 h-4 w-4" />Ver</DropdownMenuItem>
                                                            <DropdownMenuItem><Edit className="mr-2 h-4 w-4" />Editar</DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem className="text-destructive"><Trash2 className="mr-2 h-4 w-4" />Excluir</DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <div className="flex items-center justify-between p-4 border-t">
                                    <p className="text-xs text-muted-foreground">Mostrando 4 de 4 resultados</p>
                                    <div className="flex gap-1">
                                        <Button variant="outline" size="sm" disabled>Anterior</Button>
                                        <Button variant="outline" size="sm" disabled>Próximo</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="grid gap-4 sm:grid-cols-3">
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-base">Avatar</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="flex gap-3 items-center flex-wrap">
                                        <Avatar><AvatarFallback>JD</AvatarFallback></Avatar>
                                        <Avatar><AvatarFallback className="bg-primary text-primary-foreground">AB</AvatarFallback></Avatar>
                                        <Avatar className="h-12 w-12"><AvatarFallback className="bg-secondary">XY</AvatarFallback></Avatar>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-base">Badge</CardTitle>
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
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-base">Separator</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-2">Horizontal</p>
                                        <div className="space-y-2">
                                            <p className="text-sm">Conteúdo acima</p>
                                            <Separator />
                                            <p className="text-sm">Conteúdo abaixo</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground mb-2">Vertical</p>
                                        <div className="flex h-5 items-center space-x-4 text-sm">
                                            <span>Blog</span>
                                            <Separator orientation="vertical" />
                                            <span>Docs</span>
                                            <Separator orientation="vertical" />
                                            <span>Source</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </section>
                )}

                {/* Carousel & Scroll Area */}
                {shouldShow(["carousel", "scroll", "galeria", "slider", "rolagem"]) && (
                    <section className="space-y-4">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Navegação de Conteúdo</h2>
                            <p className="text-sm text-muted-foreground">Carousels e áreas de scroll</p>
                        </div>

                        <div className="grid gap-4 lg:grid-cols-2">
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-base">Carousel</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Carousel className="w-full max-w-[250px] mx-auto">
                                        <CarouselContent>
                                            {[1, 2, 3, 4, 5].map((i) => (
                                                <CarouselItem key={i}>
                                                    <Card>
                                                        <CardContent className="flex aspect-square items-center justify-center p-4">
                                                            <span className="text-3xl font-semibold">{i}</span>
                                                        </CardContent>
                                                    </Card>
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                        <CarouselPrevious />
                                        <CarouselNext />
                                    </Carousel>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-base">Scroll Area</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ScrollArea className="h-52 rounded-md border p-3">
                                        {Array.from({ length: 15 }).map((_, i) => (
                                            <div key={i} className="py-2 border-b last:border-0">
                                                <p className="text-sm font-medium">Item {i + 1}</p>
                                                <p className="text-xs text-muted-foreground">Descrição do item {i + 1}</p>
                                            </div>
                                        ))}
                                    </ScrollArea>
                                </CardContent>
                            </Card>
                        </div>
                    </section>
                )}

                {/* Alerts & Progress */}
                {shouldShow(["alert", "progress", "aviso", "erro", "sucesso"]) && (
                    <section className="space-y-4">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Alertas e Progresso</h2>
                            <p className="text-sm text-muted-foreground">Mensagens de feedback e indicadores</p>
                        </div>

                        <div className="space-y-4">
                            <div className="grid gap-4 sm:grid-cols-2">
                                <Alert>
                                    <Info className="h-4 w-4" />
                                    <AlertTitle>Informação</AlertTitle>
                                    <AlertDescription>Este é um alerta informativo padrão.</AlertDescription>
                                </Alert>
                                <Alert variant="destructive">
                                    <XCircle className="h-4 w-4" />
                                    <AlertTitle>Erro</AlertTitle>
                                    <AlertDescription>Ocorreu um erro ao processar.</AlertDescription>
                                </Alert>
                            </div>

                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-base">Progress</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-muted-foreground">Progresso</span>
                                            <span className="font-medium">{progress}%</span>
                                        </div>
                                        <Progress value={progress} />
                                        <div className="flex gap-2 pt-2">
                                            <Button size="sm" variant="outline" onClick={() => setProgress(Math.max(0, progress - 10))}>-10</Button>
                                            <Button size="sm" variant="outline" onClick={() => setProgress(Math.min(100, progress + 10))}>+10</Button>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </section>
                )}

                {/* Toast */}
                {shouldShow(["toast", "notificacao", "sonner"]) && (
                    <section className="space-y-4">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Toasts</h2>
                            <p className="text-sm text-muted-foreground">Notificações temporárias com Sonner</p>
                        </div>

                        <Card>
                            <CardContent className="pt-4 sm:pt-6">
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                                    <Button variant="outline" onClick={() => toast.success("Operação realizada!")}>Success</Button>
                                    <Button variant="outline" onClick={() => toast.error("Erro ao processar")}>Error</Button>
                                    <Button variant="outline" onClick={() => toast.info("Informação importante")}>Info</Button>
                                    <Button variant="outline" onClick={() => toast.warning("Atenção!")}>Warning</Button>
                                </div>
                            </CardContent>
                        </Card>
                    </section>
                )}

                {/* Loading States */}
                {shouldShow(["skeleton", "spinner", "loading", "carregando"]) && (
                    <section className="space-y-4">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold tracking-tight flex items-center gap-2">
                                Estados de Carregamento
                            </h2>
                            <p className="text-sm text-muted-foreground">Skeletons e spinners</p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-base">Skeleton</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-full" />
                                        <Skeleton className="h-4 w-3/4" />
                                        <Skeleton className="h-4 w-1/2" />
                                    </div>
                                    <div className="flex items-center space-x-3">
                                        <Skeleton className="h-10 w-10 rounded-full" />
                                        <div className="space-y-2 flex-1">
                                            <Skeleton className="h-4 w-full" />
                                            <Skeleton className="h-4 w-2/3" />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-base">Spinner</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-center py-4">
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
                )}

                {/* Dialogs */}
                {shouldShow(["dialog", "modal", "alert", "confirmacao"]) && (
                    <section className="space-y-4">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Dialogs</h2>
                            <p className="text-sm text-muted-foreground">Modais e diálogos de confirmação</p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <Card>
                                <CardHeader className="pb-3">
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
                                                <DialogDescription>Este é um exemplo de dialog modal.</DialogDescription>
                                            </DialogHeader>
                                            <div className="py-4 space-y-2">
                                                <Label htmlFor="dialog-name">Nome</Label>
                                                <Input id="dialog-name" placeholder="Digite seu nome" />
                                            </div>
                                            <DialogFooter>
                                                <Button type="submit">Salvar</Button>
                                            </DialogFooter>
                                        </DialogContent>
                                    </Dialog>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-base">Alert Dialog</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive" className="w-full gap-2">
                                                <Trash2 className="h-4 w-4" />
                                                Excluir Item
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    Esta ação não pode ser desfeita.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => toast.success("Item excluído!")}>
                                                    Confirmar
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </CardContent>
                            </Card>
                        </div>
                    </section>
                )}

                {/* Panels (Sheet & Drawer) */}
                {shouldShow(["sheet", "drawer", "painel", "lateral"]) && (
                    <section className="space-y-4">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Painéis</h2>
                            <p className="text-sm text-muted-foreground">Sheets e drawers para conteúdo lateral/inferior</p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-base">Sheet (Lateral)</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Sheet>
                                        <SheetTrigger asChild>
                                            <Button variant="outline" className="w-full">Abrir Sheet</Button>
                                        </SheetTrigger>
                                        <SheetContent>
                                            <SheetHeader>
                                                <SheetTitle>Painel Lateral</SheetTitle>
                                                <SheetDescription>Conteúdo do sheet lateral.</SheetDescription>
                                            </SheetHeader>
                                            <div className="py-4">
                                                <p className="text-sm text-muted-foreground">
                                                    Use sheets para painéis de configuração ou filtros.
                                                </p>
                                            </div>
                                            <SheetFooter>
                                                <SheetClose asChild><Button variant="outline">Fechar</Button></SheetClose>
                                                <Button>Salvar</Button>
                                            </SheetFooter>
                                        </SheetContent>
                                    </Sheet>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-3">
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
                                                <DrawerDescription>Esta ação não pode ser desfeita.</DrawerDescription>
                                            </DrawerHeader>
                                            <DrawerFooter>
                                                <Button>Confirmar</Button>
                                                <DrawerClose asChild><Button variant="outline">Cancelar</Button></DrawerClose>
                                            </DrawerFooter>
                                        </DrawerContent>
                                    </Drawer>
                                </CardContent>
                            </Card>
                        </div>
                    </section>
                )}

                {/* Popovers & Menus */}
                {shouldShow(["dropdown", "menu", "tooltip", "hover", "popover", "command"]) && (
                    <section className="space-y-4">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Popovers e Menus</h2>
                            <p className="text-sm text-muted-foreground">Dropdowns, tooltips e hover cards</p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            <Card>
                                <CardHeader className="pb-3">
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
                                        <DropdownMenuContent className="w-48">
                                            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem><User className="mr-2 h-4 w-4" />Perfil</DropdownMenuItem>
                                            <DropdownMenuItem><Settings className="mr-2 h-4 w-4" />Configurações</DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem><LogOut className="mr-2 h-4 w-4" />Sair</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-base">Tooltip</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button variant="outline" className="w-full">Hover me</Button>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p>Este é um tooltip de ajuda</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-base">Hover Card</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <HoverCard>
                                        <HoverCardTrigger asChild>
                                            <Button variant="link" className="p-0 h-auto">@herval/react-core</Button>
                                        </HoverCardTrigger>
                                        <HoverCardContent className="w-72">
                                            <div className="flex gap-3">
                                                <Avatar><AvatarFallback>RC</AvatarFallback></Avatar>
                                                <div className="space-y-1">
                                                    <h4 className="text-sm font-semibold">@herval/react-core</h4>
                                                    <p className="text-xs text-muted-foreground">
                                                        Biblioteca de componentes React com shadcn/ui
                                                    </p>
                                                    <div className="flex items-center pt-1">
                                                        <CalendarIcon className="mr-1.5 h-3 w-3 opacity-70" />
                                                        <span className="text-xs text-muted-foreground">Dezembro 2025</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </HoverCardContent>
                                    </HoverCard>
                                </CardContent>
                            </Card>
                        </div>
                    </section>
                )}

                {/* Menus */}
                {shouldShow(["menubar", "navigation", "menu", "nav"]) && (
                    <section className="space-y-4">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Menus de Navegação</h2>
                            <p className="text-sm text-muted-foreground">Menubar e navigation menu</p>
                        </div>

                        <div className="grid gap-4 lg:grid-cols-2">
                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-base">Menubar</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <Menubar>
                                        <MenubarMenu>
                                            <MenubarTrigger>Arquivo</MenubarTrigger>
                                            <MenubarContent>
                                                <MenubarItem>Novo</MenubarItem>
                                                <MenubarItem>Abrir</MenubarItem>
                                                <MenubarSeparator />
                                                <MenubarItem>Salvar</MenubarItem>
                                            </MenubarContent>
                                        </MenubarMenu>
                                        <MenubarMenu>
                                            <MenubarTrigger>Editar</MenubarTrigger>
                                            <MenubarContent>
                                                <MenubarItem>Desfazer</MenubarItem>
                                                <MenubarItem>Refazer</MenubarItem>
                                                <MenubarSeparator />
                                                <MenubarItem>Copiar</MenubarItem>
                                                <MenubarItem>Colar</MenubarItem>
                                            </MenubarContent>
                                        </MenubarMenu>
                                    </Menubar>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader className="pb-3">
                                    <CardTitle className="text-base">Navigation Menu</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <NavigationMenu>
                                        <NavigationMenuList>
                                            <NavigationMenuItem>
                                                <NavigationMenuTrigger>Início</NavigationMenuTrigger>
                                                <NavigationMenuContent>
                                                    <ul className="grid gap-2 p-4 w-[400px] md:grid-cols-2">
                                                        <li className="row-span-3">
                                                            <NavigationMenuLink asChild>
                                                                <a className="flex h-full w-full select-none flex-col justify-center rounded-md bg-gradient-to-b from-muted/50 to-muted p-4 no-underline outline-none focus:shadow-md">
                                                                    <Rocket className="h-6 w-6" />
                                                                    <div className="mb-2 mt-3 text-base font-medium">@herval/react-core</div>
                                                                    <p className="text-xs leading-tight text-muted-foreground">
                                                                        Biblioteca de componentes React construída com shadcn/ui.
                                                                    </p>
                                                                </a>
                                                            </NavigationMenuLink>
                                                        </li>
                                                        <li>
                                                            <NavigationMenuLink asChild>
                                                                <a className="block p-2 rounded-md hover:bg-accent text-sm">
                                                                    <div className="flex items-center gap-2 font-medium">
                                                                        <FileText className="h-4 w-4" />
                                                                        Introdução
                                                                    </div>
                                                                    <p className="text-xs text-muted-foreground mt-1">Comece aqui com os conceitos básicos</p>
                                                                </a>
                                                            </NavigationMenuLink>
                                                        </li>
                                                        <li>
                                                            <NavigationMenuLink asChild>
                                                                <a className="block p-2 rounded-md hover:bg-accent text-sm">
                                                                    <div className="flex items-center gap-2 font-medium">
                                                                        <Download className="h-4 w-4" />
                                                                        Instalação
                                                                    </div>
                                                                    <p className="text-xs text-muted-foreground mt-1">Como configurar no seu projeto</p>
                                                                </a>
                                                            </NavigationMenuLink>
                                                        </li>
                                                        <li>
                                                            <NavigationMenuLink asChild>
                                                                <a className="block p-2 rounded-md hover:bg-accent text-sm">
                                                                    <div className="flex items-center gap-2 font-medium">
                                                                        <Zap className="h-4 w-4" />
                                                                        Início Rápido
                                                                    </div>
                                                                    <p className="text-xs text-muted-foreground mt-1">Crie seu primeiro componente</p>
                                                                </a>
                                                            </NavigationMenuLink>
                                                        </li>
                                                    </ul>
                                                </NavigationMenuContent>
                                            </NavigationMenuItem>

                                            <NavigationMenuItem>
                                                <NavigationMenuTrigger>Componentes</NavigationMenuTrigger>
                                                <NavigationMenuContent>
                                                    <ul className="grid gap-2 p-4 w-[350px] md:grid-cols-2">
                                                        <li>
                                                            <NavigationMenuLink asChild>
                                                                <a className="block p-2 rounded-md hover:bg-accent text-sm">
                                                                    <div className="font-medium">Buttons</div>
                                                                    <p className="text-xs text-muted-foreground">Botões e variações</p>
                                                                </a>
                                                            </NavigationMenuLink>
                                                        </li>
                                                        <li>
                                                            <NavigationMenuLink asChild>
                                                                <a className="block p-2 rounded-md hover:bg-accent text-sm">
                                                                    <div className="font-medium">Inputs</div>
                                                                    <p className="text-xs text-muted-foreground">Campos de formulário</p>
                                                                </a>
                                                            </NavigationMenuLink>
                                                        </li>
                                                        <li>
                                                            <NavigationMenuLink asChild>
                                                                <a className="block p-2 rounded-md hover:bg-accent text-sm">
                                                                    <div className="font-medium">Cards</div>
                                                                    <p className="text-xs text-muted-foreground">Containers de conteúdo</p>
                                                                </a>
                                                            </NavigationMenuLink>
                                                        </li>
                                                        <li>
                                                            <NavigationMenuLink asChild>
                                                                <a className="block p-2 rounded-md hover:bg-accent text-sm">
                                                                    <div className="font-medium">Dialogs</div>
                                                                    <p className="text-xs text-muted-foreground">Modais e overlays</p>
                                                                </a>
                                                            </NavigationMenuLink>
                                                        </li>
                                                    </ul>
                                                </NavigationMenuContent>
                                            </NavigationMenuItem>

                                            <NavigationMenuItem>
                                                <NavigationMenuTrigger>Recursos</NavigationMenuTrigger>
                                                <NavigationMenuContent>
                                                    <ul className="grid gap-2 p-4 w-[300px]">
                                                        <li>
                                                            <NavigationMenuLink asChild>
                                                                <a className="block p-2 rounded-md hover:bg-accent text-sm">
                                                                    <div className="flex items-center gap-2 font-medium">
                                                                        <Github className="h-4 w-4" />
                                                                        GitHub
                                                                    </div>
                                                                    <p className="text-xs text-muted-foreground mt-1">Código fonte e contribuições</p>
                                                                </a>
                                                            </NavigationMenuLink>
                                                        </li>
                                                        <li>
                                                            <NavigationMenuLink asChild>
                                                                <a className="block p-2 rounded-md hover:bg-accent text-sm">
                                                                    <div className="flex items-center gap-2 font-medium">
                                                                        <BookOpen className="h-4 w-4" />
                                                                        Documentação
                                                                    </div>
                                                                    <p className="text-xs text-muted-foreground mt-1">Guias completos e exemplos</p>
                                                                </a>
                                                            </NavigationMenuLink>
                                                        </li>
                                                        <li>
                                                            <NavigationMenuLink asChild>
                                                                <a className="block p-2 rounded-md hover:bg-accent text-sm">
                                                                    <div className="flex items-center gap-2 font-medium">
                                                                        <Code className="h-4 w-4" />
                                                                        API Reference
                                                                    </div>
                                                                    <p className="text-xs text-muted-foreground mt-1">Props e tipos detalhados</p>
                                                                </a>
                                                            </NavigationMenuLink>
                                                        </li>
                                                    </ul>
                                                </NavigationMenuContent>
                                            </NavigationMenuItem>
                                        </NavigationMenuList>
                                    </NavigationMenu>
                                </CardContent>
                            </Card>
                        </div>
                    </section>
                )}

                {/* Pagination */}
                {shouldShow(["pagination", "paginacao", "pagina"]) && (
                    <section className="space-y-4">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold tracking-tight">Paginação</h2>
                            <p className="text-sm text-muted-foreground">Navegação entre páginas de conteúdo</p>
                        </div>

                        <Card>
                            <CardContent className="pt-4 sm:pt-6">
                                <Pagination>
                                    <PaginationContent>
                                        <PaginationItem>
                                            <PaginationPrevious href="#" size="default" />
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink href="#" size="icon">1</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink href="#" size="icon" isActive>2</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationLink href="#" size="icon">3</PaginationLink>
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                        <PaginationItem>
                                            <PaginationNext href="#" size="default" />
                                        </PaginationItem>
                                    </PaginationContent>
                                </Pagination>
                            </CardContent>
                        </Card>
                    </section>
                )}

                {/* Best Practices */}
                <Card className="border-primary/20 bg-primary/5">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base">💡 Boas Práticas</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-1.5 text-sm">
                        <p>✅ Importe componentes de <code className="bg-muted px-1 rounded text-xs">@herval/react-core</code></p>
                        <p>✅ Use tokens de cor (bg-primary, text-foreground)</p>
                        <p>✅ Teste em light e dark mode</p>
                    </CardContent>
                </Card>
            </div>
        </TooltipProvider>
    )
}
