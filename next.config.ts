import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // Enables static export
  images: {
    unoptimized: true, // Required for GitHub Pages
  },
  basePath: "/artistic-gurus", // Your GitHub repo name
  assetPrefix: "/artistic-gurus/",
};

export default nextConfig;
