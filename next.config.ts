import type { NextConfig } from "next";

// Set by the GitHub Pages workflow ("/artistic-gurus"); empty for local dev.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // GitHub Pages only serves static files, so build plain HTML/CSS/JS into out/
  output: "export",
  basePath,
  // The default image optimizer needs a server; serve images as-is instead
  images: { unoptimized: true },
  // Emit /index.html style folders so GitHub Pages resolves every route
  trailingSlash: true,
  // (cacheComponents / partialPrefetching are server features that static export
  // doesn't support; nothing in this one-page site used them)
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
