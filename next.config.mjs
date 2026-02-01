/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'vteximg.com',
      'coto.com.ar',
      'solodeportes.com.ar',
      'www-cdn.solodeportes.com.ar' // <-- agrega este dominio
    ],
  },
};

export default nextConfig;
