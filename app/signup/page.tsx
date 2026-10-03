import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth/get-session";
import { AuthCard } from "@/components/auth/auth-card";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "Create Account | CareerLoop",
  description: "Create your CareerLoop account to track, manage, and accelerate your job search lifecycle.",
};

export default async function SignupPage() {
  const session = await getSession();

  // If already authenticated, redirect to /dashboard
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <AuthCard
      title="Create an account"
      description="Start tracking your applications and accelerate your career"
      footerText="Already have an account?"
      footerLinkText="Sign in"
      footerLinkHref="/login"
    >
      <SignupForm />
    </AuthCard>
  );
}
