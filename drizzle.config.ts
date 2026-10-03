import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

// Load environment variables for Drizzle Kit CLI
config({ path: ".env.local" });
config();

export default defineConfig({
  dialect: "postgresql",
  schema: ["./db/schema.ts", "./db/auth-schema.ts"],
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
