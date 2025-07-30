
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'knowledge-base-strapi-backend.onrender.com'],
  },
};

module.exports = nextConfig;
