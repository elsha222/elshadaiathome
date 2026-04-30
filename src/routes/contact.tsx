import { createFileRoute } from "@tanstack/react-router";
import { Phone, MessageCircle, Mail, MapPin, Clock, Instagram, Facebook, Linkedin, Youtube, Twitter } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { AppointmentForm } from "@/components/forms/AppointmentForm";
import { Faq } from "@/components/home/Faq";
import { business, buildWhatsAppLink } from "@/content/site";

const SITE_URL = "https://elshadaihealthcare.com";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact ELIZA Home Healthcare | Call, WhatsApp, Email 24×7" },
      {
        name: "description",
        content:
          "Reach ELIZA Home Healthcare 24×7 by phone, WhatsApp or email. Coordinators respond within 30 minutes for home nursing, elderly care and medical services in Mumbai, Pune & India.",
      },
      {
        name: "keywords",
        content:
          "contact home nurse, ELIZA contact, home nursing helpline, WhatsApp nurse Mumbai, 24x7 nursing contact India",
      },
      { name: "robots", content: "index, follow" },
      { property: "og:title", content: "Contact ELIZA Home Healthcare" },
      { property: "og:description", content: "Talk to a real coordinator in minutes — call, WhatsApp or email." },
      { property: "og:url", content: SITE_URL + "/contact" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageLayout>
      <section className="relative overflow-hidden bg-white py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <span className="text-[0.8125rem] font-semibold uppercase tracking-[0.04em] text-[#0E7C6E]">Contact</span>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-balance text-[#0D2D4F] md:text-6xl">
            Talk to a real human, fast.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-[#4A5568] leading-[1.75] md:text-lg">
            Our coordinators are awake when you need us — call, WhatsApp, or write in. We respond within 30 minutes, day or night.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-5 md:grid-cols-3">
          <ChannelCard
            icon={Phone}
            title="Call us"
            value={business.phoneDisplay}
            cta="Tap to dial"
            href={`tel:${business.phone}`}
            theme="primary"
          />
          <ChannelCard
            icon={MessageCircle}
            title="WhatsApp"
            value="Instant chat"
            cta="Open WhatsApp"
            href={buildWhatsAppLink("Hi ELIZA, I'd like to enquire.")}
            theme="whatsapp"
          />
          <ChannelCard
            icon={Mail}
            title="Email"
            value={business.email}
            cta="Send mail"
            href={`mailto:${business.email}`}
            theme="teal"
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-20 sm:px-8 lg:px-12 md:grid-cols-5">
        <div className="md:col-span-2 space-y-6">
          <div className="rounded-[20px] border border-[#EEF2F7] bg-white p-6 shadow-[0_2px_16px_rgba(13,45,79,0.06)]">
            <h3 className="font-display text-[1.125rem] font-semibold text-[#0D2D4F]">Reach our office</h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-3 text-[#4A5568]"><MapPin className="h-4 w-4 mt-0.5 text-[#0E7C6E] shrink-0" />{business.address}</li>
              <li className="flex items-start gap-3 text-[#4A5568]"><Clock className="h-4 w-4 mt-0.5 text-[#0E7C6E] shrink-0" />{business.hours}</li>
              <li className="flex items-start gap-3 text-[#4A5568]"><Mail className="h-4 w-4 mt-0.5 text-[#0E7C6E] shrink-0" />{business.email}</li>
              <li className="flex items-start gap-3 text-[#4A5568]"><Phone className="h-4 w-4 mt-0.5 text-[#0E7C6E] shrink-0" />{business.phoneDisplay}</li>
            </ul>
          </div>

          <div className="rounded-[20px] border border-[#EEF2F7] bg-white p-6 shadow-[0_2px_16px_rgba(13,45,79,0.06)]">
            <h3 className="font-display text-[1.125rem] font-semibold text-[#0D2D4F]">Follow ELIZA</h3>
            <p className="mt-1.5 text-sm text-[#4A5568]">
              Care tips, family stories and updates from our nurses.
            </p>
            <div className="mt-5 grid grid-cols-5 gap-2.5">
              <SocialBtn href={business.social.instagram} label="Instagram" icon={Instagram} />
              <SocialBtn href={business.social.facebook} label="Facebook" icon={Facebook} />
              <SocialBtn href={business.social.linkedin} label="LinkedIn" icon={Linkedin} />
              <SocialBtn href={business.social.youtube} label="YouTube" icon={Youtube} />
              <SocialBtn href={business.social.twitter} label="Twitter / X" icon={Twitter} />
            </div>
          </div>

          <div className="overflow-hidden rounded-3xl shadow-card border border-border">
            <iframe
              title="ELIZA Mumbai location"
              src="https://www.google.com/maps?q=2nd+floor,+Kasar+ali,+6,+Thane+Rd,+opp.+Fire+bridge,+Kamatghar,+Bhiwandi,+Maharashtra+421308&output=embed"
              loading="lazy"
              className="block h-72 w-full border-0"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        <div className="md:col-span-3">
          <AppointmentForm />
        </div>
      </section>

      <Faq />
    </PageLayout>
  );
}

function ChannelCard({
  icon: Icon, title, value, cta, href, theme,
}: {
  icon: typeof Phone;
  title: string;
  value: string;
  cta: string;
  href: string;
  theme: "primary" | "whatsapp" | "teal";
}) {
  const bg = theme === "whatsapp" ? "bg-whatsapp" : "bg-[#0E7C6E]";
  return (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel="noopener noreferrer"
      className="group flex flex-col rounded-[20px] border border-[#EEF2F7] bg-white p-6 shadow-[0_2px_16px_rgba(13,45,79,0.06)] hover:shadow-[0_8px_32px_rgba(13,45,79,0.12)] hover:border-[#0E7C6E] hover:-translate-y-1 transition-all duration-[250ms]"
    >
      <div className={`grid h-14 w-14 place-items-center rounded-2xl text-white shadow-soft ${bg}`}>
        <Icon className="h-6 w-6" />
      </div>
      <div className="mt-5 text-[0.8125rem] uppercase tracking-[0.04em] font-medium text-[#4A5568]">{title}</div>
      <div className="mt-1 font-display text-xl font-bold text-[#0D2D4F]">{value}</div>
      <div className="mt-4 text-sm font-semibold text-[#0E7C6E] group-hover:text-[#1A9E8C] transition-colors">{cta} →</div>
    </a>
  );
}

function SocialBtn({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: typeof Instagram;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`ELIZA on ${label}`}
      title={label}
      className="grid aspect-square place-items-center rounded-2xl border border-[#EEF2F7] bg-white text-[#4A5568] hover:bg-[#0E7C6E] hover:text-white hover:border-[#0E7C6E] hover:scale-105 transition-all"
    >
      <Icon className="h-5 w-5" />
    </a>
  );
}
