import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/get-session";
import { AuthCard } from "@/components/auth/auth-card";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Sign In | CareerLoop",
  description: "Sign in to your CareerLoop account to manage and accelerate your career applications.",
};

export default async function LoginPage() {
  const session = await getSession();

  // If already authenticated, redirect to /dashboard
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <AuthCard
      title="Welcome back"
      description="Enter your credentials to access your job search workspace"
      footerText="Don't have an account yet?"
      footerLinkText="Sign up for free"
      footerLinkHref="/signup"
    >
      <LoginForm />
    </AuthCard>
  );
}
