/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: 'https://tuzimbe.herokuapp.com',
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
