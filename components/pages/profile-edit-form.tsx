"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { RequireAuth } from "@/components/auth/require-auth";
import { useAuth } from "@/components/providers/auth-provider";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { buttonClassName } from "@/components/ui/button";
import type { User } from "@/lib/types/user";

function ProfileEditFields({
  user,
  onSave,
}: {
  user: User;
  onSave: (data: { name: string; bio: string; language: string }) => void;
}) {
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio ?? "");
  const [language, setLanguage] = useState(user.language);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave({ name, bio, language });
  };

  return (
    <Container className="py-12 sm:py-16">
        <h1 className="text-3xl font-bold text-black dark:text-zinc-100">Profili düzenle</h1>
        <form className="mt-6 max-w-lg space-y-4" onSubmit={handleSubmit}>
          <label className="block space-y-1 text-base">
            <span className="font-medium">Görünen ad</span>
            <input
              required
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11 w-full rounded-lg border border-zinc-300 bg-background px-3 dark:border-zinc-700"
            />
          </label>
          <label className="block space-y-1 text-base">
            <span className="font-medium">Bio</span>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              rows={4}
              className="w-full rounded-lg border border-zinc-300 bg-background px-3 py-2 dark:border-zinc-700"
            />
          </label>
          <label className="block space-y-1 text-base">
            <span className="font-medium">Dil</span>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="h-11 w-full rounded-lg border border-zinc-300 bg-background px-3 dark:border-zinc-700"
            >
              <option>Türkçe</option>
              <option>English</option>
            </select>
          </label>
          <div className="flex gap-3">
            <Button type="submit">Kaydet</Button>
            <Link href="/profile" className={buttonClassName("outline", "md")}>
              İptal
            </Link>
          </div>
        </form>
      </Container>
  );
}

export function ProfileEditForm() {
  const router = useRouter();
  const { user, updateProfile } = useAuth();

  const handleSave = (data: { name: string; bio: string; language: string }) => {
    updateProfile(data);
    router.push("/profile");
  };

  return (
    <RequireAuth requireCompleteProfile>
      {user ? <ProfileEditFields user={user} onSave={handleSave} /> : null}
    </RequireAuth>
  );
}
