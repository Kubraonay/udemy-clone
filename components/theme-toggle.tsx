"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    () => () => undefined,
    () => true,
    () => false,
  );

  if (!mounted) {
    return <span className="h-9 w-9 rounded-full border border-black/20 dark:border-zinc-700" />;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/25 bg-black/[0.03] text-black transition hover:bg-black/10 dark:border-zinc-700 dark:bg-transparent dark:text-zinc-100 dark:hover:bg-zinc-800"
      aria-label="Temayı değiştir"
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4 text-black" />}
    </button>
  );
}
