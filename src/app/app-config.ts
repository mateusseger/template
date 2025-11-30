import { CloudSun, FileText, Home, Layers, ListTodo, Palette, Sparkles, Zap } from 'lucide-react'
import type { AppConfig } from '@herval/react-core'

export const appConfig: AppConfig = {
    auth: {
        authority: import.meta.env.VITE_AUTH_AUTHORITY,
        clientId: import.meta.env.VITE_AUTH_CLIENT_ID,
        redirectUri: import.meta.env.VITE_AUTH_REDIRECT_URI,
        postLogoutRedirectUri: import.meta.env.VITE_AUTH_POST_LOGOUT_REDIRECT_URI,
        scope: 'openid profile email',
        devMockRoles: import.meta.env.VITE_DEV_MOCK_ROLES ? import.meta.env.VITE_DEV_MOCK_ROLES.split(',') : ['user'],
    },
    project: {
        name: 'Template React',
        version: '1.0.0',
    },
    menu: [
        {
            name: "Home",
            url: "/",
            icon: Home
        },
        {
            name: "Design System",
            url: "/design-system",
            icon: Palette
        },
        {
            name: "Temas",
            url: "/temas",
            icon: Layers,
        },
        {
            name: "Exemplos",
            icon: Sparkles,
            subItems: [
                {
                    name: "Formulários",
                    url: "/formularios",
                    icon: FileText
                },
                {
                    name: "To-Do List",
                    url: "/to-do-list",
                    icon: ListTodo
                },
                {
                    name: "Pokédex",
                    url: "/pokedex",
                    icon: Zap
                },
                {
                    name: "Previsão do Tempo",
                    url: "/previsao-tempo",
                    icon: CloudSun
                },
            ],
        },
    ],
}
