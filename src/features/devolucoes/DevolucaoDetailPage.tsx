// filepath: src/features/devolucoes/DevolucaoDetailPage.tsx
import { useParams, Link } from "react-router-dom"
import {
    Info,
    Package,
    History,
    Paperclip,
    ArrowLeft,
    User,
    Calendar,
    DollarSign,
    MapPin,
    Phone,
    Mail,
    CheckCircle,
    XCircle,
    Clock
} from "lucide-react"
import { Section } from "@/components/layout/detail-sections/Section"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

/**
 * DevolucaoDetailPage - Página de detalhes de uma devolução
 *
 * Demonstra o uso do sistema de seções com:
 * - Dados Gerais: informações principais da devolução
 * - Itens: lista de produtos devolvidos
 * - Histórico: linha do tempo de eventos
 * - Anexos: documentos e imagens relacionados
 */

const mockDevolucao = {
    id: "1234",
    cliente: "João Silva",
    email: "joao.silva@email.com",
    telefone: "(11) 98765-4321",
    endereco: "Rua das Flores, 123 - São Paulo, SP",
    valor: 1250.00,
    status: "Pendente",
    data: "15/11/2024",
    motivo: "Produto com defeito",
    observacao: "Cliente relatou que o produto apresentou defeito após 2 dias de uso. Solicita troca ou reembolso total.",
    itens: [
        { codigo: "PROD-001", nome: "Notebook Dell Inspiron", quantidade: 1, valor: 3500.00, motivo: "Defeito" },
        { codigo: "PROD-045", nome: "Mouse Logitech MX Master", quantidade: 1, valor: 450.00, motivo: "Arrependimento" },
        { codigo: "PROD-078", nome: "Teclado Mecânico RGB", quantidade: 1, valor: 650.00, motivo: "Defeito" },
    ],
    historico: [
        { data: "15/11/2024 14:30", usuario: "João Silva", evento: "Solicitação criada", tipo: "info" },
        { data: "15/11/2024 15:45", usuario: "Sistema", evento: "Documentos recebidos", tipo: "success" },
        { data: "15/11/2024 16:20", usuario: "Ana Costa", evento: "Em análise pela equipe", tipo: "info" },
    ],
    anexos: [
        { nome: "nota_fiscal.pdf", tamanho: "245 KB", data: "15/11/2024" },
        { nome: "foto_defeito_1.jpg", tamanho: "1.2 MB", data: "15/11/2024" },
        { nome: "foto_defeito_2.jpg", tamanho: "980 KB", data: "15/11/2024" },
    ]
}

