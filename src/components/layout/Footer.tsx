import { Link } from "@tanstack/react-router";
import { HeartPulse, Mail, Phone, MapPin, Clock, Instagram, Facebook, Linkedin, Youtube, Twitter } from "lucide-react";
import { business, nav, services, equipment, buildWhatsAppLink } from "@/content/site";

export function Footer() {
  return (
    <footer className="relative mt-20 overflow-hidden bg-[#0D2D4F]">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 sm:px-8 lg:px-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#0E7C6E] text-white">
              <HeartPulse className="h-5 w-5" />
            </span>
            <div className="font-display text-lg font-bold text-white">{business.name}</div>
          </Link>
          <p className="mt-4 text-sm text-white/60 max-w-xs leading-relaxed">
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
                aria-label={`ELIZA on ${label}`}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/15 text-white/60 hover:bg-[#0E7C6E] hover:text-white hover:border-[#0E7C6E] transition-all"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">Company</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-white/60">
            {nav.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="hover:text-[#0E7C6E] transition-colors">{n.label}</Link>
              </li>
            ))}
            <li><Link to="/book" className="hover:text-[#0E7C6E] transition-colors">Book Appointment</Link></li>
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">Services</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-white/60">
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

          <h3 className="mt-6 text-xs font-bold uppercase tracking-[0.18em] text-white/40">Equipment</h3>
          <ul className="mt-4 space-y-2.5 text-sm text-white/60">
            {equipment.slice(0, 4).map((e) => (
              <li key={e.slug}>
                <Link to="/equipment" className="hover:text-[#0E7C6E] transition-colors">
                  {e.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-3">
          <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-white/40">Reach Us</h3>
          <ul className="mt-4 space-y-3.5 text-sm">
            <li>
              <a href={`tel:${business.phone}`} className="flex items-start gap-3 text-white/60 hover:text-[#0E7C6E] transition-colors">
                <Phone className="h-4 w-4 mt-0.5 text-[#0E7C6E] shrink-0" />
                {business.phoneDisplay}
              </a>
            </li>
            <li>
              <a href={buildWhatsAppLink("Hi ELIZA, I need home nursing care.")} className="flex items-start gap-3 text-white/60 hover:text-whatsapp transition-colors" target="_blank" rel="noopener noreferrer">
                <span className="grid h-4 w-4 place-items-center rounded-full bg-whatsapp text-[8px] mt-0.5 shrink-0 text-white">W</span>
                Chat on WhatsApp
              </a>
            </li>
            <li>
              <a href={`mailto:${business.email}`} className="flex items-start gap-3 text-white/60 hover:text-[#0E7C6E] transition-colors">
                <Mail className="h-4 w-4 mt-0.5 text-[#0E7C6E] shrink-0" />
                {business.email}
              </a>
            </li>
            <li className="flex items-start gap-3 text-white/60">
              <MapPin className="h-4 w-4 mt-0.5 text-[#0E7C6E] shrink-0" />
              {business.address}
            </li>
            <li className="flex items-start gap-3 text-white/60">
              <Clock className="h-4 w-4 mt-0.5 text-[#0E7C6E] shrink-0" />
              {business.hours}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-6 text-xs text-white/40 sm:px-8 lg:px-12 md:flex-row">
          <p>© {new Date().getFullYear()} {business.fullName}. All rights reserved.</p>
          <p>Compassionate care, delivered home.</p>
        </div>
      </div>
    </footer>
  );
}
