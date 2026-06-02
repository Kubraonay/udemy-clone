"use client";

import { Star } from "lucide-react";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import {
  getSeedReviewsForCourse,
  loadUserReviews,
  saveUserReviews,
  type CourseReview,
} from "@/lib/data/reviews";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CourseReviewsSectionProps = {
  courseId: string;
};

function formatReviewDate(iso: string): string {
  return new Date(iso).toLocaleDateString("tr-TR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const iconClass = size === "md" ? "h-5 w-5" : "h-4 w-4";
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} üzerinden 5 puan`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={cn(
            iconClass,
            index < rating ? "fill-amber-400 text-amber-400" : "text-zinc-300 dark:text-zinc-600",
          )}
        />
      ))}
    </div>
  );
}

function ReviewItem({ review }: { review: CourseReview }) {
  return (
    <article className="rounded-xl border border-zinc-200/70 bg-zinc-50/80 p-5 dark:border-zinc-800 dark:bg-zinc-950/50">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-black dark:text-zinc-100">{review.author}</p>
          <p className="mt-0.5 text-sm text-zinc-600 dark:text-zinc-400">{formatReviewDate(review.createdAt)}</p>
        </div>
        <StarRating rating={review.rating} />
      </div>
      <p className="mt-3 text-base leading-7 text-black dark:text-zinc-200">{review.text}</p>
    </article>
  );
}

export function CourseReviewsSection({ courseId }: CourseReviewsSectionProps) {
  const [userReviewsByCourse, setUserReviewsByCourse] = useState<Record<string, CourseReview[]>>({});
  const [hydrated, setHydrated] = useState(false);
  const [author, setAuthor] = useState("");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);

  useEffect(() => {
    queueMicrotask(() => {
      setUserReviewsByCourse(loadUserReviews());
      setHydrated(true);
    });
  }, []);

  const seedReviews = useMemo(() => getSeedReviewsForCourse(courseId), [courseId]);

  const allReviews = useMemo(() => {
    const userReviews = userReviewsByCourse[courseId] ?? [];
    return [...userReviews, ...seedReviews].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [userReviewsByCourse, courseId, seedReviews]);

  const averageRating = useMemo(() => {
    if (allReviews.length === 0) return 0;
    const sum = allReviews.reduce((acc, review) => acc + review.rating, 0);
    return sum / allReviews.length;
  }, [allReviews]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitMessage(null);

    const trimmedAuthor = author.trim();
    const trimmedText = text.trim();

    if (!trimmedAuthor) {
      setSubmitMessage("Lütfen adınızı girin.");
      return;
    }
    if (trimmedText.length < 10) {
      setSubmitMessage("Yorum en az 10 karakter olmalıdır.");
      return;
    }

    const newReview: CourseReview = {
      id: `user-${Date.now()}`,
      courseId,
      author: trimmedAuthor,
      rating,
      text: trimmedText,
      createdAt: new Date().toISOString(),
    };

    const next = {
      ...userReviewsByCourse,
      [courseId]: [newReview, ...(userReviewsByCourse[courseId] ?? [])],
    };

    setUserReviewsByCourse(next);
    saveUserReviews(next);
    setAuthor("");
    setRating(5);
    setText("");
    setSubmitMessage("Yorumunuz eklendi. Teşekkürler!");
  };

  const inputClassName =
    "w-full rounded-xl border border-zinc-300 bg-white px-4 py-2.5 text-base text-zinc-950 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-violet-500/50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-400";

  return (
    <section className="mt-10 border-t border-zinc-200/70 pt-10 dark:border-zinc-800">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl font-semibold text-black dark:text-zinc-100">Öğrenci yorumları</h2>
          <p className="mt-1 text-base text-zinc-700 dark:text-zinc-300">
            Bu kursu alan öğrencilerin deneyimlerini okuyun ve kendi yorumunuzu paylaşın.
          </p>
        </div>
        {hydrated && allReviews.length > 0 ? (
          <div className="flex items-center gap-2 rounded-xl bg-amber-50 px-4 py-2 dark:bg-amber-950/30">
            <span className="text-2xl font-bold text-amber-600 dark:text-amber-400">{averageRating.toFixed(1)}</span>
            <div>
              <StarRating rating={Math.round(averageRating)} size="md" />
              <p className="text-sm text-zinc-600 dark:text-zinc-400">{allReviews.length} yorum</p>
            </div>
          </div>
        ) : null}
      </div>

      <div className="mt-6 space-y-4">
        {!hydrated ? (
          <p className="text-base text-zinc-600 dark:text-zinc-400">Yorumlar yükleniyor…</p>
        ) : allReviews.length === 0 ? (
          <p className="text-base text-zinc-700 dark:text-zinc-300">Henüz yorum yok. İlk yorumu siz yazın.</p>
        ) : (
          allReviews.map((review) => <ReviewItem key={review.id} review={review} />)
        )}
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 rounded-2xl border border-zinc-200/70 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900"
      >
        <h3 className="text-xl font-semibold text-black dark:text-zinc-100">Yorum yaz</h3>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">Yorumunuz bu cihazda kaydedilir.</p>

        <div className="mt-5 space-y-4">
          <label className="block space-y-1.5">
            <span className="text-base font-medium text-black dark:text-zinc-200">Adınız</span>
            <input
              type="text"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              placeholder="Örn. Ahmet Y."
              className={inputClassName}
              maxLength={60}
            />
          </label>

          <fieldset className="space-y-2">
            <legend className="text-base font-medium text-black dark:text-zinc-200">Puanınız</legend>
            <div className="flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  className={cn(
                    "inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-sm font-medium transition",
                    rating === value
                      ? "border-violet-600 bg-violet-600 text-white"
                      : "border-zinc-300 text-zinc-800 hover:bg-zinc-100 dark:border-zinc-600 dark:text-zinc-200 dark:hover:bg-zinc-800",
                  )}
                  aria-pressed={rating === value}
                >
                  {value}
                  <Star className="h-3.5 w-3.5 fill-current" />
                </button>
              ))}
            </div>
          </fieldset>

          <label className="block space-y-1.5">
            <span className="text-base font-medium text-black dark:text-zinc-200">Yorumunuz</span>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Kurs hakkındaki düşüncelerinizi paylaşın…"
              rows={4}
              className={cn(inputClassName, "resize-y")}
              maxLength={1000}
            />
          </label>

          {submitMessage ? (
            <p
              className={cn(
                "text-sm font-medium",
                submitMessage.includes("Teşekkür") ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400",
              )}
            >
              {submitMessage}
            </p>
          ) : null}

          <Button type="submit" variant="primary" size="md">
            Yorumu gönder
          </Button>
        </div>
      </form>
    </section>
  );
}
