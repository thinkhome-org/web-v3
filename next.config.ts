import type { NextConfig } from "next";
import createWithVercelToolbar from "@vercel/toolbar/plugins/next";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const withVercelToolbar = createWithVercelToolbar();

const nextConfig: NextConfig = {
  // Disable ESLint during `next build` (e.g., on Vercel)
  eslint: {
    ignoreDuringBuilds: true,
  },
  experimental: {
    // Helps tree-shake large packages (icons/animation libs)
    // See: Next.js docs on `optimizePackageImports`
    optimizePackageImports: ["lucide-react"],
  },
};

// Compose optional bundle analyzer without failing when not installed
// eslint-disable-next-line @typescript-eslint/no-var-requires
let withBundleAnalyzer: (cfg: NextConfig) => NextConfig = (cfg) => cfg
try {
  // Using require via createRequire would be safer in ESM, but Next compiles this TS config for Node.
  // @ts-ignore - optional peer
  const bundleAnalyzer = require("@next/bundle-analyzer")
  withBundleAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === "true" })
} catch {}

export default withBundleAnalyzer(withVercelToolbar(nextConfig));
