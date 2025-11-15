import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/core/hooks/useAuth"

export function HomePage() {
    const { user } = useAuth()

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">
                    Welcome{user?.name ? `, ${user.name}` : ""}!
                </h1>
                <p className="text-muted-foreground mt-2">
                    Welcome to the React Template Application
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Start</CardTitle>
                        <CardDescription>Get started with the template</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">
                            This template provides a clean, scalable foundation for building React applications with
                            best practices built in.
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Features</CardTitle>
                        <CardDescription>What's included</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                            <li>Authentication with OIDC</li>
                            <li>Protected routes</li>
                            <li>Modern UI with shadcn/ui</li>
                            <li>Feature-based architecture</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
