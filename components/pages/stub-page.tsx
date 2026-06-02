import { SiteShell } from "@/components/layout/site-shell";
import { Container } from "@/components/ui/container";

type StubPageProps = {
  title: string;
  description: string;
};

export function StubPage({ title, description }: StubPageProps) {
  return (
    <SiteShell>
      <Container className="py-12 sm:py-16">
        <h1 className="text-3xl font-bold text-black dark:text-zinc-100 sm:text-4xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-zinc-700 dark:text-zinc-300">{description}</p>
      </Container>
    </SiteShell>
  );
}
