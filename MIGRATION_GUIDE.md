# Guia de Migração - Bootstrap para Tailwind + shadcn/ui

## Objetivo

Este guia ajuda a migrar projetos React baseados em Bootstrap para o novo template que utiliza Tailwind CSS + shadcn/ui.

---

## Principais Mudanças

### 1. Sistema de Design
- **Antes**: React-Bootstrap + SCSS customizado
- **Depois**: Tailwind CSS + shadcn/ui

### 2. Estrutura de Pastas
- **Antes**: `/ui` com `components` e `pages`
- **Depois**: `/features` (feature-based) + `/components/layout` + `/components/ui`

### 3. Autenticação
- **Antes**: Requer configuração OIDC sempre
- **Depois**: OIDC + mock via `VITE_DEV_AUTH_BYPASS=true`

### 4. Estilização
- **Antes**: SCSS com variáveis Bootstrap
- **Depois**: Tailwind CSS com utility classes

---

## Mapeamento de Componentes

### Bootstrap → shadcn/ui

| Bootstrap Component | shadcn/ui Component | Observações |
|---|---|---|
| `<Button>` | `<Button>` | Props diferentes, ver docs |
| `<Card>` | `<Card>` + sub-componentes | CardHeader, CardTitle, CardContent, CardFooter |
| `<Container>` | `<div className="container mx-auto">` | Usar classes Tailwind |
| `<Row>` / `<Col>` | `<div className="grid">` | Usar Tailwind Grid |
| `<Modal>` | Dialog (a instalar) | shadcn/ui Dialog component |
| `<Alert>` | Alert (a instalar) | shadcn/ui Alert component |
| `<Form>` | Input, Label (a instalar) | shadcn/ui Form components |
| `<Navbar>` | Componente customizado | Ver Sidebar.tsx e Header.tsx |

---

## Passos de Migração

### 1. Preparação
```bash
# Clone o novo template
git clone <template-repo> novo-projeto
cd novo-projeto
npm install
```

### 2. Configuração de Ambiente
```bash
# Copie o .env e configure
cp .env.example .env
# Edite com suas credenciais OIDC
# Configure VITE_DEV_AUTH_BYPASS=true para dev
```

### 3. Migrar Features

#### Passo a passo por feature:

**Para cada feature do projeto antigo:**

1. Crie pasta em `src/features/<nome-feature>/`
2. Copie lógica de negócio (sem componentes de UI)
3. Recrie componentes usando shadcn/ui
4. Substitua classes Bootstrap por Tailwind
5. Teste a feature isoladamente

#### Exemplo prático:

**Antes (Bootstrap):**
```tsx
import { Card, Button, Container } from "react-bootstrap"

export function MinhaFeature() {
  return (
    <Container>
      <Card>
        <Card.Header>Título</Card.Header>
        <Card.Body>
          <Card.Text>Conteúdo</Card.Text>
          <Button variant="primary">Ação</Button>
        </Card.Body>
      </Card>
    </Container>
  )
}
```

**Depois (Tailwind + shadcn):**
```tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function MinhaFeature() {
  return (
    <div className="container mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Título</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Conteúdo</p>
          <Button>Ação</Button>
        </CardContent>
      </Card>
    </div>
  )
}
```

### 4. Migrar Estilos SCSS

#### Cores
- **Antes**: Variáveis SCSS (`$primary-color`)
- **Depois**: Tailwind CSS variables e classes (`text-primary`, `bg-primary`)

#### Layout
- **Antes**: Classes Bootstrap (`col-md-6`)
- **Depois**: Tailwind Grid/Flex (`grid grid-cols-2`, `flex gap-4`)

#### Espaçamento
- **Antes**: `mb-3`, `mt-4` (Bootstrap)
- **Depois**: `mb-3`, `mt-4` (Tailwind - similar!)

### 5. Rotas

**Antes:**
```tsx
{
  path: "/minha-feature",
  element: <Protected children={<MinhaFeature />} requiredRoles={[ROLES.ADMIN]} />
}
```

**Depois:**
```tsx
{
  path: "/minha-feature",
  element: <MinhaFeature />
}
// A proteção já está no layout pai (AppLayout)
```

### 6. Contextos e Hooks

- ✅ `AuthContext` → mantém estrutura similar
- ✅ `useAuth` → continua igual
- ✅ React Query → sem mudanças
- ⚠️ Remover dependências de Bootstrap

---

## Classes Tailwind Úteis

### Layout
```
container mx-auto          # Container centralizado
max-w-4xl                 # Largura máxima
grid grid-cols-2          # Grid 2 colunas
flex gap-4                # Flexbox com espaçamento
```

### Tipografia
```
text-3xl font-bold        # Título grande
text-sm text-muted-foreground  # Texto pequeno secundário
```

### Espaçamento
```
p-6                       # Padding
m-4                       # Margin
space-y-4                 # Espaço vertical entre filhos
```

### Cores (shadcn)
```
bg-primary text-primary-foreground
bg-secondary text-secondary-foreground
bg-destructive text-destructive-foreground
bg-muted text-muted-foreground
```

---

## Instalando Componentes shadcn/ui Adicionais

```bash
# Instalar Dialog
npx shadcn@latest add dialog

# Instalar Input
npx shadcn@latest add input

# Instalar Form
npx shadcn@latest add form

# Ver todos disponíveis
# https://ui.shadcn.com/docs/components
```

---

## Checklist de Migração

### Preparação
- [ ] Template clonado e funcionando
- [ ] Ambiente configurado (`.env`)
- [ ] Dependências instaladas
- [ ] Dev server rodando

### Por Feature
- [ ] Pasta criada em `/features`
- [ ] Lógica de negócio migrada
- [ ] Componentes reescritos com shadcn/ui
- [ ] Estilos convertidos para Tailwind
- [ ] Rotas atualizadas
- [ ] Testes manuais realizados

### Finalização
- [ ] Todas as features migradas
- [ ] Build de produção funcional
- [ ] Variáveis de ambiente de prod configuradas
- [ ] `VITE_DEV_AUTH_BYPASS=false` em produção
- [ ] Documentação atualizada

---

## Recursos Úteis

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com/docs/components)
- [shadcn/ui Blocks](https://ui.shadcn.com/blocks)
- [Lucide Icons](https://lucide.dev)
- [React Router Docs](https://reactrouter.com)

---

## Dicas

1. **Migre feature por feature** - não tente migrar tudo de uma vez
2. **Use o TODO example** como referência de estrutura
3. **Consulte shadcn/ui blocks** para layouts prontos
4. **Mantenha a lógica de negócio** - só mude a apresentação
5. **Teste constantemente** durante a migração
6. **Use DEV_AUTH_BYPASS** para agilizar testes

---

## Suporte

- Consulte `.github/instructions` para convenções
- Veja `README.md` para arquitetura geral
- Analise features de exemplo (`/todos`, `/example`)
- Revise componentes de layout (`/components/layout`)

Boa migração! 🚀
