// React Query: Queries (GET) para To-Dos

import { useQuery } from "@tanstack/react-query"
import { listToDos, getToDoById } from "./to-do-api"

/**
 * Hook para listar todas as tarefas
 * Cache: 30 segundos (dados mudam frequentemente)
 */
export function useToDos() {
    return useQuery({
        queryKey: ["todos"],
        queryFn: listToDos,
        staleTime: 1000 * 30, // 30 segundos
    })
}

/**
 * Hook para buscar tarefa por ID
 * Cache: 1 minuto
 */
export function useToDo(id: string | undefined) {
    return useQuery({
        queryKey: ["todo", id],
        queryFn: () => getToDoById(id!),
        enabled: !!id,
        staleTime: 1000 * 60, // 1 minuto
    })
}
