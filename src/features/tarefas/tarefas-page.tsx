import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { ITarefa } from "./tarefas-types"
import { Button } from "@/shared/components/ui/shadcn/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/shadcn/card"
import { Input } from "@/shared/components/ui/shadcn/input"
import { Badge } from "@/shared/components/ui/shadcn/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/shadcn/tabs"
import { Plus, Trash2, Check, Circle, CheckCircle2, ListTodo, Filter } from "lucide-react"

const initialTarefas: ITarefa[] = [
    {
        id: "1",
        title: "Explorar a estrutura do template",
        completed: true,
        createdAt: new Date(Date.now() - 86400000 * 2),
    },
    {
        id: "2",
        title: "Configurar autenticação OIDC",
        completed: true,
        createdAt: new Date(Date.now() - 86400000),
    },
    {
        id: "3",
        title: "Criar primeira feature de negócio",
        completed: false,
        createdAt: new Date(),
    },
    {
        id: "4",
        title: "Customizar tema da aplicação",
        completed: false,
        createdAt: new Date(),
    },
]

export function TarefasPage() {
    const [tarefas, setTarefas] = useState<ITarefa[]>(initialTarefas)
    const [newTarefaTitle, setNewTarefaTitle] = useState("")
    const [filter, setFilter] = useState<"all" | "active" | "completed">("all")

    const handleAddTarefa = () => {
        if (!newTarefaTitle.trim()) return

        const newTarefa: ITarefa = {
            id: Date.now().toString(),
            title: newTarefaTitle,
            completed: false,
            createdAt: new Date(),
        }

        setTarefas([newTarefa, ...tarefas])
        setNewTarefaTitle("")
    }

    const handleToggleTarefa = (id: string) => {
        setTarefas(
            tarefas.map((tarefa) =>
                tarefa.id === id ? { ...tarefa, completed: !tarefa.completed } : tarefa
            )
        )
    }

    const handleDeleteTarefa = (id: string) => {
        setTarefas(tarefas.filter((tarefa) => tarefa.id !== id))
    }

    const handleClearCompleted = () => {
        setTarefas(tarefas.filter((tarefa) => !tarefa.completed))
    }

    const filteredTarefas = tarefas.filter((tarefa) => {
        if (filter === "active") return !tarefa.completed
        if (filter === "completed") return tarefa.completed
        return true
    })

    const stats = {
        total: tarefas.length,
        active: tarefas.filter((t) => !t.completed).length,
        completed: tarefas.filter((t) => t.completed).length,
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <ListTodo className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Tarefas</h1>
                        <p className="text-muted-foreground">
                            Organize suas atividades de forma simples e eficiente
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Total</p>
                                <p className="text-2xl font-bold mt-1">{stats.total}</p>
                            </div>
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                                <ListTodo className="h-6 w-6 text-primary" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Ativas</p>
                                <p className="text-2xl font-bold mt-1">{stats.active}</p>
                            </div>
                            <div className="h-12 w-12 rounded-full bg-blue-500/10 flex items-center justify-center">
                                <Circle className="h-6 w-6 text-blue-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-muted-foreground">Concluídas</p>
                                <p className="text-2xl font-bold mt-1">{stats.completed}</p>
                            </div>
                            <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center">
                                <CheckCircle2 className="h-6 w-6 text-green-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Add Todo Card */}
            <Card>
                <CardHeader>
                    <CardTitle>Nova Tarefa</CardTitle>
                    <CardDescription>Adicione uma nova tarefa à sua lista</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2">
                        <Input
                            value={newTarefaTitle}
                            onChange={(e) => setNewTarefaTitle(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleAddTarefa()}
                            placeholder="Digite o título da tarefa..."
                            className="flex-1"
                        />
                        <Button onClick={handleAddTarefa} className="gap-2">
                            <Plus className="h-4 w-4" />
                            Adicionar
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Todos List with Tabs */}
            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Suas Tarefas</CardTitle>
                            <CardDescription>Gerencie e acompanhe seu progresso</CardDescription>
                        </div>
                        {stats.completed > 0 && (
                            <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleClearCompleted}
                                className="text-muted-foreground hover:text-destructive"
                            >
                                Limpar concluídas
                            </Button>
                        )}
                    </div>
                </CardHeader>
                <CardContent>
                    <Tabs value={filter} onValueChange={(v) => setFilter(v as typeof filter)}>
                        <TabsList className="grid w-full grid-cols-3 mb-6">
                            <TabsTrigger value="all" className="gap-2">
                                <Filter className="h-4 w-4" />
                                Todas ({stats.total})
                            </TabsTrigger>
                            <TabsTrigger value="active" className="gap-2">
                                <Circle className="h-4 w-4" />
                                Ativas ({stats.active})
                            </TabsTrigger>
                            <TabsTrigger value="completed" className="gap-2">
                                <CheckCircle2 className="h-4 w-4" />
                                Concluídas ({stats.completed})
                            </TabsTrigger>
                        </TabsList>

                        <TabsContent value={filter} className="space-y-3">
                            <AnimatePresence mode="popLayout">
                                {filteredTarefas.length === 0 ? (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="text-center py-12"
                                    >
                                        <div className="h-16 w-16 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                                            <ListTodo className="h-8 w-8 text-muted-foreground" />
                                        </div>
                                        <p className="text-muted-foreground">
                                            {filter === "all" && "Nenhuma tarefa ainda. Adicione uma para começar!"}
                                            {filter === "active" && "Nenhuma tarefa ativa no momento."}
                                            {filter === "completed" && "Nenhuma tarefa concluída ainda."}
                                        </p>
                                    </motion.div>
                                ) : (
                                    filteredTarefas.map((tarefa, index) => (
                                        <motion.div
                                            key={tarefa.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: 20 }}
                                            transition={{ delay: index * 0.05 }}
                                            layout
                                        >
                                            <Card className="group hover:shadow-md transition-shadow">
                                                <CardContent className="p-4">
                                                    <div className="flex items-center justify-between gap-4">
                                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                                            <Button
                                                                variant={tarefa.completed ? "default" : "outline"}
                                                                size="icon"
                                                                onClick={() => handleToggleTarefa(tarefa.id)}
                                                                className="shrink-0"
                                                            >
                                                                {tarefa.completed ? (
                                                                    <Check className="h-4 w-4" />
                                                                ) : (
                                                                    <Circle className="h-4 w-4" />
                                                                )}
                                                            </Button>
                                                            <div className="flex-1 min-w-0">
                                                                <p
                                                                    className={`font-medium truncate ${tarefa.completed
                                                                        ? "line-through text-muted-foreground"
                                                                        : ""
                                                                        }`}
                                                                >
                                                                    {tarefa.title}
                                                                </p>
                                                                <div className="flex items-center gap-2 mt-1">
                                                                    <p className="text-xs text-muted-foreground">
                                                                        {tarefa.createdAt.toLocaleDateString("pt-BR", {
                                                                            day: "2-digit",
                                                                            month: "short",
                                                                        })}
                                                                    </p>
                                                                    {tarefa.completed && (
                                                                        <Badge variant="secondary" className="text-xs">
                                                                            Concluída
                                                                        </Badge>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handleDeleteTarefa(tarefa.id)}
                                                            className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </motion.div>
                                    ))
                                )}
                            </AnimatePresence>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </div>
    )
}
