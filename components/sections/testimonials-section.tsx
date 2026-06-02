"use client";

import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import { testimonials } from "@/lib/data/dashboard";
import { CarouselSideControls } from "@/components/ui/carousel-nav";
import { Container } from "@/components/ui/container";
import { SectionHeader } from "@/components/ui/section-header";
import { TestimonialCard } from "@/components/ui/testimonial-card";

export function TestimonialsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" }, [Autoplay({ delay: 4200 })]);

  return (
    <section className="pt-10 sm:pt-14">
      <Container>
        <SectionHeader
          title="Öğrenim yoluyla hayatına yön veren kişiler"
          description="Gerçek öğrencilerin başarı hikayeleriyle ilham alın."
        />
        <CarouselSideControls
          onPrev={() => emblaApi?.scrollPrev()}
          onNext={() => emblaApi?.scrollNext()}
          prevLabel="Önceki yorum"
          nextLabel="Sonraki yorum"
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4 sm:gap-5">
              {testimonials.map((item) => (
                <div key={item.id} className="min-w-0 flex-[0_0_94%] sm:flex-[0_0_55%] lg:flex-[0_0_36%]">
                  <TestimonialCard item={item} />
                </div>
              ))}
            </div>
          </div>
        </CarouselSideControls>
      </Container>
    </section>
  );
}
