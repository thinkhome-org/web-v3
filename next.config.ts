import type { NextConfig } from "next";
import createWithVercelToolbar from "@vercel/toolbar/plugins/next";

const withVercelToolbar = createWithVercelToolbar();

const nextConfig: NextConfig = {
  // Disable ESLint during `next build` (e.g., on Vercel)
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default withVercelToolbar(nextConfig);
