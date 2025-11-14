import { type UserManagerSettings, WebStorageStateStore } from "oidc-client"

export const oidcConfig: UserManagerSettings = {
  authority: import.meta.env.VITE_APP_AUTHORITY,
  client_id: import.meta.env.VITE_APP_CLIENT_ID,
  redirect_uri: `${window.location.origin}/auth/callback`,
  silent_redirect_uri: `${window.location.origin}/auth/callback`,
  response_type: import.meta.env.VITE_APP_RESPONSE_TYPE,
  scope: import.meta.env.VITE_APP_SCOPE,
  post_logout_redirect_uri: `${window.location.origin}`,
  userStore: new WebStorageStateStore({ store: window.localStorage }),
  stateStore: new WebStorageStateStore({ store: window.localStorage }),
  revokeAccessTokenOnSignout: true,
}
