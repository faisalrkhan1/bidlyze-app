import { Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/lib/theme";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "Bidlyze — AI-Powered Tender Analysis & Bid Intelligence",
    template: "%s | Bidlyze",
  },
  description:
    "Analyze tender documents in 60 seconds with AI. Get compliance checks, risk assessment, bid scoring, win probability, and proposal generation.",
  keywords: [
    "tender analysis",
    "bid management",
    "procurement intelligence",
    "tender compliance",
    "bid scoring",
    "proposal automation",
    "tender risk assessment",
    "bid intelligence",
    "go no-go decision",
    "tender management software",
    "procurement software",
    "bid qualification",
  ],
  authors: [{ name: "Bidlyze" }],
  creator: "Bidlyze",
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "https://bidlyze.com"),
  openGraph: {
    title: "Bidlyze — AI-Powered Tender Analysis & Bid Intelligence",
    description: "From tender document to bid decision in 60 seconds. AI-powered compliance checks, risk radar, bid scoring, and proposal generation.",
    type: "website",
    locale: "en_US",
    siteName: "Bidlyze",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bidlyze — AI-Powered Tender Analysis",
    description: "From tender document to bid decision in 60 seconds.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-[family-name:var(--font-outfit)] antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
