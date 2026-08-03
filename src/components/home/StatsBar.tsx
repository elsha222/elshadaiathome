import { motion } from "framer-motion";
import { stats } from "@/content/site";

export function StatsBar() {
  return (
    <section className="bg-[#0D2D4F] py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl bg-white/[0.18] md:grid-cols-4"
        >
          {stats.map((s) => (
            <div key={s.label} className="bg-[#0D2D4F] px-4 py-7 text-center md:py-10">
              <div className="font-display text-[2rem] font-extrabold text-[#2DD4BF] md:text-[2.5rem]">{s.value}</div>
              <div className="mt-1 text-xs font-medium text-white/80 md:text-sm">{s.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
