import type { NextConfig } from "next";

const isGhPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  allowedDevOrigins: ['intimate-email-emma-someone.trycloudflare.com'],
  output: "export",
  basePath: isGhPages ? "/sample-salon-dashboard" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
