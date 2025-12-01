import type { LucideIcon } from "lucide-react"

interface PageHeaderProps {
    icon: LucideIcon
    iconClassName?: string
    title: string
    description: string
}

export function PageHeader({ icon: Icon, iconClassName = "text-primary", title, description }: PageHeaderProps) {
    // Extrai a cor base do iconClassName para aplicar no background
    const bgClassName = iconClassName.replace("text-", "bg-").replace(/\/\d+$/, "") + "/10"

    return (
        <div className="mb-12">
            <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-lg ${bgClassName} flex items-center justify-center`}>
                    <Icon className={`h-5 w-5 ${iconClassName}`} />
                </div>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">{title}</h1>
                    <p className="text-muted-foreground">{description}</p>
                </div>
            </div>
        </div>
    )
}
