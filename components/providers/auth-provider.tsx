"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { User, UserProfileUpdate } from "@/lib/types/user";

const SESSION_KEY = "udemy-clone-session";
const USERS_KEY = "udemy-clone-users";

type AuthContextValue = {
  user: User | null;
  isAuthenticated: boolean;
  hasCompleteProfile: boolean;
  hydrated: boolean;
  register: (name: string, email: string, password: string) => { ok: boolean; error?: string };
  login: (email: string, password: string) => {
    ok: boolean;
    error?: string;
    needsProfileSetup?: boolean;
  };
  completeProfile: (data: UserProfileUpdate) => void;
  updateProfile: (data: UserProfileUpdate) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function loadUsers(): User[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(USERS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as User[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function saveUsers(users: User[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function loadSessionUserId(): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(SESSION_KEY);
}

function saveSessionUserId(userId: string | null) {
  if (typeof window === "undefined") return;
  if (userId) {
    window.localStorage.setItem(SESSION_KEY, userId);
  } else {
    window.localStorage.removeItem(SESSION_KEY);
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const users = loadUsers();
    const sessionId = loadSessionUserId();
    const sessionUser = sessionId ? users.find((u) => u.id === sessionId) ?? null : null;
    queueMicrotask(() => {
      setUser(sessionUser);
      setHydrated(true);
    });
  }, []);

  const persistUser = useCallback((updated: User) => {
    const users = loadUsers();
    const index = users.findIndex((u) => u.id === updated.id);
    if (index >= 0) {
      users[index] = updated;
    } else {
      users.push(updated);
    }
    saveUsers(users);
    saveSessionUserId(updated.id);
    setUser(updated);
  }, []);

  const register = useCallback((name: string, email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const users = loadUsers();
    if (users.some((u) => u.email === normalizedEmail)) {
      return { ok: false, error: "Bu e-posta adresi zaten kayıtlı." };
    }
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: normalizedEmail,
      password,
      profileComplete: false,
      language: "Türkçe",
      createdAt: new Date().toISOString(),
    };
    users.push(newUser);
    saveUsers(users);
    saveSessionUserId(newUser.id);
    setUser(newUser);
    return { ok: true };
  }, []);

  const login = useCallback((email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const found = loadUsers().find((u) => u.email === normalizedEmail && u.password === password);
    if (!found) {
      return { ok: false, error: "E-posta veya şifre hatalı." };
    }
    saveSessionUserId(found.id);
    setUser(found);
    return { ok: true, needsProfileSetup: !found.profileComplete };
  }, []);

  const completeProfile = useCallback(
    (data: UserProfileUpdate) => {
      if (!user) return;
      persistUser({
        ...user,
        name: data.name.trim(),
        bio: data.bio?.trim() || undefined,
        language: data.language,
        profileComplete: true,
      });
    },
    [user, persistUser],
  );

  const updateProfile = useCallback(
    (data: UserProfileUpdate) => {
      if (!user) return;
      persistUser({
        ...user,
        name: data.name.trim(),
        bio: data.bio?.trim() || undefined,
        language: data.language,
      });
    },
    [user, persistUser],
  );

  const logout = useCallback(() => {
    saveSessionUserId(null);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      hasCompleteProfile: Boolean(user?.profileComplete),
      hydrated,
      register,
      login,
      completeProfile,
      updateProfile,
      logout,
    }),
    [user, hydrated, register, login, completeProfile, updateProfile, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
