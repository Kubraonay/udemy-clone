"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Globe, Menu, Search, ShoppingCart, X } from "lucide-react";
import { useState, type FormEvent } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { NotificationBell } from "@/components/layout/notification-bell";
import { ProfileMenu } from "@/components/layout/profile-menu";
import { useAuth } from "@/components/providers/auth-provider";
import { useCart } from "@/components/providers/cart-provider";
import { buttonClassName } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";

const navLinks = [
  { label: "Kurslar", href: "/courses" },
  { label: "Sertifikasyon", href: "/certification" },
  { label: "Abone Ol", href: "/subscription" },
];

export function Navbar() {
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { count } = useCart();
  const { isAuthenticated, hasCompleteProfile, hydrated } = useAuth();
  const showCartCount = count > 0;
  const showUserNav = hydrated && isAuthenticated && hasCompleteProfile;

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = searchQuery.trim();
    closeMobileMenu();
    if (query) {
      router.push(`/courses?q=${encodeURIComponent(query)}`);
      return;
    }
    router.push("/courses");
  };

  return (
    <header className="sticky top-0 z-30 border-b border-zinc-200 bg-white text-zinc-950 shadow-sm dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100">
      <Container className="py-3">
        {/* Masaüstü */}
        <div className="hidden items-center gap-5 md:flex lg:gap-6">
          <div className="flex shrink-0 items-center gap-5 lg:gap-6">
            <Link href="/" className="flex items-center gap-2" onClick={closeMobileMenu}>
              <div className="rounded-lg bg-violet-700 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-sm">
                Learn
              </div>
              <span className="text-2xl font-black tracking-tight text-zinc-950 dark:text-white">Udemy</span>
            </Link>
            <nav className="hidden items-center gap-5 text-base font-semibold text-zinc-950 lg:flex lg:gap-6 dark:text-zinc-100">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="whitespace-nowrap transition hover:text-violet-700 dark:hover:text-violet-300"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <form onSubmit={handleSearchSubmit} className="flex flex-1 justify-center px-2 lg:px-4">
            <label className="sr-only" htmlFor="navbar-search-desktop">
              Kurs ara
            </label>
            <div className="flex h-8 w-full max-w-sm items-center gap-2 rounded-full border border-zinc-300 bg-zinc-50 px-3 lg:max-w-md dark:border-zinc-600 dark:bg-zinc-900">
              <Search className="h-3.5 w-3.5 shrink-0 text-zinc-600 dark:text-zinc-400" aria-hidden />
              <input
                id="navbar-search-desktop"
                type="search"
                name="q"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Eğitmen, kurs veya yetkinlik arayın"
                className="min-w-0 flex-1 bg-transparent text-sm text-zinc-950 placeholder:text-zinc-500 focus:outline-none dark:text-zinc-50 dark:placeholder:text-zinc-400"
              />
            </div>
          </form>

          <div className="flex shrink-0 items-center gap-2 lg:gap-3">
            <div className="hidden items-center gap-5 text-base font-medium xl:flex">
              <Link href="/courses" className="whitespace-nowrap transition hover:text-violet-700 dark:hover:text-violet-300">
                Udemy Business
              </Link>
              <Link href="/courses" className="whitespace-nowrap transition hover:text-violet-700 dark:hover:text-violet-300">
                Udemy&apos;de Eğitim Verin
              </Link>
            </div>
            {showUserNav ? <NotificationBell /> : null}
            <Link
              href="/cart"
              aria-label="Sepet"
              className="relative hidden h-10 w-10 items-center justify-center rounded-full border border-zinc-300 sm:inline-flex dark:border-zinc-600"
            >
              <ShoppingCart className="h-4 w-4" />
              {showCartCount ? (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-violet-600 px-1 text-[10px] font-bold text-white">
                  {count}
                </span>
              ) : null}
            </Link>
            {showUserNav ? (
              <ProfileMenu />
            ) : (
              <>
                <Link href="/login" className={cn(buttonClassName("outline", "md"), "hidden sm:inline-flex")}>
                  Oturum Aç
                </Link>
                <Link href="/register" className={cn(buttonClassName("primary", "md"), "hidden sm:inline-flex")}>
                  Kayıt Ol
                </Link>
              </>
            )}
            <button
              type="button"
              aria-label="Dil değiştir"
              className="hidden h-10 w-10 items-center justify-center rounded-full border border-zinc-300 lg:inline-flex dark:border-zinc-600"
            >
              <Globe className="h-4 w-4" />
            </button>
            <ThemeToggle />
          </div>
        </div>

        {/* Mobil */}
        <div className="flex flex-col gap-3 md:hidden">
          <div className="flex items-center justify-between gap-3">
            <Link href="/" className="flex items-center gap-2" onClick={closeMobileMenu}>
              <div className="rounded-lg bg-violet-700 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-sm">
                Learn
              </div>
              <span className="text-xl font-black tracking-tight text-zinc-950 dark:text-white">Udemy</span>
            </Link>
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Menü"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-300 dark:border-zinc-600"
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
          <form onSubmit={handleSearchSubmit} className="mx-auto w-full max-w-sm">
            <label className="sr-only" htmlFor="navbar-search-mobile">
              Kurs ara
            </label>
            <div className="flex h-8 w-full items-center gap-2 rounded-full border border-zinc-300 bg-zinc-50 px-3 dark:border-zinc-600 dark:bg-zinc-900">
              <Search className="h-3.5 w-3.5 shrink-0 text-zinc-600 dark:text-zinc-400" aria-hidden />
              <input
                id="navbar-search-mobile"
                type="search"
                name="q"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Eğitmen, kurs veya yetkinlik arayın"
                className="min-w-0 flex-1 bg-transparent text-sm text-zinc-950 placeholder:text-zinc-500 focus:outline-none dark:text-zinc-50 dark:placeholder:text-zinc-400"
              />
            </div>
          </form>
        </div>

        {isMobileMenuOpen ? (
          <div className="mt-3 space-y-3 rounded-2xl border border-zinc-200 bg-zinc-50 p-4 lg:hidden dark:border-zinc-800 dark:bg-zinc-900">
            <nav className="grid grid-cols-2 gap-2 text-base font-semibold">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="rounded-lg border border-zinc-200 px-3 py-2 dark:border-zinc-700"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-wrap items-center gap-2">
              {showUserNav ? (
                <>
                  <Link
                    href="/notifications"
                    onClick={closeMobileMenu}
                    className={cn(buttonClassName("outline", "md"), "min-w-[120px] flex-1")}
                  >
                    Bildirimler
                  </Link>
                  <Link
                    href="/profile"
                    onClick={closeMobileMenu}
                    className={cn(buttonClassName("outline", "md"), "min-w-[120px] flex-1")}
                  >
                    Profilim
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={closeMobileMenu}
                    className={cn(buttonClassName("outline", "md"), "min-w-[120px] flex-1")}
                  >
                    Oturum Aç
                  </Link>
                  <Link
                    href="/register"
                    onClick={closeMobileMenu}
                    className={cn(buttonClassName("primary", "md"), "min-w-[120px] flex-1")}
                  >
                    Kayıt Ol
                  </Link>
                </>
              )}
            </div>
          </div>
        ) : null}
      </Container>
    </header>
  );
}
