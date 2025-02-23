/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'v2.exercisedb.io',
      },
    ],
  },
  // Opcional: Añadir configuración para el API si es necesario
  async rewrites() {
    return [
      {
        source: '/api/exercises/:path*',
        destination: 'https://exercisedb.p.rapidapi.com/:path*',
      },
    ];
  },
}

module.exports = nextConfig