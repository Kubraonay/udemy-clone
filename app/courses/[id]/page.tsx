import Link from "next/link";
import { notFound } from "next/navigation";
import { Star } from "lucide-react";
import { AddToCartButton } from "@/components/course/add-to-cart-button";
import { CourseReviewsSection } from "@/components/course/course-reviews-section";
import { SiteShell } from "@/components/layout/site-shell";
import { Container } from "@/components/ui/container";
import { getCourseById } from "@/lib/data/dashboard";
import { cn } from "@/lib/utils";

type CourseDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { id } = await params;
  const course = getCourseById(id);

  if (!course) {
    notFound();
  }

  return (
    <SiteShell>
      <Container className="pt-8 sm:pt-12">
        <Link href="/courses" className="mb-6 inline-block text-base font-medium text-violet-700 hover:underline dark:text-violet-300">
          ← Kurslara dön
        </Link>

        <div className="overflow-hidden rounded-2xl border border-zinc-200/70 bg-white dark:border-zinc-800 dark:bg-zinc-900">
          <div className={cn("h-56 bg-gradient-to-br sm:h-72", course.imageClass)} />
          <div className="space-y-6 p-6 sm:p-10">
            <div>
              <p className="text-base font-semibold uppercase tracking-wide text-violet-700 dark:text-violet-300">
                {course.category}
              </p>
              <h1 className="mt-2 text-4xl font-bold text-black dark:text-zinc-100 sm:text-5xl">{course.title}</h1>
              <p className="mt-2 text-xl text-black dark:text-zinc-300">Eğitmen: {course.instructor}</p>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-base text-black dark:text-zinc-300">
              <span className="flex items-center gap-1 font-semibold text-amber-500">
                {course.rating.toFixed(1)}
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              </span>
              <span>{course.students} öğrenci</span>
              <span>{course.duration}</span>
              <span>Seviye: {course.level}</span>
            </div>

            <p className="text-lg leading-8 text-black dark:text-zinc-200">{course.description}</p>

            <div>
              <h2 className="mb-3 text-2xl font-semibold text-black dark:text-zinc-100">Bu kursta neler öğreneceksiniz?</h2>
              <ul className="list-disc space-y-2 pl-5 text-base text-black dark:text-zinc-200">
                {course.highlights.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="flex flex-wrap items-center gap-4 border-t border-zinc-200/70 pt-6 dark:border-zinc-800">
              <p className="text-3xl font-bold text-black dark:text-zinc-100">{course.price}</p>
              <AddToCartButton course={course} size="lg" />
              <Link
                href="/cart"
                className="text-base font-medium text-violet-700 hover:underline dark:text-violet-300"
              >
                Sepete git
              </Link>
            </div>

            <CourseReviewsSection courseId={course.id} />
          </div>
        </div>
      </Container>
    </SiteShell>
  );
}
