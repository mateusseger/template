// Rotas da feature to-do-list

import { type RouteObject } from "react-router-dom"
import { ToDoListPage } from "./pages/to-do-list-page"

export const toDoListRoutes: RouteObject[] = [
    {
        path: "/exemplos/to-do-list",
        element: <ToDoListPage />,
    },
]
