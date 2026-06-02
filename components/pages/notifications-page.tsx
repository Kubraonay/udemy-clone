"use client";

import Link from "next/link";
import { RequireAuth } from "@/components/auth/require-auth";
import { useNotifications } from "@/components/providers/notification-provider";
import { Container } from "@/components/ui/container";
import { buttonClassName } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function formatDate(iso: string) {
  return new Date(iso).toLocaleString("tr-TR", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function NotificationsPage() {
  const { notifications, markAsRead, markAllRead } = useNotifications();

  return (
    <RequireAuth requireCompleteProfile>
      <Container className="py-10 sm:py-14">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-black dark:text-zinc-100">Bildirimler</h1>
            <p className="mt-2 text-base text-zinc-600 dark:text-zinc-400">
              Eğitmenlerinizden kurs güncellemeleri ve yeni içerik haberleri.
            </p>
          </div>
          {notifications.some((n) => !n.read) ? (
            <button type="button" onClick={markAllRead} className={buttonClassName("outline", "md")}>
              Tümünü okundu işaretle
            </button>
          ) : null}
        </div>
        <ul className="mt-8 space-y-3">
          {notifications.length === 0 ? (
            <li className="rounded-xl border border-zinc-200 p-6 text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
              Henüz bildirim yok. Kurslara göz attıkça güncellemeler burada görünecek.
            </li>
          ) : (
            notifications.map((item) => (
              <li
                key={item.id}
                className={cn(
                  "rounded-xl border border-zinc-200 p-4 dark:border-zinc-800",
                  !item.read && "border-violet-300 bg-violet-50/50 dark:border-violet-800 dark:bg-violet-950/20",
                )}
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <p className="font-semibold text-zinc-900 dark:text-zinc-100">{item.title}</p>
                    <p className="mt-1 text-base text-zinc-700 dark:text-zinc-300">{item.message}</p>
                    <p className="mt-2 text-xs text-zinc-500">{formatDate(item.createdAt)}</p>
                  </div>
                  {!item.read ? (
                    <button
                      type="button"
                      onClick={() => markAsRead(item.id)}
                      className="text-sm font-medium text-violet-700 hover:underline dark:text-violet-300"
                    >
                      Okundu
                    </button>
                  ) : null}
                </div>
                {item.courseId ? (
                  <Link
                    href={`/courses/${item.courseId}`}
                    className="mt-3 inline-block text-sm font-medium text-violet-700 hover:underline dark:text-violet-300"
                  >
                    Kursa git
                  </Link>
                ) : null}
              </li>
            ))
          )}
        </ul>
      </Container>
    </RequireAuth>
  );
}
