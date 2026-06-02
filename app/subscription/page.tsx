import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { Container } from "@/components/ui/container";
import { buttonClassName } from "@/components/ui/button";

export default function SubscriptionPage() {
  return (
    <SiteShell>
      <Container className="py-12 sm:py-16">
        <h1 className="text-4xl font-bold text-black dark:text-zinc-100">Abone Ol</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-black dark:text-zinc-200">
          Udemy aboneliği ile binlerce kursa sınırsız erişin. Kişisel öğrenme planları, sertifikalar ve mobil
          erişim tek pakette.
        </p>
        <ul className="mt-6 list-disc space-y-2 pl-5 text-base text-black dark:text-zinc-200">
          <li>Aylık veya yıllık esnek planlar</li>
          <li>Tüm popüler kategorilere erişim</li>
          <li>İstediğiniz zaman iptal</li>
        </ul>
        <Link href="/courses" className={buttonClassName("primary", "md", "mt-8 inline-flex")}>
          Kursları keşfet
        </Link>
      </Container>
    </SiteShell>
  );
}
