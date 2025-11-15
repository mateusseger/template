import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function UnauthorizedPage() {
    return (
        <div className="flex min-h-screen items-center justify-center p-6">
            <Card className="max-w-md w-full">
                <CardHeader>
                    <CardTitle>Unauthorized</CardTitle>
                    <CardDescription>
                        You do not have permission to access this page.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground">
                        Please contact your administrator if you believe you should have access.
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}
