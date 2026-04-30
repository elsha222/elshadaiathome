import { Link } from "@tanstack/react-router";
import { Phone, MessageCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { business, buildWhatsAppLink } from "@/content/site";

export function CtaBanner() {
  return (
    <section className="px-5 py-16 sm:px-8 lg:px-12 md:py-20">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-[#0D2D4F] px-6 py-14 shadow-[0_8px_32px_rgba(13,45,79,0.18)] md:px-14 md:py-20">
        <div className="absolute inset-0 opacity-10 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 80% 20%, #0E7C6E 0%, transparent 60%)" }}
        />

        <div className="relative grid items-center gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <h2 className="font-display text-3xl font-bold leading-tight tracking-tight text-balance text-white md:text-[2.25rem]">
              Need care today? Talk to us right away.
            </h2>
            <p className="mt-3 max-w-xl text-white/70 leading-[1.75] md:text-lg">
              Speak to a care coordinator now — or share a few details and we'll call you back.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <Button asChild size="lg" className="bg-[#0E7C6E] text-white hover:bg-[#1A9E8C] rounded-full font-semibold border-0 shadow-[0_4px_16px_rgba(14,124,110,0.3)] hover:-translate-y-0.5 transition-all">
              <a href={`tel:${business.phone}`}>
                <Phone className="h-4 w-4" /> Call {business.phoneDisplay}
              </a>
            </Button>
            <Button asChild size="lg" className="bg-whatsapp text-white hover:brightness-110 rounded-full font-semibold border-0 shadow-soft hover:-translate-y-0.5 transition-all">
              <a href={buildWhatsAppLink("Hi ELIZA, I need home care.")} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-4 w-4" /> WhatsApp Us
              </a>
            </Button>
            <Button asChild size="lg" className="bg-white text-[#0D2D4F] hover:bg-[#E8F5F3] rounded-full font-semibold border-0 hover:-translate-y-0.5 transition-all">
              <Link to="/book">
                Book Online <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
