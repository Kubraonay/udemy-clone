"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { popularCourses } from "@/lib/data/dashboard";
import { Container } from "@/components/ui/container";
import { CourseCard } from "@/components/ui/course-card";
import { SectionHeader } from "@/components/ui/section-header";

export function PopularCoursesSection() {
  const [emblaRef] = useEmblaCarousel({ loop: true, align: "start" }, [Autoplay({ delay: 3500 })]);

  return (
    <section className="pt-10 sm:pt-14">
      <Container>
        <SectionHeader
          title="Popüler Kurslar"
          description="Öğrencilerin en çok tercih ettiği içerikleri keşfedin ve kariyerinize hemen yatırım yapın."
          descriptionClassName="text-black dark:text-zinc-300"
        />
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-4 sm:gap-5">
            {popularCourses.map((course) => (
              <div key={course.id} className="min-w-0 flex-[0_0_92%] sm:flex-[0_0_48%] lg:flex-[0_0_32%] xl:flex-[0_0_28%]">
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
