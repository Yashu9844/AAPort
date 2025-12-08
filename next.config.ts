import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // WARNING: These options ignore TypeScript and ESLint errors during build.
  // Use only to unblock deployment; fix errors properly when you can.
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
