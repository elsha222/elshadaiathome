import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Quote, ArrowRight } from "lucide-react";
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
          Real reviews from families who chose ELSHADAI for home nursing and elder care.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="https://share.google/i4hQkY4vhi2MziwqC"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 rounded-2xl border border-[#EEF2F7] bg-white px-5 py-3 shadow-[0_2px_12px_rgba(13,45,79,0.06)] hover:border-[#4285F4] transition-all"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#4285F4]/5">
              <svg className="h-6 w-6" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1">
                <span className="text-sm font-bold text-[#0D2D4F]">4.9</span>
                <div className="flex text-[#FBBC05]">
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current" />
                  <Star className="h-3 w-3 fill-current" />
                </div>
              </div>
              <div className="text-[11px] font-semibold text-[#4A5568]">Verified Google Reviews</div>
            </div>
            <ArrowRight className="ml-2 h-4 w-4 text-[#4A5568] group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
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
                  {t.image ? (
                    <img src={t.image} alt={t.name} className="h-11 w-11 rounded-full object-cover border-2 border-[#E8F5F3]" />
                  ) : (
                    <div className="grid h-11 w-11 place-items-center rounded-full bg-[#0E7C6E] font-display text-sm font-bold text-white shrink-0">
                      {t.name.charAt(0)}
                    </div>
                  )}
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
        <div className="mt-8 flex justify-center">
          {Array.from({ length: snapCount }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className="group flex h-12 w-12 items-center justify-center -mx-2"
            >
              <span
                className={`h-2 rounded-full transition-all ${
                  selected === i ? "w-8 bg-[#0E7C6E]" : "w-2 bg-[#0E7C6E]/25 group-hover:bg-[#0E7C6E]/50"
                }`}
              />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}
