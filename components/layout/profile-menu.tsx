"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "@/components/providers/auth-provider";
import { cn } from "@/lib/utils";

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function MenuDivider() {
  return <div className="my-1 border-t border-zinc-200 dark:border-zinc-700" />;
}

type MenuLinkProps = {
  href: string;
  label: string;
  onClick: () => void;
  suffix?: string;
};

function MenuLink({ href, label, onClick, suffix }: MenuLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex w-full items-center justify-between px-4 py-2.5 text-left text-sm text-zinc-900 transition hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-800"
    >
      <span>{label}</span>
      {suffix ? <span className="text-zinc-500 dark:text-zinc-400">{suffix}</span> : null}
    </Link>
  );
}

export function ProfileMenu() {
  const router = useRouter();
  const { user, logout } = useAuth();
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

  if (!user) return null;

  const close = () => setOpen(false);

  const handleLogout = () => {
    close();
    logout();
    router.push("/");
  };

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Profil menüsü"
        aria-expanded={open}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-violet-600 text-sm font-bold text-white transition hover:bg-violet-700"
      >
        {getInitials(user.name)}
      </button>
      {open ? (
        <div
          role="menu"
          className={cn(
            "absolute right-0 z-50 mt-2 w-72 overflow-hidden rounded-lg border border-zinc-200 bg-white py-1 shadow-xl",
            "dark:border-zinc-700 dark:bg-zinc-900",
          )}
        >
          <MenuLink href="/learning" label="Öğrenim İçeriğim" onClick={close} />
          <MenuLink href="/cart" label="Sepetim" onClick={close} />
          <MenuLink href="/wishlist" label="İstek Listesi" onClick={close} />
          <MenuLink href="/courses" label="Udemy'de Eğitim Verin" onClick={close} />
          <MenuDivider />
          <MenuLink href="/notifications" label="Bildirimler" onClick={close} />
          <MenuLink href="/messages" label="Mesajlar" onClick={close} />
          <MenuDivider />
          <MenuLink href="/account/settings" label="Hesap ayarları" onClick={close} />
          <MenuLink href="/account/payments" label="Ödeme yöntemleri" onClick={close} />
          <MenuLink href="/subscription" label="Abonelikler" onClick={close} />
          <MenuLink href="/account/credits" label="Udemy kredileri" onClick={close} />
          <MenuLink href="/account/purchases" label="Satın alma geçmişi" onClick={close} />
          <MenuDivider />
          <MenuLink href="/account/language" label="Dil" suffix={user.language} onClick={close} />
          <MenuDivider />
          <MenuLink href="/profile" label="Herkese açık profil" onClick={close} />
          <MenuLink href="/profile/edit" label="Profili düzenle" onClick={close} />
          <MenuDivider />
          <MenuLink href="/help" label="Yardım ve Destek" onClick={close} />
          <button
            type="button"
            role="menuitem"
            onClick={handleLogout}
            className="flex w-full px-4 py-2.5 text-left text-sm text-zinc-900 transition hover:bg-zinc-100 dark:text-zinc-100 dark:hover:bg-zinc-800"
          >
            Oturumu kapat
          </button>
        </div>
      ) : null}
    </div>
  );
}
