"use client";

import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import { CarouselSideControls } from "@/components/ui/carousel-nav";
import { useEffect, useMemo, useState } from "react";
import { getSkillCategoryById, skillCategories } from "@/lib/data/dashboard";
import { Container } from "@/components/ui/container";
import { CourseCard } from "@/components/ui/course-card";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";

export function SkillsSection() {
  const [activeSkillId, setActiveSkillId] = useState(skillCategories[0]?.id ?? "");
  const activeCategory = useMemo(
    () => getSkillCategoryById(activeSkillId) ?? skillCategories[0],
    [activeSkillId],
  );
  const activeCourses = activeCategory?.courses ?? [];
  const canLoop = activeCourses.length > 1;

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: canLoop, align: "start" });

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.reInit({ loop: canLoop });
    emblaApi.scrollTo(0);
  }, [activeSkillId, emblaApi, canLoop]);

  if (!activeCategory) return null;

  return (
    <section className="pt-10 sm:pt-14">
      <Container>
        <SectionHeader
          title="Kariyerinize yön verecek yetkinlikler"
          description="En çok talep gören alanları takip edin ve hedeflerinize uygun öğrenme patikaları oluşturun."
        />

        <div
          className="mb-6 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          role="tablist"
          aria-label="Yetkinlik kategorileri"
        >
          {skillCategories.map((category) => {
            const isActive = category.id === activeSkillId;
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveSkillId(category.id)}
                className={cn(
                  "shrink-0 rounded-full border px-4 py-2 text-base font-semibold transition",
                  isActive
                    ? "border-violet-600 bg-violet-600 text-white"
                    : "border-zinc-300 bg-white text-zinc-950 hover:border-violet-400 hover:text-violet-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-violet-500 dark:hover:text-violet-300",
                )}
              >
                {category.title}
              </button>
            );
          })}
        </div>

        <CarouselSideControls
          onPrev={() => emblaApi?.scrollPrev()}
          onNext={() => emblaApi?.scrollNext()}
          prevLabel="Önceki kurslar"
          nextLabel="Sonraki kurslar"
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4 sm:gap-5">
              {activeCourses.map((course) => (
                <div
                  key={course.id}
                  className="min-w-0 flex-[0_0_92%] sm:flex-[0_0_55%] lg:flex-[0_0_38%]"
                >
                  <CourseCard course={course} compact />
                </div>
              ))}
            </div>
          </div>
        </CarouselSideControls>

        <Link
          href={`/courses?skill=${activeCategory.id}`}
          className="mt-6 inline-block text-base font-medium text-violet-700 hover:underline dark:text-violet-300"
        >
          {activeCategory.title} ile ilgili kursların tümünü görmek için tıkla
        </Link>
      </Container>
    </section>
  );
}
