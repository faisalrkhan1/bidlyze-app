import Link from "next/link";
import { LogoMark } from "@/app/components/Logo";

export const metadata = {
  title: "Privacy Policy — Bidlyze",
  description: "Privacy Policy for Bidlyze, the AI-powered RFx and tender intelligence platform.",
};

export default function PrivacyPage() {
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
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">Privacy Policy</h1>
        <p className="text-sm mb-12" style={{ color: "var(--text-muted)" }}>Last updated: April 4, 2026</p>

        <div className="space-y-10 text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>1. Introduction</h2>
            <p>
              Bidlyze (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy and is committed to protecting
              your personal data. This Privacy Policy explains what information we collect, how we use it, and
              your choices regarding your data when you use our platform at{" "}
              <a href="https://bidlyze.com" className="text-emerald-500 hover:underline">bidlyze.com</a>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>2. Information We Collect</h2>

            <h3 className="text-base font-semibold mt-4 mb-2" style={{ color: "var(--text-primary)" }}>2.1 Account Information</h3>
            <p>When you create an account, we collect:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Email address</li>
              <li>Name (if provided)</li>
              <li>Authentication credentials (managed securely via our authentication provider)</li>
            </ul>

            <h3 className="text-base font-semibold mt-4 mb-2" style={{ color: "var(--text-primary)" }}>2.2 Documents You Upload</h3>
            <p>
              When you use Bidlyze to analyze RFx and tender documents, you upload files (PDF, DOCX, or TXT).
              These documents are processed by our AI analysis engine to generate structured intelligence for you.
              We store your uploaded documents and analysis results in your account so that you can access them later.
            </p>

            <h3 className="text-base font-semibold mt-4 mb-2" style={{ color: "var(--text-primary)" }}>2.3 Usage & Analytics Data</h3>
            <p>We automatically collect certain technical information when you use the Service, including:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Browser type and version</li>
              <li>Device type and operating system</li>
              <li>Pages visited and features used</li>
              <li>Time and date of visits</li>
              <li>Referring URL</li>
              <li>IP address (anonymized where feasible)</li>
            </ul>

            <h3 className="text-base font-semibold mt-4 mb-2" style={{ color: "var(--text-primary)" }}>2.4 Payment Information</h3>
            <p>
              Payments are processed by our authorized payment processor, Paddle (Paddle.com Market Limited).
              We do not store your full credit card number, CVV, or bank account details on our servers. Paddle
              handles all payment data in accordance with PCI DSS standards. We receive only a transaction
              reference, plan type, and billing status from Paddle.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>3. How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Provide, operate, and improve the Bidlyze platform</li>
              <li>Process your document analyses and deliver results</li>
              <li>Manage your account and subscription</li>
              <li>Process payments through Paddle</li>
              <li>Send transactional emails (account verification, billing receipts, important service updates)</li>
              <li>Monitor and analyze usage patterns to improve the Service</li>
              <li>Detect, prevent, and address technical issues or abuse</li>
              <li>Comply with legal obligations</li>
            </ul>
            <p className="mt-3">
              <strong style={{ color: "var(--text-primary)" }}>We do not use your uploaded documents or analysis data to train AI models.</strong>{" "}
              Your documents are processed solely to provide analysis results to you.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>4. Cookies & Tracking Technologies</h2>
            <p>Bidlyze uses the following cookies and similar technologies:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Essential cookies:</strong> Required for authentication, session management, and core platform functionality. These cannot be disabled.</li>
              <li><strong>Analytics cookies:</strong> Used to understand how visitors interact with the platform, helping us improve the user experience. These may include third-party analytics services.</li>
            </ul>
            <p className="mt-3">
              You can control cookie preferences through your browser settings. Disabling essential cookies may
              prevent you from using parts of the Service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>5. Third-Party Services</h2>
            <p>We use the following third-party services to operate Bidlyze:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Supabase</strong> — Authentication and database hosting</li>
              <li><strong>Paddle</strong> — Payment processing and subscription management</li>
              <li><strong>AI providers</strong> — Document analysis and natural language processing (documents are processed via API; they are not used for model training)</li>
              <li><strong>Vercel</strong> — Application hosting and deployment</li>
            </ul>
            <p className="mt-3">
              Each third-party service operates under its own privacy policy. We only share data with these
              services to the extent necessary to provide the Service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>6. Data Storage & Security</h2>
            <p>
              We implement commercially reasonable security measures to protect your personal data against
              unauthorized access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Encryption of data in transit (TLS/HTTPS)</li>
              <li>Encryption of data at rest</li>
              <li>Secure authentication with password hashing</li>
              <li>Role-based access controls</li>
              <li>Regular security reviews</li>
            </ul>
            <p className="mt-3">
              While we strive to protect your data, no method of electronic storage or transmission is 100% secure.
              We cannot guarantee absolute security but are committed to promptly addressing any incidents.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>7. Data Retention</h2>
            <p>
              We retain your account data and analysis history for as long as your account is active or as needed
              to provide the Service. For Free plan users, analysis history is retained for 30 days. Paid plan
              users have unlimited history retention while their subscription is active.
            </p>
            <p className="mt-3">
              If you delete your account, we will delete or anonymize your personal data within 30 days, except
              where we are required to retain it for legal or regulatory purposes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>8. Your Rights</h2>
            <p>Depending on your jurisdiction, you may have the right to:</p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li><strong>Access</strong> the personal data we hold about you</li>
              <li><strong>Correct</strong> inaccurate or incomplete data</li>
              <li><strong>Delete</strong> your personal data (&quot;right to be forgotten&quot;)</li>
              <li><strong>Export</strong> your data in a portable format</li>
              <li><strong>Withdraw consent</strong> for data processing where consent is the legal basis</li>
              <li><strong>Object</strong> to processing of your personal data</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, please contact us at{" "}
              <a href="mailto:privacy@bidlyze.com" className="text-emerald-500 hover:underline">privacy@bidlyze.com</a>.
              We will respond to your request within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>9. Children&apos;s Privacy</h2>
            <p>
              Bidlyze is not directed at individuals under 18 years of age. We do not knowingly collect personal
              data from children. If we learn that we have collected data from a child, we will promptly delete it.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>10. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of material changes by
              posting the revised policy on this page and updating the &quot;Last updated&quot; date. Your continued use
              of the Service after changes are posted constitutes acceptance of the revised policy.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold mb-3" style={{ color: "var(--text-primary)" }}>11. Contact</h2>
            <p>If you have any questions about this Privacy Policy or your personal data, please contact us:</p>
            <ul className="list-none mt-2 space-y-1">
              <li>Privacy inquiries: <a href="mailto:privacy@bidlyze.com" className="text-emerald-500 hover:underline">privacy@bidlyze.com</a></li>
              <li>General support: <a href="mailto:support@bidlyze.com" className="text-emerald-500 hover:underline">support@bidlyze.com</a></li>
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
            <Link href="/privacy" className="text-emerald-500 font-medium">Privacy</Link>
            <Link href="/refund-policy" className="hover:text-emerald-500 transition-colors">Refunds</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
