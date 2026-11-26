# Priyank Shah — Portfolio

**Live:** https://priyankshah01.github.io/artistic-gurus/

Next.js 16 (App Router, Turbopack) · Tailwind CSS v4 · Space Grotesk via `next/font` · a small dependency-free scroll runtime (`components/ScrollEffects.tsx`).

## Edit content

Everything (bio, skills, projects, experience, links) lives in **`lib/data.ts`**.
Images are in `public/images/`, the resume PDF in `public/`.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

## Deploy (GitHub Pages)

Every push to `main` builds the site and publishes it to GitHub Pages through
[`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml).
Progress shows in the repo's **Actions** tab.

The site is a static export (`output: "export"` in `next.config.ts`) served under `/artistic-gurus`.
The workflow sets that prefix with `NEXT_PUBLIC_BASE_PATH`; locally it's empty, so `npm run dev` runs at `/`.

When you add a file to `public/` and link to it, wrap the path in `asset()` from `lib/site.ts`
(for example `asset("/images/Me.jpg")`) so it gets the prefix too.
