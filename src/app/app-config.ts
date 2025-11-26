import { CloudSun, FileText, Home, Layers, ListTodo, Palette, Sparkles, Zap } from 'lucide-react'
import type { AppConfig } from '@herval/react-core'

export const appConfig: AppConfig = {
    auth: {
        authority: import.meta.env.VITE_AUTH_AUTHORITY,
        client_id: import.meta.env.VITE_AUTH_CLIENT_ID,
        redirect_uri: import.meta.env.VITE_AUTH_REDIRECT_URI,
        post_logout_redirect_uri: import.meta.env.VITE_AUTH_POST_LOGOUT_REDIRECT_URI,
        response_type: 'code',
        scope: 'openid profile email',
        automaticSilentRenew: true,
        loadUserInfo: true,
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
            url: "/themes",
            icon: Layers,
        },
        {
            name: "Exemplos",
            icon: Sparkles,
            subItems: [
                {
                    name: "Formulários",
                    url: "/exemplos/formularios",
                    icon: FileText
                },
                {
                    name: "To-Do List",
                    url: "/exemplos/to-do-list",
                    icon: ListTodo
                },
                {
                    name: "Pokédex",
                    url: "/exemplos/pokedex",
                    icon: Zap
                },
                {
                    name: "Previsão do Tempo",
                    url: "/exemplos/previsao-tempo",
                    icon: CloudSun
                },
            ],
        },
    ],
}
