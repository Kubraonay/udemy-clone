"use client";

import Link from "next/link";
import { Star } from "lucide-react";
import { AddToCartButton } from "@/components/course/add-to-cart-button";
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
        "group flex flex-col overflow-hidden rounded-2xl border border-zinc-200/70 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-800 dark:bg-zinc-900",
        compact ? "w-full sm:w-[300px]" : "w-full sm:w-[360px]",
      )}
    >
      <Link href={`/courses/${course.id}`} className="block flex-1">
        <div className={cn("h-40 bg-gradient-to-br", course.imageClass)} />
        <div className="space-y-3 p-5">
          <p className="text-sm font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-300">
            {course.category}
          </p>
          <h3 className="line-clamp-2 text-xl font-semibold text-black dark:text-zinc-100">{course.title}</h3>
          <p className="text-base text-black dark:text-zinc-300">{course.instructor}</p>
          <div className="flex items-center gap-2 text-base">
            <span className="font-semibold text-amber-500">{course.rating.toFixed(1)}</span>
            <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
            <span className="text-black dark:text-zinc-400">({course.students})</span>
          </div>
          <p className="text-xl font-bold text-black dark:text-zinc-100">{course.price}</p>
        </div>
      </Link>
      <div className="px-4 pb-4">
        <AddToCartButton course={course} size="sm" fullWidth />
      </div>
    </article>
  );
}
