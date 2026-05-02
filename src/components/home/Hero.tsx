import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, MessageCircle, Phone } from "lucide-react";
import { hero, business, buildWhatsAppLink } from "@/content/site";
import heroImg from "@/assets/hero-nurse.jpg";

export function Hero() {
  return (
    <section className="relative bg-white">

      {/* ── MOBILE (< md) ── */}
      <div className="md:hidden">
        {/* Hero image — pt-16 offsets fixed navbar, zero gap */}
        <div className="relative w-full pt-16">
          <div className="relative h-[60vw] min-h-[220px] max-h-[320px] overflow-hidden">
            <img
              src={heroImg}
              alt="ELIZA home nurse caring for a patient"
              fetchPriority="high"
              className="h-full w-full object-cover object-center"
            />
            {/* gradient: light top, heavy bottom for chip legibility */}
            <div
              className="absolute inset-0"
              style={{ background: "linear-gradient(to bottom, rgba(13,45,79,0.15) 0%, rgba(13,45,79,0.05) 40%, rgba(13,45,79,0.55) 85%, rgba(13,45,79,0.75) 100%)" }}
            />
            {/* trust badge — white text on dark gradient */}
            <div className="absolute bottom-3 left-4">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 px-3 py-1 text-[11px] font-semibold text-white">
                <span className="h-1.5 w-1.5 rounded-full bg-[#25D366] pulse-ring" />
                Trusted by 5,000+ families
              </span>
            </div>
            {/* rating — gold star */}
            <div className="absolute bottom-3 right-4 flex items-center gap-1 rounded-full bg-white/15 backdrop-blur-sm border border-white/30 px-2.5 py-1">
              <span className="text-[12px]" style={{ color: "#FFD700" }}>★</span>
              <span className="text-[11px] font-bold text-white">4.9</span>
              <span className="text-[10px] text-white/80">/5</span>
            </div>
          </div>
        </div>

        {/* Content — tight spacing, no dead zones */}
        <div className="px-5 pt-5 pb-6 space-y-4">
          <div>
            <h1 className="font-display text-[1.625rem] font-extrabold leading-[1.2] tracking-tight text-[#0D2D4F]">
              Hospital-grade care,<br />
              <span className="relative inline-block text-[#0E7C6E]">
                gently
                <svg aria-hidden="true" viewBox="0 0 200 14" className="absolute -bottom-0.5 left-0 w-full text-[#0E7C6E]/30" preserveAspectRatio="none">
                  <path d="M2 10 Q 50 2 100 8 T 198 6" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                </svg>
              </span>{" "}at home.
            </h1>
            <p className="mt-2.5 text-[0.9rem] leading-[1.7] text-[#4A5568]">
              Certified nurses, attendants &amp; home medical equipment — healing at home, surrounded by family.
            </p>
          </div>

          {/* CTAs */}
          <div className="grid grid-cols-2 gap-3">
            <Link
              to={hero.primaryCta.to}
              className="flex items-center justify-center gap-2 rounded-2xl bg-[#0E7C6E] py-3.5 text-sm font-semibold text-white shadow-[0_4px_16px_rgba(14,124,110,0.2)] active:scale-[0.97] transition-transform"
            >
              {hero.primaryCta.label} <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href={buildWhatsAppLink("Hi ELIZA, I'd like to enquire about home nursing.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-2xl bg-[#25D366] py-3.5 text-sm font-semibold text-white active:scale-[0.97] transition-transform"
            >
              <MessageCircle className="h-4 w-4" /> {hero.secondaryCta.label}
            </a>
          </div>

          {/* Trust chips — redesigned: icon circle + label, 2×2 grid */}
          <ul className="grid grid-cols-2 gap-2">
            {hero.trustChips.map((c) => (
              <li key={c} className="flex items-center gap-2.5 rounded-xl border border-[#E2F0EE] bg-white px-3 py-3 shadow-[0_1px_4px_rgba(13,45,79,0.06)]">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E8F5F3]">
                  <CheckCircle2 className="h-4 w-4 text-[#0E7C6E]" />
                </span>
                <span className="text-[13px] font-semibold text-[#0D2D4F] leading-tight">{c}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── DESKTOP (≥ md) ── */}
      <div className="hidden md:block">
        <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-8 pt-20 pb-28 lg:px-12 md:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-[#0E7C6E]/20 bg-[#E8F5F3] px-4 py-1.5 text-xs font-semibold text-[#0E7C6E]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2D7A4F] pulse-ring" />
              {hero.eyebrow}
            </span>

            <h1 className="mt-5 font-display text-[2.5rem] font-extrabold leading-[1.1] tracking-tight text-balance text-[#0D2D4F] lg:text-6xl xl:text-7xl">
              Hospital-grade care,{" "}
              <span className="relative whitespace-nowrap text-[#0E7C6E]">
                gently
                <svg aria-hidden="true" viewBox="0 0 200 14" className="absolute -bottom-1 left-0 w-full text-[#0E7C6E]/30" preserveAspectRatio="none">
                  <path d="M2 10 Q 50 2 100 8 T 198 6" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                </svg>
              </span>{" "}at home.
            </h1>

            <p className="mt-5 max-w-xl text-base text-[#4A5568] leading-[1.75] lg:text-lg">
              {hero.subtitle}
            </p>

            <div className="mt-8 flex gap-3">
              <Link
                to={hero.primaryCta.to}
                className="inline-flex items-center gap-2 rounded-full bg-[#0E7C6E] px-7 py-3.5 text-base font-semibold text-white shadow-[0_8px_32px_rgba(14,124,110,0.15)] hover:bg-[#1A9E8C] hover:-translate-y-0.5 transition-all"
              >
                {hero.primaryCta.label} <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={buildWhatsAppLink("Hi ELIZA, I'd like to enquire about home nursing.")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-7 py-3.5 text-base font-semibold text-white hover:brightness-110 hover:-translate-y-0.5 transition-all"
              >
                <MessageCircle className="h-4 w-4" /> {hero.secondaryCta.label}
              </a>
            </div>

            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-2">
              {hero.trustChips.map((c) => (
                <li key={c} className="flex items-center gap-1.5 text-sm font-medium text-[#4A5568]">
                  <CheckCircle2 className="h-4 w-4 text-[#2D7A4F]" />
                  {c}
                </li>
              ))}
            </ul>

            <a
              href={`tel:${business.phone}`}
              className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-[#4A5568] hover:text-[#0E7C6E] transition-colors"
            >
              Or call us 24×7 — <span className="font-bold text-[#0D2D4F]">{business.phoneDisplay}</span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] shadow-[0_8px_32px_rgba(13,45,79,0.12)]">
              <img
                src={heroImg}
                alt="Certified ELIZA home nurse caring for an elderly patient at home in India"
                width={1600}
                height={1200}
                fetchPriority="high"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D2D4F]/30 via-transparent to-transparent" />
            </div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="absolute -left-8 top-10 max-w-[200px] rounded-2xl bg-white/95 p-3 shadow-card backdrop-blur border border-[#EEF2F7]"
            >
              <div className="flex items-center gap-2">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-[#2D7A4F]/10 text-[#2D7A4F]">★</div>
                <div>
                  <div className="text-sm font-bold text-[#0D2D4F]">4.9 / 5</div>
                  <div className="text-[10px] text-[#4A5568]">5,000+ families</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="absolute -right-8 bottom-10 max-w-[220px] rounded-2xl bg-white/95 p-3 shadow-card backdrop-blur animate-float border border-[#EEF2F7]"
            >
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[#0E7C6E]">Coordinator online</div>
              <div className="mt-1 text-sm font-semibold text-[#0D2D4F]">24×7 callback</div>
              <div className="text-[10px] text-[#4A5568]">Mumbai • Thane • Navi Mumbai • South Bombay</div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
