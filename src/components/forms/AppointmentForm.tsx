import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, MessageCircle, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { cities, services, equipment, buildWhatsAppLink, business } from "@/content/site";

const BREVO_API_KEY = (import.meta as any).env?.VITE_BREVO_API_KEY ?? "";
const SHEETS_URL    = (import.meta as any).env?.VITE_SHEETS_WEBHOOK_URL ?? "";
const RATE_LIMIT_MS = 60_000;
const LS_KEY        = "elshadai_last_submit";

const schema = z.object({
  name:     z.string().trim().min(2, "Enter patient name").max(80),
  phone:    z.string().trim().regex(/^[6-9]\d{9}$/, "Enter valid 10-digit Indian mobile"),
  city:     z.string().min(1, "Select a city"),
  service:  z.string().min(1, "Select a service or equipment"),
  duration: z.enum(["one-time", "short-term", "long-term"]),
  date:     z.string().optional(),
  notes:    z.string().max(500).optional(),
  website:  z.string().max(0).optional(),
});
type F = z.infer<typeof schema>;

function buildEmailHtml(data: F) {
  const now = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  const rows = [
    ["Name",        data.name],
    ["Phone",       "+91 " + data.phone],
    ["City",        data.city],
    ["Service",     data.service],
    ["Duration",    data.duration],
    ["Date",        data.date || "—"],
    ["Notes",       data.notes || "—"],
    ["Time (IST)",  now],
  ] as [string, string][];

  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto">
      <div style="background:#0D2D4F;padding:24px 32px;border-radius:12px 12px 0 0">
        <h1 style="color:#ffffff;margin:0;font-size:20px">🏥 New Booking — ELSHADAI Healthcare</h1>
        <p style="color:#E8F5F3;margin:6px 0 0;font-size:14px">${data.service} · ${data.city}</p>
      </div>
      <div style="background:#ffffff;padding:24px 32px;border:1px solid #EEF2F7;border-top:none">
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          ${rows.map(([k, v]) => `
            <tr style="border-bottom:1px solid #EEF2F7">
              <td style="padding:10px 8px;color:#4A5568;width:130px;font-weight:500">${k}</td>
              <td style="padding:10px 8px;color:#0D2D4F;font-weight:700">${v}</td>
            </tr>`).join("")}
        </table>
      </div>
      <div style="background:#E8F5F3;padding:16px 32px;border-radius:0 0 12px 12px;border:1px solid #EEF2F7;border-top:none">
        <p style="margin:0;font-size:12px;color:#4A5568">Submitted via elshadaihealthcare.in · Reply to this email or call the patient directly.</p>
      </div>
    </div>
  `;
}

function submitToSheets(data: F) {
  if (!SHEETS_URL) return;
  const now = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" });
  const payload: Record<string, string> = {
    submittedAt: now,
    name:        data.name,
    phone:       data.phone,
    city:        data.city,
    service:     data.service,
    duration:    data.duration,
    date:        data.date ?? "",
    notes:       data.notes ?? "",
    source:      window.location.href,
  };

  // Send as URL-encoded form data — Apps Script reads this via e.parameter
  const body = new URLSearchParams(payload).toString();
  fetch(SHEETS_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  }).catch((e) => console.error("Sheets error:", e));
}

export function AppointmentForm({ compact = false }: { compact?: boolean }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "duplicate" | "error">("idle");
  const [submittedData, setSubmittedData] = useState<F | null>(null);

  const { register, handleSubmit, formState: { errors }, watch, reset } = useForm<F>({
    resolver: zodResolver(schema),
    defaultValues: { duration: "short-term" },
  });

  const onSubmit = async (data: F) => {
    if (data.website) { setStatus("success"); return; }

    const last = localStorage.getItem(LS_KEY);
    if (last && Date.now() - Number(last) < RATE_LIMIT_MS) {
      setStatus("duplicate"); return;
    }

    setStatus("loading");

    // 1 — Brevo email
    let brevoOk = false;
    try {
      const res = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: { "api-key": BREVO_API_KEY, "Content-Type": "application/json" },
        body: JSON.stringify({
          sender:      { name: "ELSHADAI Website", email: "elshadaiathome25@gmail.com" },
          to:          [{ email: "elshadaiathome25@gmail.com", name: "ELSHADAI Care Team" }],
          subject:     `New booking — ${data.service} — ${data.city}`,
          htmlContent: buildEmailHtml(data),
        }),
      });
      if (res.ok) {
        brevoOk = true;
      } else {
        const txt = await res.text();
        console.error("Brevo error", res.status, txt);
      }
    } catch (e) {
      console.error("Brevo fetch failed:", e);
    }

    // 2 — Google Sheets (fire-and-forget via iframe form)
    submitToSheets(data);

    if (brevoOk || !BREVO_API_KEY) {
      localStorage.setItem(LS_KEY, String(Date.now()));
      setSubmittedData(data);
      setStatus("success");
      reset();
    } else {
      setStatus("error");
    }
  };

  // ── success ──────────────────────────────────────────────────────────────
  if (status === "success") {
    let whatsappText = "Hi ELSHADAI, I just booked an appointment on your website.";
    if (submittedData) {
      whatsappText = `Hi ELSHADAI, I just booked an appointment on your website.\n\n*Name:* ${submittedData.name}\n*Phone:* ${submittedData.phone}\n*City:* ${submittedData.city}\n*Service:* ${submittedData.service}\n*Duration:* ${submittedData.duration}`;
    }

    return (
      <div className="rounded-2xl border border-[#E2F0EE] bg-[#E8F5F3] p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#0E7C6E]">
          <CheckCircle2 className="h-8 w-8 text-white" />
        </div>
        <h3 className="font-display text-xl font-bold text-[#0D2D4F]">Appointment booked!</h3>
        <p className="mt-2 text-[15px] text-[#4A5568] leading-[1.7]">
          Our coordinator will call you back within <strong>30 minutes</strong> to confirm.
        </p>
        <a
          href={buildWhatsAppLink(whatsappText)}
          target="_blank" rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#075E54] px-6 py-3 text-sm font-semibold text-white"
        >
          <MessageCircle className="h-4 w-4" /> Also confirm on WhatsApp
        </a>
        <button type="button" onClick={() => setStatus("idle")}
          className="mt-3 block w-full text-center text-xs text-[#4A5568] underline">
          Book another appointment
        </button>
      </div>
    );
  }

  // ── duplicate ─────────────────────────────────────────────────────────────
  if (status === "duplicate") {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-6 text-center">
        <AlertCircle className="mx-auto mb-3 h-10 w-10 text-amber-500" />
        <h3 className="font-semibold text-[#0D2D4F]">Already submitted</h3>
        <p className="mt-1 text-sm text-[#4A5568]">Our coordinator will call you shortly. Please wait a minute before submitting again.</p>
        <button type="button" onClick={() => setStatus("idle")} className="mt-4 text-xs text-[#0E7C6E] underline">Try again</button>
      </div>
    );
  }

  const dur = watch("duration");

  return (
    <form onSubmit={handleSubmit(onSubmit)}
      className="rounded-2xl border border-[#EEF2F7] bg-white p-5 shadow-[0_2px_16px_rgba(13,45,79,0.06)] md:p-8"
      noValidate>

      {!compact && (
        <div className="mb-6">
          <h3 className="font-display text-xl font-bold text-[#0D2D4F]">Tell us what you need.</h3>
          <p className="mt-1 text-[14px] text-[#4A5568]">
            Share a few details — a care coordinator will call you back to design the right care plan for your family.
          </p>
        </div>
      )}

      {/* honeypot */}
      <input type="text" autoComplete="off" tabIndex={-1} aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0" {...register("website")} />

      {status === "error" && (
        <div className="mb-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="h-4 w-4 shrink-0" />
          Something went wrong. Please try WhatsApp below or call us directly.
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <Field id="field-name" label="Patient name" error={errors.name?.message}>
          <input id="field-name" placeholder="e.g. Mrs. Sharma" autoComplete="name"
            className={inputCls(!!errors.name)} {...register("name")} />
        </Field>

        <Field id="field-phone" label="Phone number" error={errors.phone?.message}>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-medium text-[#4A5568]">+91</span>
            <input id="field-phone" type="tel" inputMode="numeric" maxLength={10} placeholder="98xxxxxxxx"
              autoComplete="tel" className={inputCls(!!errors.phone) + " pl-12"} {...register("phone")} />
          </div>
        </Field>

        <Field id="field-city" label="City" error={errors.city?.message}>
          <select id="field-city" className={selectCls(!!errors.city)} defaultValue="" {...register("city")}>
            <option value="" disabled>Select your city</option>
            {cities.map((c) => <option key={c}>{c}</option>)}
            <option value="Other">Other city</option>
          </select>
        </Field>

        <Field id="field-service" label="Service or equipment" error={errors.service?.message}>
          <select id="field-service" className={selectCls(!!errors.service)} defaultValue="" {...register("service")}>
            <option value="" disabled>Select what you need</option>
            <optgroup label="Nursing & Care">
              {services.map((s) => <option key={s.slug}>{s.title}</option>)}
            </optgroup>
            <optgroup label="Medical Equipment">
              {equipment.map((e) => <option key={e.slug}>{e.title}</option>)}
            </optgroup>
          </select>
        </Field>
      </div>

      <div className="mt-4">
        <label className="mb-2 block text-sm font-semibold text-[#0D2D4F]">Care duration</label>
        <div className="grid grid-cols-3 gap-2">
          {(["one-time", "short-term", "long-term"] as const).map((v) => (
            <label key={v} className={`cursor-pointer rounded-full border px-3 py-2.5 text-center text-xs font-semibold transition-all ${
              dur === v
                ? "border-[#0E7C6E] bg-[#0E7C6E] text-white"
                : "border-[#EEF2F7] bg-white text-[#4A5568] hover:border-[#0E7C6E]/40"
            }`}>
              <input type="radio" value={v} className="sr-only" {...register("duration")} />
              {v === "one-time" ? "One visit" : v === "short-term" ? "Short-term" : "Long-term"}
            </label>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <Field id="field-date" label="Preferred date (optional)">
          <input id="field-date" type="date" className={inputCls(false)} {...register("date")} />
        </Field>
      </div>

      <div className="mt-4">
        <Field id="field-notes" label="Brief health condition (optional)" error={errors.notes?.message}>
          <textarea id="field-notes" rows={3} placeholder="E.g. Post-knee replacement, needs nursing for 2 weeks…"
            className={`w-full rounded-xl border px-4 py-3 text-sm text-[#0D2D4F] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#0E7C6E]/40 resize-none ${
              errors.notes ? "border-red-400" : "border-[#EEF2F7]"
            }`} {...register("notes")} />
        </Field>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <button type="submit" disabled={status === "loading"}
          className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0E7C6E] py-4 text-base font-bold text-white shadow-[0_4px_20px_rgba(14,124,110,0.25)] hover:bg-[#1A9E8C] disabled:opacity-60 transition-all active:scale-[0.98]">
          {status === "loading"
            ? <><Loader2 className="h-5 w-5 animate-spin" /> Booking…</>
            : <><Send className="h-5 w-5" /> Book Appointment</>}
        </button>
        <a href={buildWhatsAppLink(
            `Hi ELSHADAI, I'm connecting to book an appointment.\n\n` +
            (watch("name") ? `*Name:* ${watch("name")}\n` : "") +
            (watch("phone") ? `*Phone:* ${watch("phone")}\n` : "") +
            (watch("city") ? `*City:* ${watch("city")}\n` : "") +
            (watch("service") ? `*Service:* ${watch("service")}\n` : "") +
            (watch("duration") ? `*Duration:* ${watch("duration")}` : "")
          )}
          target="_blank" rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-[#075E54] bg-white py-3.5 text-sm font-semibold text-[#075E54] hover:bg-[#075E54] hover:text-white transition-all">
          <MessageCircle className="h-4 w-4" /> Or book via WhatsApp
        </a>
      </div>

      <p className="mt-4 text-center text-xs text-[#4A5568]">
        We'll call you back as soon as possible. Or reach us 24×7 at{" "}
        <a href={`tel:${business.phone}`} className="font-semibold text-[#0D2D4F] hover:text-[#0E7C6E]">
          {business.phoneDisplay}
        </a>.
      </p>
    </form>
  );
}

const inputCls = (err: boolean) =>
  `w-full rounded-xl border px-4 py-3 text-sm text-[#0D2D4F] placeholder:text-[#9CA3AF] focus:outline-none focus:ring-2 focus:ring-[#0E7C6E]/40 bg-white ${
    err ? "border-red-400" : "border-[#EEF2F7]"
  }`;

const selectCls = (err: boolean) =>
  `w-full rounded-xl border px-4 py-3 text-sm text-[#0D2D4F] focus:outline-none focus:ring-2 focus:ring-[#0E7C6E]/40 bg-white appearance-none ${
    err ? "border-red-400" : "border-[#EEF2F7]"
  }`;

function Field({ label, error, children, className, id }: {
  label: string; error?: string; children: React.ReactNode; className?: string; id?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-[#0D2D4F]">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
