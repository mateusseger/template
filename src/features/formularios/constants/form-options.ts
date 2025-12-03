export const CARGOS_OPTIONS = [
    { value: "dev", label: "Desenvolvedor" },
    { value: "designer", label: "Designer" },
    { value: "gerente", label: "Gerente" },
    { value: "analista", label: "Analista" },
] as const

export const SKILLS_OPTIONS = [
    "React",
    "TypeScript",
    "Node.js",
    "Python",
    "Design",
    "UX/UI",
    "Gestão",
    "Análise de Dados",
] as const

export type CargoValue = typeof CARGOS_OPTIONS[number]["value"]
export type SkillValue = typeof SKILLS_OPTIONS[number]
