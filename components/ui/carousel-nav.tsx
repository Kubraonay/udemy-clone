import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const overlayButtonClassName =
  "inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-white/80 bg-black/20 text-white shadow-sm backdrop-blur-sm transition hover:bg-black/35 sm:h-10 sm:w-10";

const lightButtonClassName =
  "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-zinc-300 bg-white/95 text-zinc-900 shadow-md transition hover:bg-white sm:h-10 sm:w-10 dark:border-zinc-600 dark:bg-zinc-900/95 dark:text-zinc-100";

type CarouselNavButtonProps = {
  direction: "prev" | "next";
  onClick: () => void;
  label?: string;
  className?: string;
  variant?: "overlay" | "light";
};

export function CarouselNavButton({
  direction,
  onClick,
  label,
  className,
  variant = "light",
}: CarouselNavButtonProps) {
  const Icon = direction === "prev" ? ChevronLeft : ChevronRight;
  const buttonClassName = variant === "overlay" ? overlayButtonClassName : lightButtonClassName;
  const defaultLabel = direction === "prev" ? "Önceki" : "Sonraki";

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(buttonClassName, className)}
      aria-label={label ?? defaultLabel}
    >
      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
    </button>
  );
}

type CarouselSideControlsProps = {
  children: ReactNode;
  onPrev: () => void;
  onNext: () => void;
  prevLabel?: string;
  nextLabel?: string;
  className?: string;
};

/** Oklar karuselin yanında; kartların üzerine binmez. */
export function CarouselSideControls({
  children,
  onPrev,
  onNext,
  prevLabel,
  nextLabel,
  className,
}: CarouselSideControlsProps) {
  return (
    <div className={cn("flex items-center gap-2 sm:gap-4", className)}>
      <CarouselNavButton direction="prev" onClick={onPrev} label={prevLabel} />
      <div className="min-w-0 flex-1">{children}</div>
      <CarouselNavButton direction="next" onClick={onNext} label={nextLabel} />
    </div>
  );
}

type CarouselNavProps = {
  onPrev: () => void;
  onNext: () => void;
  className?: string;
  prevLabel?: string;
  nextLabel?: string;
  /** overlay: hero banner sağ alt */
  variant?: "overlay" | "light";
};

export function CarouselNav({
  onPrev,
  onNext,
  className,
  prevLabel = "Önceki",
  nextLabel = "Sonraki",
  variant = "overlay",
}: CarouselNavProps) {
  const buttonClassName = variant === "overlay" ? overlayButtonClassName : lightButtonClassName;

  return (
    <div className={cn("pointer-events-none absolute inset-0 z-10", className)}>
      <div className="pointer-events-auto absolute bottom-5 right-5 flex items-center gap-2 sm:bottom-6 sm:right-6 lg:bottom-8 lg:right-8">
        <button type="button" onClick={onPrev} className={buttonClassName} aria-label={prevLabel}>
          <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
        <button type="button" onClick={onNext} className={buttonClassName} aria-label={nextLabel}>
          <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
        </button>
      </div>
    </div>
  );
}
