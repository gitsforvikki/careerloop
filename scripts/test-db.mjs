import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";

// Load environment variables from .env.local and .env
config({ path: ".env.local" });
config();

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error("❌ Error: DATABASE_URL environment variable is not defined.");
  process.exit(1);
}

try {
  const sql = neon(databaseUrl);
  const result = await sql`SELECT 1 AS connected`;
  console.log("✅ Database connection successful!");
  console.log("Query result:", JSON.stringify(result));
  process.exit(0);
} catch (error) {
  console.error("❌ Database connection failed.");
  const rawMessage = error instanceof Error ? error.message : String(error);
  const sanitizedMessage = rawMessage.replace(
    /(postgres(?:ql)?:\/\/[^:]+:)([^@]+)(@)/gi,
    "$1***$3"
  );
  console.error("Reason:", sanitizedMessage);
  process.exit(1);
}
