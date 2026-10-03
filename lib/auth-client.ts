import { createAuthClient } from "better-auth/react";

/**
 * Better Auth Client Instance:
 *
 * Provides React hooks and methods (signIn, signUp, signOut, useSession)
 * for client-side authentication interactions in CareerLoop.
 * Uses same-origin default for API routing.
 */
export const authClient = createAuthClient();

export const { signIn, signUp, signOut, useSession } = authClient;
