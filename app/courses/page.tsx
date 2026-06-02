import { Suspense } from "react";
import { SiteShell } from "@/components/layout/site-shell";
import { CoursesList } from "@/components/pages/courses-list";

function CoursesListFallback() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <p className="text-base text-zinc-600 dark:text-zinc-400">Kurslar yükleniyor…</p>
    </div>
  );
}

export default function CoursesPage() {
  return (
    <SiteShell>
      <Suspense fallback={<CoursesListFallback />}>
        <CoursesList />
      </Suspense>
    </SiteShell>
  );
}
