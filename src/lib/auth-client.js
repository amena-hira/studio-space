import { createAuthClient } from "better-auth/react"

// Auth routes are served from this Next.js app, so Better Auth can use the
// current origin. Server-only environment variables are unavailable here.
export const authClient = createAuthClient()
