import Link from "next/link";
import { SiteShell } from "@/components/layout/site-shell";
import { Container } from "@/components/ui/container";
import { buttonClassName } from "@/components/ui/button";

export default function CourseNotFound() {
  return (
    <SiteShell>
      <Container className="py-20 text-center">
        <h1 className="text-3xl font-bold text-black dark:text-zinc-100">Kurs bulunamadı</h1>
        <p className="mt-3 text-base text-black dark:text-zinc-300">Aradığınız kurs mevcut değil veya kaldırılmış olabilir.</p>
        <Link href="/courses" className={buttonClassName("primary", "md", "mt-8 inline-flex")}>
          Kurslara dön
        </Link>
      </Container>
    </SiteShell>
  );
}
