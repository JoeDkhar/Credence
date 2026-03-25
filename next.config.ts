import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      'static2.finnhub.io',
    ],
  },

  eslint: {
    ignoreDuringBuilds: true,
  }, typescript: {
    ignoreBuildErrors: true,
  }
};

export default nextConfig;
