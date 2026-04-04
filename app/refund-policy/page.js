import Link from "next/link";
import { LogoMark } from "@/app/components/Logo";

export const metadata = {
  title: "Refund Policy — Bidlyze",
  description: "Refund Policy for Bidlyze, the AI-powered RFx and tender intelligence platform.",
};

export default function RefundPolicyPage() {
  return (
    <div className="min-h-screen" style={{ background: "var(--bg-primary)", color: "var(--text-primary)" }}>
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md" style={{ background: "var(--bg-primary-translucent)", borderBottom: "1px solid var(--border-primary)" }}>
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <LogoMark size={30} />
            <span className="text-base font-semibold tracking-tight">Bidlyze</span>
          </Link>
          <Link href="/login" className="text-sm font-medium transition-colors" style={{ color: "var(--text-secondary)" }}>
            Sign In
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">Refund Policy</h1>
        <p className="text-sm mb-12" style={{ color: "var(--text-muted)" }}>Last updated: April 4, 2026</p>

        <div className="space-y-10 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>1. Overview</h2>
            <p>
              Bidlyze offers a free plan so you can evaluate the platform before subscribing. If you
              subscribe to a paid plan and are not satisfied, you may request a refund as described below.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>2. Billing</h2>
            <p>
              Paid subscriptions are billed on a monthly recurring basis through our merchant of record,
              Paddle (Paddle.com Market Limited). Current plan pricing is available on our{" "}
              <Link href="/#pricing" className="text-emerald-500 hover:underline">Pricing section</Link>.
              Paddle handles all billing, invoicing, and tax-related processing.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>3. Refunds</h2>
            <p>
              If you are not satisfied with your paid subscription, you may request a refund
              within <strong>14 days</strong> of your purchase. To request a refund, email{" "}
              <a href="mailto:support@bidlyze.com" className="text-emerald-500 hover:underline">support@bidlyze.com</a>{" "}
              with your account email address and we will process your request promptly.
            </p>
            <p className="mt-3">
              Refunds are processed through Paddle and returned to your original payment method. Processing
              times may vary depending on your bank or payment provider.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>4. Cancellation</h2>
            <p>
              You may cancel your subscription at any time. When you cancel:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Your subscription remains active until the end of the current billing period.</li>
              <li>No further charges will be made after cancellation.</li>
              <li>After the billing period ends, your account will transition to the Free plan.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>5. Billing Issues</h2>
            <p>
              If you experience a billing error or duplicate charge, please contact us at{" "}
              <a href="mailto:support@bidlyze.com" className="text-emerald-500 hover:underline">support@bidlyze.com</a>{" "}
              and we will resolve it as quickly as possible.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>6. Changes to This Policy</h2>
            <p>
              We may update this Refund Policy from time to time. Changes will be posted on this page with an
              updated &quot;Last updated&quot; date.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>7. Contact</h2>
            <p>For billing questions or refund requests:</p>
            <ul className="list-none mt-2 space-y-1">
              <li>Email: <a href="mailto:support@bidlyze.com" className="text-emerald-500 hover:underline">support@bidlyze.com</a></li>
              <li>Website: <a href="https://bidlyze.com" className="text-emerald-500 hover:underline">bidlyze.com</a></li>
            </ul>
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid var(--border-primary)" }}>
        <div className="max-w-4xl mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            &copy; {new Date().getFullYear()} Bidlyze. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-xs" style={{ color: "var(--text-muted)" }}>
            <Link href="/terms" className="hover:text-emerald-500 transition-colors">Terms</Link>
            <Link href="/privacy" className="hover:text-emerald-500 transition-colors">Privacy</Link>
            <Link href="/refund-policy" className="text-emerald-500 font-medium">Refunds</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
