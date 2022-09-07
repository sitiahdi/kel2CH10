/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ["www.freetogame.com", "miro.medium.com", "towardsdatascience.com"],
  },
};

module.exports = nextConfig;
