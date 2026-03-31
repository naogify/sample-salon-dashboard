import type { NextConfig } from "next";

const isGhPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig: NextConfig = {
  turbopack: { root: '/Users/naoppy/naogify/sample-salon-dashboard/.worktrees/37fa7f57-dd08-4c9a-8364-36eb6c808dcb' },
  allowedDevOrigins: ['renewable-shareware-outside-supported.trycloudflare.com'],
  output: "export",
  basePath: isGhPages ? "/sample-salon-dashboard" : "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
