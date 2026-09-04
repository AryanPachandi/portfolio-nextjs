import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    domains: ["assets.aceternity.com"],
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        destination: 'https://aryanpachandi.me/:path*',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;
