import { ResponsiveImage } from "@/components/ui/ResponsiveImage";

import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, MessageCircle, Phone } from "lucide-react";
import { hero, business, buildWhatsAppLink } from "@/content/site";
const heroImg = "/hero-nurse.webp";

export function Hero() {
  return (
    <section className="relative bg-white">

      {/* ── MOBILE (< md) ── */}
      <div className="md:hidden">
        {/* Hero image — pt-16 offsets fixed navbar, zero gap */}
        <div className="relative w-full pt-16">
          <div className="relative h-[60vw] min-h-[220px] max-h-[320px] overflow-hidden">
            <ResponsiveImage
              src={heroImg}
              alt="ELSHADAI home nurse caring for a patient"
              fetchPriority="high"
              loading="eager"
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
                <span className="h-1.5 w-1.5 rounded-full bg-[#075E54] pulse-ring" />
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
              href={buildWhatsAppLink("Hi ELSHADAI, I'd like to enquire about home nursing.")}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-2xl bg-[#075E54] py-3.5 text-sm font-semibold text-white active:scale-[0.97] transition-transform"
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
          <div className="relative animate-fade-in">
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] shadow-[0_8px_32px_rgba(13,45,79,0.12)]">
              <ResponsiveImage
                src={heroImg}
                alt="Certified ELSHADAI home nurse caring for an elderly patient at home in India"
                width={1600}
                height={1200}
                fetchPriority="high"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D2D4F]/30 via-transparent to-transparent" />
            </div>

            <div className="relative">
              <div className="flex items-center gap-2">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-[#2D7A4F]/10 text-[#2D7A4F]">★</div>
                <div>
                  <div className="text-sm font-bold text-[#0D2D4F]">4.9 / 5</div>
                  <div className="text-[10px] text-[#4A5568]">5,000+ families</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[#0E7C6E]">Coordinator online</div>
              <div className="mt-1 text-sm font-semibold text-[#0D2D4F]">24×7 callback</div>
              <div className="text-[10px] text-[#4A5568]">Mumbai • Thane • Navi Mumbai • South Bombay</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
