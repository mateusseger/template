/**
 * User Helper Utilities - Utilitários auxiliares para manipulação de dados do usuário
 * 
 * Centraliza a extração e formatação de dados do usuário, fornecendo:
 * - Extração segura de roles/permissões
 * - Geração de iniciais para avatares
 * - Formatação de nome de exibição
 * 
 * Garante consistência no acesso a propriedades do usuário em toda a aplicação.
 */

/**
 * getUserRoles - Extrai as roles (permissões) do usuário de diferentes possíveis localizações
 * 
 * Suporta múltiplas estruturas de dados do usuário:
 * - user.profile.userRoles (estrutura aninhada)
 * - user.userRoles (estrutura direta)
 * 
 * Útil para:
 * - Controle de acesso baseado em permissões
 * - Filtragem de menu baseada em roles
 * - Validação de autorização em rotas protegidas
 * 
 * @param user - Objeto do usuário (pode ser null/undefined)
 * @returns Array de strings representando as roles do usuário, array vazio se não houver roles
 * 
 * @example
 * ```typescript
 * const roles = getUserRoles(user)
 * // Retorna: ["admin", "user"] ou []
 * ```
 */
export function getUserRoles(user: any): string[] {
    if (!user) return []
    return user?.profile?.userRoles ?? user?.userRoles ?? []
}

/**
 * getUserInitials - Gera iniciais do nome do usuário para exibição em avatar
 * 
 * Lógica de geração:
 * 1. Usa o nome completo se disponível
 * 2. Fallback para email se nome não existir
 * 3. Fallback final para "User"
 * 4. Divide por espaços e pega primeira letra de cada palavra
 * 5. Converte para maiúsculas e limita a 2 caracteres
 * 
 * Casos de uso:
 * - Avatar com iniciais quando não há foto
 * - Placeholder visual para identificação rápida
 * - Componentes de perfil simplificados
 * 
 * @param user - Objeto do usuário (pode ser null/undefined)
 * @returns String com 1-2 caracteres em maiúsculas, "U" se usuário for inválido
 * 
 * @example
 * ```typescript
 * getUserInitials({ name: "João Silva" }) // Retorna: "JS"
 * getUserInitials({ email: "joao@exemplo.com" }) // Retorna: "JO"
 * getUserInitials(null) // Retorna: "U"
 * ```
 */
export function getUserInitials(user: any): string {
    if (!user) return "U"

    const name = user.name || user.email || "User"
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
}

/**
 * getUserDisplayName - Retorna o nome de exibição preferencial do usuário
 * 
 * Hierarquia de preferência:
 * 1. Nome completo (user.name)
 * 2. Email (user.email)
 * 3. Fallback genérico "User"
 * 
 * Útil para:
 * - Exibição no cabeçalho da aplicação
 * - Mensagens de boas-vindas personalizadas
 * - Labels em componentes de perfil
 * - Registros de auditoria e logs
 * 
 * @param user - Objeto do usuário (pode ser null/undefined)
 * @returns String com o nome de exibição, "User" se usuário for inválido
 * 
 * @example
 * ```typescript
 * getUserDisplayName({ name: "Maria Santos" }) // Retorna: "Maria Santos"
 * getUserDisplayName({ email: "maria@exemplo.com" }) // Retorna: "maria@exemplo.com"
 * getUserDisplayName(null) // Retorna: "User"
 * ```
 */
export function getUserDisplayName(user: any): string {
    if (!user) return "User"
    return user.name || user.email || "User"
}
