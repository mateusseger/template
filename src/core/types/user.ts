import type { User } from "oidc-client"

export interface IUser extends User {
    email?: string
    name?: string
    userRoles?: string[]
}
