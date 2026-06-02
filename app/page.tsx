import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import { HeroSlider } from "@/components/sections/hero-slider";
import { PopularCoursesSection } from "@/components/sections/popular-courses";
import { SkillsSection } from "@/components/sections/skills-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="pb-10">
        <HeroSlider />
        <PopularCoursesSection />
        <SkillsSection />
        <TestimonialsSection />
      </main>
      <Footer />
    </div>
  );
}
