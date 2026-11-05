import { auth } from "@/lib/auth";

export async function GET() {
  const jwks = await auth.api.getJwks();
  return Response.json(jwks);
}