export function DevolucaoDetailPage() {
    const { id } = useParams()

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link to="/devolucoes">
                        <Button variant="ghost" size="icon">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                    </Link>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">
                            Devolução DEV-{id}
                        </h1>
                        <p className="text-muted-foreground mt-1">
                            Solicitada em {mockDevolucao.data}
                        </p>
                    </div>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline">
                        <XCircle className="h-4 w-4 mr-2" />
                        Rejeitar
                    </Button>
                    <Button>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Aprovar
                    </Button>
                </div>
            </div>

            {/* Seção: Dados Gerais */}
            <Section id="dados-gerais" label="Dados Gerais" icon={Info}>
                <Section.Header id="dados-gerais" label="Dados Gerais" icon={Info} />

                <div className="grid gap-6 md:grid-cols-2">
                    {/* Informações da Devolução */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Informações da Devolução</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Status</span>
                                <Badge>{mockDevolucao.status}</Badge>
                            </div>
                            <Separator />
                            <div className="flex justify-between items-start">
                                <span className="text-sm text-muted-foreground">Motivo</span>
                                <span className="text-sm font-medium text-right">{mockDevolucao.motivo}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between items-start">
                                <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                                    <DollarSign className="h-4 w-4" />
                                    Valor Total
                                </span>
                                <span className="text-lg font-bold">
                                    R$ {mockDevolucao.valor.toFixed(2)}
                                </span>
                            </div>
                            <Separator />
                            <div className="flex justify-between items-start">
                                <span className="text-sm text-muted-foreground flex items-center gap-1.5">
                                    <Calendar className="h-4 w-4" />
                                    Data
                                </span>
                                <span className="text-sm font-medium">{mockDevolucao.data}</span>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Dados do Cliente */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg flex items-center gap-2">
                                <User className="h-5 w-5" />
                                Dados do Cliente
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <span className="text-sm text-muted-foreground">Nome</span>
                                <p className="font-medium">{mockDevolucao.cliente}</p>
                            </div>
                            <Separator />
                            <div className="flex items-start gap-2">
                                <Mail className="h-4 w-4 text-muted-foreground mt-0.5" />
                                <div className="flex-1">
                                    <span className="text-sm text-muted-foreground block">Email</span>
                                    <p className="text-sm">{mockDevolucao.email}</p>
                                </div>
                            </div>
                            <Separator />
                            <div className="flex items-start gap-2">
                                <Phone className="h-4 w-4 text-muted-foreground mt-0.5" />
                                <div className="flex-1">
                                    <span className="text-sm text-muted-foreground block">Telefone</span>
                                    <p className="text-sm">{mockDevolucao.telefone}</p>
                                </div>
                            </div>
                            <Separator />
                            <div className="flex items-start gap-2">
                                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                                <div className="flex-1">
                                    <span className="text-sm text-muted-foreground block">Endereço</span>
                                    <p className="text-sm">{mockDevolucao.endereco}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Observações */}
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle className="text-lg">Observações</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {mockDevolucao.observacao}
                        </p>
                    </CardContent>
                </Card>
            </Section>

            {/* Seção: Itens */}
            <Section id="itens" label="Itens" icon={Package}>
                <Section.Header id="itens" label="Itens" icon={Package} />

                <Card>
                    <CardHeader>
                        <CardTitle>Produtos da Devolução</CardTitle>
                        <CardDescription>
                            Lista de {mockDevolucao.itens.length} itens solicitados para devolução
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Código</TableHead>
                                    <TableHead>Produto</TableHead>
                                    <TableHead className="text-center">Quantidade</TableHead>
                                    <TableHead className="text-right">Valor Unitário</TableHead>
                                    <TableHead>Motivo</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {mockDevolucao.itens.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell className="font-mono text-sm">
                                            {item.codigo}
                                        </TableCell>
                                        <TableCell className="font-medium">
                                            {item.nome}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {item.quantidade}
                                        </TableCell>
                                        <TableCell className="text-right font-medium">
                                            R$ {item.valor.toFixed(2)}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">{item.motivo}</Badge>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </Section>

            {/* Seção: Histórico */}
            <Section id="historico" label="Histórico" icon={History}>
                <Section.Header id="historico" label="Histórico" icon={History} />

                <Card>
                    <CardHeader>
                        <CardTitle>Linha do Tempo</CardTitle>
                        <CardDescription>
                            Acompanhe todas as atividades relacionadas a esta devolução
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {mockDevolucao.historico.map((evento, index) => (
                                <div key={index} className="flex gap-4">
                                    <div className="flex flex-col items-center">
                                        <div className={`rounded-full p-2 ${evento.tipo === 'success' ? 'bg-green-100 text-green-600' :
                                                evento.tipo === 'error' ? 'bg-red-100 text-red-600' :
                                                    'bg-blue-100 text-blue-600'
                                            }`}>
                                            {evento.tipo === 'success' ? <CheckCircle className="h-4 w-4" /> :
                                                evento.tipo === 'error' ? <XCircle className="h-4 w-4" /> :
                                                    <Clock className="h-4 w-4" />}
                                        </div>
                                        {index < mockDevolucao.historico.length - 1 && (
                                            <div className="w-px h-12 bg-border mt-2" />
                                        )}
                                    </div>
                                    <div className="flex-1 pb-6">
                                        <p className="font-medium">{evento.evento}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {evento.usuario} • {evento.data}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </Section>

            {/* Seção: Anexos */}
            <Section id="anexos" label="Anexos" icon={Paperclip}>
                <Section.Header id="anexos" label="Anexos" icon={Paperclip} />

                <Card>
                    <CardHeader>
                        <CardTitle>Documentos e Imagens</CardTitle>
                        <CardDescription>
                            {mockDevolucao.anexos.length} arquivos anexados
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {mockDevolucao.anexos.map((anexo, index) => (
                                <Card key={index} className="hover:shadow-md transition-shadow">
                                    <CardContent className="p-4">
                                        <div className="flex items-start gap-3">
                                            <Paperclip className="h-5 w-5 text-muted-foreground mt-1" />
                                            <div className="flex-1 min-w-0">
                                                <p className="font-medium text-sm truncate">
                                                    {anexo.nome}
                                                </p>
                                                <p className="text-xs text-muted-foreground">
                                                    {anexo.tamanho} • {anexo.data}
                                                </p>
                                                <Button variant="link" size="sm" className="h-auto p-0 mt-1">
                                                    Download
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                        <div className="mt-4">
                            <Button variant="outline" className="w-full">
                                <Paperclip className="h-4 w-4 mr-2" />
                                Adicionar Anexo
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </Section>
        </div>
    )
}
