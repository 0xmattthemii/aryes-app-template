import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";
import "@/lib/env";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  transpilePackages: [
    'payloadcms-lexical-ext',
    '@payloadcms/richtext-lexical',
  ],
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
    proxyClientMaxBodySize: '50mb',
  },
};

export default withPayload(nextConfig);
