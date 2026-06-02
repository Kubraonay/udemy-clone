"use client";

import { useState } from "react";
import type { Course } from "@/lib/data/dashboard";
import { useCart } from "@/components/providers/cart-provider";
import { useNotifications } from "@/components/providers/notification-provider";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type AddToCartButtonProps = {
  course: Course;
  className?: string;
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
};

export function AddToCartButton({ course, className, size = "md", fullWidth }: AddToCartButtonProps) {
  const { addToCart, isInCart } = useCart();
  const { pushCourseUpdate } = useNotifications();
  const [feedback, setFeedback] = useState(false);
  const inCart = isInCart(course.id);

  const handleClick = () => {
    addToCart(course);
    pushCourseUpdate(course.id);
    setFeedback(true);
    window.setTimeout(() => setFeedback(false), 2000);
  };

  return (
    <Button
      type="button"
      size={size}
      variant={inCart ? "outline" : "primary"}
      className={cn(fullWidth && "w-full", className)}
      onClick={handleClick}
      disabled={inCart}
    >
      {inCart ? "Sepette" : feedback ? "Sepete eklendi" : "Sepete Ekle"}
    </Button>
  );
}
