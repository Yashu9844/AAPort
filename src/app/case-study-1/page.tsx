import Navigation from "@/components/Navigation";
import CaseStudy from "@/components/CaseStudy";

export default function CaseStudy1() {
  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <CaseStudy
        type="SNAPSHOT"
        title="Robinhood Onboarding"
        subtitle="Brand Experience Design"
        sections={[
          {
            items: [
              { type: "video", url: "https://framerusercontent.com/assets/jZJHrzRbtmtgYpOTpvTFzoQQkEY.mp4" },
            ],
            layout: "continuous"
          }
        ]}
        informationParagraphs={[
          "I led the redesign of Robinhood's onboarding experience working closely with a very small and scrappy team over the course of 3-4 weeks to design, pitch, and deliver Lottie animations for engineering.",
          "My role within this project included product design, design direction, and interaction design. Collaborating closely with a contract illustrator and our in-product motion design lead to create animated illustrations with Lottie. Then we worked hand-in-hand with our incredibly talented engineering team to implement the interaction patterns for how a user swipes through each screen within the onboarding flow."
        ]}
        credits={[
          { role: "Design Direction & Product Design", name: "Zubair Mallik" },
          { role: "Motion Design Lead", name: "Design Team" },
          { role: "Illustrator", name: "Creative Studio" },
        ]}
        relatedProjects={[
          { title: "Mixpanel Rebrand", image: "https://framerusercontent.com/images/quJLLZCEfn5i5KcbnTZVbqHOBk.gif?width=2000&height=1125", link: "/case-study-2" },
          { title: "Meta System Iconography", image: "https://framerusercontent.com/images/lAKIBFfvPHsEGmnKUowPxsF4.jpg?width=2401&height=1251", link: "/case-study-3" },
        ]}
      />
    </div>
  );
}
