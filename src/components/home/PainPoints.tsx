import { motion } from "framer-motion";
import { painPoints } from "@/content/site";

export function PainPoints() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-14 md:py-20">
      <div className="mx-auto max-w-3xl text-center">
        <span className="text-xs font-bold uppercase tracking-[0.1em] text-[#0E7C6E]">The struggle is real</span>
        <h2 className="mt-2 font-display font-bold tracking-tight text-[#0D2D4F] break-words leading-[1.2]" style={{ fontSize: "clamp(1.5rem, 4vw, 2.25rem)" }}>
          Caring for a loved one shouldn't break you.
        </h2>
        <p className="mt-3 text-[15px] text-[#4A5568] leading-[1.7]">
          We've seen what families go through. Here's what we fix.
        </p>
      </div>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {painPoints.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
            className="relative overflow-hidden rounded-xl border-l-[3px] border-[#0E7C6E] bg-white p-5 shadow-[0_2px_12px_rgba(13,45,79,0.07)]"
          >
            {/* large faint number as bg decoration */}
            <span
              className="absolute -top-2 -right-1 font-display font-extrabold leading-none select-none pointer-events-none"
              style={{ fontSize: "3.5rem", color: "rgba(14,124,110,0.10)" }}
            >
              {i + 1}
            </span>
            <h3 className="relative font-display text-[16px] font-bold text-[#0D2D4F] leading-snug">{p.title}</h3>
            <p className="mt-1.5 text-[14px] text-[#4A5568] leading-[1.65]">{p.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
