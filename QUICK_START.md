# Quick Start Guide

Comece a usar o template React em 5 minutos.

---

## 1. Instalação

```bash
# Clone o repositório
git clone <your-template-repo> meu-projeto
cd meu-projeto

# Instale as dependências
npm install
```

---

## 2. Configuração

Configure o arquivo `.env`:

```env
# OIDC Configuration (obter com sua equipe de infraestrutura)
VITE_APP_AUTHORITY=https://seu-sso.com/auth/realms/SeuRealm
VITE_APP_CLIENT_ID=seu-client-id
VITE_APP_RESPONSE_TYPE=id_token token
VITE_APP_SCOPE=openid profile email roles
VITE_APP_TOKEN_KEY=app-token

# API Configuration
VITE_APP_API_URL=https://sua-api.com

# Development Mode (true = sem autenticação real)
VITE_DEV_AUTH_BYPASS=true
```

---

## 3. Desenvolvimento

```bash
# Inicie o servidor de desenvolvimento
npm run dev
```

O aplicativo abrirá automaticamente em `http://localhost:3000`

**Com `VITE_DEV_AUTH_BYPASS=true`:**
- ✅ Você estará automaticamente autenticado com um usuário mock
- ✅ Pode navegar em todas as rotas protegidas
- ✅ Não precisa configurar OIDC para começar

---

## 4. Explorando o Template

### Páginas Disponíveis

1. **Home** (`/`) - Página inicial
2. **Todos** (`/todos`) - Exemplo de feature completa
3. **Example** (`/example`) - Página em branco para iniciar

### Estrutura

```
src/
├── features/          # Suas features aqui
│   ├── todos/        # Exemplo: TODO list
│   └── example/      # Exemplo: página em branco
├── components/
│   ├── layout/       # Header, Sidebar, AppLayout
│   └── ui/           # Componentes shadcn/ui
├── lib/
│   ├── auth/         # Autenticação (OIDC + mock)
│   └── api/          # React Query setup
└── router/           # Definição de rotas
```

---

## 5. Criando Sua Primeira Feature

### Passo 1: Criar a estrutura

```bash
mkdir -p src/features/minha-feature
touch src/features/minha-feature/MinhaFeaturePage.tsx
touch src/features/minha-feature/types.ts
```

### Passo 2: Criar o componente da página

```tsx
// src/features/minha-feature/MinhaFeaturePage.tsx
import { Card, CardHeader, CardTitle, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"

export function MinhaFeaturePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Minha Feature</h1>
        <p className="text-muted-foreground mt-2">
          Descrição da minha feature
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Título</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm mb-4">Conteúdo da feature</p>
          <Button>Ação Principal</Button>
        </CardContent>
      </Card>
    </div>
  )
}
```

### Passo 3: Adicionar a rota

```tsx
// src/router/index.tsx
import { MinhaFeaturePage } from "../features/minha-feature/MinhaFeaturePage"

// Adicione dentro das children do AppLayout:
{
  path: "/minha-feature",
  element: <MinhaFeaturePage />,
}
```

### Passo 4: Adicionar ao menu

```tsx
// src/components/layout/Sidebar.tsx
import { MinhaIcon } from "lucide-react" // escolha um ícone

const menuItems = [
  // ... itens existentes
  {
    title: "Minha Feature",
    icon: MinhaIcon,
    url: "/minha-feature",
  },
]
```

### Passo 5: Testar

```bash
# Abra no navegador
http://localhost:3000/minha-feature
```

---

## 6. Usando React Query

### Exemplo de Query (buscar dados)

```tsx
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

function useMeusDados() {
  return useQuery({
    queryKey: ["meus-dados"],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_APP_API_URL}/endpoint`)
      return data
    },
  })
}

// No componente:
function MinhaFeature() {
  const { data, isLoading, error } = useMeusDados()

  if (isLoading) return <div>Carregando...</div>
  if (error) return <div>Erro ao carregar</div>

  return <div>{/* Use 'data' aqui */}</div>
}
```

### Exemplo de Mutation (criar/atualizar dados)

```tsx
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

function useCriarItem() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (novoItem: any) => {
      const { data } = await axios.post(
        `${import.meta.env.VITE_APP_API_URL}/items`,
        novoItem
      )
      return data
    },
    onSuccess: () => {
      // Invalida a query para recarregar os dados
      queryClient.invalidateQueries({ queryKey: ["meus-dados"] })
    },
  })
}

// No componente:
function MinhaFeature() {
  const { mutate, isPending } = useCriarItem()

  const handleSubmit = () => {
    mutate({ nome: "Novo Item" })
  }

  return <Button onClick={handleSubmit} disabled={isPending}>Criar</Button>
}
```

---

## 7. Instalando Componentes shadcn/ui

```bash
# Ver todos os componentes disponíveis
https://ui.shadcn.com/docs/components

# Instalar um componente (exemplo: Dialog)
npx shadcn@latest add dialog

# Instalar vários de uma vez
npx shadcn@latest add dialog input label form
```

Após instalar, use normalmente:

```tsx
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog"
```

---

## 8. Build para Produção

### Antes de fazer deploy:

1. Configure o `.env` de produção:
```env
VITE_DEV_AUTH_BYPASS=false  # ← IMPORTANTE!
VITE_APP_AUTHORITY=https://prod-sso.com/...
# ... outras variáveis de produção
```

2. Execute o build:
```bash
npm run build
```

3. Teste o build localmente:
```bash
npm run preview
```

4. Deploy:
- Os arquivos estarão em `/dist`
- Configure seu servidor para SPA (todas as rotas → index.html)

---

## 9. Dicas Rápidas

### Autenticação de Desenvolvimento
- `VITE_DEV_AUTH_BYPASS=true` → usuário mock criado automaticamente
- `VITE_DEV_AUTH_BYPASS=false` → usa OIDC real

### Classes Tailwind Comuns
```
max-w-4xl mx-auto         # Container centralizado com largura máxima
grid grid-cols-2 gap-4    # Grid de 2 colunas
flex items-center gap-2   # Flex centralizado verticalmente
text-sm text-muted-foreground  # Texto pequeno secundário
```

### shadcn/ui Componentes Úteis
- `Button` - Botões estilizados
- `Card` - Cartões de conteúdo
- `Input` - Campos de formulário
- `Dialog` - Modais
- `Alert` - Mensagens de alerta

---

## 10. Próximos Passos

1. ✅ Explore as features de exemplo (`/todos`, `/example`)
2. ✅ Leia o arquivo `.github/instructions` para convenções
3. ✅ Consulte a [documentação do shadcn/ui](https://ui.shadcn.com)
4. ✅ Veja os [blocks do shadcn](https://ui.shadcn.com/blocks) para layouts prontos
5. ✅ Comece a criar suas features!

---

## Comandos Úteis

```bash
npm run dev        # Desenvolvimento
npm run build      # Build produção
npm run lint       # Verificar código
npm run preview    # Preview do build
```

---

## Precisa de Ajuda?

- 📖 Leia o [README.md](./README.md)
- 📋 Consulte [.github/instructions](./.github/instructions)
- 🔄 Veja [MIGRATION_GUIDE.md](./MIGRATION_GUIDE.md) se está migrando
- 📚 [Documentação Tailwind](https://tailwindcss.com)
- 🎨 [Documentação shadcn/ui](https://ui.shadcn.com)

**Boa construção! 🚀**
