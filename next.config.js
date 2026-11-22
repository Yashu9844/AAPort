/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: { root: __dirname },
  async redirects() {
    return [
      { source: "/about2", destination: "/about", permanent: true },
      // Retired blog posts -> closest current post
      { source: "/blog/building-scalable-systems", destination: "/blog/saveme-45-percent-faster", permanent: true },
      { source: "/blog/performance-optimization", destination: "/blog/saveme-45-percent-faster", permanent: true },
      { source: "/blog/learning-in-public", destination: "/blog/student-to-software-lead", permanent: true },
      { source: "/blog/leetcode-journey", destination: "/blog/student-to-software-lead", permanent: true },
      { source: "/blog/rag-ai-agents", destination: "/blog/every-agent-needs-a-computer", permanent: true },
    ];
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
