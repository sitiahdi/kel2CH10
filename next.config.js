/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ["www.freetogame.com", "miro.medium.com", "towardsdatascience.com"]
	}
};

module.exports = nextConfig;
