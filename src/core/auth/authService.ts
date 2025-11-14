import { User, UserManager } from "oidc-client"
import { oidcConfig } from "./oidcConfig"
import type { IUser } from "../types/user"
import { USER_ROLES } from "../constants/roles"

const userManager = new UserManager(oidcConfig)

const DEV_AUTH_BYPASS = import.meta.env.VITE_DEV_AUTH_BYPASS === "true"

function getDevMockRoles(): string[] {
  const rolesEnv = import.meta.env.VITE_DEV_MOCK_ROLES
  if (rolesEnv) {
    return rolesEnv.split(",").map((role: string) => role.trim())
  }
  return [USER_ROLES.USER]
}

export function createMockUser(customRoles?: string[]): IUser {
  const roles = customRoles ?? getDevMockRoles()
  
  const mockUser = {
    id_token: "mock_id_token",
    session_state: "mock_session",
    access_token: "mock_access_token",
    refresh_token: "mock_refresh_token",
    token_type: "Bearer",
    scope: "openid profile email roles",
    profile: {
      sub: "mock_user_id",
      name: "Mock User",
      email: "mock@example.com",
      userRoles: roles,
      iss: "mock_issuer",
      aud: "mock_audience",
      exp: Math.floor(Date.now() / 1000) + 3600,
      iat: Math.floor(Date.now() / 1000),
    },
    expires_at: Math.floor(Date.now() / 1000) + 3600,
    expired: false,
    scopes: ["openid", "profile", "email", "roles"],
    toStorageString: () => JSON.stringify({}),
    state: "mock_state",
    expires_in: 3600,
    email: "mock@example.com",
    name: "Mock User",
    userRoles: roles,
  } as IUser
  return mockUser
}

export async function getUser(): Promise<User | null> {
  if (DEV_AUTH_BYPASS) {
    const mockUser = createMockUser()
    localStorage.setItem(import.meta.env.VITE_APP_TOKEN_KEY, mockUser.access_token)
    return mockUser
  }
  return await userManager.getUser()
}

export async function isAuthenticated() {
  if (DEV_AUTH_BYPASS) {
    return true
  }
  const token = await getToken()
  return !!token
}

export async function handleOAuthCallback(callbackUrl: string) {
  if (DEV_AUTH_BYPASS) {
    return createMockUser()
  }
  try {
    const user = await userManager.signinRedirectCallback(callbackUrl)
    localStorage.setItem(import.meta.env.VITE_APP_TOKEN_KEY, user.access_token)
    return user
  } catch {
    window.location.href = "/auth/logout"
    return
  }
}

export async function login() {
  if (DEV_AUTH_BYPASS) {
    return
  }
  return await userManager.signinRedirect()
}

export async function renewToken() {
  if (DEV_AUTH_BYPASS) {
    return createMockUser()
  }
  return await userManager.signinSilent()
}

export async function getToken() {
  if (DEV_AUTH_BYPASS) {
    return "mock_access_token"
  }
  const user = await getUser()
  return user?.access_token
}

export async function logout() {
  if (DEV_AUTH_BYPASS) {
    localStorage.removeItem(import.meta.env.VITE_APP_TOKEN_KEY)
    window.location.href = "/"
    return
  }
  await userManager.clearStaleState()
  await userManager.signoutRedirect()
}

export async function clearStaleState() {
  if (DEV_AUTH_BYPASS) {
    return
  }
  await userManager.clearStaleState()
}
