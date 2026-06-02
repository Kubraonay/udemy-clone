export type CourseReview = {
  id: string;
  courseId: string;
  author: string;
  rating: number;
  text: string;
  createdAt: string;
};

export const seedCourseReviews: Record<string, CourseReview[]> = {
  "course-1": [
    {
      id: "rev-1-1",
      courseId: "course-1",
      author: "Emre T.",
      rating: 5,
      text: "Next.js App Router anlatımı çok net. Projeleri adım adım takip etmek kolaydı, iş görüşmesinde doğrudan kullandım.",
      createdAt: "2025-11-12T10:00:00.000Z",
    },
    {
      id: "rev-1-2",
      courseId: "course-1",
      author: "Ayşe K.",
      rating: 4,
      text: "İçerik güncel ve bol pratik var. Bazı bölümler hızlı geçiyor ama tekrar izleyerek telafi edilebilir.",
      createdAt: "2025-10-28T14:30:00.000Z",
    },
  ],
  "course-2": [
    {
      id: "rev-2-1",
      courseId: "course-2",
      author: "Murat D.",
      rating: 5,
      text: "Generic ve utility type bölümleri mükemmel. Kurumsal projelerde hemen uyguladım.",
      createdAt: "2025-11-05T09:15:00.000Z",
    },
    {
      id: "rev-2-2",
      courseId: "course-2",
      author: "Selin Y.",
      rating: 4,
      text: "İleri seviye pattern'ler için ideal. Ön bilgi olarak temel TS bilmek şart.",
      createdAt: "2025-09-20T16:45:00.000Z",
    },
  ],
  "course-3": [
    {
      id: "rev-3-1",
      courseId: "course-3",
      author: "Deniz A.",
      rating: 5,
      text: "Pandas ve görselleştirme modülleri çok iyi yapılandırılmış. Capstone projesi portföyüme ekledim.",
      createdAt: "2025-11-18T11:20:00.000Z",
    },
    {
      id: "rev-3-2",
      courseId: "course-3",
      author: "Fatma G.",
      rating: 5,
      text: "Sıfırdan veri analizi öğrenmek isteyenler için en iyi Türkçe kaynaklardan biri.",
      createdAt: "2025-10-01T08:00:00.000Z",
    },
  ],
  "course-4": [
    {
      id: "rev-4-1",
      courseId: "course-4",
      author: "Oğuz H.",
      rating: 4,
      text: "OWASP ve SOC bölümleri gerçekten işe yarar. Lab ortamı kurulumu biraz zaman alıyor.",
      createdAt: "2025-11-10T13:00:00.000Z",
    },
    {
      id: "rev-4-2",
      courseId: "course-4",
      author: "İrem S.",
      rating: 5,
      text: "Sertifikasyon hazırlığı için tam aradığım içerik. Eğitmen örnekleri güncel.",
      createdAt: "2025-09-15T17:30:00.000Z",
    },
  ],
  "course-5": [
    {
      id: "rev-5-1",
      courseId: "course-5",
      author: "Barış L.",
      rating: 5,
      text: "Prompt şablonları günlük iş akışıma entegre ettim. RAG bölümü özellikle değerli.",
      createdAt: "2025-11-22T10:45:00.000Z",
    },
    {
      id: "rev-5-2",
      courseId: "course-5",
      author: "Ceren M.",
      rating: 4,
      text: "AI API entegrasyonları net anlatılmış. Daha fazla gerçek dünya örneği olsa süper olurdu.",
      createdAt: "2025-10-12T12:00:00.000Z",
    },
  ],
  "course-6": [
    {
      id: "rev-6-1",
      courseId: "course-6",
      author: "Hakan P.",
      rating: 4,
      text: "Sunum ve e-posta modülleri iş hayatında hemen kullanılabilir. Telaffuz alıştırmaları faydalı.",
      createdAt: "2025-11-08T15:20:00.000Z",
    },
    {
      id: "rev-6-2",
      courseId: "course-6",
      author: "Gizem R.",
      rating: 5,
      text: "Rol oyunları sayesinde toplantılarda kendime güvenim arttı. Kesinlikle tavsiye ederim.",
      createdAt: "2025-09-28T09:00:00.000Z",
    },
  ],
};

export function getSeedReviewsForCourse(courseId: string): CourseReview[] {
  return seedCourseReviews[courseId] ?? [];
}

export const REVIEWS_STORAGE_KEY = "udemy-clone-reviews";

export function loadUserReviews(): Record<string, CourseReview[]> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(REVIEWS_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, CourseReview[]>;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

export function saveUserReviews(data: Record<string, CourseReview[]>): void {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(data));
}
