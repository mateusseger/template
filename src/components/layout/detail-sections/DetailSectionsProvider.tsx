// filepath: src/components/layout/detail-sections/DetailSectionsProvider.tsx
import {
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect,
    useRef,
    type ReactNode,
    type RefObject,
} from "react"
import { type LucideIcon } from "lucide-react"

export interface SectionData {
    id: string
    label: string
    icon?: LucideIcon
}

interface DetailSectionsContextValue {
    sections: SectionData[]
    activeSectionId: string | null
    registerSection: (section: SectionData, ref: RefObject<HTMLElement>) => void
    unregisterSection: (id: string) => void
    scrollToSection: (id: string) => void
}

const DetailSectionsContext = createContext<DetailSectionsContextValue | undefined>(undefined)

/**
 * DetailSectionsProvider - Gerencia registro e observação de seções em páginas de detalhe
 *
 * Responsabilidades:
 * - Registrar/desregistrar seções dinamicamente
 * - Observar qual seção está atualmente visível (IntersectionObserver)
 * - Fornecer API para scroll suave entre seções
 * - Manter ordenação das seções conforme aparecem no DOM
 *
 * Arquitetura:
 * - Map para armazenar refs de seções por ID
 * - IntersectionObserver para detectar seção visível
 * - Threshold de 0.5 para ativar quando seção está 50% visível
 * - Cleanup automático no unmount
 */
export function DetailSectionsProvider({ children }: { children: ReactNode }) {
    const [sections, setSections] = useState<SectionData[]>([])
    const [activeSectionId, setActiveSectionId] = useState<string | null>(null)
    const sectionRefs = useRef<Map<string, RefObject<HTMLElement>>>(new Map())
    const observerRef = useRef<IntersectionObserver | null>(null)

    /**
     * Registra uma nova seção no provider
     */
    const registerSection = useCallback((section: SectionData, ref: RefObject<HTMLElement>) => {
        sectionRefs.current.set(section.id, ref)

        setSections((prev) => {
            // Evita duplicatas
            if (prev.some((s) => s.id === section.id)) {
                return prev
            }
            return [...prev, section]
        })
    }, [])

    /**
     * Remove uma seção do provider
     */
    const unregisterSection = useCallback((id: string) => {
        sectionRefs.current.delete(id)
        setSections((prev) => prev.filter((s) => s.id !== id))
    }, [])

    /**
     * Realiza scroll suave para uma seção específica
     */
    const scrollToSection = useCallback((id: string) => {
        const ref = sectionRefs.current.get(id)
        const element = ref?.current

        if (element) {
            // Scroll suave com offset para header
            const yOffset = -80 // Ajuste conforme altura do header
            const y = element.getBoundingClientRect().top + window.scrollY + yOffset

            window.scrollTo({ top: y, behavior: "smooth" })

            // Foco para acessibilidade
            setTimeout(() => {
                element.focus({ preventScroll: true })
            }, 500)
        }
    }, [])

    /**
     * Configura IntersectionObserver para detectar seção ativa
     */
    useEffect(() => {
        // Cleanup do observer anterior
        if (observerRef.current) {
            observerRef.current.disconnect()
        }

        // Cria novo observer
        observerRef.current = new IntersectionObserver(
            (entries) => {
                // Encontra a entrada com maior intersectionRatio
                const visibleEntry = entries.reduce((max, entry) => {
                    return entry.intersectionRatio > (max?.intersectionRatio || 0) ? entry : max
                }, entries[0])

                if (visibleEntry?.isIntersecting) {
                    setActiveSectionId(visibleEntry.target.id)
                }
            },
            {
                threshold: [0, 0.25, 0.5, 0.75, 1],
                rootMargin: "-80px 0px -40% 0px", // Header offset e foco na parte superior
            }
        )

        // Observa todos os elementos registrados
        sectionRefs.current.forEach((ref) => {
            if (ref.current && observerRef.current) {
                observerRef.current.observe(ref.current)
            }
        })

        return () => {
            observerRef.current?.disconnect()
        }
    }, [sections])

    return (
        <DetailSectionsContext.Provider
            value={{
                sections,
                activeSectionId,
                registerSection,
                unregisterSection,
                scrollToSection,
            }}
        >
            {children}
        </DetailSectionsContext.Provider>
    )
}

/**
 * useDetailSections - Hook para acessar a API de detail sections
 *
 * @throws {Error} Se usado fora do DetailSectionsProvider
 */
export function useDetailSections() {
    const context = useContext(DetailSectionsContext)
    if (!context) {
        throw new Error("useDetailSections must be used within DetailSectionsProvider")
    }
    return context
}
