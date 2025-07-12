/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['ejerciciosdb.com', 'rapidapi.com', 'i.ytimg.com', 'i9.ytimg.com','gymvisual.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'v2.exercisedb.io',
      },
    ],
  },

}

module.exports = nextConfig