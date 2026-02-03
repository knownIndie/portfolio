import Hero from "@/components/Hero";
import CredibilityStrip from "@/components/CredibilityStrip";
import FeaturedCaseStudy from "@/components/FeaturedCaseStudy";
import Timeline from "@/components/Timeline";
import Projects from "@/components/Porjects";
import ContactBlock from "@/components/ContactBlock";

export default function Home() {
  return (
    <div className="flex flex-col gap-10 py-10">
      <Hero className="reveal" />
      <CredibilityStrip className="reveal reveal-delay-1" />
      <FeaturedCaseStudy className="reveal reveal-delay-2" />
      <Projects className="reveal reveal-delay-2" />
      <Timeline className="reveal reveal-delay-3" />
      <ContactBlock className="reveal reveal-delay-3" />
    </div>
  );
}
