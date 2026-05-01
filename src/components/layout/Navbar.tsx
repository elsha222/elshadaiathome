import { Link, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, Phone, HeartPulse } from "lucide-react";
import { Button } from "@/components/ui/button";
import { business, nav } from "@/content/site";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  // lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-[#0D2D4F] transition-shadow duration-300" style={{ boxShadow: scrolled ? "0 2px 16px rgba(13,45,79,0.22)" : "none" }}>
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 md:h-20 lg:px-12">
        <Link to="/" className="flex items-center gap-2.5 group">
          <img src={logo} alt="Elshadai Healthcare" className="h-10 w-auto object-contain" />
        </Link>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <li key={item.to}>
              <Link
                to={item.to}
                className="rounded-full px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:text-white hover:bg-white/10"
                activeProps={{ className: "text-[#0E7C6E] bg-white/10" }}
              >{item.label}</Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 md:flex">
          <a href={`tel:${business.phone}`} className="flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition-colors">
            <Phone className="h-4 w-4" />{business.phoneDisplay}
          </a>
          <Button asChild variant="default" size="default" className="bg-[#0E7C6E] text-white hover:bg-[#1A9E8C] rounded-full px-6 font-semibold shadow-none border-0">
            <Link to="/book">Book Now</Link>
          </Button>
        </div>

        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Backdrop — closes drawer on tap */}
      {open && (
        <div
          className="fixed inset-0 top-16 z-40 bg-black/50 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Drawer — solid navy, fixed below navbar, no bleed-through */}
      {open && (
        <div className="fixed inset-x-0 top-16 z-50 bg-[#0D2D4F] md:hidden">
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.to} className="border-b border-white/[0.08]">
                <Link
                  to={item.to}
                  className="block px-6 py-[18px] text-[18px] font-medium text-white hover:bg-white/[0.06] transition-colors"
                  activeProps={{ className: "text-[#0E7C6E] bg-white/[0.06]" }}
                >{item.label}</Link>
              </li>
            ))}
          </ul>
          <div className="px-6 py-5">
            <Button asChild size="lg" className="w-full bg-[#0E7C6E] text-white hover:bg-[#1A9E8C] rounded-full font-bold border-0">
              <Link to="/book">Book Appointment</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
