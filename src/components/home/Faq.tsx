import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { faqs } from "@/content/site";

export function Faq() {
  return (
    <section className="bg-[#F7F9FC] py-20 md:py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-8 lg:px-12">
        <div className="text-center">
          <span className="text-[0.8125rem] font-semibold uppercase tracking-[0.04em] text-[#0E7C6E]">Questions</span>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-balance text-[#0D2D4F] md:text-[2.25rem]">
            Everything you wanted to ask.
          </h2>
        </div>

        <Accordion type="single" collapsible className="mt-10 space-y-3">
          {faqs.map((f, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="rounded-[20px] border border-[#EEF2F7] bg-white px-5 shadow-[0_2px_16px_rgba(13,45,79,0.06)]"
            >
              <AccordionTrigger className="text-left font-display text-base font-semibold text-[#0D2D4F] hover:no-underline hover:text-[#0E7C6E] md:text-lg">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-[#4A5568] leading-[1.75] md:text-base">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
