"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { skillCategories } from "@/lib/data/dashboard";
import { Container } from "@/components/ui/container";
import { CourseCard } from "@/components/ui/course-card";
import { SectionHeader } from "@/components/ui/section-header";

export function SkillsSection() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" }, [Autoplay({ delay: 3800 })]);

  return (
    <section className="pt-10 sm:pt-14">
      <Container>
        <SectionHeader
          title="Kariyerinize yön verecek yetkinlikler"
          description="En çok talep gören alanları takip edin ve hedeflerinize uygun öğrenme patikaları oluşturun."
        />
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 sm:gap-5">
            {skillCategories.map((category) => (
              <article
                key={category.id}
                className="min-w-0 flex-[0_0_92%] rounded-2xl border border-zinc-200/70 bg-white p-5 shadow-sm sm:flex-[0_0_70%] lg:flex-[0_0_48%] xl:flex-[0_0_32%] dark:border-zinc-800 dark:bg-zinc-900"
              >
                <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">{category.title}</h3>
                <div className="space-y-4">
                  {category.courses.slice(0, 2).map((course) => (
                    <CourseCard key={`${category.id}-${course.id}`} course={course} compact />
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
