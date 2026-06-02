"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "@/lib/data/dashboard";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);

  return (
    <section className="bg-background pt-5 sm:pt-8">
      <Container>
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {heroSlides.map((slide) => (
                <div key={slide.id} className="min-w-0 flex-[0_0_100%]">
                  <div
                    className={`min-h-[280px] bg-gradient-to-br ${slide.gradientClass} p-5 text-white transition-all duration-500 sm:min-h-[340px] sm:p-10 lg:min-h-[380px] lg:p-12`}
                  >
                    <div className="max-w-2xl space-y-5">
                      <h1 className="text-2xl font-bold leading-tight sm:text-4xl lg:text-5xl">{slide.title}</h1>
                      <p className="text-sm font-medium text-white/95 sm:text-lg">{slide.description}</p>
                      <div className="flex flex-wrap items-center gap-3 pt-1">
                        <Button variant="secondary" size="sm" className="sm:h-10 sm:px-4 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200">
                          {slide.ctaPrimary}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="sm:h-10 sm:px-4 border-white/60 bg-white/10 text-white hover:bg-white/20 dark:border-white/50 dark:bg-white/10"
                        >
                          {slide.ctaSecondary}
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-4 right-4 flex items-center gap-2 sm:bottom-6 sm:right-6">
            <button
              type="button"
              onClick={() => emblaApi?.scrollPrev()}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/70 bg-black/20 text-white backdrop-blur transition hover:bg-black/30 sm:h-10 sm:w-10"
              aria-label="Önceki"
            >
              <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
            <button
              type="button"
              onClick={() => emblaApi?.scrollNext()}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/70 bg-black/20 text-white backdrop-blur transition hover:bg-black/30 sm:h-10 sm:w-10"
              aria-label="Sonraki"
            >
              <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
