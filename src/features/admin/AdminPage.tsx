import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { useAuthorization } from "../../hooks/useAuthorization"

export function AdminPage() {
  const { userRoles } = useAuthorization()

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Admin Panel</h1>
        <p className="text-muted-foreground mt-2">
          This page is only accessible to users with admin role
        </p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Your Roles</CardTitle>
          <CardDescription>Current user roles assigned to you</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {userRoles.map((role) => (
              <span
                key={role}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary text-primary-foreground"
              >
                {role}
              </span>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Admin Features</CardTitle>
          <CardDescription>
            Features available only to administrators
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm">
            This is an example of a protected page that requires the <code className="bg-muted px-1 py-0.5 rounded">admin</code> role.
          </p>
          <p className="text-sm text-muted-foreground">
            To test role-based access control:
          </p>
          <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
            <li>Change <code className="bg-muted px-1 py-0.5 rounded">VITE_DEV_MOCK_ROLES</code> in your <code className="bg-muted px-1 py-0.5 rounded">.env</code> file</li>
            <li>Remove <code className="bg-muted px-1 py-0.5 rounded">admin</code> from the roles list</li>
            <li>Refresh the page - you'll be redirected to /unauthorized</li>
            <li>Add it back to regain access</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
