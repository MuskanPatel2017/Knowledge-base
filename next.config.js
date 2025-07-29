

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['localhost', 'your-strapi-domain.com'], // allow Strapi images
  },
};

module.exports = nextConfig;
