import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable ESLint during `next build` (e.g., on Vercel)
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
