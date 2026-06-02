import { Star } from "lucide-react";
import type { Testimonial } from "@/lib/data/dashboard";

type TestimonialCardProps = {
  item: Testimonial;
};

export function TestimonialCard({ item }: TestimonialCardProps) {
  return (
    <article className="w-[360px] rounded-2xl border border-zinc-200/70 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-base font-bold text-white">
          {item.avatar}
        </div>
        <div>
          <p className="text-lg font-semibold text-black dark:text-zinc-100">{item.name}</p>
          <p className="text-base text-black dark:text-zinc-400">{item.role}</p>
        </div>
      </div>
      <p className="mb-4 text-base leading-7 text-black dark:text-zinc-200">{item.text}</p>
      <div className="flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={`${item.id}-${index}`}
            className={`h-4 w-4 ${index < item.rating ? "fill-amber-400 text-amber-400" : "text-zinc-300 dark:text-zinc-700"}`}
          />
        ))}
      </div>
    </article>
  );
}
