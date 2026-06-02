import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { Container } from "@/components/ui/container";
import { buttonClassName } from "@/components/ui/button";

export default function CertificationPage() {
  return (
    <SiteShell>
      <Container className="py-12 sm:py-16">
        <h1 className="text-4xl font-bold text-black dark:text-zinc-100">Sertifikasyon</h1>
        <p className="mt-4 max-w-3xl text-lg leading-8 text-black dark:text-zinc-200">
          Kursları tamamladığınızda dijital sertifika kazanın ve LinkedIn profilinizde paylaşın. Sertifikasyon
          yolları kariyer hedeflerinize göre düzenlenmiştir.
        </p>
        <ul className="mt-6 list-disc space-y-2 pl-5 text-base text-black dark:text-zinc-200">
          <li>Tamamlama sertifikaları</li>
          <li>Profesyonel sertifikasyon programları</li>
          <li>İşverenler tarafından tanınan rozetler</li>
        </ul>
        <Link href="/courses" className={buttonClassName("primary", "md", "mt-8 inline-flex")}>
          Sertifika veren kurslara git
        </Link>
      </Container>
    </SiteShell>
  );
}
