import { betterAuth } from "better-auth";
import { drizzleAdapter } from "@better-auth/drizzle-adapter";
import { db } from "@/db";
import * as schema from "@/db/schema";
import * as authSchema from "@/db/auth-schema";

/**
 * Better Auth Server Configuration:
 *
 * - Adapter: Drizzle ORM configured with PostgreSQL ('pg') provider.
 * - Database Schema: Combines CareerLoop domain schema and auth schema.
 * - Model Mapping: Maps Better Auth's internal 'user' model to our existing 'users' domain table.
 * - Authentication: Email and password authentication enabled.
 * - Secrets & URLs: Uses BETTER_AUTH_SECRET and BETTER_AUTH_URL environment variables.
 */
export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      ...schema,
      ...authSchema,
    },
  }),
  user: {
    // Map Better Auth's internal 'user' model name to our existing 'users' PostgreSQL table
    modelName: "users",
  },
  emailAndPassword: {
    enabled: true,
  },
  advanced: {
    database: {
      generateId: () => crypto.randomUUID(),
    },
  },
  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,
});
