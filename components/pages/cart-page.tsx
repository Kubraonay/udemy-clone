"use client";

import Link from "next/link";
import { Trash2 } from "lucide-react";
import { useCart } from "@/components/providers/cart-provider";
import { formatPrice } from "@/lib/data/dashboard";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { buttonClassName } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CartPage() {
  const { items, total, removeFromCart, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <Container className="py-16 text-center">
        <SectionHeader title="Sepetiniz" description="Henüz sepetinize kurs eklemediniz." />
        <Link href="/courses" className={buttonClassName("primary", "md", "mt-4 inline-flex")}>
          Kurslara git
        </Link>
      </Container>
    );
  }

  return (
    <Container className="pt-10 sm:pt-14">
      <SectionHeader title="Sepetiniz" description={`${items.length} kurs seçtiniz.`} />

      <div className="space-y-4">
        {items.map((course) => (
          <article
            key={course.id}
            className="flex flex-col gap-4 rounded-2xl border border-zinc-200/70 bg-white p-4 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800 dark:bg-zinc-900"
          >
            <div className="flex gap-4">
              <div className={cn("h-20 w-32 shrink-0 rounded-lg bg-gradient-to-br", course.imageClass)} />
              <div>
                <Link href={`/courses/${course.id}`} className="text-xl font-semibold text-black hover:underline dark:text-zinc-100">
                  {course.title}
                </Link>
                <p className="text-base text-black dark:text-zinc-300">{course.instructor}</p>
                <p className="mt-1 text-lg font-bold text-black dark:text-zinc-100">{course.price}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => removeFromCart(course.id)}
              className="inline-flex items-center gap-2 rounded-full border border-zinc-300 px-4 py-2 text-base text-black transition hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-200 dark:hover:bg-zinc-800"
            >
              <Trash2 className="h-4 w-4" />
              Kaldır
            </button>
          </article>
        ))}
      </div>

      <div className="mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl border border-zinc-200/70 bg-white p-6 sm:flex-row sm:items-center dark:border-zinc-800 dark:bg-zinc-900">
        <div>
          <p className="text-base text-black dark:text-zinc-300">Ara toplam</p>
          <p className="text-3xl font-bold text-black dark:text-zinc-100">{formatPrice(total)}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={clearCart} className={buttonClassName("outline", "md")}>
            Sepeti temizle
          </button>
          <Link href="/courses" className={buttonClassName("primary", "md")}>
            Alışverişe devam et
          </Link>
        </div>
      </div>
    </Container>
  );
}
