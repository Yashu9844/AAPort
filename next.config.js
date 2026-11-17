/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: { root: __dirname },
  async redirects() {
    return [{ source: "/about2", destination: "/about", permanent: true }];
  },
  async headers() {
    return [
      {
        // Force a download (some browsers, e.g. iOS Safari, ignore the <a download> attribute)
        source: "/resume.pdf",
        headers: [
          { key: "Content-Disposition", value: 'attachment; filename="Yashavanth_R_Siddesh_Resume.pdf"' },
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
