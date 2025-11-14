import { useState } from "react"
import type { ITodo } from "./types"
import { Button } from "../../components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Plus, Trash2, Check } from "lucide-react"

const initialTodos: ITodo[] = [
  {
    id: "1",
    title: "Create a new React project",
    completed: true,
    createdAt: new Date(),
  },
  {
    id: "2",
    title: "Set up Tailwind CSS and shadcn/ui",
    completed: true,
    createdAt: new Date(),
  },
  {
    id: "3",
    title: "Build amazing features",
    completed: false,
    createdAt: new Date(),
  },
]

export function TodosPage() {
  const [todos, setTodos] = useState<ITodo[]>(initialTodos)
  const [newTodoTitle, setNewTodoTitle] = useState("")

  const handleAddTodo = () => {
    if (!newTodoTitle.trim()) return

    const newTodo: ITodo = {
      id: Date.now().toString(),
      title: newTodoTitle,
      completed: false,
      createdAt: new Date(),
    }

    setTodos([...todos, newTodo])
    setNewTodoTitle("")
  }

  const handleToggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    )
  }

  const handleDeleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id))
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Todos</h1>
        <p className="text-muted-foreground mt-2">
          A simple todo list to demonstrate feature implementation
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Add New Todo</CardTitle>
          <CardDescription>Create a new task to add to your list</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <input
              type="text"
              value={newTodoTitle}
              onChange={(e) => setNewTodoTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
              placeholder="Enter todo title..."
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Button onClick={handleAddTodo} className="gap-2">
              <Plus className="h-4 w-4" />
              Add
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-3">
        {todos.map((todo) => (
          <Card key={todo.id}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1">
                  <Button
                    variant={todo.completed ? "default" : "outline"}
                    size="icon"
                    onClick={() => handleToggleTodo(todo.id)}
                  >
                    {todo.completed && <Check className="h-4 w-4" />}
                  </Button>
                  <div className="flex-1">
                    <p
                      className={`font-medium ${
                        todo.completed ? "line-through text-muted-foreground" : ""
                      }`}
                    >
                      {todo.title}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {todo.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteTodo(todo.id)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {todos.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">No todos yet. Add one to get started!</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
