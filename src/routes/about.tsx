import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Heart, Shield, Sparkles, HandHeart, type LucideIcon } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { CtaBanner } from "@/components/home/CtaBanner";
import { aboutContent, business, cities } from "@/content/site";
import teamImg from "@/assets/team.jpg";

const SITE_URL = "https://elshadaihealthcare.com";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About ELSHADAI — India's Trusted Home Healthcare Team" },
      {
        name: "description",
        content:
          "ELSHADAI is on a mission to make hospital-grade healthcare accessible at home. Meet the team behind 5,000+ family success stories across Mumbai, Pune and India.",
      },
      {
        name: "keywords",
        content:
          "about ELSHADAI healthcare, home nursing company India, certified caregivers, Mumbai home nursing team, healthcare mission",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "About ELSHADAI Home Healthcare" },
      { property: "og:description", content: "Compassionate, certified home healthcare across India." },
      { property: "og:image", content: teamImg },
      { property: "og:url", content: SITE_URL + "/about" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: teamImg },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/about" }],
  }),
  component: AboutPage,
});

const valueIcons: Record<string, LucideIcon> = {
  "Compassion first": Heart,
  "Radical transparency": Sparkles,
  "Reliability": Shield,
  "Dignity": HandHeart,
};

function AboutPage() {
  return (
    <PageLayout>
      <section className="relative overflow-hidden bg-white py-16 md:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:px-12 md:grid-cols-2">
          <div>
            <span className="text-[0.8125rem] font-semibold uppercase tracking-[0.04em] text-[#0E7C6E]">About us</span>
            <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-balance text-[#0D2D4F] md:text-6xl">
              Care, the way it should be.
            </h1>
            <p className="mt-5 text-lg leading-[1.75] text-[#4A5568]">
              {aboutContent.mission}
            </p>
          </div>
          <motion.img
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            src={teamImg}
            alt="ELSHADAI healthcare team"
            width={1280}
            height={800}
            loading="lazy"
            className="aspect-[4/3] w-full rounded-[2.5rem] object-cover shadow-elevated"
          />
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-5 py-20 sm:px-8 lg:px-12">
        <span className="text-[0.8125rem] font-semibold uppercase tracking-[0.04em] text-[#0E7C6E]">Our story</span>
        <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0D2D4F] md:text-4xl">Why ELSHADAI exists.</h2>
        <div className="mt-6 space-y-5 text-base leading-[1.75] text-[#4A5568] md:text-lg">
          {aboutContent.story.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
        </div>
      </section>

      <section className="bg-[#F7F9FC] py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="text-center">
            <span className="text-[0.8125rem] font-semibold uppercase tracking-[0.04em] text-[#0E7C6E]">Our values</span>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#0D2D4F] md:text-4xl">What we stand for.</h2>
          </div>
          <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {aboutContent.values.map((v) => {
              const Icon = valueIcons[v.title] ?? Heart;
              return (
                <div key={v.title} className="rounded-[20px] border border-[#EEF2F7] bg-white p-6 shadow-[0_2px_16px_rgba(13,45,79,0.06)] hover:shadow-[0_8px_32px_rgba(13,45,79,0.12)] hover:border-[#0E7C6E] transition-all duration-[250ms]">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-[#0E7C6E] text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-4 font-display text-[1.125rem] font-semibold text-[#0D2D4F]">{v.title}</h3>
                  <p className="mt-2 text-sm text-[#4A5568] leading-[1.75]">{v.body}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-[#0D2D4F] md:text-4xl">Cities we serve</h2>
          <p className="mt-3 text-[#4A5568]">More cities coming soon — call us to check your location.</p>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {cities.map((c) => (
            <span
              key={c}
              className="rounded-full border border-[#0E7C6E]/20 bg-[#E8F5F3] px-5 py-2 text-sm font-semibold text-[#0E7C6E]"
            >
              📍 {c}
            </span>
          ))}
        </div>
      </section>

      <CtaBanner />
    </PageLayout>
  );
}
