"use client";

import Link from "next/link";
import { Bell } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNotifications } from "@/components/providers/notification-provider";
import { cn } from "@/lib/utils";

export function NotificationBell() {
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const recent = notifications.slice(0, 8);

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Bildirimler"
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-zinc-300 transition hover:bg-zinc-100 dark:border-zinc-600 dark:hover:bg-zinc-800"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 ? (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-violet-600 px-1 text-[10px] font-bold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        ) : null}
      </button>
      {open ? (
        <div
          className={cn(
            "absolute right-0 z-50 mt-2 w-80 overflow-hidden rounded-lg border border-zinc-200 bg-white shadow-xl",
            "dark:border-zinc-700 dark:bg-zinc-900",
          )}
        >
          <div className="border-b border-zinc-200 px-4 py-3 dark:border-zinc-700">
            <p className="font-semibold text-zinc-900 dark:text-zinc-100">Bildirimler</p>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {recent.length === 0 ? (
              <p className="px-4 py-6 text-sm text-zinc-500">Henüz bildirim yok.</p>
            ) : (
              recent.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    markAsRead(item.id);
                    setOpen(false);
                  }}
                  className={cn(
                    "block w-full border-b border-zinc-100 px-4 py-3 text-left transition hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50",
                    !item.read && "bg-violet-50/80 dark:bg-violet-950/30",
                  )}
                >
                  <p className="text-xs font-semibold text-violet-700 dark:text-violet-300">{item.title}</p>
                  <p className="mt-0.5 text-sm text-zinc-800 dark:text-zinc-200">{item.message}</p>
                </button>
              ))
            )}
          </div>
          <Link
            href="/notifications"
            onClick={() => setOpen(false)}
            className="block border-t border-zinc-200 px-4 py-3 text-center text-sm font-medium text-violet-700 hover:bg-zinc-50 dark:border-zinc-700 dark:text-violet-300 dark:hover:bg-zinc-800"
          >
            Tümünü gör
          </Link>
        </div>
      ) : null}
    </div>
  );
}
