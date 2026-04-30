import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { equipment } from "@/content/site";

import bed from "@/assets/equipment-bed.jpg";
import oxygen from "@/assets/equipment-oxygen.jpg";
import bipap from "@/assets/equipment-bipap.jpg";
import monitor from "@/assets/equipment-monitor.jpg";
import wheelchair from "@/assets/equipment-wheelchair.jpg";
import walker from "@/assets/equipment-walker.jpg";
import suction from "@/assets/equipment-suction.jpg";
import nebulizer from "@/assets/equipment-nebulizer.jpg";

export const equipmentImages: Record<string, string> = {
  bed,
  oxygen,
  bipap,
  monitor,
  wheelchair,
  walker,
  suction,
  nebulizer,
};

export function EquipmentGrid({ limit, withHeader = true }: { limit?: number; withHeader?: boolean }) {
  const list = limit ? equipment.slice(0, limit) : equipment;

  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 md:py-28">
      {withHeader && (
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="text-[0.8125rem] font-semibold uppercase tracking-[0.04em] text-[#0E7C6E]">
              Home medical equipment
            </span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-balance text-[#0D2D4F] md:text-[2.25rem]">
              ICU-grade equipment, delivered & installed.
            </h2>
            <p className="mt-4 text-base text-[#4A5568] leading-[1.75] md:text-lg">
              Hospital beds, oxygen concentrators, BiPAP/CPAP, patient monitors and mobility aids —
              brought to your home, set up by a technician, and supported 24×7.
            </p>
          </div>
          {limit && (
            <Link
              to="/equipment"
              className="inline-flex items-center gap-2 rounded-full border-2 border-[#0E7C6E] px-5 py-2 text-sm font-semibold text-[#0E7C6E] hover:bg-[#E8F5F3] transition-colors"
            >
              View all equipment <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      )}

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {list.map((e, i) => (
          <motion.article
            key={e.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: (i % 4) * 0.06 }}
            className="group flex flex-col overflow-hidden rounded-[20px] border border-[#EEF2F7] bg-white shadow-[0_2px_16px_rgba(13,45,79,0.06)] hover:shadow-[0_8px_32px_rgba(13,45,79,0.12)] hover:border-[#0E7C6E] hover:-translate-y-1 transition-all duration-[250ms]"
          >
            <div className="relative aspect-[4/3] overflow-hidden bg-[#F7F9FC]">
              <img
                src={equipmentImages[e.image]}
                alt={`${e.title} — home medical equipment by ELIZA`}
                width={1024}
                height={768}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-1 flex-col p-5">
              <h3 className="font-display text-[1.125rem] font-semibold text-[#0D2D4F] leading-snug">{e.title}</h3>
              <p className="mt-2 flex-1 text-sm text-[#4A5568] leading-[1.75]">{e.short}</p>
              <ul className="mt-4 space-y-1.5">
                {e.uses.slice(0, 3).map((u) => (
                  <li key={u} className="flex items-center gap-2 text-xs text-[#4A5568]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#0E7C6E] shrink-0" />
                    {u}
                  </li>
                ))}
              </ul>
              <Link
                to="/book"
                aria-label={`Enquire about ${e.title}`}
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-[#0E7C6E] hover:gap-2 transition-all"
              >
                Enquire now <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
