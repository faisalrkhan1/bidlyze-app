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
              This Refund Policy outlines the terms under which refunds may be issued for paid subscriptions
              to the Bidlyze platform. By subscribing to a paid plan, you agree to the billing and refund
              terms described below.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>2. Free Plan</h2>
            <p>
              Bidlyze offers a Free plan at no cost. Since no payment is collected, no refund applies.
              We encourage new users to evaluate the platform on the Free plan before subscribing to a
              paid tier.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>3. Paid Subscriptions</h2>
            <p>
              Paid subscriptions are billed on a monthly recurring basis through our merchant of record,
              Paddle (Paddle.com Market Limited). Current plan pricing is listed on our{" "}
              <Link href="/pricing" className="text-emerald-500 hover:underline">Pricing page</Link>.
              Enterprise plans are billed according to the terms of the individual agreement.
            </p>

            <h3 className="text-base font-semibold mt-4 mb-2" style={{ color: "var(--text-primary)" }}>3.1 Refund Eligibility</h3>
            <p>
              You may request a refund within <strong>14 days</strong> of your initial subscription purchase.
              To be eligible:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>The refund request must be submitted within 14 days of your first paid charge.</li>
              <li>Refunds are available for first-time subscribers only.</li>
              <li>You must contact our support team with your account email and reason for the request.</li>
            </ul>

            <h3 className="text-base font-semibold mt-4 mb-2" style={{ color: "var(--text-primary)" }}>3.2 Recurring Billing</h3>
            <p>
              After the initial 14-day period, subscription fees are non-refundable. Each billing cycle
              renews automatically, and charges for the current billing period are not refundable upon
              cancellation. You will continue to have access to your paid plan features until the end of
              the billing period for which you have already paid.
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
              <li>After the billing period ends, your account will transition to the Free plan with its associated limits.</li>
              <li>Cancellation does not entitle you to a refund for the current billing period.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>5. Non-Refundable Cases</h2>
            <p>Refunds will not be issued in the following circumstances:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Requests made after the 14-day initial purchase window.</li>
              <li>Renewal charges for subsequent billing cycles. You may cancel at any time to prevent future charges.</li>
              <li>Accounts suspended or terminated due to a violation of our Terms of Service.</li>
              <li>Failure to cancel before a renewal date.</li>
              <li>Differences in AI-generated analysis outputs. Bidlyze provides AI-powered decision-support tools; outputs are informational and may vary based on the content and quality of uploaded documents.</li>
              <li>Partial-month usage. We do not offer prorated refunds for unused time within a billing period.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>6. Plan Changes</h2>
            <p>
              If you change to a lower-tier plan (e.g., Team to Professional), the change takes effect
              at the start of the next billing period. No refund or credit is issued for the remaining time
              on the higher-tier plan.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>7. Exceptional Circumstances</h2>
            <p>
              If you experience a billing error, duplicate charge, or a significant service disruption that
              materially affected your ability to use the platform, please contact our support team. We will
              review these requests on a case-by-case basis and may issue a refund or service credit at our
              discretion.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>8. How to Request a Refund</h2>
            <p>To request a refund or report a billing issue:</p>
            <ol className="list-decimal pl-6 mt-2 space-y-1">
              <li>Email <a href="mailto:support@bidlyze.com" className="text-emerald-500 hover:underline">support@bidlyze.com</a> with the subject line &quot;Refund Request.&quot;</li>
              <li>Include your account email address and a brief description of the reason.</li>
              <li>Our team will review your request and respond within 5 business days.</li>
            </ol>
            <p className="mt-3">
              Approved refunds are processed through Paddle and returned to your original payment method.
              Processing times may vary depending on your bank or payment provider.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>9. Changes to This Policy</h2>
            <p>
              We may update this Refund Policy from time to time. Changes will be posted on this page with an
              updated &quot;Last updated&quot; date. Your continued use of the Service after changes are posted constitutes
              acceptance of the revised policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>10. Contact</h2>
            <p>For billing questions or refund requests, please contact us:</p>
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
