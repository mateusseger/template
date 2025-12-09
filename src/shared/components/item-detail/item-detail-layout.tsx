import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { ArrowLeft, Menu } from "lucide-react"
import { useState, useMemo } from "react"
import {
    Button,
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    useMobile,
} from "@herval/react-core"
import { ItemDetailNav } from "./item-detail-nav"
import { PageHeader } from "../page-header"
import type { ItemDetailLayoutProps } from "./types"

export function ItemDetailLayout({
    secoes,
    tituloVoltar,
    rotaVoltar,
    tituloItem,
    rodape,
    children,
}: ItemDetailLayoutProps) {
    const [sheetAberto, setSheetAberto] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const isMobile = useMobile()

    // Pega o último segmento da URL e verifica se é uma seção válida
    const secaoAtiva = useMemo(() => {
        const segments = location.pathname.split('/').filter(Boolean)
        const lastSegment = segments[segments.length - 1]
        const secaoEncontrada = secoes.find(s => s.id === lastSegment)
        return secaoEncontrada?.id || secoes[0]?.id
    }, [secoes, location.pathname])

    const secaoAtivaObj = useMemo(() => {
        return secoes.find(s => s.id === secaoAtiva)
    }, [secoes, secaoAtiva])

    const handleNavegar = (id: string) => {
        navigate(id, { replace: true })
        setSheetAberto(false)
    }

    return (
        <div className="space-y-4 sm:space-y-6">
            {/* Header mobile - só aparece em mobile */}
            {isMobile && (
                <div className="flex items-center justify-between">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate(rotaVoltar)}
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        {tituloVoltar}
                    </Button>

                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setSheetAberto(true)}
                    >
                        <Menu className="h-4 w-4" />
                    </Button>
                </div>
            )}

            {/* Sheet mobile */}
            <Sheet open={sheetAberto} onOpenChange={setSheetAberto}>
                <SheetContent side="right" className="w-72 p-0">
                    <SheetHeader className="p-4 border-b">
                        <SheetTitle>Seções</SheetTitle>
                    </SheetHeader>
                    <div className="p-4">
                        <ItemDetailNav
                            secoes={secoes}
                            secaoAtiva={secaoAtiva}
                            onNavegar={handleNavegar}
                        />
                    </div>
                </SheetContent>
            </Sheet>

            <div className="flex gap-6">
                {/* Sidebar desktop - só aparece em desktop */}
                {!isMobile && (
                    <aside className="flex flex-col shrink-0 w-56">
                        <div className="sticky top-20 space-y-4">
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => navigate(rotaVoltar)}
                                className="w-full justify-start"
                            >
                                <ArrowLeft className="h-4 w-4 mr-2" />
                                {tituloVoltar}
                            </Button>

                            <div className="border rounded-lg p-3">
                                <h3 className="text-xs font-semibold text-muted-foreground mb-3 px-2">
                                    Seções
                                </h3>
                                <ItemDetailNav
                                    secoes={secoes}
                                    secaoAtiva={secaoAtiva}
                                    onNavegar={handleNavegar}
                                />
                            </div>
                        </div>
                    </aside>
                )}

                <div className="flex-1 min-w-0">
                    <div className="space-y-6">
                        {/* Header da seção usando PageHeader */}
                        {secaoAtivaObj && (
                            <PageHeader
                                icon={secaoAtivaObj.icon}
                                title={secaoAtivaObj.label}
                                description={tituloItem}
                            />
                        )}

                        {children}

                        <Outlet />

                        {/* Rodapé */}
                        {rodape && (
                            <div className="mt-8 pt-4 border-t text-sm text-muted-foreground">
                                {rodape}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
