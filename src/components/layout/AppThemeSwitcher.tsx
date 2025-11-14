import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/themes"
import { Switch } from "@/components/ui/_final/switch"

export function ThemeSwitcher() {
  const { theme, toggleMode } = useTheme()

  return (
    <div className="flex items-center gap-3 px-3 py-2 rounded-lg border border-border bg-card hover:bg-accent transition-all duration-200">
      <Sun className="h-4 w-4 text-muted-foreground" />
      <Switch
        checked={theme.mode === "dark"}
        onCheckedChange={toggleMode}
        aria-label="Toggle dark mode"
      />
      <Moon className="h-4 w-4 text-muted-foreground" />
    </div>
  )
}
