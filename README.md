# Priyank Shah — Portfolio

Next.js 16 (App Router, Turbopack) · Tailwind CSS v4 · Space Grotesk via `next/font` · a small dependency-free scroll runtime (`components/ScrollEffects.tsx`).

## Edit content

Everything (bio, skills, projects, experience, links) lives in **`lib/data.ts`**.
Images are in `public/images/`, the resume PDF in `public/`.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

## Deploy to Vercel

Push this repo to GitHub, then import it at vercel.com/new (framework is auto-detected, no settings needed),
or run `npx vercel` from this folder. Add your custom domain under Project → Settings → Domains.
