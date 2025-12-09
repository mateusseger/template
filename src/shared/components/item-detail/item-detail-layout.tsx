import { Outlet, useLocation, useNavigate } from "react-router-dom"
import { ArrowLeft, Menu } from "lucide-react"
import { useState, useMemo } from "react"
import {
    Button,
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@herval/react-core"
import { ItemDetailNav } from "./item-detail-nav"
import type { ItemDetailLayoutProps } from "./types"

export function ItemDetailLayout({
    secoes,
    tituloVoltar,
    rotaVoltar,
    children,
}: ItemDetailLayoutProps) {
    const [sheetAberto, setSheetAberto] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()

    const secaoAtiva = useMemo(() => {
        return secoes.find(s => location.pathname.endsWith(`/${s.id}`))?.id || secoes[0]?.id
    }, [secoes, location.pathname])

    const secaoAtivaObj = useMemo(() => {
        return secoes.find(s => s.id === secaoAtiva)
    }, [secoes, secaoAtiva])

    const handleNavegar = (id: string) => {
        const basePath = location.pathname.split('/').slice(0, -1).join('/')
        navigate(`${basePath}/${id}`)
        setSheetAberto(false)
    }

    return (
        <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between lg:hidden">
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
                <aside className="hidden lg:block shrink-0 w-56">
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

                <div className="flex-1 min-w-0">
                    {children}

                    {secaoAtivaObj && (
                        <div className="flex items-center gap-2 mb-4">
                            <secaoAtivaObj.icon className="h-5 w-5 text-muted-foreground" />
                            <h2 className="text-xl font-semibold">{secaoAtivaObj.label}</h2>
                        </div>
                    )}

                    <Outlet />
                </div>
            </div>
        </div>
    )
}
