import Navigation from "@/components/Navigation";
import CaseStudy from "@/components/CaseStudy";

export default function CaseStudy3() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <CaseStudy
        type="SNAPSHOT"
        title="Meta System Iconography"
        subtitle="Icon Design & Visual Language"
        sections={[
          {
            items: [
              { type: "image", url: "https://framerusercontent.com/images/lAKIBFfvPHsEGmnKUowPxsF4.jpg?width=2401&height=1251" },
              { type: "image", url: "https://framerusercontent.com/images/quJLLZCEfn5i5KcbnTZVbqHOBk.gif?width=2000&height=1125" },
              { type: "image", url: "https://framerusercontent.com/images/lAKIBFfvPHsEGmnKUowPxsF4.jpg?width=2401&height=1251" },
            ],
            layout: "grid-3"
          },
          {
            items: [
              { type: "video", url: "https://framerusercontent.com/assets/jZJHrzRbtmtgYpOTpvTFzoQQkEY.mp4" },
            ],
            layout: "continuous"
          },
          {
            paragraphs: [
              "This comprehensive iconography system was designed to create visual consistency across Meta's entire product ecosystem. Each icon was meticulously crafted to ensure clarity at any size."
            ]
          },
          {
            items: [
              { type: "image", url: "https://framerusercontent.com/images/quJLLZCEfn5i5KcbnTZVbqHOBk.gif?width=2000&height=1125" },
              { type: "image", url: "https://framerusercontent.com/images/lAKIBFfvPHsEGmnKUowPxsF4.jpg?width=2401&height=1251" },
            ],
            layout: "grid-2"
          }
        ]}
        informationParagraphs={[
          "Developed a comprehensive iconography system for Meta's product suite, focusing on creating a unified visual language across multiple platforms. This extensive project involved designing hundreds of icons that maintain consistency while adapting to different contexts and sizes.",
          "The system prioritizes clarity, accessibility, and scalability, ensuring seamless integration across Meta's ecosystem of products and services."
        ]}
        credits={[
          { role: "Icon Design & System Architecture", name: "Zubair Mallik" },
          { role: "Design Lead", name: "Meta Design Team" },
          { role: "Visual Design", name: "Design Studio" },
        ]}
        relatedProjects={[
          { title: "Robinhood Onboarding", image: "https://framerusercontent.com/assets/jZJHrzRbtmtgYpOTpvTFzoQQkEY.mp4", link: "/case-study-1" },
          { title: "Mixpanel Rebrand", image: "https://framerusercontent.com/images/quJLLZCEfn5i5KcbnTZVbqHOBk.gif?width=2000&height=1125", link: "/case-study-2" },
        ]}
      />
    </div>
  );
}
