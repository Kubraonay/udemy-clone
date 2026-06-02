"use client";

import Link from "next/link";
import { RequireAuth } from "@/components/auth/require-auth";
import { useAuth } from "@/components/providers/auth-provider";
import { Container } from "@/components/ui/container";
import { buttonClassName } from "@/components/ui/button";

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

export function PublicProfile() {
  const { user } = useAuth();

  return (
    <RequireAuth requireCompleteProfile>
      <Container className="py-12 sm:py-16">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-violet-600 text-2xl font-bold text-white">
            {user ? getInitials(user.name) : "?"}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-black dark:text-zinc-100">{user?.name}</h1>
            <p className="mt-1 text-base text-zinc-600 dark:text-zinc-400">{user?.email}</p>
            {user?.bio ? (
              <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-800 dark:text-zinc-200">{user.bio}</p>
            ) : (
              <p className="mt-4 text-base text-zinc-500">Henüz bio eklenmemiş.</p>
            )}
            <p className="mt-2 text-sm text-zinc-500">Dil: {user?.language}</p>
            <Link href="/profile/edit" className={buttonClassName("outline", "md", "mt-6 inline-flex")}>
              Profili düzenle
            </Link>
          </div>
        </div>
      </Container>
    </RequireAuth>
  );
}
