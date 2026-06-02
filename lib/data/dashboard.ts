export type HeroSlide = {
  id: string;
  title: string;
  description: string;
  ctaPrimary: string;
  ctaSecondary: string;
  gradientClass: string;
};

export type Course = {
  id: string;
  title: string;
  instructor: string;
  rating: number;
  students: string;
  price: string;
  priceValue: number;
  imageClass: string;
  category: string;
  description: string;
  highlights: string[];
  duration: string;
  level: string;
};

export type SkillCategory = {
  id: string;
  title: string;
  courses: Course[];
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  text: string;
  rating: number;
  avatar: string;
};

export const heroSlides: HeroSlide[] = [
  {
    id: "slide-1",
    title: "Kariyerinizi bir üst seviyeye taşıyın",
    description:
      "Yeni nesil beceriler, sektör lideri eğitmenler ve uygulamalı içeriklerle öğrenme deneyiminizi hızlandırın.",
    ctaPrimary: "Hemen Başla",
    ctaSecondary: "Programları İncele",
    gradientClass: "from-indigo-600 via-violet-600 to-fuchsia-600",
  },
  {
    id: "slide-2",
    title: "Takımınız için kurumsal öğrenme altyapısı",
    description:
      "Udemy Business ile ekiplerinize rol bazlı öğrenme planları, analitik raporlar ve sertifikasyon yolları sunun.",
    ctaPrimary: "Demo Al",
    ctaSecondary: "Udemy Business",
    gradientClass: "from-emerald-500 via-teal-500 to-cyan-500",
  },
  {
    id: "slide-3",
    title: "AI destekli öğrenme rotaları",
    description:
      "Kişiselleştirilmiş önerilerle hedeflerinize uygun kursları keşfedin ve ilerlemenizi gerçek zamanlı takip edin.",
    ctaPrimary: "Yol Haritamı Oluştur",
    ctaSecondary: "Popüler Kurslar",
    gradientClass: "from-orange-500 via-rose-500 to-red-500",
  },
];

export const popularCourses: Course[] = [
  {
    id: "course-1",
    title: "React ve Next.js ile Modern Web Geliştirme",
    instructor: "Ahmet Yılmaz",
    rating: 4.8,
    students: "56.320",
    price: "₺799,99",
    priceValue: 799.99,
    imageClass: "from-blue-500 to-indigo-600",
    category: "Web Geliştirme",
    description:
      "React ve Next.js ile production-ready web uygulamaları geliştirmeyi sıfırdan öğrenin. App Router, server components ve modern state yönetimi bu kursun odak noktasıdır.",
    highlights: [
      "Next.js App Router ile tam proje",
      "TypeScript ile tip güvenli geliştirme",
      "API routes ve veri getirme stratejileri",
      "Deploy ve performans optimizasyonu",
    ],
    duration: "42 saat",
    level: "Orta",
  },
  {
    id: "course-2",
    title: "TypeScript Masterclass: Production Patterns",
    instructor: "Elif Demir",
    rating: 4.7,
    students: "21.140",
    price: "₺649,99",
    priceValue: 649.99,
    imageClass: "from-violet-500 to-purple-600",
    category: "Yazılım",
    description:
      "TypeScript ile ölçeklenebilir kod yazımı, generic pattern'ler ve enterprise projelerde kullanılan best practice'leri uygulamalı öğrenin.",
    highlights: [
      "Advanced types ve utility types",
      "Design patterns with TypeScript",
      "Monorepo ve modül mimarisi",
      "Testing ve strict mode stratejileri",
    ],
    duration: "28 saat",
    level: "İleri",
  },
  {
    id: "course-3",
    title: "Veri Bilimi ve Python ile Uygulamalı Analiz",
    instructor: "Mehmet Kaya",
    rating: 4.9,
    students: "43.800",
    price: "₺899,99",
    priceValue: 899.99,
    imageClass: "from-emerald-500 to-teal-600",
    category: "Veri Bilimi",
    description:
      "Python, Pandas ve görselleştirme araçlarıyla veri analizi yapmayı öğrenin. Gerçek veri setleri üzerinde uçtan uca analiz projeleri tamamlayın.",
    highlights: [
      "Pandas ile veri temizleme",
      "Matplotlib ve Seaborn görselleştirme",
      "İstatistiksel analiz temelleri",
      "Capstone veri analizi projesi",
    ],
    duration: "36 saat",
    level: "Başlangıç",
  },
  {
    id: "course-4",
    title: "Siber Güvenlik: Temelden İleri Seviyeye",
    instructor: "Derya Acar",
    rating: 4.6,
    students: "18.420",
    price: "₺729,99",
    priceValue: 729.99,
    imageClass: "from-rose-500 to-red-600",
    category: "Siber Güvenlik",
    description:
      "Ağ güvenliği, zafiyet analizi ve savunma stratejilerini kapsayan kapsamlı bir siber güvenlik programı. Sertifikasyon hazırlığına uygundur.",
    highlights: [
      "Penetrasyon testi temelleri",
      "OWASP Top 10 uygulamalı",
      "Güvenlik operasyonları (SOC)",
      "Incident response senaryoları",
    ],
    duration: "32 saat",
    level: "Orta",
  },
  {
    id: "course-5",
    title: "Yapay Zeka Üretken Modeller ve Prompt Tasarımı",
    instructor: "Can Arslan",
    rating: 4.8,
    students: "31.275",
    price: "₺949,99",
    priceValue: 949.99,
    imageClass: "from-amber-500 to-orange-600",
    category: "Yapay Zeka",
    description:
      "LLM'ler, prompt engineering ve AI destekli ürün geliştirme süreçlerini öğrenin. İş akışlarınızı otomatikleştirmek için pratik şablonlar içerir.",
    highlights: [
      "Prompt engineering framework",
      "RAG ve embedding temelleri",
      "AI API entegrasyonları",
      "Etik ve güvenli AI kullanımı",
    ],
    duration: "24 saat",
    level: "Orta",
  },
  {
    id: "course-6",
    title: "İş İngilizcesi: Sunum ve E-posta Yetkinliği",
    instructor: "Zeynep Öz",
    rating: 4.5,
    students: "12.630",
    price: "₺499,99",
    priceValue: 499.99,
    imageClass: "from-cyan-500 to-sky-600",
    category: "İngilizce",
    description:
      "Profesyonel iş ortamında sunum, toplantı ve e-posta iletişiminde akıcı İngilizce kullanımını geliştirin. Rol oyunları ve şablonlarla desteklenir.",
    highlights: [
      "Toplantı ve sunum İngilizcesi",
      "Profesyonel e-posta yazımı",
      "Negotiation ve networking ifadeleri",
      "Telaffuz ve akıcılık çalışmaları",
    ],
    duration: "18 saat",
    level: "Başlangıç",
  },
];

