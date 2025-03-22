import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'photos-ventouxsummit.fr',
        port: '',
        pathname: '/modules/galleryquest/**',
      },
    ],
  },
};

export default nextConfig;
