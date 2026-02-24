import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Use empty turbopack config for Next.js 16 compatibility
  turbopack: {},
  serverExternalPackages: ["mongoose"],
};

export default nextConfig;
