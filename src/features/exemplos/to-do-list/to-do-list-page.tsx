import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { IToDo as IToDo } from "./to-do-list-types"
import { Button } from "@/shared/components/ui/shadcn/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/components/ui/shadcn/card"
import { Input } from "@/shared/components/ui/shadcn/input"
import { Badge } from "@/shared/components/ui/shadcn/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/shadcn/tabs"
import { Plus, Trash2, Check, Circle, CheckCircle2, ListTodo, Filter } from "lucide-react"

const initialToDos: IToDo[] = [
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

export function ToDoListPage() {
    const [todos, setToDos] = useState<IToDo[]>(initialToDos)
    const [newToDoTitle, setNewToDoTitle] = useState("")
    const [filter, setFilter] = useState<"all" | "active" | "completed">("all")

    const handleAddToDo = () => {
        if (!newToDoTitle.trim()) return

        const newToDo: IToDo = {
            id: Date.now().toString(),
            title: newToDoTitle,
            completed: false,
            createdAt: new Date(),
        }

        setToDos([newToDo, ...todos])
        setNewToDoTitle("")
    }

    const handleToggleToDo = (id: string) => {
        setToDos(
            todos.map((toDo) =>
                toDo.id === id ? { ...toDo, completed: !toDo.completed } : toDo
            )
        )
    }

    const handleDeleteToDo = (id: string) => {
        setToDos(todos.filter((toDo) => toDo.id !== id))
    }

    const handleClearCompleted = () => {
        setToDos(todos.filter((toDo) => !toDo.completed))
    }

    const filteredToDos = todos.filter((toDo) => {
        if (filter === "active") return !toDo.completed
        if (filter === "completed") return toDo.completed
        return true
    })

    const stats = {
        total: todos.length,
        active: todos.filter((t) => !t.completed).length,
        completed: todos.filter((t) => t.completed).length,
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
                        <h1 className="text-3xl font-bold tracking-tight">To-Do List</h1>
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
                    <CardTitle>Novo To-Do</CardTitle>
                    <CardDescription>Adicione um novo to-do à sua lista</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2">
                        <Input
                            value={newToDoTitle}
                            onChange={(e) => setNewToDoTitle(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleAddToDo()}
                            placeholder="Digite o título do to-do..."
                            className="flex-1"
                        />
                        <Button onClick={handleAddToDo} className="gap-2">
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
                            <CardTitle>Seus To-Dos</CardTitle>
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
                                {filteredToDos.length === 0 ? (
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
                                            {filter === "all" && "Nenhum to-do ainda. Adicione um para começar!"}
                                            {filter === "active" && "Nenhum to-do ativo no momento."}
                                            {filter === "completed" && "Nenhum to-do concluído ainda."}
                                        </p>
                                    </motion.div>
                                ) : (
                                    filteredToDos.map((toDo, index) => (
                                        <motion.div
                                            key={toDo.id}
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
                                                                variant={toDo.completed ? "default" : "outline"}
                                                                size="icon"
                                                                onClick={() => handleToggleToDo(toDo.id)}
                                                                className="shrink-0"
                                                            >
                                                                {toDo.completed ? (
                                                                    <Check className="h-4 w-4" />
                                                                ) : (
                                                                    <Circle className="h-4 w-4" />
                                                                )}
                                                            </Button>
                                                            <div className="flex-1 min-w-0">
                                                                <p
                                                                    className={`font-medium truncate ${toDo.completed
                                                                        ? "line-through text-muted-foreground"
                                                                        : ""
                                                                        }`}
                                                                >
                                                                    {toDo.title}
                                                                </p>
                                                                <div className="flex items-center gap-2 mt-1">
                                                                    <p className="text-xs text-muted-foreground">
                                                                        {toDo.createdAt.toLocaleDateString("pt-BR", {
                                                                            day: "2-digit",
                                                                            month: "short",
                                                                        })}
                                                                    </p>
                                                                    {toDo.completed && (
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
                                                            onClick={() => handleDeleteToDo(toDo.id)}
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
