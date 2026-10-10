declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export type EventName = 
  | 'generate_lead'
  | 'phone_call_click'
  | 'whatsapp_click'
  | 'appointment_booked';

export const trackEvent = (eventName: EventName, eventParams?: Record<string, any>) => {
  try {
    if (typeof window !== "undefined" && typeof window.gtag === "function") {
      window.gtag("event", eventName, eventParams);
      console.log("[Analytics] Tracked:", eventName, eventParams); // Debug log
    }
  } catch (error) {
    console.error("Analytics tracking failed", error);
  }
};

export const initGlobalAnalyticsTracking = () => {
  if (typeof window === "undefined") return;

  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const link = target.closest("a");

    if (link && link.href) {
      if (link.href.startsWith("tel:")) {
        trackEvent("generate_lead", { lead_type: "phone_call", link_url: link.href });
        trackEvent("phone_call_click", { link_url: link.href }); // Custom metric
      } else if (link.href.includes("wa.me") || link.href.includes("whatsapp.com")) {
        trackEvent("generate_lead", { lead_type: "whatsapp_message", link_url: link.href });
        trackEvent("whatsapp_click", { link_url: link.href }); // Custom metric
      }
    }
  });
};
