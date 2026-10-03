"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { loginSchema } from "@/lib/validations/auth";
import { getAuthErrorMessage } from "@/lib/auth/auth-errors";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

export function LoginForm() {
  const router = useRouter();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [rememberMe, setRememberMe] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const [fieldErrors, setFieldErrors] = React.useState<Record<string, string>>({});
  const [serverError, setServerError] = React.useState<string | null>(null);
  const [status, setStatus] = React.useState<"idle" | "submitting" | "success">("idle");

  const isSubmitting = status === "submitting";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isSubmitting) return;

    // Reset previous errors
    setFieldErrors({});
    setServerError(null);

    // Client-side Zod validation
    const result = loginSchema.safeParse({
      email,
      password,
      rememberMe,
    });

    if (!result.success) {
      const formattedErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const fieldName = issue.path[0];
        if (typeof fieldName === "string" && !formattedErrors[fieldName]) {
          formattedErrors[fieldName] = issue.message;
        }
      }
      setFieldErrors(formattedErrors);
      return;
    }

    setStatus("submitting");

    try {
      const response = await authClient.signIn.email({
        email: result.data.email,
        password: result.data.password,
        rememberMe: result.data.rememberMe,
        callbackURL: "/dashboard",
      });

      if (response.error) {
        setStatus("idle");
        setServerError(getAuthErrorMessage(response.error));
        return;
      }

      setStatus("success");
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      setStatus("idle");
      setServerError(getAuthErrorMessage(err));
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      {/* Server Error Alert */}
      {serverError && (
        <div
          role="alert"
          aria-live="polite"
          className="flex items-start gap-2.5 rounded-lg border border-destructive/30 bg-destructive/10 p-3 text-xs text-destructive dark:text-red-400"
        >
          <AlertCircle className="size-4 shrink-0 mt-0.5" />
          <span className="leading-relaxed">{serverError}</span>
        </div>
      )}

      {/* Email Field */}
      <div className="space-y-1.5">
        <Label htmlFor="login-email" className="text-xs font-medium">
          Email address
        </Label>
        <Input
          id="login-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="name@company.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (fieldErrors.email) {
              setFieldErrors((prev) => {
                const next = { ...prev };
                delete next.email;
                return next;
              });
            }
          }}
          disabled={isSubmitting}
          aria-invalid={Boolean(fieldErrors.email)}
          aria-describedby={fieldErrors.email ? "login-email-error" : undefined}
          required
        />
        {fieldErrors.email && (
          <p
            id="login-email-error"
            role="alert"
            className="text-[11px] font-medium text-destructive dark:text-red-400"
          >
            {fieldErrors.email}
          </p>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between">
          <Label htmlFor="login-password" className="text-xs font-medium">
            Password
          </Label>
        </div>
        <div className="relative">
          <Input
            id="login-password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (fieldErrors.password) {
                setFieldErrors((prev) => {
                  const next = { ...prev };
                  delete next.password;
                  return next;
                });
              }
            }}
            disabled={isSubmitting}
            aria-invalid={Boolean(fieldErrors.password)}
            aria-describedby={fieldErrors.password ? "login-password-error" : undefined}
            className="pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            disabled={isSubmitting}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer p-0.5 rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            {showPassword ? (
              <EyeOff className="size-4" aria-hidden="true" />
            ) : (
              <Eye className="size-4" aria-hidden="true" />
            )}
          </button>
        </div>
        {fieldErrors.password && (
          <p
            id="login-password-error"
            role="alert"
            className="text-[11px] font-medium text-destructive dark:text-red-400"
          >
            {fieldErrors.password}
          </p>
        )}
      </div>

      {/* Remember Me Checkbox */}
      <div className="flex items-center gap-2 pt-0.5">
        <Checkbox
          id="login-remember-me"
          name="rememberMe"
          checked={rememberMe}
          onCheckedChange={(checked) => setRememberMe(Boolean(checked))}
          disabled={isSubmitting}
        />
        <Label
          htmlFor="login-remember-me"
          className="text-xs text-muted-foreground font-normal cursor-pointer select-none"
        >
          Remember me on this browser
        </Label>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-9 font-medium cursor-pointer transition-all"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="size-4 animate-spin mr-1.5" aria-hidden="true" />
            <span>Signing in...</span>
          </>
        ) : status === "success" ? (
          <span>Redirecting to dashboard...</span>
        ) : (
          <span>Sign in</span>
        )}
      </Button>
    </form>
  );
}
