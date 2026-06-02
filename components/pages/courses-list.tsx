"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { getAllCourses, getCoursesBySkillId, getSkillCategoryById } from "@/lib/data/dashboard";
import { CourseCard } from "@/components/ui/course-card";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";

export function CoursesList() {
  const searchParams = useSearchParams();
  const skillId = searchParams.get("skill");
  const urlQuery = searchParams.get("q") ?? "";
  const skillCategory = skillId ? getSkillCategoryById(skillId) : undefined;

  const [query, setQuery] = useState(urlQuery);

  useEffect(() => {
    queueMicrotask(() => setQuery(urlQuery));
  }, [urlQuery]);

  const baseCourses = useMemo(() => {
    if (skillId && skillCategory) {
      return getCoursesBySkillId(skillId);
    }
    return getAllCourses();
  }, [skillId, skillCategory]);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return baseCourses;
    return baseCourses.filter(
      (course) =>
        course.title.toLowerCase().includes(normalized) ||
        course.instructor.toLowerCase().includes(normalized) ||
        course.category.toLowerCase().includes(normalized),
    );
  }, [baseCourses, query]);

  return (
    <Container className="pt-10 sm:pt-14">
      <SectionHeader
        title={skillCategory ? `${skillCategory.title} kursları` : "Tüm Kurslar"}
        description={
          skillCategory
            ? `${skillCategory.title} alanındaki kursları inceleyin ve size uygun olanı seçin.`
            : "Kategori, eğitmen veya başlığa göre arayarak size uygun kursu bulun."
        }
      />

      {skillCategory ? (
        <p className="mb-4 text-base text-zinc-700 dark:text-zinc-300">
          <Link href="/courses" className="font-medium text-violet-700 hover:underline dark:text-violet-300">
            Tüm kursları göster
          </Link>
        </p>
      ) : null}

      <div className="mb-8">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Kurs ara..."
          className="h-12 w-full max-w-2xl rounded-full border border-black/15 bg-background px-5 text-base text-black placeholder:text-black/50 focus:outline-none focus:ring-2 focus:ring-violet-500/50 dark:text-zinc-100 dark:placeholder:text-zinc-400"
        />
      </div>
      {filtered.length === 0 ? (
        <p className="text-base text-black dark:text-zinc-300">Aramanızla eşleşen kurs bulunamadı.</p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </Container>
  );
}
