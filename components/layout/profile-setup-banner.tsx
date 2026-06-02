"use client";

import Link from "next/link";
import { useAuth } from "@/components/providers/auth-provider";

export function ProfileSetupBanner() {
  const { isAuthenticated, hasCompleteProfile, hydrated } = useAuth();

  if (!hydrated || !isAuthenticated || hasCompleteProfile) return null;

  return (
    <div className="border-b border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm text-amber-950 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-100">
      Profilinizi tamamlayarak bildirimleri ve menü özelliklerini kullanabilirsiniz.{" "}
      <Link href="/profile/setup" className="font-semibold underline hover:text-amber-800">
        Profil oluştur
      </Link>
    </div>
  );
}
