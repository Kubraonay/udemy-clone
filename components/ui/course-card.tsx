import { Star } from "lucide-react";
import type { Course } from "@/lib/data/dashboard";
import { cn } from "@/lib/utils";

type CourseCardProps = {
  course: Course;
  compact?: boolean;
};

export function CourseCard({ course, compact = false }: CourseCardProps) {
  return (
    <article
      className={cn(
        "group overflow-hidden rounded-2xl border border-zinc-200/70 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900",
        compact ? "w-full sm:w-[280px]" : "w-full sm:w-[320px]",
      )}
    >
      <div className={cn("h-40 bg-gradient-to-br", course.imageClass)} />
      <div className="space-y-3 p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-violet-600 dark:text-violet-300">
          {course.category}
        </p>
        <h3 className="line-clamp-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">{course.title}</h3>
        <p className="text-sm text-zinc-600 dark:text-zinc-300">{course.instructor}</p>
        <div className="flex items-center gap-2 text-sm">
          <span className="font-semibold text-amber-500">{course.rating.toFixed(1)}</span>
          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
          <span className="text-zinc-500 dark:text-zinc-400">({course.students})</span>
        </div>
        <p className="text-lg font-bold text-zinc-900 dark:text-zinc-100">{course.price}</p>
      </div>
    </article>
  );
}