export const skillCategories: SkillCategory[] = [
  { id: "skill-1", title: "Web Geliştirme", courses: popularCourses.slice(0, 3) },
  { id: "skill-2", title: "Microsoft Office", courses: popularCourses.slice(1, 4) },
  { id: "skill-3", title: "İngilizce", courses: popularCourses.slice(2, 5) },
  { id: "skill-4", title: "Yapay Zeka", courses: popularCourses.slice(3, 6) },
  { id: "skill-5", title: "Veri Bilimi", courses: popularCourses.slice(0, 3) },
  { id: "skill-6", title: "Siber Güvenlik", courses: popularCourses.slice(2, 5) },
];

export const testimonials: Testimonial[] = [
  {
    id: "test-1",
    name: "Melisa Kaplan",
    role: "Frontend Developer",
    text: "Udemy sayesinde 6 ayda kariyerimi tamamen değiştirdim. Gerçek projelerle öğrendim ve iş görüşmelerinde fark yarattım.",
    rating: 5,
    avatar: "MK",
  },
  {
    id: "test-2",
    name: "Burak Eren",
    role: "Data Analyst",
    text: "Veri bilimi yolculuğumda içerikler çok sistematikti. Öğrenme planı ve eğitmen kalitesi kesinlikle premium hissi veriyor.",
    rating: 5,
    avatar: "BE",
  },
  {
    id: "test-3",
    name: "Seda Tunç",
    role: "Product Manager",
    text: "Liderlik ve ürün yönetimi kurslarıyla ekip yönetim becerilerim ciddi şekilde gelişti. Platform oldukça düzenli ve modern.",
    rating: 4,
    avatar: "ST",
  },
  {
    id: "test-4",
    name: "Kerem Şahin",
    role: "Cyber Security Specialist",
    text: "Siber güvenlik içerikleri güncel ve uygulamalıydı. Sertifikasyon hazırlık sürecimde çok zaman kazandım.",
    rating: 5,
    avatar: "KŞ",
  },
];

export function getAllCourses(): Course[] {
  const map = new Map<string, Course>();
  for (const course of popularCourses) {
    map.set(course.id, course);
  }
  for (const category of skillCategories) {
    for (const course of category.courses) {
      map.set(course.id, course);
    }
  }
  return Array.from(map.values());
}

export function getCourseById(id: string): Course | undefined {
  return getAllCourses().find((course) => course.id === id);
}

export function getSkillCategoryById(id: string): SkillCategory | undefined {
  return skillCategories.find((category) => category.id === id);
}

export function getCoursesBySkillId(id: string): Course[] {
  return getSkillCategoryById(id)?.courses ?? [];
}

export function formatPrice(value: number): string {
  return `₺${value.toLocaleString("tr-TR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}
