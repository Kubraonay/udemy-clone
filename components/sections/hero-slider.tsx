"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { heroSlides } from "@/lib/data/dashboard";
import { Button } from "@/components/ui/button";
import { CarouselNav } from "@/components/ui/carousel-nav";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

export function HeroSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);

  return (
    <section className="bg-background pt-5 sm:pt-8">
      <Container>
        <div className="relative isolate overflow-hidden rounded-2xl sm:rounded-3xl">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {heroSlides.map((slide) => (
                <div key={slide.id} className="min-w-0 flex-[0_0_100%]">
                  <div
                    className={cn(
                      "flex min-h-[300px] w-full flex-col justify-center bg-gradient-to-br px-6 py-10 text-white sm:min-h-[360px] sm:px-10 sm:py-12 lg:min-h-[400px] lg:px-12 lg:py-14",
                      slide.gradientClass,
                    )}
                  >
                    <div className="max-w-2xl space-y-5 pr-4 sm:pr-0">
                      <h1 className="text-3xl font-bold leading-tight sm:text-5xl lg:text-6xl">{slide.title}</h1>
                      <p className="max-w-xl text-base leading-relaxed text-white/95 sm:text-xl">{slide.description}</p>
                      <div className="flex flex-wrap items-center gap-3 pt-1">
                        <Button
                          type="button"
                          className="h-10 rounded-full border-0 bg-black px-5 text-base font-semibold text-white shadow-sm hover:bg-zinc-900 sm:h-11 sm:px-6"
                        >
                          {slide.ctaPrimary}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          className="h-10 rounded-full border-2 border-white/70 bg-white/10 px-5 text-base font-semibold text-white hover:bg-white/20 sm:h-11 sm:px-6"
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
          <CarouselNav
            variant="overlay"
            onPrev={() => emblaApi?.scrollPrev()}
            onNext={() => emblaApi?.scrollNext()}
          />
        </div>
      </Container>
    </section>
  );
}
