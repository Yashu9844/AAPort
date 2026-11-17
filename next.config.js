/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: { root: __dirname },
  async redirects() {
    return [{ source: "/about2", destination: "/about", permanent: true }];
  },
};

module.exports = nextConfig;
