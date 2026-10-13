import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
import { Link } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Clock, Instagram, Facebook, Linkedin, Youtube, Twitter } from "lucide-react";
import { business, nav, services, equipment, buildWhatsAppLink } from "@/content/site";
const logo = "/assets/logo.webp";

export function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden bg-[#0D2D4F]">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:px-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <Link to="/" className="flex items-center gap-2.5">
            <ResponsiveImage src={logo} alt="Elshadai Healthcare" width="160" height="40" className="h-10 w-auto object-contain" />
          </Link>
          <p className="mt-4 text-sm text-white/75 max-w-xs leading-relaxed">
            {business.shortDescription}
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5">
            {[
              { href: business.social.instagram, Icon: Instagram, label: "Instagram" },
              { href: business.social.facebook, Icon: Facebook, label: "Facebook" },
              { href: business.social.linkedin, Icon: Linkedin, label: "LinkedIn" },
              { href: business.social.youtube, Icon: Youtube, label: "YouTube" },
              { href: business.social.twitter, Icon: Twitter, label: "Twitter" },
            ].map(({ href, Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`ELSHADAI on ${label}`}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/75 hover:bg-[#0E7C6E] hover:text-white hover:border-[#0E7C6E] transition-all"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white/75">Company</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-white/75">
            {nav.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="hover:text-[#0E7C6E] transition-colors">{n.label}</Link>
              </li>
            ))}
            <li><Link to="/book" hash="appointment-form" className="hover:text-[#0E7C6E] transition-colors">Book Appointment</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white/75">Services</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-white/75">
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="hover:text-[#0E7C6E] transition-colors"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>

          <h3 className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-white/75">Equipment</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-white/75">
            {equipment.slice(0, 4).map((e) => (
              <li key={e.slug}>
                <Link to="/equipment/$slug" params={{ slug: e.slug }} className="hover:text-[#0E7C6E] transition-colors">
                  {e.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white/75">Reach Us</h3>
          <ul className="mt-4 space-y-3.5 text-sm">
            <li>
              <a href={`tel:${business.phone}`} className="flex items-start gap-3 text-white/75 hover:text-[#0E7C6E] transition-colors">
                <Phone className="h-4 w-4 mt-0.5 text-[#0E7C6E] shrink-0" />
                {business.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={buildWhatsAppLink("Hi ELSHADAI, I need home nursing care.")} className="flex items-start gap-3 text-white/75 hover:text-whatsapp transition-colors" target="_blank" rel="noopener noreferrer">
                <span className="grid h-4 w-4 place-items-center rounded-full bg-whatsapp text-[8px] mt-0.5 shrink-0 text-white">W</span>
                Chat on WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${business.email}`} className="flex items-start gap-3 text-white/75 hover:text-[#0E7C6E] transition-colors">
                <Mail className="h-4 w-4 mt-0.5 text-[#0E7C6E] shrink-0" />
                {business.email}
              </a>
            </li>
            <li className="flex items-start gap-3 text-white/75">
              <MapPin className="h-4 w-4 mt-0.5 text-[#0E7C6E] shrink-0" />
              {business.address}
            </li>
            <li className="flex items-start gap-3 text-white/75">
              <Clock className="h-4 w-4 mt-0.5 text-[#0E7C6E] shrink-0" />
              {business.hours}
            </li>
          </ul>
        </div>
      </div>

      {/* ── Quick nav links (SEO-friendly, properly linked) ── */}
      <div className="border-t border-white/10 bg-gradient-to-b from-transparent to-black/20">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 lg:px-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#0E7C6E]/70 mb-3">Popular Services</h4>
              <ul className="space-y-2">
                {[
                  { label: "Home Nursing Care Mumbai", to: "/services/home-nursing" },
                  { label: "ICU Nurse at Home", to: "/services/icu-nurse" },
                  { label: "Elderly Care at Home", to: "/services/elderly-care" },
                  { label: "Patient Care Attendant", to: "/services/patient-attendant" },
                  { label: "Physiotherapy at Home Mumbai", to: "/services/physiotherapy" },
                  { label: "Doctor Home Visit Mumbai", to: "/services/doctor-visit" },
                ].map((s) => (
                  <li key={s.to}>
                    <Link to={s.to} className="text-[11px] text-white/45 hover:text-white/70 transition-colors">{s.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#0E7C6E]/70 mb-3">Medical Equipment on Rent</h4>
              <ul className="space-y-2">
                {[
                  { label: "Hospital Bed on Rent Mumbai", to: "/equipment/hospital-bed" },
                  { label: "Oxygen Concentrator on Rent", to: "/equipment/oxygen-concentrator" },
                  { label: "BiPAP / CPAP Machine on Rent", to: "/equipment/bipap-cpap" },
                  { label: "Wheelchair on Rent Mumbai", to: "/equipment/wheelchair" },
                  { label: "Walker on Rent Mumbai", to: "/equipment/walker" },
                  { label: "Nebulizer on Rent Mumbai", to: "/equipment/nebulizer" },
                ].map((e) => (
                  <li key={e.to}>
                    <Link to={e.to} className="text-[11px] text-white/45 hover:text-white/70 transition-colors">{e.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#0E7C6E]/70 mb-3">Areas We Serve</h4>
              <ul className="space-y-2">
                {[
                  { label: "South Mumbai & Churchgate", to: "/blog/home-nurse-churchgate-south-mumbai" },
                  { label: "Dadar & Central Mumbai", to: "/blog/home-nursing-dadar-central-mumbai" },
                  { label: "Bandra & Western Suburbs", to: "/blog/home-nurse-bandra-western-suburbs" },
                  { label: "Andheri & Goregaon", to: "/blog/home-nursing-andheri-goregaon" },
                  { label: "Mira Road & Bhayandar", to: "/blog/home-nurse-mira-road-bhayandar" },
                  { label: "Vasai, Virar & Nallasopara", to: "/blog/home-nursing-vasai-virar-nallasopara" },
                ].map((a) => (
                  <li key={a.to}>
                    <Link to={a.to} className="text-[11px] text-white/45 hover:text-white/70 transition-colors">{a.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-6 text-xs text-white/75 sm:px-8 lg:px-12 md:flex-row">
          <p>© {new Date().getFullYear()} {business.fullName}. All rights reserved.</p>
          <p>Compassionate care, delivered home.</p>
        </div>
      </div>
    </footer>
  );
}
