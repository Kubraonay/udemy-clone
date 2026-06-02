"use client";

import { Globe, Menu, Search, ShoppingCart, X } from "lucide-react";
import { useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

const navItems = ["Kurslar", "Sertifikasyon", "Abone Ol"];

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-black/10 bg-background text-foreground shadow-sm">
      <Container className="py-3.5">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-violet-700 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white shadow-sm">
                Learn
              </div>
              <div className="text-[1.75rem] font-black tracking-tight text-foreground">Udemy</div>
            </div>
            <nav className="hidden items-center gap-3.5 text-xs font-medium text-foreground lg:flex">
              {navItems.map((item) => (
                <a key={item} className="transition hover:text-violet-700 dark:hover:text-violet-300" href="#">
                  {item}
                </a>
              ))}
            </nav>
          </div>

          <div className="hidden flex-[1.35] md:block">
            <div className="flex h-11 items-center gap-2 rounded-full border border-black/15 bg-background px-4">
              <Search className="h-4 w-4 text-foreground/60" />
              <input
                type="text"
                placeholder="Eğitmen, kurs veya yetkinlik arayın"
                className="w-full bg-transparent text-xs text-foreground placeholder:text-foreground/50 focus:outline-none"
              />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-2">
            <div className="hidden items-center gap-3 text-xs xl:flex">
              <a href="#" className="text-foreground transition hover:text-violet-700 dark:hover:text-violet-300">
                Udemy Business
              </a>
              <a href="#" className="text-foreground transition hover:text-violet-700 dark:hover:text-violet-300">
                Udemy&apos;de Eğitim Verin
              </a>
            </div>
            <button
              type="button"
              aria-label="Sepet"
              className="hidden h-9 w-9 items-center justify-center rounded-full border border-black/15 text-foreground transition hover:bg-black/5 md:inline-flex dark:hover:bg-white/10"
            >
              <ShoppingCart className="h-4 w-4" />
            </button>
            <Button variant="outline" className="hidden md:inline-flex">
              Oturum Aç
            </Button>
            <Button className="hidden md:inline-flex">Kayıt Ol</Button>
            <button
              type="button"
              aria-label="Dil değiştir"
              className="hidden h-9 w-9 items-center justify-center rounded-full border border-black/15 text-foreground transition hover:bg-black/5 lg:inline-flex dark:hover:bg-white/10"
            >
              <Globe className="h-4 w-4" />
            </button>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Menü"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/15 text-foreground lg:hidden"
            >
              {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
        {isMobileMenuOpen ? (
          <div className="mt-4 space-y-4 rounded-2xl border border-black/10 bg-background p-4 lg:hidden">
            <div className="flex h-11 items-center gap-2 rounded-full border border-black/15 bg-background px-4">
              <Search className="h-4 w-4 text-foreground/60" />
              <input
                type="text"
                placeholder="Kurs ara..."
                className="w-full bg-transparent text-base text-foreground placeholder:text-foreground/50 focus:outline-none"
              />
            </div>
            <nav className="grid grid-cols-2 gap-3 text-sm font-semibold text-foreground">
              {navItems.map((item) => (
                <a key={item} href="#" className="rounded-lg border border-black/10 px-3 py-2">
                  {item}
                </a>
              ))}
              <a href="#" className="rounded-lg border border-black/10 px-3 py-2">
                Udemy Business
              </a>
              <a href="#" className="rounded-lg border border-black/10 px-3 py-2">
                Udemy&apos;de Eğitim Verin
              </a>
            </nav>
            <div className="flex flex-wrap items-center gap-2">
              <Button variant="outline" className="flex-1 min-w-[120px]">
                Oturum Aç
              </Button>
              <Button className="flex-1 min-w-[120px]">Kayıt Ol</Button>
              <button
                type="button"
                aria-label="Sepet"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/15 text-foreground transition hover:bg-black/5 dark:hover:bg-white/10"
              >
                <ShoppingCart className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Dil değiştir"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/15 text-foreground transition hover:bg-black/5 dark:hover:bg-white/10"
              >
                <Globe className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : null}
      </Container>
    </header>
  );
}
