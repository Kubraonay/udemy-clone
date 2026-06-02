import { popularCourses } from "@/lib/data/dashboard";

export type AppNotification = {
  id: string;
  title: string;
  message: string;
  courseId?: string;
  read: boolean;
  createdAt: string;
};

export function buildCourseUpdateNotification(courseId: string): AppNotification | null {
  const course = popularCourses.find((c) => c.id === courseId);
  if (!course) return null;

  const templates = [
    `${course.instructor}, "${course.title}" kursunda yeni bölüm ekledi.`,
    `"${course.title}" kursunda güncellenmiş içerik yayınlandı.`,
    `${course.instructor} kursunda yeni bir ders videosu paylaştı.`,
  ];
  const message = templates[Math.floor(Math.random() * templates.length)];

  return {
    id: `notif-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    title: "Kurs güncellemesi",
    message,
    courseId: course.id,
    read: false,
    createdAt: new Date().toISOString(),
  };
}

export function buildRandomCourseNotification(): AppNotification | null {
  const course = popularCourses[Math.floor(Math.random() * popularCourses.length)];
  if (!course) return null;
  return buildCourseUpdateNotification(course.id);
}
