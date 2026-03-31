import type { NextConfig } from "next";

const isGhPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['thu-tuition-amend-layout.trycloudflare.com'],
  output: "export",
  basePath: isGhPages ? "/sample-salon-dashboard" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
