"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, type FormEvent } from "react";
import { RequireAuth } from "@/components/auth/require-auth";
import { useAuth } from "@/components/providers/auth-provider";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import type { User } from "@/lib/types/user";

function ProfileSetupFields({
  user,
  onComplete,
}: {
  user: User;
  onComplete: (data: { name: string; bio: string; language: string }) => void;
}) {
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio ?? "");
  const [language, setLanguage] = useState(user.language);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onComplete({ name, bio, language });
  };

  return (
    <Container className="flex min-h-[60vh] items-center justify-center py-12">
        <div className="w-full max-w-lg rounded-2xl border border-zinc-200/70 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
          <h1 className="text-3xl font-bold text-black dark:text-zinc-100">Profilinizi oluşturun</h1>
          <p className="mt-2 text-base text-zinc-700 dark:text-zinc-300">
            Hesabınızı kişiselleştirin ve kurs bildirimlerini almaya başlayın.
          </p>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <label className="block space-y-1 text-base">
              <span className="font-medium text-black dark:text-zinc-200">Görünen ad</span>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11 w-full rounded-lg border border-zinc-300 bg-background px-3 dark:border-zinc-700"
              />
            </label>
            <label className="block space-y-1 text-base">
              <span className="font-medium text-black dark:text-zinc-200">Kısa bio (isteğe bağlı)</span>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="w-full rounded-lg border border-zinc-300 bg-background px-3 py-2 dark:border-zinc-700"
                placeholder="Kendinizi kısaca tanıtın…"
              />
            </label>
            <label className="block space-y-1 text-base">
              <span className="font-medium text-black dark:text-zinc-200">Dil</span>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="h-11 w-full rounded-lg border border-zinc-300 bg-background px-3 dark:border-zinc-700"
              >
                <option>Türkçe</option>
                <option>English</option>
              </select>
            </label>
            <Button type="submit" className="w-full">
              Profili tamamla
            </Button>
          </form>
        </div>
      </Container>
  );
}

export function ProfileSetupForm() {
  const router = useRouter();
  const { user, completeProfile, hasCompleteProfile } = useAuth();

  useEffect(() => {
    if (hasCompleteProfile) {
      router.replace("/");
    }
  }, [hasCompleteProfile, router]);

  const handleComplete = (data: { name: string; bio: string; language: string }) => {
    completeProfile(data);
    router.push("/");
  };

  return (
    <RequireAuth>
      {user ? <ProfileSetupFields user={user} onComplete={handleComplete} /> : null}
    </RequireAuth>
  );
}
