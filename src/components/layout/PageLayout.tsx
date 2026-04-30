import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { FloatingActions, MobileStickyCTA } from "./FloatingActions";
import { BookingPopup } from "./BookingPopup";

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pb-24 md:pb-0">{children}</main>
      <Footer />
      <FloatingActions />
      <MobileStickyCTA />
      <BookingPopup />
    </div>
  );
}
