import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { Hero } from "@/components/home/Hero";
import { lazy, Suspense } from "react";
const StatsBar = lazy(() => import("@/components/home/StatsBar").then(m => ({ default: m.StatsBar })));
const PainPoints = lazy(() => import("@/components/home/PainPoints").then(m => ({ default: m.PainPoints })));
const WhyUs = lazy(() => import("@/components/home/WhyUs").then(m => ({ default: m.WhyUs })));
const ServicesGrid = lazy(() => import("@/components/home/ServicesGrid").then(m => ({ default: m.ServicesGrid })));
const EquipmentGrid = lazy(() => import("@/components/home/EquipmentGrid").then(m => ({ default: m.EquipmentGrid })));
const HowItWorks = lazy(() => import("@/components/home/HowItWorks").then(m => ({ default: m.HowItWorks })));
const ImageGallery = lazy(() => import("@/components/home/ImageGallery").then(m => ({ default: m.ImageGallery })));
const Testimonials = lazy(() => import("@/components/home/Testimonials").then(m => ({ default: m.Testimonials })));
const Faq = lazy(() => import("@/components/home/Faq").then(m => ({ default: m.Faq })));
const CtaBanner = lazy(() => import("@/components/home/CtaBanner").then(m => ({ default: m.CtaBanner })));
const AppointmentForm = lazy(() => import("@/components/forms/AppointmentForm").then(m => ({ default: m.AppointmentForm })));
import { business, faqs } from "@/content/site";
import { getMedicalBusinessSchema, getWebSiteSchema, getWebPageSchema, getFAQSchema, buildAdvancedSchema, getBreadcrumbSchema, getHowToSchema, getAggregateRatingSchema, getReviewSchema } from "@/utils/schema";

const heroImg = "/hero-nurse.webp";

const SITE_URL = "https://www.elshadaihealthcare.com";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ELSHADAI — Home Nursing & Medical Equipment in Mumbai" },
      {
        name: "description",
        content:
          "Hospital-grade home nursing, ICU nurses, elderly care, physiotherapy & medical equipment across Mumbai, Thane & Navi Mumbai. Certified caregivers, 24×7.",
      },
      {
        name: "keywords",
        content:
          "home nursing care Mumbai, ICU nurse at home Mumbai, elderly care at home Mumbai, patient attendant Mumbai, home healthcare Mumbai, nursing bureau Mumbai, 24 hour nurse Mumbai, physiotherapist at home Mumbai, doctor home visit Mumbai, hospital bed on rent Mumbai, oxygen concentrator rent Mumbai, home nursing Thane, home nursing Navi Mumbai, ELSHADAI healthcare",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { name: "googlebot", content: "index, follow" },
      { name: "geo.region", content: "IN-MH" },
      { name: "geo.placename", content: "Mumbai" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:title", content: "ELSHADAI — Hospital-grade Home Healthcare in Mumbai & Thane" },
      { property: "og:description", content: business.shortDescription },
      { property: "og:image", content: heroImg },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "ELSHADAI — Home Nursing & Healthcare" },
      { name: "twitter:description", content: business.shortDescription },
      { name: "twitter:image", content: heroImg },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/" }],
    scripts: [{ type: "application/ld+json", children: buildAdvancedSchema([getMedicalBusinessSchema(), getWebSiteSchema(), getWebPageSchema("ELSHADAI — Home Nursing & Medical Equipment in Mumbai", "/", business.shortDescription, "WebPage", `${SITE_URL}/og-image.webp`), getFAQSchema(faqs), getHowToSchema(), getAggregateRatingSchema(), ...getReviewSchema(), getBreadcrumbSchema([{ name: "Home", path: "/" }])]) }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <PageLayout>
      <Hero />
      <Suspense fallback={<div className="min-h-[200px]" />}>
        <StatsBar />
      <PainPoints />
      <ServicesGrid limit={8} />
      <EquipmentGrid limit={4} />
      <WhyUs />
      <HowItWorks />
      <ImageGallery />

      <section
        id="book"
        className="mx-auto grid max-w-7xl gap-10 px-4 py-20 md:grid-cols-5 md:px-8"
      >
        <div className="md:col-span-2">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-coral">
            Book in 60 seconds
          </span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-balance md:text-5xl">
            Tell us what you need.
          </h2>
          <p className="mt-4 text-muted-foreground">
            Share a few details — a care coordinator will call you back to design the right care plan for your family.
          </p>
        </div>
        <div className="md:col-span-3">
          <AppointmentForm compact />
        </div>
      </section>

      <Testimonials />
      <Faq />
      <CtaBanner />
      </Suspense>
    </PageLayout>
  );
}
