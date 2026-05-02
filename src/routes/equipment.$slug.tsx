import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, Phone, MessageCircle } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { CtaBanner } from "@/components/home/CtaBanner";
import { Faq } from "@/components/home/Faq";
import { equipment, business, buildWhatsAppLink, services } from "@/content/site";
import { equipmentImages } from "@/components/home/EquipmentGrid";

const SITE_URL = "https://elshadaihealthcare.com";

export const Route = createFileRoute("/equipment/$slug")({
  loader: ({ params }) => {
    const item = equipment.find((e) => e.slug === params.slug);
    if (!item) throw notFound();
    return { item };
  },
  head: ({ loaderData }) => {
    const e = loaderData?.item;
    if (!e) return {};
    const img = equipmentImages[e.image];
    return {
      meta: [
        { title: `${e.title} on Rent | ELSHADAI Home Healthcare` },
        { name: "description", content: `${e.long} Available in Mumbai, Mumbai Suburban, Thane, Navi Mumbai and South Bombay.` },
        {
          name: "keywords",
          content: `${e.title.toLowerCase()}, ${e.title.toLowerCase()} on rent, medical equipment rent Mumbai, home healthcare India`,
        },
        { name: "robots", content: "index, follow" },
        { property: "og:title", content: `${e.title} — ELSHADAI Home Healthcare` },
        { property: "og:description", content: e.long },
        { property: "og:image", content: img },
      ],
      links: [{ rel: "canonical", href: `${SITE_URL}/equipment/${e.slug}` }],
    };
  },
  notFoundComponent: () => (
    <PageLayout>
      <div className="mx-auto max-w-md px-4 py-32 text-center">
        <h1 className="font-display text-4xl font-bold">Equipment not found</h1>
        <p className="mt-3 text-muted-foreground">The equipment you're looking for doesn't exist.</p>
        <Link to="/equipment" className="mt-6 inline-flex items-center gap-2 text-primary font-semibold">
          ← Back to all equipment
        </Link>
      </div>
    </PageLayout>
  ),
  component: EquipmentDetailPage,
});

function EquipmentDetailPage() {
  const { item: e } = Route.useLoaderData();
  const img = equipmentImages[e.image];
  const related = equipment.filter((x) => x.slug !== e.slug).slice(0, 3);

  return (
    <PageLayout>
      <section className="relative overflow-hidden bg-gradient-hero py-12 md:py-20">
        <div className="blob bg-primary/25 h-72 w-72 -top-20 -left-10" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 md:grid-cols-2 md:px-8">
          <div>
            <Link
              to="/equipment"
              className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.2em] text-primary hover:gap-2 transition-all"
            >
              ← All equipment
            </Link>
            <h1 className="mt-4 font-display text-4xl font-bold leading-tight tracking-tight text-balance md:text-6xl">
              {e.title} <span className="text-primary">delivered.</span>
            </h1>
            <p className="mt-5 text-base text-muted-foreground md:text-lg">{e.long}</p>

            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {e.uses.map((use) => (
                <li key={use} className="flex items-center gap-2 text-sm font-medium text-foreground/85">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  {use}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/book"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-coral px-6 py-3 text-sm font-semibold text-coral-foreground shadow-coral hover:brightness-110 transition"
              >
                Book {e.title} <ArrowRight className="h-4 w-4" />
              </Link>
              <a
                href={buildWhatsAppLink(`Hi ELSHADAI, I'd like to enquire about renting a ${e.title}.`)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-sm font-semibold text-white shadow-soft hover:brightness-110 transition"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp us
              </a>
            </div>

            <a
              href={`tel:${business.phone}`}
              className="mt-5 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary"
            >
              <Phone className="h-4 w-4" /> Or call {business.phoneDisplay}
            </a>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-elevated md:aspect-[4/5] bg-white p-8 flex items-center justify-center">
            <img
              src={img}
              alt={`${e.title} by ELSHADAI — medical equipment on rent`}
              className="h-auto w-full object-contain max-h-[80%]"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8">
        <h2 className="font-display text-2xl font-bold md:text-3xl">Related equipment</h2>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {related.map((r) => (
            <Link
              key={r.slug}
              to="/equipment/$slug"
              params={{ slug: r.slug }}
              className="group rounded-3xl border border-border bg-card p-5 shadow-soft hover:shadow-elevated hover:-translate-y-1 transition-all"
            >
              <div className="aspect-video w-full overflow-hidden rounded-2xl bg-primary-soft/30 p-4 mb-4 flex items-center justify-center">
                <img src={equipmentImages[r.image]} alt={r.title} className="h-full w-auto object-contain" />
              </div>
              <h3 className="font-display text-lg font-bold">{r.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{r.short}</p>
              <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-coral group-hover:gap-2 transition-all">
                Learn more <ArrowRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Faq />
      <CtaBanner />
    </PageLayout>
  );
}
