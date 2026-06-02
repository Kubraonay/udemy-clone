import { Container } from "@/components/ui/container";

const footerColumns = [
  {
    title: "Hakkında",
    links: ["Biz Kimiz", "Kariyer", "Blog", "İletişim"],
  },
  {
    title: "Udemy Keşfet",
    links: ["Tüm Kategoriler", "Trend Kurslar", "Yeni Yayınlananlar", "Sertifikasyonlar"],
  },
  {
    title: "Udemy for Business",
    links: ["Çözümler", "Kurumsal Eğitim", "Müşteri Hikayeleri", "Demo Talebi"],
  },
  {
    title: "Yasal Konular",
    links: ["Erişilebilirlik", "Gizlilik Politikası", "Kullanım Koşulları", "Yardım ve Destek"],
  },
];

export function Footer() {
  return (
    <footer className="mt-16 border-t border-zinc-200/70 bg-zinc-100/70 dark:border-zinc-800 dark:bg-zinc-900/40">
      <Container className="py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {footerColumns.map((column) => (
            <div key={column.title} className="space-y-4">
              <h3 className="text-base font-semibold uppercase tracking-wide text-black dark:text-zinc-100">{column.title}</h3>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-base text-black transition hover:text-violet-600 dark:text-zinc-300 dark:hover:text-violet-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-zinc-200/70 pt-6 text-base text-black dark:border-zinc-800 dark:text-zinc-400 sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Udemy Clone. Tüm hakları saklıdır.</p>
          <p>Modern learning platform experience.</p>
        </div>
      </Container>
    </footer>
  );
}
