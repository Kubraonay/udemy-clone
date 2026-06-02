import { SiteShell } from "@/components/layout/site-shell";
import { HeroSlider } from "@/components/sections/hero-slider";
import { PopularCoursesSection } from "@/components/sections/popular-courses";
import { SkillsSection } from "@/components/sections/skills-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";

export default function Home() {
  return (
    <SiteShell>
      <HeroSlider />
      <PopularCoursesSection />
      <SkillsSection />
      <TestimonialsSection />
    </SiteShell>
  );
}
