import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"

export function ExamplePage() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Example Page</h1>
        <p className="text-muted-foreground mt-2">
          This is a blank page template for building new features
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Getting Started</CardTitle>
          <CardDescription>
            Use this page as a starting point for your new feature
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm">
            This template includes everything you need to start building:
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
            <li>React Router for navigation</li>
            <li>Tailwind CSS for styling</li>
            <li>shadcn/ui components</li>
            <li>React Query for data fetching</li>
            <li>OIDC authentication</li>
            <li>TypeScript for type safety</li>
          </ul>
          <div className="pt-4">
            <Button>Start Building</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
