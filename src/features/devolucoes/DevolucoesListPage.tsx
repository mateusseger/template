// filepath: src/features/devolucoes/DevolucoesListPage.tsx
import { Link } from "react-router-dom"
import { Search, Filter, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

/**
 * DevolucoesListPage - Página de listagem de devoluções
 *
 * Funcionalidades:
 * - Filtros de pesquisa (ID, status, data)
 * - Tabela com devoluções
 * - Links para páginas de detalhe
 */

const mockDevolucoes = [
    {
        id: "1234",
        cliente: "João Silva",
        valor: 1250.00,
        status: "Pendente",
        data: "15/11/2024",
        itens: 3,
    },
    {
        id: "1235",
        cliente: "Maria Santos",
        valor: 850.50,
        status: "Aprovada",
        data: "14/11/2024",
        itens: 2,
    },
    {
        id: "1236",
        cliente: "Pedro Oliveira",
        valor: 2100.00,
        status: "Em Análise",
        data: "13/11/2024",
        itens: 5,
    },
    {
        id: "1237",
        cliente: "Ana Costa",
        valor: 450.00,
        status: "Rejeitada",
        data: "12/11/2024",
        itens: 1,
    },
]

const statusColors = {
    "Pendente": "default",
    "Aprovada": "default",
    "Em Análise": "secondary",
    "Rejeitada": "destructive",
} as const

export function DevolucoesListPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Devoluções</h1>
                    <p className="text-muted-foreground mt-1">
                        Gerencie as solicitações de devolução de produtos
                    </p>
                </div>
                <Button>
                    Nova Devolução
                </Button>
            </div>

            {/* Filtros */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Filter className="h-5 w-5" />
                        Filtros
                    </CardTitle>
                    <CardDescription>
                        Refine sua busca usando os filtros abaixo
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-3">
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Buscar por ID ou Cliente
                            </label>
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="DEV-1234 ou nome do cliente"
                                    className="pl-8"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium flex items-center gap-1.5">
                                <Calendar className="h-4 w-4" />
                                Período
                            </label>
                            <Input type="date" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Status
                            </label>
                            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background">
                                <option value="">Todos</option>
                                <option value="pendente">Pendente</option>
                                <option value="aprovada">Aprovada</option>
                                <option value="analise">Em Análise</option>
                                <option value="rejeitada">Rejeitada</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                        <Button>
                            <Search className="h-4 w-4 mr-2" />
                            Buscar
                        </Button>
                        <Button variant="outline">
                            Limpar Filtros
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Tabela */}
            <Card>
                <CardHeader>
                    <CardTitle>Devoluções Recentes</CardTitle>
                    <CardDescription>
                        Lista das últimas solicitações de devolução
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>ID</TableHead>
                                <TableHead>Cliente</TableHead>
                                <TableHead>Data</TableHead>
                                <TableHead>Itens</TableHead>
                                <TableHead className="text-right">Valor</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Ações</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {mockDevolucoes.map((devolucao) => (
                                <TableRow key={devolucao.id}>
                                    <TableCell className="font-medium">
                                        DEV-{devolucao.id}
                                    </TableCell>
                                    <TableCell>{devolucao.cliente}</TableCell>
                                    <TableCell>{devolucao.data}</TableCell>
                                    <TableCell>{devolucao.itens}</TableCell>
                                    <TableCell className="text-right font-medium">
                                        R$ {devolucao.valor.toFixed(2)}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={statusColors[devolucao.status as keyof typeof statusColors]}>
                                            {devolucao.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Link to={`/devolucoes/${devolucao.id}`}>
                                            <Button variant="ghost" size="sm">
                                                Ver Detalhes
                                            </Button>
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}
