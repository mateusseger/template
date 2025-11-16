import type { Theme } from "./types"

export type ThemeName = "herval" | "taqi" | "iplace"

export const THEMES: Record<ThemeName, Theme> = {
    herval: {
        light: {
            // Base - Neutro clean e minimalista
            background: "#ffffff",
            foreground: "#0a0a0a",
            card: "#ffffff",
            "card-foreground": "#0a0a0a",
            popover: "#ffffff",
            "popover-foreground": "#0a0a0a",

            // Primary - Vermelho Herval (mantido)
            primary: "#e10000",
            "primary-foreground": "#ffffff",

            // Secondary - Cinza neutro moderno
            secondary: "#f5f5f5",
            "secondary-foreground": "#0a0a0a",

            // Muted - Tons sutis e discretos
            muted: "#fafafa",
            "muted-foreground": "#737373",

            // Accent - Destaque sutil
            accent: "#fafafa",
            "accent-foreground": "#0a0a0a",

            // Destructive - Vermelho de erro limpo
            destructive: "#ef4444",
            "destructive-foreground": "#ffffff",

            // Borders & Inputs - Clean e discretos
            border: "#e5e5e5",
            input: "#e5e5e5",
            ring: "#e10000",

            // Sidebar - Minimalista
            sidebar: "#ffffff",
            "sidebar-foreground": "#0a0a0a",
            "sidebar-primary": "#e10000",
            "sidebar-primary-foreground": "#ffffff",
            "sidebar-accent": "#f5f5f5",
            "sidebar-accent-foreground": "#0a0a0a",
            "sidebar-border": "#e5e5e5",
            "sidebar-ring": "#e10000",
        },
        dark: {
            // Base - Escuro profundo tech
            background: "#0a0a0a",
            foreground: "#fafafa",
            card: "#121212",
            "card-foreground": "#fafafa",
            popover: "#121212",
            "popover-foreground": "#fafafa",

            // Primary - Vermelho vibrante no dark
            primary: "#e10000",
            "primary-foreground": "#ffffff",

            // Secondary - Cinza escuro sofisticado
            secondary: "#1a1a1a",
            "secondary-foreground": "#fafafa",

            // Muted - Tons escuros clean
            muted: "#171717",
            "muted-foreground": "#a3a3a3",

            // Accent - Destaque minimalista dark
            accent: "#1a1a1a",
            "accent-foreground": "#fafafa",

            // Destructive - Vermelho dark equilibrado
            destructive: "#dc2626",
            "destructive-foreground": "#fafafa",

            // Borders & Inputs - Sutis tecnológicos
            border: "#262626",
            input: "#262626",
            ring: "#e10000",

            // Sidebar - Escuro tech refinado
            sidebar: "#121212",
            "sidebar-foreground": "#fafafa",
            "sidebar-primary": "#e10000",
            "sidebar-primary-foreground": "#ffffff",
            "sidebar-accent": "#1a1a1a",
            "sidebar-accent-foreground": "#fafafa",
            "sidebar-border": "#262626",
            "sidebar-ring": "#e10000",
        },
    },
    taqi: {
        light: {
            // Base - Neutro clean e moderno
            background: "#ffffff",
            foreground: "#0a0a0a",
            card: "#ffffff",
            "card-foreground": "#0a0a0a",
            popover: "#ffffff",
            "popover-foreground": "#0a0a0a",

            // Primary - Laranja Taqi (mantido)
            primary: "#eb5c2e",
            "primary-foreground": "#ffffff",

            // Secondary - Cinza neutro tech
            secondary: "#f5f5f5",
            "secondary-foreground": "#0a0a0a",

            // Muted - Tons minimalistas
            muted: "#fafafa",
            "muted-foreground": "#737373",

            // Accent - Destaque sutil
            accent: "#fafafa",
            "accent-foreground": "#0a0a0a",

            // Destructive - Vermelho limpo
            destructive: "#ef4444",
            "destructive-foreground": "#ffffff",

            // Borders & Inputs - Clean e discretos
            border: "#e5e5e5",
            input: "#e5e5e5",
            ring: "#eb5c2e",

            // Sidebar - Minimalista tech
            sidebar: "#ffffff",
            "sidebar-foreground": "#0a0a0a",
            "sidebar-primary": "#eb5c2e",
            "sidebar-primary-foreground": "#ffffff",
            "sidebar-accent": "#f5f5f5",
            "sidebar-accent-foreground": "#0a0a0a",
            "sidebar-border": "#e5e5e5",
            "sidebar-ring": "#eb5c2e",
        },
        dark: {
            // Base - Escuro profundo tech
            background: "#0a0a0a",
            foreground: "#fafafa",
            card: "#121212",
            "card-foreground": "#fafafa",
            popover: "#121212",
            "popover-foreground": "#fafafa",

            // Primary - Laranja vibrante no dark
            primary: "#eb5c2e",
            "primary-foreground": "#ffffff",

            // Secondary - Cinza escuro sofisticado
            secondary: "#1a1a1a",
            "secondary-foreground": "#fafafa",

            // Muted - Tons escuros clean
            muted: "#171717",
            "muted-foreground": "#a3a3a3",

            // Accent - Destaque minimalista dark
            accent: "#1a1a1a",
            "accent-foreground": "#fafafa",

            // Destructive - Vermelho dark equilibrado
            destructive: "#dc2626",
            "destructive-foreground": "#fafafa",

            // Borders & Inputs - Sutis tecnológicos
            border: "#262626",
            input: "#262626",
            ring: "#eb5c2e",

            // Sidebar - Escuro tech refinado
            sidebar: "#121212",
            "sidebar-foreground": "#fafafa",
            "sidebar-primary": "#eb5c2e",
            "sidebar-primary-foreground": "#ffffff",
            "sidebar-accent": "#1a1a1a",
            "sidebar-accent-foreground": "#fafafa",
            "sidebar-border": "#262626",
            "sidebar-ring": "#eb5c2e",
        },
    },
    iplace: {
        light: {
            // Base - Neutro clean e moderno
            background: "#ffffff",
            foreground: "#0a0a0a",
            card: "#ffffff",
            "card-foreground": "#0a0a0a",
            popover: "#ffffff",
            "popover-foreground": "#0a0a0a",

            // Primary - Verde-limão iPlace (mantido)
            primary: "#c6d30d",
            "primary-foreground": "#0a0a0a",

            // Secondary - Cinza neutro tech
            secondary: "#f5f5f5",
            "secondary-foreground": "#0a0a0a",

            // Muted - Tons minimalistas
            muted: "#fafafa",
            "muted-foreground": "#737373",

            // Accent - Destaque sutil
            accent: "#fafafa",
            "accent-foreground": "#0a0a0a",

            // Destructive - Vermelho limpo
            destructive: "#ef4444",
            "destructive-foreground": "#ffffff",

            // Borders & Inputs - Clean e discretos
            border: "#e5e5e5",
            input: "#e5e5e5",
            ring: "#c6d30d",

            // Sidebar - Minimalista tech
            sidebar: "#ffffff",
            "sidebar-foreground": "#0a0a0a",
            "sidebar-primary": "#c6d30d",
            "sidebar-primary-foreground": "#0a0a0a",
            "sidebar-accent": "#f5f5f5",
            "sidebar-accent-foreground": "#0a0a0a",
            "sidebar-border": "#e5e5e5",
            "sidebar-ring": "#c6d30d",
        },
        dark: {
            // Base - Escuro profundo tech
            background: "#0a0a0a",
            foreground: "#fafafa",
            card: "#121212",
            "card-foreground": "#fafafa",
            popover: "#121212",
            "popover-foreground": "#fafafa",

            // Primary - Limão vibrante no dark
            primary: "#c6d30d",
            "primary-foreground": "#0a0a0a",

            // Secondary - Cinza escuro sofisticado
            secondary: "#1a1a1a",
            "secondary-foreground": "#fafafa",

            // Muted - Tons escuros clean
            muted: "#171717",
            "muted-foreground": "#a3a3a3",

            // Accent - Destaque minimalista dark
            accent: "#1a1a1a",
            "accent-foreground": "#fafafa",

            // Destructive - Vermelho dark equilibrado
            destructive: "#dc2626",
            "destructive-foreground": "#fafafa",

            // Borders & Inputs - Sutis tecnológicos
            border: "#262626",
            input: "#262626",
            ring: "#c6d30d",

            // Sidebar - Escuro tech refinado
            sidebar: "#121212",
            "sidebar-foreground": "#fafafa",
            "sidebar-primary": "#c6d30d",
            "sidebar-primary-foreground": "#0a0a0a",
            "sidebar-accent": "#1a1a1a",
            "sidebar-accent-foreground": "#fafafa",
            "sidebar-border": "#262626",
            "sidebar-ring": "#c6d30d",
        },
    },
}

export const THEME_METADATA: Record<ThemeName, {
    name: string
    description: string
    characteristics: string[]
}> = {
    herval: {
        name: "Herval",
        description: "Clean e minimalista com destaque corporativo",
        characteristics: ["Minimalista", "Corporativo", "Elegante"],
    },
    taqi: {
        name: "Taqi",
        description: "Neutro e moderno com toque energético",
        characteristics: ["Clean", "Moderno", "Sofisticado"],
    },
    iplace: {
        name: "iPlace",
        description: "Design tech com contraste vibrante",
        characteristics: ["Tech", "Vibrante", "Contemporâneo"],
    },
}


export function getTheme(name: ThemeName): Theme {
    return THEMES[name]
}

export function getThemePrimaryColor(name: ThemeName): string {
    return THEMES[name].light.primary
}
