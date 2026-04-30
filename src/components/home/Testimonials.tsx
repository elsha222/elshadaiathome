import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { testimonials } from "@/content/site";

export function Testimonials() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "start", dragFree: false },
    [Autoplay({ delay: 4500, stopOnInteraction: false, stopOnMouseEnter: true })],
  );
  const [selected, setSelected] = useState(0);
  const [snapCount, setSnapCount] = useState(0);

  useEffect(() => {
    if (!emblaApi) return;
    setSnapCount(emblaApi.scrollSnapList().length);
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi]);

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 md:py-28">
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-[0.8125rem] font-semibold uppercase tracking-[0.04em] text-[#0E7C6E]">
          Family stories
        </span>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-balance text-[#0D2D4F] md:text-[2.25rem]">
          Trusted by thousands of Indian families.
        </h2>
        <p className="mt-4 text-base text-[#4A5568] leading-[1.75] md:text-lg">
          Real reviews from families who chose ELIZA for home nursing and elder care.
        </p>
      </div>

      <div className="mt-12 overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className="min-w-0 flex-[0_0_100%] px-2 sm:flex-[0_0_50%] lg:flex-[0_0_33.3333%]"
            >
              <motion.figure
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: (i % 3) * 0.08 }}
                className="relative flex h-full flex-col rounded-[20px] border border-[#EEF2F7] bg-white p-7 shadow-[0_2px_16px_rgba(13,45,79,0.06)] transition-all hover:shadow-[0_8px_32px_rgba(13,45,79,0.12)] hover:border-[#0E7C6E]"
              >
                <Quote className="absolute right-6 top-6 h-10 w-10 text-[#0E7C6E]/10" />
                <div className="flex gap-0.5 text-[#2D7A4F]">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-base leading-[1.75] text-[#4A5568]">
                  "{t.text}"
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-[#EEF2F7] pt-4">
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-[#0E7C6E] font-display text-sm font-bold text-white">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#0D2D4F]">{t.name}</div>
                    <div className="text-xs text-[#4A5568]">{t.role}</div>
                  </div>
                </figcaption>
              </motion.figure>
            </div>
          ))}
        </div>
      </div>

      {snapCount > 1 && (
        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: snapCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={`h-2 rounded-full transition-all ${
                selected === i ? "w-8 bg-[#0E7C6E]" : "w-2 bg-[#0E7C6E]/25 hover:bg-[#0E7C6E]/50"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
