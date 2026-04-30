import { motion } from "framer-motion";
import { howItWorks } from "@/content/site";

export function HowItWorks() {
  return (
    <section className="bg-[#E8F5F3] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-[0.8125rem] font-semibold uppercase tracking-[0.04em] text-[#0E7C6E]">How it works</span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-balance text-[#0D2D4F] md:text-[2.25rem]">
            Care arranged in 3 simple steps.
          </h2>
        </div>

        <div className="relative mt-16 grid gap-8 md:grid-cols-3">
          <div className="absolute left-0 right-0 top-12 hidden h-px bg-gradient-to-r from-transparent via-[#0E7C6E]/30 to-transparent md:block" />
          {howItWorks.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative text-center"
            >
              <div className="relative mx-auto grid h-24 w-24 place-items-center rounded-full bg-white shadow-[0_8px_32px_rgba(13,45,79,0.12)]">
                <div className="grid h-20 w-20 place-items-center rounded-full bg-[#0E7C6E] text-white font-display text-2xl font-bold">
                  {s.step}
                </div>
              </div>
              <h3 className="mt-6 font-display text-[1.125rem] font-semibold text-[#0D2D4F]">{s.title}</h3>
              <p className="mt-2 mx-auto max-w-xs text-sm text-[#4A5568] leading-[1.75]">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
