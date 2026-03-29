# Bidlyze

AI-powered tender analysis platform built with Next.js, Supabase, and Google Gemini.

## Features

- Upload tender documents (PDF, DOCX, TXT) for AI-powered analysis
- Compliance checklist with gap identification
- Risk radar with severity ratings and mitigation recommendations
- Bid/No-Bid scoring with reasoning
- Win probability and competitor intelligence
- Pricing advisor with strategy recommendations
- Amendment intelligence (compare tender versions)
- Proposal writer (generate bid proposal sections)
- PDF export of analysis results
- Email notifications for analysis summaries and usage warnings

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Auth & Database:** Supabase
- **AI:** Google Gemini 2.5 Flash
- **Payments:** Stripe
- **Email:** Resend
- **Styling:** Tailwind CSS 4

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment Variables

Create a `.env.local` file with:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
GEMINI_API_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
STRIPE_STARTER_PRICE_ID=
STRIPE_PROFESSIONAL_PRICE_ID=
NEXT_PUBLIC_APP_URL=
RESEND_API_KEY=
```

## Deployment

Deploy on any Node.js hosting platform (Vercel, Railway, AWS, etc.) with the environment variables configured in your project settings.
