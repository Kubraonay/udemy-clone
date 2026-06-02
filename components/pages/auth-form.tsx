"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { buttonClassName } from "@/components/ui/button";
import { useAuth } from "@/components/providers/auth-provider";

type AuthFormProps = {
  mode: "login" | "register";
};

export function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter();
  const { register, login } = useAuth();
  const isLogin = mode === "login";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (isLogin) {
      const result = login(email, password);
      if (!result.ok) {
        setError(result.error ?? "Giriş başarısız.");
        return;
      }
      router.push(result.needsProfileSetup ? "/profile/setup" : "/");
      return;
    }

    const result = register(name, email, password);
    if (!result.ok) {
      setError(result.error ?? "Kayıt başarısız.");
      return;
    }
    router.push("/profile/setup");
  };

  return (
    <Container className="flex min-h-[60vh] items-center justify-center py-12">
      <div className="w-full max-w-md rounded-2xl border border-zinc-200/70 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
        <h1 className="text-3xl font-bold text-black dark:text-zinc-100">
          {isLogin ? "Oturum Aç" : "Kayıt Ol"}
        </h1>
        <p className="mt-2 text-base text-black dark:text-zinc-300">
          {isLogin
            ? "Hesabınıza giriş yaparak kurslarınıza devam edin."
            : "Yeni hesap oluşturarak öğrenmeye hemen başlayın."}
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {!isLogin ? (
            <label className="block space-y-1 text-base">
              <span className="font-medium text-black dark:text-zinc-200">Ad Soyad</span>
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-11 w-full rounded-lg border border-zinc-300 bg-background px-3 dark:border-zinc-700"
              />
            </label>
          ) : null}
          <label className="block space-y-1 text-base">
            <span className="font-medium text-black dark:text-zinc-200">E-posta</span>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 w-full rounded-lg border border-zinc-300 bg-background px-3 dark:border-zinc-700"
            />
          </label>
          <label className="block space-y-1 text-base">
            <span className="font-medium text-black dark:text-zinc-200">Şifre</span>
            <input
              required
              type="password"
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 w-full rounded-lg border border-zinc-300 bg-background px-3 dark:border-zinc-700"
            />
          </label>
          {error ? <p className="text-sm font-medium text-rose-600 dark:text-rose-400">{error}</p> : null}
          <Button type="submit" className="w-full">
            {isLogin ? "Giriş Yap" : "Hesap Oluştur"}
          </Button>
        </form>

        <p className="mt-6 text-center text-base text-black dark:text-zinc-300">
          {isLogin ? "Hesabınız yok mu?" : "Zaten hesabınız var mı?"}{" "}
          <Link
            href={isLogin ? "/register" : "/login"}
            className="font-medium text-violet-600 hover:underline dark:text-violet-300"
          >
            {isLogin ? "Kayıt olun" : "Oturum açın"}
          </Link>
        </p>
        <Link href="/" className={buttonClassName("ghost", "sm", "mt-4 inline-flex w-full justify-center")}>
          Ana sayfaya dön
        </Link>
      </div>
    </Container>
  );
}
