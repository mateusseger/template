import type { LucideIcon } from "lucide-react"

export interface SecaoItem {
    id: string
    label: string
    icon: LucideIcon
}

export interface ItemDetailLayoutProps {
    secoes: SecaoItem[]
    tituloVoltar: string
    rotaVoltar: string
    tituloItem: string
    rodape?: React.ReactNode
    children?: React.ReactNode
}
