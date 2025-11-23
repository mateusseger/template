// Serviço mock de integração com API de To-Dos
// Simula chamadas HTTP com delays para demonstrar React Query mutations

import type { IToDo } from "../types/to-do-list-types"

// Simula delay de rede (200-500ms)
const simulateDelay = () => new Promise((resolve) => setTimeout(resolve, 200 + Math.random() * 300))

// Mock de "banco de dados" local (em produção seria uma API real)
let mockDatabase: IToDo[] = [
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

// ==================== QUERIES (GET) ====================

/**
 * Lista todas as tarefas
 * Em produção: GET /api/todos
 */
export async function listToDos(): Promise<IToDo[]> {
    await simulateDelay()

    // Simula erro aleatório (5% de chance)
    if (Math.random() < 0.05) {
        throw new Error("Erro ao buscar tarefas")
    }

    return [...mockDatabase].sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
}

/**
 * Busca tarefa por ID
 * Em produção: GET /api/todos/:id
 */
export async function getToDoById(id: string): Promise<IToDo> {
    await simulateDelay()

    const todo = mockDatabase.find((t) => t.id === id)
    if (!todo) {
        throw new Error("Tarefa não encontrada")
    }

    return todo
}

// ==================== MUTATIONS (POST/PUT/DELETE) ====================

/**
 * Cria nova tarefa
 * Em produção: POST /api/todos
 */
export async function createToDo(data: { title: string }): Promise<IToDo> {
    await simulateDelay()

    if (!data.title.trim()) {
        throw new Error("Título não pode ser vazio")
    }

    const newToDo: IToDo = {
        id: Date.now().toString(),
        title: data.title,
        completed: false,
        createdAt: new Date(),
    }

    mockDatabase = [newToDo, ...mockDatabase]
    return newToDo
}

/**
 * Atualiza tarefa existente
 * Em produção: PUT /api/todos/:id
 */
export async function updateToDo(data: { id: string; title?: string; completed?: boolean }): Promise<IToDo> {
    await simulateDelay()

    const index = mockDatabase.findIndex((t) => t.id === data.id)
    if (index === -1) {
        throw new Error("Tarefa não encontrada")
    }

    mockDatabase[index] = {
        ...mockDatabase[index],
        ...(data.title !== undefined && { title: data.title }),
        ...(data.completed !== undefined && { completed: data.completed }),
    }

    return mockDatabase[index]
}

/**
 * Alterna status de conclusão
 * Em produção: PATCH /api/todos/:id/toggle
 */
export async function toggleToDo(id: string): Promise<IToDo> {
    await simulateDelay()

    const index = mockDatabase.findIndex((t) => t.id === id)
    if (index === -1) {
        throw new Error("Tarefa não encontrada")
    }

    mockDatabase[index] = {
        ...mockDatabase[index],
        completed: !mockDatabase[index].completed,
    }

    return mockDatabase[index]
}

/**
 * Deleta tarefa
 * Em produção: DELETE /api/todos/:id
 */
export async function deleteToDo(id: string): Promise<void> {
    await simulateDelay()

    const index = mockDatabase.findIndex((t) => t.id === id)
    if (index === -1) {
        throw new Error("Tarefa não encontrada")
    }

    mockDatabase = mockDatabase.filter((t) => t.id !== id)
}

/**
 * Deleta todas as tarefas concluídas
 * Em produção: DELETE /api/todos/completed
 */
export async function deleteCompletedToDos(): Promise<void> {
    await simulateDelay()

    mockDatabase = mockDatabase.filter((t) => !t.completed)
}
