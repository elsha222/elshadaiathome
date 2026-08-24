import { createFileRoute } from "@tanstack/react-router";
import { PageLayout } from "@/components/layout/PageLayout";
import { Hero } from "@/components/home/Hero";
import { StatsBar } from "@/components/home/StatsBar";
import { PainPoints } from "@/components/home/PainPoints";
import { WhyUs } from "@/components/home/WhyUs";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { EquipmentGrid } from "@/components/home/EquipmentGrid";
import { HowItWorks } from "@/components/home/HowItWorks";
import { ImageGallery } from "@/components/home/ImageGallery";
import { Testimonials } from "@/components/home/Testimonials";
import { Faq } from "@/components/home/Faq";
import { CtaBanner } from "@/components/home/CtaBanner";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { business, faqs } from "@/content/site";
const heroImg = "/hero-nurse.jpg";

const SITE_URL = "https://elshadaihealthcare.com";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ELSHADAI — Home Nursing & Medical Equipment in Mumbai, Thane & Navi Mumbai" },
      {
        name: "description",
        content:
          "ELSHADAI delivers hospital-grade home nursing, ICU nurses, elderly care, physiotherapy, doctor visits and medical equipment rental across Mumbai, Mumbai Suburban, Thane, Navi Mumbai and South Bombay. Certified caregivers, 24×7 coordinator.",
      },
      {
        name: "keywords",
        content:
          "home nursing care Mumbai, home nurse near me, ICU nurse at home Mumbai, elderly care at home Mumbai, patient attendant service Mumbai, home healthcare services Mumbai, nursing bureau in Mumbai, 24 hour nurse at home Mumbai, physiotherapist at home Mumbai, doctor home visit Mumbai, newborn baby care nurse at home, post surgery care at home Mumbai, bedridden patient care at home, hospital bed on rent Mumbai, oxygen concentrator on rent Mumbai, wheelchair on rent Mumbai, BiPAP machine on rent Mumbai, nursing bureau near me, home nurse in Churchgate, elderly care at home Churchgate, home nurse in Marine Lines, elderly care at home Marine Lines, home nurse in Charni Road, elderly care at home Charni Road, home nurse in Grant Road, elderly care at home Grant Road, home nurse in Mumbai Central, elderly care at home Mumbai Central, home nurse in Mahalaxmi, elderly care at home Mahalaxmi, home nurse in Lower Parel, elderly care at home Lower Parel, home nurse in Prabhadevi, elderly care at home Prabhadevi, home nurse in Dadar, elderly care at home Dadar, home nurse in Matunga Road, elderly care at home Matunga Road, home nurse in Mahim, elderly care at home Mahim, home nurse in Bandra, elderly care at home Bandra, home nurse in Khar Road, elderly care at home Khar Road, home nurse in Santacruz, elderly care at home Santacruz, home nurse in Vile Parle, elderly care at home Vile Parle, nurse at home near me, home nurse for elderly near me, ICU nurse near me, patient care attendant near me, physiotherapist at home near me, 24 hour nurse near me, baby care nurse near me, hospital bed on rent near me, oxygen concentrator on rent near me, home healthcare near me, home nursing Thane, nursing services Navi Mumbai, South Bombay nursing, Mumbai Suburban home care, ELSHADAI healthcare",
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
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "MedicalBusiness",
              "@id": SITE_URL + "/#org",
              name: business.fullName,
              alternateName: business.name,
              url: SITE_URL,
              telephone: business.phone,
              email: business.email,
              image: SITE_URL + heroImg,
              priceRange: "₹₹",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Mumbai",
                addressRegion: "MH",
                addressCountry: "IN",
              },
              areaServed: ["Mumbai", "Mumbai Suburban", "Thane", "Navi Mumbai", "South Bombay"],
              openingHours: "Mo-Su 00:00-23:59",
              sameAs: [
                business.social.instagram,
                business.social.facebook,
                business.social.linkedin,
              ],
            },
            {
              "@type": "FAQPage",
              mainEntity: faqs.map((f) => ({
                "@type": "Question",
                name: f.q,
                acceptedAnswer: { "@type": "Answer", text: f.a },
              })),
            },
          ],
        }),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <PageLayout>
      <Hero />
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
    </PageLayout>
  );
}
