import { createContext, type ReactNode, useEffect, useState } from "react"
import { login, getUser } from "@/services/auth/authService"
import type { IUser } from "@/core/types/user"

type AuthContextType = {
    user: IUser | null
    isAuthenticated: boolean
    setIsAuthenticated: (value: React.SetStateAction<boolean>) => void
}

interface AuthContextProviderProps {
    children: ReactNode
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [user, setUser] = useState<IUser | null>(null)
    const [loading, setLoading] = useState(true)

    async function loadUser() {
        const user = await getUser()
        if (!user) {
            await login()
            return
        }

        if (user.expired) {
            window.location.href = "/auth/logout"
            return
        }

        if (!user.access_token) {
            window.location.href = "/auth/logout"
            return
        }

        setUser(user as IUser)

        const token = user?.access_token ?? localStorage.getItem(import.meta.env.VITE_APP_TOKEN_KEY) ?? undefined
        if (token) setIsAuthenticated(true)

        setLoading(false)
    }

    useEffect(() => {
        loadUser()
    }, [isAuthenticated])

    if (loading) {
        return <></>
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}
