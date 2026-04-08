import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    unoptimized: process.env.NODE_ENV !== 'production', // Vercel sí comprimirá mágicamente las fotos usando sus supercomputadoras en producción 
  },
};

export default nextConfig;
