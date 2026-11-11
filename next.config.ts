import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: `npm run build` writes plain HTML/CSS/JS to ./out (served by Cloudflare)
  output: "export",
  images: {
    // No image server in a static export; images in public/images are pre-resized WebP
    unoptimized: true,
  },
};

export default nextConfig;
