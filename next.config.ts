import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: "imgix.cosmicjs.com",
      },
    ],
  },
};

export default nextConfig;
