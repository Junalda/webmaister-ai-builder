# Webmaister — AI-Powered Website Builder

Build professional business websites with AI. Answer a few questions about your business, watch AI generate a complete website with copy, structure, and SEO — then edit anything and publish.

## Tech Stack

- **React 18** + **TypeScript**
- **Vite** — build tool
- **TailwindCSS** — styling with custom brand tokens
- **Supabase** — auth + database
- **Vercel** — deployment

## Pages

| Route | Page |
|---|---|
| `/` | Landing page |
| `/login` | Sign in |
| `/signup` | Create account |
| `/dashboard` | User project dashboard |
| `/dashboard/new-project` | 5-step AI website wizard |
| `/dashboard/projects/:id` | Website preview + inline editor |
| `/pricing` | Pricing tiers |
| `/done-for-you` | Done For You service |
| `/admin` | Admin dashboard |

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:8080](http://localhost:8080).

## Environment Variables

Create a `.env.local` file:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Run `SUPABASE_SCHEMA.sql` in your Supabase SQL editor to set up the database.

## Deployment

Deploy to Vercel. Set the environment variables above in your Vercel project settings. The `vercel.json` SPA rewrite is already configured.

## Brand

- **Colors:** Black · White · Soft grey · Pink `#e040a0` → Purple `#8b5cf6` gradient
- **Fonts:** Inter (body) · Syne (display headings)
