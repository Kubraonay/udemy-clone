"use client";

import { useRouter } from "next/navigation";
import { useEffect, type ReactNode } from "react";
import { useAuth } from "@/components/providers/auth-provider";

type RequireAuthProps = {
  children: ReactNode;
  requireCompleteProfile?: boolean;
};

export function RequireAuth({ children, requireCompleteProfile = false }: RequireAuthProps) {
  const router = useRouter();
  const { isAuthenticated, hasCompleteProfile, hydrated } = useAuth();

  useEffect(() => {
    if (!hydrated) return;
    if (!isAuthenticated) {
      router.replace("/login");
      return;
    }
    if (requireCompleteProfile && !hasCompleteProfile) {
      router.replace("/profile/setup");
    }
  }, [hydrated, isAuthenticated, hasCompleteProfile, requireCompleteProfile, router]);

  if (!hydrated) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-base text-zinc-600 dark:text-zinc-400">Yükleniyor…</p>
      </div>
    );
  }

  if (!isAuthenticated) return null;
  if (requireCompleteProfile && !hasCompleteProfile) return null;

  return children;
}
