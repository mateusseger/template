# Design System - Template React

## 🎨 Visão Geral

Este template implementa um design system completo baseado em **shadcn/ui** e **Tailwind CSS 4**, com suporte a três temas corporativos e modo escuro/claro.

---

## 🌈 Sistema de Temas

### Temas Disponíveis

O template suporta três variações de tema, cada uma com modo claro e escuro:

| Empresa | Cor Primária | Hex Code | Use Case |
|---------|--------------|----------|----------|
| **Empresa A** | Vermelho | `#dc2626` (red-600) | Empresas com identidade vermelha |
| **Empresa B** | Laranja | `#ea580c` (orange-600) | Empresas com identidade laranja |
| **Empresa C** | Verde | `#16a34a` (green-600) | Empresas com identidade verde |

### Configuração de Tema

#### Via CLI (Recomendado)

```bash
npm run setup
```

O CLI interativo permite escolher o tema padrão que será salvo no `.env`.

#### Via `.env`

```env
VITE_APP_THEME=red      # ou orange, ou green
```

#### Programaticamente

```typescript
import { useTheme } from "./themes"

function MyComponent() {
  const { setThemeColor } = useTheme()
  
  // Trocar tema
  setThemeColor("orange")
}
```

---

## 🌗 Modo Claro/Escuro

### Troca de Modo

O template inclui um componente `ThemeSwitcher` no header que permite alternar entre light e dark mode.

```typescript
import { useTheme } from "./themes"

function MyComponent() {
  const { theme, toggleMode, setThemeMode } = useTheme()
  
  // Toggle
  toggleMode()
  
  // Ou definir explicitamente
  setThemeMode("dark")
  
  // Verificar modo atual
  console.log(theme.mode) // "light" ou "dark"
}
```

### Persistência

- O tema e modo escolhidos são salvos automaticamente no `localStorage`
- A aplicação restaura as preferências do usuário ao recarregar
- Detecção automática de `prefers-color-scheme` na primeira visita

---

## 🎯 Tokens de Design

### Cores

Todas as cores são definidas via CSS variables e se adaptam automaticamente ao tema e modo:

```css
--color-background       /* Fundo principal */
--color-foreground       /* Texto principal */
--color-primary          /* Cor primária (tema específico) */
--color-primary-foreground
--color-secondary        /* Cor secundária */
--color-secondary-foreground
--color-accent           /* Cor de destaque */
--color-accent-foreground
--color-muted            /* Cor neutra */
--color-muted-foreground
--color-destructive      /* Cor de erro/perigo */
--color-destructive-foreground
--color-border           /* Bordas */
--color-input            /* Inputs */
--color-ring             /* Focus rings */
--color-card             /* Cards */
--color-card-foreground
--color-popover          /* Popovers */
--color-popover-foreground
```

### Uso no Tailwind

```tsx
<div className="bg-primary text-primary-foreground">
  Texto com cor primária do tema
</div>

<div className="bg-accent text-accent-foreground">
  Destaque com cor de accent
</div>
```

### Raio de Borda

```css
--radius: 0.5rem  /* 8px */
```

Usado em:
```tsx
<div className="rounded-md">  /* usa var(--radius) */
```

---

## 🧱 Componentes

### Componentes Disponíveis

Todos os componentes seguem os padrões do shadcn/ui:

- **Button** - Botões com múltiplas variantes
- **Card** - Containers de conteúdo
- **Input** - Campos de formulário
- **Badge** - Tags e labels
- **Separator** - Divisores visuais
- **Skeleton** - Loading placeholders
- **Switch** - Toggle switches

### Button

```tsx
import { Button } from "./components/ui/button"

// Variantes
<Button variant="default">Default</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="outline">Outline</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="link">Link</Button>

// Tamanhos
<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">🎨</Button>
```

#### Características

- ✅ Transição suave de 200ms
- ✅ Efeito de scale ao clicar (`active:scale-95`)
- ✅ Shadow ao hover
- ✅ Focus ring acessível
- ✅ Estados disabled

### Card

```tsx
import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent,
  CardFooter 
} from "./components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Título</CardTitle>
    <CardDescription>Descrição</CardDescription>
  </CardHeader>
  <CardContent>
    Conteúdo principal
  </CardContent>
  <CardFooter>
    Rodapé opcional
  </CardFooter>
</Card>
```

#### Características

- ✅ Hover com shadow elevada
- ✅ Transições suaves
- ✅ Adaptação automática ao tema

### Input

```tsx
import { Input } from "./components/ui/input"

<Input type="text" placeholder="Digite algo..." />
<Input type="email" placeholder="email@example.com" />
<Input disabled placeholder="Desabilitado" />
```

#### Características

- ✅ Focus ring com cor primária
- ✅ Transições de 200ms
- ✅ Estados hover, focus, disabled
- ✅ Placeholder estilizado

### Badge

```tsx
import { Badge } from "./components/ui/badge"

<Badge>Default</Badge>
<Badge variant="secondary">Secondary</Badge>
<Badge variant="outline">Outline</Badge>
<Badge variant="destructive">Error</Badge>
```

### Skeleton

```tsx
import { Skeleton } from "./components/ui/skeleton"

<Skeleton className="h-4 w-full" />
<Skeleton className="h-4 w-3/4" />
<Skeleton className="h-8 w-8 rounded-full" />
```

---

## ✨ Microinterações e UX

### Transições

Todos os componentes incluem transições suaves:

