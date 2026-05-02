import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";
import {
  Syringe, Activity, Users, User, Dumbbell, Stethoscope, Bandage, Baby, ArrowRight, type LucideIcon,
} from "lucide-react";
import { services } from "@/content/site";
import { Button } from "@/components/ui/button";

const icons: Record<string, LucideIcon> = {
  Syringe, Activity, Users, User, Dumbbell, Stethoscope, Bandage, Baby,
};

export function ServicesGrid({ limit }: { limit?: number }) {
  const list = limit ? services.slice(0, limit) : services;
  return (
    <section className="mx-auto max-w-7xl px-5 py-14 md:py-20">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-[0.1em] text-[#0E7C6E]">Our services</span>
          <h2 className="mt-2 font-display font-bold tracking-tight text-[#0D2D4F] leading-[1.2]" style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)" }}>
            Complete home healthcare under one roof.
          </h2>
          <p className="mt-3 text-[15px] text-[#4A5568] leading-[1.7]">
            From routine nursing to ICU-level care — every service delivered by certified professionals.
          </p>
        </div>
        {limit && (
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-full border-2 border-[#0E7C6E] px-5 py-2.5 text-sm font-semibold text-[#0E7C6E] hover:bg-[#E8F5F3] transition-colors shrink-0"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        )}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.map((s, i) => {
          const Icon = icons[s.icon] ?? Syringe;
          return (
            <motion.article
              key={s.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
              className="group relative flex flex-col overflow-hidden rounded-[16px] border border-[#EEF2F7] bg-white p-4 shadow-[0_2px_12px_rgba(13,45,79,0.06)] hover:shadow-[0_8px_24px_rgba(13,45,79,0.12)] hover:border-[#0E7C6E] transition-all duration-[250ms] sm:p-6"
            >
              {/* icon — 44px on mobile, 56px on sm+ */}
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#E8F5F3] text-[#0E7C6E] group-hover:bg-[#0E7C6E] group-hover:text-white transition-all duration-[250ms] sm:h-14 sm:w-14 sm:rounded-2xl">
                <Icon className="h-[18px] w-[18px] sm:h-6 sm:w-6" />
              </div>
              <h3 className="mt-3 font-display text-[16px] font-semibold text-[#0D2D4F] sm:mt-5 sm:text-[1.125rem]">{s.title}</h3>
              <p className="mt-1.5 flex-1 text-[14px] text-[#4A5568] leading-[1.6] line-clamp-2 sm:line-clamp-none sm:leading-[1.75]">{s.short}</p>
              <ul className="mt-3 space-y-1">
                {s.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-[13px] text-[#4A5568]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#0E7C6E] shrink-0" />
                    {h}
                  </li>
                ))}
              </ul>
              {/* footer — Book pill button stays left of floating bubble zone (right:68px) */}
              <div className="mt-5">
                <Link
                  to="/book"
                  className="flex w-full items-center justify-center gap-1 rounded-full bg-[#0E7C6E] py-2.5 text-[14px] font-semibold text-white hover:bg-[#1A9E8C] transition-colors"
                  aria-label={`Book ${s.title}`}
                >
                  Book appointment
                </Link>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
