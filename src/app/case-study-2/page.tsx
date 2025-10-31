import Navigation from "@/components/Navigation";
import CaseStudy from "@/components/CaseStudy";

export default function CaseStudy2() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <CaseStudy
        type="SNAPSHOT"
        title="Mixpanel Rebrand"
        subtitle="Brand Identity & Design System"
        sections={[
          {
            items: [
              { type: "image", url: "https://framerusercontent.com/images/quJLLZCEfn5i5KcbnTZVbqHOBk.gif?width=2000&height=1125" },
              { type: "image", url: "https://framerusercontent.com/images/lAKIBFfvPHsEGmnKUowPxsF4.jpg?width=2401&height=1251" },
              { type: "image", url: "https://framerusercontent.com/images/quJLLZCEfn5i5KcbnTZVbqHOBk.gif?width=2000&height=1125" },
              { type: "image", url: "https://framerusercontent.com/images/lAKIBFfvPHsEGmnKUowPxsF4.jpg?width=2401&height=1251" },
              { type: "image", url: "https://framerusercontent.com/images/quJLLZCEfn5i5KcbnTZVbqHOBk.gif?width=2000&height=1125" },
              { type: "image", url: "https://framerusercontent.com/images/lAKIBFfvPHsEGmnKUowPxsF4.jpg?width=2401&height=1251" },
            ],
            layout: "continuous"
          }
        ]}
        informationParagraphs={[
          "Led the comprehensive rebrand of Mixpanel's visual identity, creating a modern and cohesive design system that reflects the company's evolution. This project involved developing new brand guidelines, typography systems, and visual assets that would be implemented across all product touchpoints.",
          "Working closely with the marketing and product teams, we established a fresh visual language that balances professionalism with approachability."
        ]}
        credits={[
          { role: "Brand Design & Art Direction", name: "Zubair Mallik" },
          { role: "Design System", name: "Design Team" },
          { role: "Motion Graphics", name: "Animation Studio" },
        ]}
        relatedProjects={[
          { title: "Robinhood Onboarding", image: "https://framerusercontent.com/assets/jZJHrzRbtmtgYpOTpvTFzoQQkEY.mp4", link: "/case-study-1" },
          { title: "Meta System Iconography", image: "https://framerusercontent.com/images/lAKIBFfvPHsEGmnKUowPxsF4.jpg?width=2401&height=1251", link: "/case-study-3" },
        ]}
      />
    </div>
  );
}
