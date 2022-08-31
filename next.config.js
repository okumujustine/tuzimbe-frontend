/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    BASE_URL: 'https://tuzimbe.herokuapp.com',
    // BASE_URL: 'http://127.0.0.1:8002'
  },
  reactStrictMode: true,
  swcMinify: true,
}

module.exports = nextConfig
