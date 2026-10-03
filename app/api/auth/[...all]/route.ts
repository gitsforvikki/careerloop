import { toNextJsHandler } from "better-auth/next-js";
import { auth } from "@/lib/auth";

/**
 * Better Auth Next.js API Route Handler:
 *
 * Catch-all route handling all Better Auth HTTP requests
 * including /api/auth/sign-in, /api/auth/sign-up, /api/auth/sign-out, and /api/auth/session.
 */
export const { GET, POST } = toNextJsHandler(auth);
