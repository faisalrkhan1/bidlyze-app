import { Suspense } from "react";
import LoginPageClient from "./LoginPageClient";

export const metadata = {
  title: "Sign In",
  description: "Sign in to Bidlyze to analyze tenders, track compliance, and generate bid proposals with AI.",
};

function LoginPageFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}>
      <div className="animate-spin h-8 w-8 border-2 border-emerald-500 border-t-transparent rounded-full" />
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<LoginPageFallback />}>
      <LoginPageClient />
    </Suspense>
  );
}
