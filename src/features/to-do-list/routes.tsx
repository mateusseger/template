// Rotas da feature to-do-list

import { ListTodo } from "lucide-react"
import { type RouteObject } from "react-router-dom"
import { ToDoListPage } from "./pages/to-do-list-page"

export const toDoListRoutes: RouteObject[] = [
    {
        path: "/to-do-list",
        element: <ToDoListPage />,
        handle: {
            breadcrumbLabel: "Lista de Tarefas",
            breadcrumbIcon: ListTodo,
        },
    },
]
