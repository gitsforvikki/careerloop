/**
 * Safe, user-friendly authentication error messaging.
 * Ensures no database internals, SQL snippets, or stack traces leak to the client.
 */
export function getAuthErrorMessage(error: unknown): string {
  if (!error) {
    return "An unexpected error occurred. Please try again.";
  }

  let rawMessage = "";

  if (typeof error === "string") {
    rawMessage = error;
  } else if (typeof error === "object" && error !== null) {
    const err = error as { message?: string; statusText?: string };
    rawMessage = err.message || err.statusText || "";
  }

  const normalized = rawMessage.toLowerCase();

  // Known Better Auth / credential conditions
  if (
    normalized.includes("invalid email or password") ||
    normalized.includes("invalid password") ||
    normalized.includes("invalid credentials") ||
    normalized.includes("user not found")
  ) {
    return "Invalid email or password. Please verify your credentials.";
  }

  if (
    normalized.includes("user already exists") ||
    normalized.includes("already registered") ||
    normalized.includes("email already in use") ||
    normalized.includes("unique constraint")
  ) {
    return "An account with this email address already exists. Please sign in instead.";
  }

  if (
    normalized.includes("rate limit") ||
    normalized.includes("too many requests")
  ) {
    return "Too many attempts. Please wait a few moments and try again.";
  }

  if (
    normalized.includes("password is too short") ||
    normalized.includes("password must be")
  ) {
    return "Password does not meet length requirements (minimum 8 characters).";
  }

  // Prevent leakage of SQL / neon / server traces
  if (
    rawMessage.includes("SELECT") ||
    rawMessage.includes("INSERT") ||
    rawMessage.includes("postgres") ||
    rawMessage.includes("neon") ||
    rawMessage.includes("column") ||
    rawMessage.includes("relation") ||
    rawMessage.includes("drizzle") ||
    rawMessage.length > 150
  ) {
    return "Unable to complete request due to a server error. Please try again later.";
  }

  return rawMessage || "Authentication request failed. Please try again.";
}
