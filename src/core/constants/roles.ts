export const USER_ROLES = {
  ADMIN: "admin",
  EDITOR: "editor",
  VIEWER: "viewer",
  USER: "user",
} as const

export type UserRole = (typeof USER_ROLES)[keyof typeof USER_ROLES]

export const ROLE_HIERARCHY: Record<UserRole, number> = {
  [USER_ROLES.ADMIN]: 4,
  [USER_ROLES.EDITOR]: 3,
  [USER_ROLES.VIEWER]: 2,
  [USER_ROLES.USER]: 1,
}

export function hasRole(userRoles: string[], requiredRole: UserRole): boolean {
  return userRoles.includes(requiredRole)
}

export function hasAnyRole(userRoles: string[], requiredRoles: UserRole[]): boolean {
  return requiredRoles.some((role) => userRoles.includes(role))
}

export function hasAllRoles(userRoles: string[], requiredRoles: UserRole[]): boolean {
  return requiredRoles.every((role) => userRoles.includes(role))
}

export function getRoleLevel(role: UserRole): number {
  return ROLE_HIERARCHY[role] ?? 0
}

export function hasMinimumRoleLevel(userRoles: string[], minimumRole: UserRole): boolean {
  const minimumLevel = getRoleLevel(minimumRole)
  return userRoles.some((role) => getRoleLevel(role as UserRole) >= minimumLevel)
}
