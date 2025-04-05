import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['res.cloudinary.com'],
  },

  redirects: async () => {
    return [
      {
        source: '/login',
        destination: 'https://www.adotapet.kynderman.com.br/admin/',
        statusCode: 301,
      },
    ];
  },
};

export default nextConfig;
