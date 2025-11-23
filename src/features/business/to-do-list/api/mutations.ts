// React Query: Mutations (POST/PUT/DELETE) para To-Dos

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createToDo, updateToDo, toggleToDo, deleteToDo, deleteCompletedToDos } from "./to-do-api"
import type { IToDo } from "../types/to-do-list-types"

/**
 * Hook para criar nova tarefa
 * 
 * @example
 * ```tsx
 * const createMutation = useCreateToDo()
 * 
 * <Button 
 *   onClick={() => createMutation.mutate({ title: "Nova tarefa" })}
 *   disabled={createMutation.isPending}
 * >
 *   {createMutation.isPending ? "Criando..." : "Criar"}
 * </Button>
 * ```
 */
export function useCreateToDo() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: createToDo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] })
        },
    })
}

/**
 * Hook para atualizar tarefa
 * 
 * @example
 * ```tsx
 * const updateMutation = useUpdateToDo()
 * updateMutation.mutate({ id: "1", title: "Atualizado" })
 * ```
 */
export function useUpdateToDo() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: updateToDo,
        onSuccess: (updatedToDo) => {
            queryClient.invalidateQueries({ queryKey: ["todos"] })
            queryClient.setQueryData(["todo", updatedToDo.id], updatedToDo)
        },
    })
}

/**
 * Hook para alternar status de conclusão (com atualização otimista)
 * 
 * @example
 * ```tsx
 * const toggleMutation = useToggleToDo()
 * 
 * <Checkbox 
 *   checked={todo.completed}
 *   onCheckedChange={() => toggleMutation.mutate(todo.id)}
 * />
 * ```
 */
export function useToggleToDo() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: toggleToDo,
        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: ["todos"] })
            const previousToDos = queryClient.getQueryData<IToDo[]>(["todos"])

            queryClient.setQueryData<IToDo[]>(["todos"], (old) =>
                old?.map((todo) =>
                    todo.id === id ? { ...todo, completed: !todo.completed } : todo
                ) || []
            )

            return { previousToDos }
        },
        onError: (_err, _id, context) => {
            queryClient.setQueryData(["todos"], context?.previousToDos)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] })
        },
    })
}

/**
 * Hook para deletar tarefa (com atualização otimista)
 * 
 * @example
 * ```tsx
 * const deleteMutation = useDeleteToDo()
 * 
 * <Button 
 *   onClick={() => deleteMutation.mutate(todo.id)}
 *   disabled={deleteMutation.isPending}
 * >
 *   Deletar
 * </Button>
 * ```
 */
export function useDeleteToDo() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteToDo,
        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: ["todos"] })
            const previousToDos = queryClient.getQueryData<IToDo[]>(["todos"])

            queryClient.setQueryData<IToDo[]>(["todos"], (old) =>
                old?.filter((todo) => todo.id !== id) || []
            )

            return { previousToDos }
        },
        onError: (_err, _id, context) => {
            queryClient.setQueryData(["todos"], context?.previousToDos)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] })
        },
    })
}

/**
 * Hook para deletar todas as tarefas concluídas
 * 
 * @example
 * ```tsx
 * const clearMutation = useDeleteCompletedToDos()
 * 
 * <Button onClick={() => clearMutation.mutate()}>
 *   Limpar Concluídas
 * </Button>
 * ```
 */
export function useDeleteCompletedToDos() {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: deleteCompletedToDos,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["todos"] })
        },
    })
}
