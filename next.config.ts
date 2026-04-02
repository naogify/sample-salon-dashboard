import type { NextConfig } from "next";

const isGhPages = process.env.DEPLOY_TARGET === "gh-pages";

const nextConfig: NextConfig = {
  output: "export",
  basePath: isGhPages ? "/sample-salon-dashboard" : "",
  images: {
    unoptimized: true,
  },
  allowedDevOrigins: ["*.ngrok.app", "*.ngrok-free.dev"],
};

export default nextConfig;
