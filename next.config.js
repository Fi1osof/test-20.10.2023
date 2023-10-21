/** @type {import('next').NextConfig} */
const nextConfig = {
  // https://github.com/vercel/next.js/issues/35822#issuecomment-1100594638
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn2.softswiss.net',
        port: '',
        pathname: '/**',
      },
    ],
  },

}

module.exports = nextConfig
