import "./globals.css";
import { ThemeProvider } from "@/lib/theme";

export const metadata = {
  title: "Bidlyze — AI-Powered Tender Analysis",
  description:
    "Upload tender documents and get instant AI-powered analysis, compliance checks, risk flags, and bid recommendations.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="font-[family-name:var(--font-outfit)] antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