```css
transition-all duration-200 /* Padrão para a maioria */
transition-all duration-300 /* Para mudanças de tema */
```

### Hover States

- Mudança de cor de fundo
- Elevação de shadow
- Transformação sutil (translate, scale)

### Active States

- Efeito de "clique" (`active:scale-95`)
- Feedback tátil visual

### Focus States

- Focus ring com `ring-2 ring-primary ring-offset-2`
- Acessibilidade garantida

### Loading States

```tsx
// Skeleton para conteúdo
<Skeleton className="h-20 w-full" />

// Button com loading
<Button disabled>
  <Loader className="animate-spin" />
  Carregando...
</Button>
```

---

## 🎭 Boas Práticas

### ✅ Fazer

1. **Usar componentes shadcn**
   ```tsx
   import { Button } from "./components/ui/button"
   <Button>Click me</Button>
   ```

2. **Usar tokens de cor**
   ```tsx
   <div className="bg-primary text-primary-foreground">
   ```

3. **Adicionar transições**
   ```tsx
   <div className="transition-all duration-200 hover:scale-105">
   ```

4. **Manter acessibilidade**
   ```tsx
   <button aria-label="Fechar" className="focus-visible:ring-2">
   ```

### ❌ Evitar

1. **CSS inline**
   ```tsx
   ❌ <div style={{ backgroundColor: '#dc2626' }}>
   ✅ <div className="bg-primary">
   ```

2. **Cores hardcoded**
   ```tsx
   ❌ <div className="bg-red-600">
   ✅ <div className="bg-primary">
   ```

3. **HTML puro quando existe componente shadcn**
   ```tsx
   ❌ <button className="...custom classes...">
   ✅ <Button>...</Button>
   ```

4. **Customizações desnecessárias**
   ```tsx
   ❌ Criar componente próprio de botão
   ✅ Usar <Button> do shadcn
   ```

---

## 🛠️ Adicionando Novos Componentes

### Via shadcn CLI

```bash
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add toast
```

### Manualmente

1. Criar arquivo em `src/components/ui/`
2. Seguir padrão shadcn
3. Usar `cn()` utility para classes
4. Incluir transições

Exemplo:

```tsx
import { cn } from "../../core/utils/cn"

export function MyComponent({ className, ...props }) {
  return (
    <div 
      className={cn(
        "transition-all duration-200",
        "hover:bg-accent",
        className
      )}
      {...props}
    />
  )
}
```

---

## 🎨 Customizando Temas

### Adicionar Novo Tema

1. Editar `src/themes/themes.ts`:

```typescript
export const themes = {
  red: { ... },
  orange: { ... },
  green: { ... },
  blue: {  // Novo tema
    light: {
      primary: "#2563eb",
      "primary-foreground": "#ffffff",
      // ... outras cores
    },
    dark: {
      primary: "#3b82f6",
      // ... outras cores
    }
  }
}
```

2. Atualizar types em `src/themes/types.ts`:

```typescript
export type ThemeColor = "red" | "orange" | "green" | "blue"
```

3. Atualizar CLI em `scripts/setup-theme.js`

---

## 📐 Responsividade

### Breakpoints Tailwind

```
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### Uso

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  {/* Layout responsivo */}
</div>

<Button size="sm" className="md:size-default">
  Tamanho adaptativo
</Button>
```

---

## ♿ Acessibilidade

### Recursos Incluídos

- ✅ Focus visible em todos os componentes interativos
- ✅ Contraste adequado (WCAG AA)
- ✅ Suporte a navegação por teclado
- ✅ ARIA labels quando necessário
- ✅ Semantic HTML

### Verificação

```tsx
// Sempre incluir aria-label em ícones sem texto
<button aria-label="Fechar modal">
  <X />
</button>

// Focus ring
<Button className="focus-visible:ring-2">
  Click me
</Button>
```

---

## 📊 Performance

### Otimizações

- CSS variables para temas (sem re-render)
- Transições com `transform` e `opacity` (GPU)
- Componentes leves e tree-shakeable
- Lazy loading de rotas

### Bundle Size

- shadcn components: ~15-20KB total
- Tailwind CSS: ~10KB (purged)
- Icons (lucide-react): ~2KB per icon

---

## 🧪 Testando Temas

### Página de Demonstração

Acesse `/design-system` para ver:
- Todos os componentes
- Todas as variantes
- Paleta de cores do tema atual
- Troca interativa de temas
- Exemplos de uso

### Teste Manual

1. Execute `npm run setup`
2. Escolha um tema
3. Execute `npm run dev`
4. Acesse `/design-system`
5. Teste light/dark mode
6. Teste todos os componentes

---

## 📝 Checklist de Novo Componente

Ao criar ou adicionar componente:

- [ ] Usa tokens de cor (não cores hardcoded)
- [ ] Inclui `transition-all duration-200`
- [ ] Tem estados hover/focus/active
- [ ] É acessível (aria-*, semantic HTML)
- [ ] Funciona em light e dark mode
- [ ] Funciona nos 3 temas (red, orange, green)
- [ ] Está documentado

---

## 🔗 Recursos

- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Tailwind CSS v4](https://tailwindcss.com)
- [Radix UI Primitives](https://www.radix-ui.com)
- [Lucide Icons](https://lucide.dev)

---

**Versão**: 3.0.0  
**Última Atualização**: 13 de Novembro de 2024  
**Status**: Design System Completo ✅
