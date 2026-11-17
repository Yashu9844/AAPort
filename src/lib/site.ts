// Single source of truth for public contact details and the canonical site URL.

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const profile = {
  name: "Yashavanth R Siddesh",
  email: "yashavanthrsiddesh@gmail.com",
  resumeUrl: "/resume.pdf",
  resumeFileName: "Yashavanth_R_Siddesh_Resume.pdf",
  github: "https://github.com/Yashu9844",
  linkedin: "https://www.linkedin.com/in/yashavanth-r-siddesh",
  leetcode: "https://leetcode.com/u/mr_alpha",
};
