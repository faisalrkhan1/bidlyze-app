import { Outfit } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata = {
  title: "Bidlyze — AI-Powered Tender Analysis",
  description:
    "Upload tender documents and get instant AI-powered analysis, compliance checks, risk flags, and bid recommendations.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} font-[family-name:var(--font-outfit)] antialiased`}>
        {children}
      </body>
    </html>
  );
}
