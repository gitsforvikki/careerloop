import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";
import * as authSchema from "./auth-schema";
import * as relations from "./relations";

const sql = neon(process.env.DATABASE_URL!);

/**
 * CareerLoop Drizzle Database Client:
 * Configured with Neon HTTP connection, registering domain schema,
 * Better Auth schema, and all entity relations.
 */
export const db = drizzle(sql, {
  schema: { ...schema, ...authSchema, ...relations },
});
