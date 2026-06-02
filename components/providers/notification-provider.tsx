"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  buildCourseUpdateNotification,
  buildRandomCourseNotification,
  type AppNotification,
} from "@/lib/data/notification-templates";
import { useAuth } from "@/components/providers/auth-provider";

const STORAGE_KEY = "udemy-clone-notifications";

type NotificationContextValue = {
  notifications: AppNotification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllRead: () => void;
  pushCourseUpdate: (courseId: string) => void;
};

const NotificationContext = createContext<NotificationContextValue | null>(null);

function loadNotifications(userId: string): AppNotification[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Record<string, AppNotification[]>;
    return Array.isArray(parsed[userId]) ? parsed[userId] : [];
  } catch {
    return [];
  }
}

function saveNotifications(userId: string, notifications: AppNotification[]) {
  if (typeof window === "undefined") return;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const all = raw ? (JSON.parse(raw) as Record<string, AppNotification[]>) : {};
    all[userId] = notifications;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(all));
  } catch {
    // ignore
  }
}

export function NotificationProvider({ children }: { children: ReactNode }) {
  const { user, hasCompleteProfile } = useAuth();
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const seededRef = useRef<string | null>(null);

  useEffect(() => {
    if (!user?.id) {
      queueMicrotask(() => setNotifications([]));
      return;
    }
    queueMicrotask(() => setNotifications(loadNotifications(user.id)));
  }, [user?.id]);

  useEffect(() => {
    if (!user?.id) return;
    saveNotifications(user.id, notifications);
  }, [notifications, user?.id]);

  const addNotification = useCallback((notification: AppNotification) => {
    setNotifications((prev) => [notification, ...prev].slice(0, 50));
  }, []);

  useEffect(() => {
    if (!user?.id || !hasCompleteProfile) return;
    if (seededRef.current === user.id) return;
    seededRef.current = user.id;

    const existing = loadNotifications(user.id);
    if (existing.length > 0) {
      queueMicrotask(() => setNotifications(existing));
      return;
    }

    const initial = [
      buildRandomCourseNotification(),
      buildRandomCourseNotification(),
    ].filter((n): n is AppNotification => n !== null);

    queueMicrotask(() => setNotifications(initial));
  }, [user?.id, hasCompleteProfile]);

  useEffect(() => {
    if (!user?.id || !hasCompleteProfile) return;

    const interval = window.setInterval(() => {
      const next = buildRandomCourseNotification();
      if (next) addNotification(next);
    }, 45000);

    return () => window.clearInterval(interval);
  }, [user?.id, hasCompleteProfile, addNotification]);

  const pushCourseUpdate = useCallback(
    (courseId: string) => {
      if (!user?.id || !hasCompleteProfile) return;
      const next = buildCourseUpdateNotification(courseId);
      if (next) addNotification(next);
    },
    [user?.id, hasCompleteProfile, addNotification],
  );

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const unreadCount = useMemo(() => notifications.filter((n) => !n.read).length, [notifications]);

  const value = useMemo(
    () => ({
      notifications,
      unreadCount,
      markAsRead,
      markAllRead,
      pushCourseUpdate,
    }),
    [notifications, unreadCount, markAsRead, markAllRead, pushCourseUpdate],
  );

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotifications must be used within NotificationProvider");
  }
  return context;
}
