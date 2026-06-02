"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import type { Course } from "@/lib/data/dashboard";

const STORAGE_KEY = "udemy-clone-cart";

type CartContextValue = {
  items: Course[];
  count: number;
  total: number;
  addToCart: (course: Course) => void;
  removeFromCart: (courseId: string) => void;
  clearCart: () => void;
  isInCart: (courseId: string) => boolean;
};

const CartContext = createContext<CartContextValue | null>(null);

function loadCartFromStorage(): Course[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Course[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Course[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = loadCartFromStorage();
    queueMicrotask(() => {
      setItems(stored);
      setHydrated(true);
    });
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addToCart = useCallback((course: Course) => {
    setItems((prev) => {
      if (prev.some((item) => item.id === course.id)) return prev;
      return [...prev, course];
    });
  }, []);

  const removeFromCart = useCallback((courseId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== courseId));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const isInCart = useCallback((courseId: string) => items.some((item) => item.id === courseId), [items]);

  const total = useMemo(() => items.reduce((sum, item) => sum + item.priceValue, 0), [items]);

  const value = useMemo(
    () => ({
      items,
      count: items.length,
      total,
      addToCart,
      removeFromCart,
      clearCart,
      isInCart,
    }),
    [items, total, addToCart, removeFromCart, clearCart, isInCart],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
