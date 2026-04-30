import { MessageCircle, Phone } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { business, buildWhatsAppLink } from "@/content/site";

export function FloatingActions() {
  return (
    <div
      aria-label="Quick contact"
      className="fixed right-4 z-50 flex flex-col items-center gap-3"
      style={{ bottom: "100px" }}
    >
      {/* WhatsApp — top */}
      <a
        href={buildWhatsAppLink("Hi ELIZA, I need home nursing care.")}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        style={{
          width: 52, height: 52, borderRadius: "50%",
          background: "#25D366", display: "grid", placeItems: "center",
          boxShadow: "0 4px 16px rgba(37,211,102,0.4)",
          color: "white", cursor: "pointer",
        }}
      >
        <MessageCircle size={22} fill="white" />
      </a>

      {/* Phone — below, with pulse ring via CSS animation */}
      <a
        href={`tel:${business.phone}`}
        aria-label={`Call ELIZA at ${business.phoneDisplay}`}
        className="pulse-phone-ring"
        style={{
          width: 52, height: 52, borderRadius: "50%",
          background: "#0E7C6E", display: "grid", placeItems: "center",
          boxShadow: "0 4px 16px rgba(14,124,110,0.4)",
          color: "white", cursor: "pointer", position: "relative",
        }}
      >
        <Phone size={22} />
      </a>
    </div>
  );
}

export function MobileStickyCTA() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 md:hidden">
      <div
        className="flex items-center gap-3 bg-white px-5 py-3"
        style={{ borderTop: "1px solid #EEF2F7", boxShadow: "0 -4px 20px rgba(0,0,0,0.08)" }}
      >
        {/* Call — navy outline */}
        <a
          href={`tel:${business.phone}`}
          className="flex flex-1 items-center justify-center gap-2 font-semibold text-[#0D2D4F] transition-colors active:bg-[#F7F9FC]"
          style={{
            height: 48, borderRadius: 100,
            border: "2px solid #0D2D4F",
            background: "white", fontSize: 14,
          }}
        >
          <Phone className="h-4 w-4" /> Call
        </a>
        {/* Book — solid teal */}
        <Link
          to="/book"
          className="flex flex-1 items-center justify-center gap-2 font-bold text-white transition-colors active:bg-[#1A9E8C]"
          style={{
            height: 48, borderRadius: 100,
            background: "#0E7C6E", fontSize: 14,
          }}
        >
          Book Now
        </Link>
      </div>
    </div>
  );
}

export function WhatsAppFloat() {
  return <FloatingActions />;
}
