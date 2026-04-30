import { motion } from "framer-motion";
import { ShieldCheck, Clock, HeartHandshake, Truck, Phone, Stethoscope, type LucideIcon } from "lucide-react";
import { whyUs } from "@/content/site";

const icons: Record<string, LucideIcon> = {
  ShieldCheck, Clock, HeartHandshake, Truck, Phone, Stethoscope,
};

export function WhyUs() {
  return (
    <section className="bg-[#F7F9FC] py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-3xl text-center">
          <span className="text-[0.8125rem] font-semibold uppercase tracking-[0.04em] text-[#0E7C6E]">Why ELIZA</span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-balance text-[#0D2D4F] md:text-[2.25rem]">
            The care you'd want for your own family.
          </h2>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {whyUs.map((w, i) => {
            const Icon = icons[w.icon] ?? ShieldCheck;
            return (
              <motion.div
                key={w.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="rounded-[20px] border border-[#EEF2F7] bg-white p-7 shadow-[0_2px_16px_rgba(13,45,79,0.06)] hover:shadow-[0_8px_32px_rgba(13,45,79,0.12)] hover:border-[#0E7C6E] transition-all duration-[250ms]"
              >
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#0E7C6E] text-white shadow-[0_4px_12px_rgba(14,124,110,0.2)]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-5 font-display text-[1.125rem] font-semibold text-[#0D2D4F]">{w.title}</h3>
                <p className="mt-2 text-sm text-[#4A5568] leading-[1.75]">{w.body}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
