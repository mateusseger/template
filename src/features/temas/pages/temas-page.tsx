import { Sun, Moon, Check, Palette, Code, Monitor, Smartphone, Sparkles, Layers } from "lucide-react"
import { motion } from "framer-motion"
import {
    Badge,
    Switch,
    Label,
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
    Button,
    Separator,
    useTheme,
    logos,
    THEMES,
    type ThemeName
} from "@herval/react-core"
import { PageHeader } from "@/shared/components"

export function TemasPage() {
    const { theme, setThemeName, setThemeMode } = useTheme()

    const handleThemeChange = (themeId: ThemeName) => {
        setThemeName(themeId)
    }

    const handleModeToggle = () => {
        setThemeMode(theme.mode === "light" ? "dark" : "light")
    }

    // Mapeamento de logos por tema
    const themeLogos: Record<ThemeName, { light: string; dark: string }> = {
        herval: logos.herval,
        taqi: logos.taqi,
        iplace: logos.iplace
    }

    const currentTheme = THEMES.find((t) => t.id === theme.name)

    return (
        <div className="space-y-8">
            <PageHeader
                icon={Layers}
                iconClassName="text-primary"
                title="Temas"
                description="Personalize a aparência da aplicação"
            />

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Tema Ativo</p>
                                <p className="text-2xl font-bold mt-1 capitalize">{currentTheme?.name}</p>
                            </div>
                            <div className="h-12 w-12 rounded-full flex items-center justify-center" style={{ backgroundColor: currentTheme?.primary }}>
                                <Sparkles className="h-6 w-6 text-white" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Modo</p>
                                <p className="text-2xl font-bold mt-1">{theme.mode === "dark" ? "Escuro" : "Claro"}</p>
                            </div>
                            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                                {theme.mode === "dark" ? (
                                    <Moon className="h-6 w-6 text-primary" />
                                ) : (
                                    <Sun className="h-6 w-6 text-primary" />
                                )}
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Disponíveis</p>
                                <p className="text-2xl font-bold mt-1">{THEMES.length} temas</p>
                            </div>
                            <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                                <Palette className="h-6 w-6 text-muted-foreground" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Aparência */}
            <Card>
                <CardHeader>
                    <CardTitle>Aparência</CardTitle>
                    <CardDescription>
                        Escolha o tema e modo de cor
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Dark Mode Toggle */}
                    <div className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                                {theme.mode === "dark" ? (
                                    <Moon className="h-5 w-5 text-primary" />
                                ) : (
                                    <Sun className="h-5 w-5 text-primary" />
                                )}
                            </div>
                            <div>
                                <Label htmlFor="dark-mode" className="text-base font-medium cursor-pointer">
                                    Modo Escuro
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                    {theme.mode === "dark"
                                        ? "Tema escuro ativado"
                                        : "Clique para ativar o tema escuro"}
                                </p>
                            </div>
                        </div>
                        <Switch
                            id="dark-mode"
                            checked={theme.mode === "dark"}
                            onCheckedChange={handleModeToggle}
                        />
                    </div>

                    <Separator />

                    {/* Theme Selector */}
                    <div>
                        <Label className="text-base font-medium mb-4 block">
                            Tema de Cores
                        </Label>
                        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                            {THEMES.map((themeOption) => (
                                <motion.button
                                    key={themeOption.id}
                                    onClick={() => handleThemeChange(themeOption.id)}
                                    className={`relative p-5 rounded-xl border-2 transition-all text-left ${theme.name === themeOption.id
                                        ? "border-primary bg-primary/5 shadow-md"
                                        : "border-border hover:border-primary/50 hover:bg-accent/50"
                                        }`}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {/* Indicator */}
                                    {theme.name === themeOption.id && (
                                        <div className="absolute top-3 right-3">
                                            <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center">
                                                <Check className="h-4 w-4 text-primary-foreground" />
                                            </div>
                                        </div>
                                    )}

                                    {/* Logo */}
                                    <div className="mb-4">
                                        <img
                                            src={themeLogos[themeOption.id][theme.mode]}
                                            alt={themeOption.name}
                                            className="h-8 w-auto object-contain"
                                        />
                                    </div>

                                    {/* Name and Badge */}
                                    <div className="flex items-center gap-2 mb-3">
                                        <p className="text-lg font-bold">{themeOption.name}</p>
                                        {theme.name === themeOption.id && (
                                            <Badge variant="default" className="text-xs">Ativo</Badge>
                                        )}
                                    </div>

                                    {/* Color Preview */}
                                    <div className="flex gap-2">
                                        <div
                                            className="h-10 flex-1 rounded-lg border shadow-sm"
                                            style={{ backgroundColor: themeOption.primary }}
                                            title="Primary Color"
                                        />
                                        <div className="h-10 w-10 rounded-lg border bg-background shadow-sm" title="Background" />
                                        <div className="h-10 w-10 rounded-lg border bg-muted shadow-sm" title="Muted" />
                                    </div>

                                    {/* Hex Code */}
                                    <p className="text-xs text-muted-foreground mt-3 font-mono">
                                        Primary: {themeOption.primary}
                                    </p>
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Info */}
                    <div className="p-4 rounded-lg bg-muted/50 border">
                        <p className="text-sm text-muted-foreground">
                            💡 <strong>Dica:</strong> As preferências são salvas automaticamente no navegador
                            e permanecerão ativas mesmo após fechar a aplicação.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* Preview */}
            <Card>
                <CardHeader>
                    <CardTitle>Preview</CardTitle>
                    <CardDescription>
                        Visualize como os elementos aparecem com o tema atual
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        {/* Desktop Preview */}
                        <div className="p-4 rounded-lg border bg-card">
                            <div className="flex items-center gap-2 mb-4">
                                <Monitor className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">Desktop</span>
                            </div>
                            <div className="space-y-3">
                                <div className="flex gap-2">
                                    <Button size="sm">Primary</Button>
                                    <Button size="sm" variant="secondary">Secondary</Button>
                                    <Button size="sm" variant="outline">Outline</Button>
                                </div>
                                <div className="flex gap-2">
                                    <Badge>Badge</Badge>
                                    <Badge variant="secondary">Secondary</Badge>
                                    <Badge variant="outline">Outline</Badge>
                                </div>
                            </div>
                        </div>

                        {/* Mobile Preview */}
                        <div className="p-4 rounded-lg border bg-card">
                            <div className="flex items-center gap-2 mb-4">
                                <Smartphone className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">Mobile</span>
                            </div>
                            <div className="max-w-[200px] mx-auto space-y-2">
                                <Button className="w-full" size="sm">Ação Principal</Button>
                                <Button className="w-full" size="sm" variant="outline">Ação Secundária</Button>
                            </div>
                        </div>
                    </div>

                    {/* Color Tokens */}
                    <div>
                        <h4 className="text-sm font-medium mb-3">Tokens de Cor</h4>
                        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                            {[
                                { name: "Primary", class: "bg-primary" },
                                { name: "Secondary", class: "bg-secondary" },
                                { name: "Accent", class: "bg-accent" },
                                { name: "Muted", class: "bg-muted" },
                                { name: "Card", class: "bg-card border" },
                                { name: "Background", class: "bg-background border" },
                                { name: "Destructive", class: "bg-destructive" },
                                { name: "Border", class: "border-2 border-border" },
                            ].map((color) => (
                                <div key={color.name} className="text-center">
                                    <div className={`h-10 rounded-lg ${color.class} mb-1`} />
                                    <span className="text-xs text-muted-foreground">{color.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Developer Guide */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Code className="h-5 w-5" />
                        Guia para Desenvolvedores
                    </CardTitle>
                    <CardDescription>
                        Como adicionar um novo tema ao @herval/react-core
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <ol className="space-y-4">
                        <li className="flex gap-4">
                            <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0 text-sm">
                                1
                            </div>
                            <div>
                                <p className="font-medium">Adicione no config</p>
                                <code className="text-xs text-muted-foreground block mt-1 bg-muted px-2 py-1 rounded">
                                    react-core/src/features/themes/config/themes-config.ts
                                </code>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0 text-sm">
                                2
                            </div>
                            <div>
                                <p className="font-medium">Adicione as variáveis CSS</p>
                                <code className="text-xs text-muted-foreground block mt-1 bg-muted px-2 py-1 rounded">
                                    react-core/src/features/themes/styles/themes.css
                                </code>
                            </div>
                        </li>
                        <li className="flex gap-4">
                            <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold shrink-0 text-sm">
                                3
                            </div>
                            <div>
                                <p className="font-medium">Adicione os logos (opcional)</p>
                                <code className="text-xs text-muted-foreground block mt-1 bg-muted px-2 py-1 rounded">
                                    react-core/src/shared/assets/logos/[tema]-light.svg
                                </code>
                            </div>
                        </li>
                    </ol>

                    <Separator className="my-6" />

                    <div className="p-4 rounded-lg bg-muted/50">
                        <h4 className="font-medium mb-2">Exemplo de uso no código:</h4>
                        <pre className="text-xs font-mono bg-background p-3 rounded overflow-x-auto">
                            {`import { useTheme } from "@herval/react-core"

function MyComponent() {
  const { theme, setThemeName, toggleMode } = useTheme()

  return (
    <>
      <p>Tema: {theme.name}</p>
      <p>Modo: {theme.mode}</p>
      <button onClick={() => setThemeName("taqi")}>
        Mudar para Taqi
      </button>
      <button onClick={toggleMode}>
        Toggle Dark Mode
      </button>
    </>
  )
}`}
                        </pre>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
