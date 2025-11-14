import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import type { ReactNode } from "react"

interface PageTransitionProps {
    children: ReactNode
}

export function AppPageTransition({ children }: PageTransitionProps) {
    const location = useLocation()
    const [displayLocation, setDisplayLocation] = useState(location)
    const [transitionStage, setTransitionStage] = useState<"fadeIn" | "fadeOut">("fadeIn")

    useEffect(() => {
        if (location !== displayLocation) {
            setTransitionStage("fadeOut")
        }
    }, [location, displayLocation])

    return (
        <div
            className={`transition-all duration-200 ${transitionStage === "fadeOut"
                ? "opacity-0 -translate-y-2"
                : "opacity-100 translate-y-0"
                }`}
            onTransitionEnd={() => {
                if (transitionStage === "fadeOut") {
                    setDisplayLocation(location)
                    setTransitionStage("fadeIn")
                }
            }}
        >
            {displayLocation.pathname === location.pathname ? children : null}
        </div>
    )
}

