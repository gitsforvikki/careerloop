import { headers } from "next/headers";
import { auth } from "@/lib/auth";

/**
 * getSession:
 *
 * Reusable server-side helper to fetch the current Better Auth session
 * using incoming request headers in Next.js Server Components.
 */
export async function getSession() {
  return await auth.api.getSession({
    headers: await headers(),
  });
}
