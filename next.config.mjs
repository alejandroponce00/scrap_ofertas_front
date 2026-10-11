/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'vteximg.com',
      },
      {
        protocol: 'https',
        hostname: 'coto.com.ar',
      },
      {
        protocol: 'https',
        hostname: 'solodeportes.com.ar',
      },
      {
        protocol: 'https',
        hostname: 'www-cdn.solodeportes.com.ar',
      },
      {
        protocol: 'https',
        hostname: 'stockcenter.com.ar',
      },
      {
        protocol: 'https',
        hostname: 'www.stockcenter.com.ar',
      },
      {
        protocol: 'https',
        hostname: 'opensports.com.ar',
      },
      {
        protocol: 'https',
        hostname: 'www.opensports.com.ar',
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;
