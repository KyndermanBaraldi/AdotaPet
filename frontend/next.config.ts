import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/dpqcol5rn/image/upload/**',
      },
    ],
  },

  redirects: async () => {
    return [
      {
        source: '/login',
        destination: 'https://adotapet.kynderman.com.br/admin/',
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
