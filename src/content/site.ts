/**
 * Elshadai Home Healthcare — Centralized Content
 * ----------------------------------------------------------------
 * Edit this single file to change ALL copy across the website.
 * Do not hardcode strings inside components — add them here instead.
 */

export const business = {
  name: "Elshadai",
  fullName: "Elshadai Home Healthcare",
  tagline: "Hospital-grade care, gently delivered to your home.",
  shortDescription:
    "Certified nurses, attendants, physiotherapists and home medical equipment for compassionate at-home care across Mumbai, Mumbai Suburban, Thane, Navi Mumbai and South Bombay.",
  phone: "+917573923584",
  phoneDisplay: "+91 75739 23584",
  whatsapp: "917573923584",
  email: "elshadaiathome25@gmail.com",
  address: "2nd floor, Kasar ali, 6, Thane Rd, opp. Fire bridge, Kamatghar, Bhiwandi, Maharashtra 421308",
  hours: "24 / 7 — including holidays",
  social: {
    instagram: "https://www.instagram.com/elshada37?utm_source=qr&igsh=MXdvYWlneHY0Y2t5cA==",
    facebook: "https://www.facebook.com/share/1Fy5EuoTUk/",
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com",
    twitter: "https://twitter.com",
  },
};

export const buildWhatsAppLink = (message?: string) =>
  `https://wa.me/${business.whatsapp}${message ? `?text=${encodeURIComponent(message)}` : ""}`;

export const nav = [
  { label: "Home", to: "/" },
  { label: "Services", to: "/services" },
  { label: "Equipment", to: "/equipment" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export const hero = {
  eyebrow: "Trusted by 5,000+ Indian families",
  title: "Hospital-grade care,\ngently at home.",
  subtitle:
    "Certified nurses, doctors, attendants and home medical equipment — so your loved ones heal in the comfort of home, surrounded by the people who love them most.",
  primaryCta: { label: "Book appointment", to: "/book" },
  secondaryCta: { label: "Book via WhatsApp" },
  trustChips: [
    "Certified Nurses",
    "24×7 Coordinator",
    "Background-Verified",
    "Free Replacement",
  ],
};

export const stats = [
  { value: "5,000+", label: "Families served" },
  { value: "200+", label: "Trained caregivers" },
  { value: "24×7", label: "Live coordinator" },
  { value: "4.9★", label: "Family rating" },
];

export const painPoints = [
  {
    title: "Hospital stays drain savings",
    body: "Get the same trained care at home — without the overheads of a hospital room.",
  },
  {
    title: "Family caregivers burning out",
    body: "Sleep through the night. Our nurses handle medication, vitals, and emergencies.",
  },
  {
    title: "Hospital-acquired infection risk",
    body: "Recover safely at home, away from crowded wards and superbugs.",
  },
  {
    title: "Loneliness slows recovery",
    body: "Familiar faces, familiar walls — proven to speed healing for elders and post-op patients.",
  },
];

export const whyUs = [
  {
    icon: "ShieldCheck",
    title: "Verified & Certified",
    body: "Every caregiver is ANM/GNM/B.Sc qualified, police-verified, and Nursing Council registered.",
  },
  {
    icon: "Clock",
    title: "Rapid Response",
    body: "A care coordinator calls you back fast and we deploy a matched caregiver as soon as possible.",
  },
  {
    icon: "HeartHandshake",
    title: "Free Replacement",
    body: "Not the right fit? We replace your caregiver promptly — no questions asked.",
  },
  {
    icon: "Stethoscope",
    title: "Doctor-Supervised",
    body: "Care plans reviewed by qualified physicians for medically complex cases.",
  },
  {
    icon: "Phone",
    title: "Always-On Coordinator",
    body: "A dedicated care manager monitors every case 24×7 — one call away.",
  },
  {
    icon: "Truck",
    title: "Equipment Delivered",
    body: "Beds, oxygen, BiPAP, monitors and more — installed at home with training.",
  },
];

export type Service = {
  slug: string;
  icon: string;
  title: string;
  short: string;
  long: string;
  highlights: string[];
};

export const services: Service[] = [
  {
    slug: "home-nursing",
    icon: "Syringe",
    title: "Home Nursing Care",
    short: "Short or long-term nursing for post-op, chronic, and recovering patients.",
    long: "Trained ANM/GNM nurses provide medication management, IV administration, vitals monitoring, and round-the-clock care in the comfort of your home.",
    highlights: ["12 / 24 hour shifts", "Post-surgical recovery", "Vitals & medication"],
  },
  {
    slug: "icu-nurse",
    icon: "Activity",
    title: "ICU-Trained Nurses",
    short: "Critical care nurses for ventilator, tracheostomy, and high-dependency cases.",
    long: "Hospital-experienced ICU nurses bring intensive-care skills home — for ventilator support, tracheostomy care, and complex monitoring.",
    highlights: ["Ventilator support", "Tracheostomy care", "Cardiac monitoring"],
  },
  {
    slug: "elderly-care",
    icon: "Users",
    title: "Elderly & Senior Care",
    short: "Compassionate companions and trained attendants for daily living support.",
    long: "From mobility help and meals to medication reminders and emotional companionship — dignified care that lets seniors stay home, safely.",
    highlights: ["Mobility assistance", "Meal & medication", "Companionship"],
  },
  {
    slug: "patient-attendant",
    icon: "User",
    title: "Patient Care Attendants",
    short: "Trained attendants for hygiene, mobility, and daily routines.",
    long: "Patient care attendants assist with bathing, feeding, mobility, and basic daily care — perfect for non-medical support needs.",
    highlights: ["Bathing & hygiene", "Feeding support", "Mobility help"],
  },
  {
    slug: "physiotherapy",
    icon: "Dumbbell",
    title: "Physiotherapy at Home",
    short: "Personalized rehabilitation by licensed physiotherapists.",
    long: "Recover from surgery, stroke, or injury with personalised in-home physiotherapy from licensed BPT/MPT specialists.",
    highlights: ["Post-stroke rehab", "Orthopaedic recovery", "Mobility restoration"],
  },
  {
    slug: "doctor-visit",
    icon: "Stethoscope",
    title: "Doctor Home Visits",
    short: "MBBS and specialist consultations at your doorstep.",
    long: "Skip the waiting room. Qualified physicians and specialists visit your home for consultations, prescriptions, and follow-ups.",
    highlights: ["GP & specialist", "Prescriptions", "Follow-up care"],
  },
  {
    slug: "wound-care",
    icon: "Bandage",
    title: "Wound Care & Dressing",
    short: "Sterile wound dressing, suture removal, and post-op wound management.",
    long: "Trained nurses provide sterile dressing, suture removal, and ongoing wound assessment to prevent infection and speed healing.",
    highlights: ["Sterile dressing", "Suture removal", "Diabetic wounds"],
  },
  {
    slug: "newborn-care",
    icon: "Baby",
    title: "Newborn & NICU Care",
    short: "NICU-trained nurses for newborns and post-natal mothers.",
    long: "Specialized care for newborns, premature babies, and post-natal mothers from NICU-experienced nursing professionals.",
    highlights: ["Premature newborns", "Lactation support", "Post-natal mom care"],
  },
];

export type Equipment = {
  slug: string;
  title: string;
  short: string;
  long: string;
  image: string; // import key handled in component
  uses: string[];
};

/**
 * Equipment list — images live in src/assets/equipment-*.jpg
 * The component maps slug -> imported image at build time.
 */
export const equipment: Equipment[] = [
  {
    slug: "hospital-bed",
    title: "Electric Hospital Bed",
    short: "ICU-grade adjustable bed for safe, comfortable home recovery.",
    long: "Multi-function electric beds with side rails, head/foot adjustment and pressure-relief mattresses — perfect for bed-ridden, post-op and elderly patients.",
    image: "bed",
    uses: ["Post-surgical recovery", "Bed-ridden patients", "Pressure-sore prevention"],
  },
  {
    slug: "oxygen-concentrator",
    title: "Oxygen Concentrator",
    short: "Quiet 5L / 10L home oxygen concentrators delivered & installed.",
    long: "Continuous oxygen therapy at home for COPD, post-COVID and respiratory patients. Fully serviced units with on-site demo and 24×7 support.",
    image: "oxygen",
    uses: ["COPD & asthma", "Post-COVID recovery", "Continuous O₂ therapy"],
  },
  {
    slug: "bipap-cpap",
    title: "BiPAP / CPAP Ventilator",
    short: "Non-invasive ventilation support for sleep apnoea and respiratory failure.",
    long: "Hospital-grade BiPAP/CPAP machines with humidifier and full mask kit — set up and titrated by a respiratory technician.",
    image: "bipap",
    uses: ["Sleep apnoea", "Type 2 respiratory failure", "Post-extubation"],
  },
  {
    slug: "patient-monitor",
    title: "Multi-Para Patient Monitor",
    short: "Continuous ECG, SpO₂, NIBP and temperature monitoring at home.",
    long: "Bedside multi-parameter monitors for ICU-at-home setups, with alarm settings and remote viewing for treating physicians.",
    image: "monitor",
    uses: ["Home ICU setup", "Cardiac monitoring", "High-dependency care"],
  },
  {
    slug: "wheelchair",
    title: "Folding Wheelchair",
    short: "Lightweight, foldable wheelchairs for short or long-term mobility.",
    long: "Standard, reclining and commode wheelchairs available — with cushioning, brakes and removable footrests for comfort and safety.",
    image: "wheelchair",
    uses: ["Mobility support", "Hospital visits", "Outdoor outings"],
  },
  {
    slug: "walker",
    title: "Walkers & Mobility Aids",
    short: "Walkers, rollators and crutches for safer everyday movement.",
    long: "Adjustable walkers, four-wheel rollators with seat, and crutches/canes — sized correctly for the patient's height and grip.",
    image: "walker",
    uses: ["Post-fracture", "Geriatric mobility", "Stroke rehabilitation"],
  },
  {
    slug: "suction-machine",
    title: "Suction Machine",
    short: "Hospital-style suction units for tracheostomy and secretion clearance.",
    long: "Quiet, foot-pedal and electric suction machines with disposable jars and catheters — essential for tracheostomy and stroke patients.",
    image: "suction",
    uses: ["Tracheostomy care", "Stroke patients", "Secretion clearance"],
  },
  {
    slug: "nebulizer",
    title: "Nebulizer & Respiratory Kit",
    short: "Compact nebulizers with masks for adults and children.",
    long: "Compressor and ultrasonic nebulizers with full kit — ideal for asthma, bronchitis and paediatric respiratory care at home.",
    image: "nebulizer",
    uses: ["Asthma & bronchitis", "Paediatric care", "Post-viral cough"],
  },
];

export const howItWorks = [
  {
    step: "01",
    title: "Tell us your need",
    body: "Book in 60 seconds via form, call, or WhatsApp — share the patient's condition.",
  },
  {
    step: "02",
    title: "Free assessment call",
    body: "A care coordinator calls you back to design the right care plan for the family.",
  },
  {
    step: "03",
    title: "Caregiver at your door",
    body: "A verified, matched caregiver — and any equipment needed — arrives at your home.",
  },
];

import ashokPhoto from "@/assets/reviews-photos/review-ashok-bagade.jpg";
import vipinPhoto from "@/assets/reviews-photos/review-vipin-jose.jpg";
import jinsPhoto from "@/assets/reviews-photos/review-jins-john.jpg";
import nayanPhoto from "@/assets/reviews-photos/review-nayan-mandlik.jpg";
import krishnaPhoto from "@/assets/reviews-photos/review-krishna-gupta.jpg";
import rahulPhoto from "@/assets/reviews-photos/review-rahul-khadpe.jpg";
import bhuwanPhoto from "@/assets/reviews-photos/review-bhuwan-rai.jpg";
import vijayPhoto from "@/assets/reviews-photos/review-vijay-yadav.jpg";
import pruthviPhoto from "@/assets/reviews-photos/review-pruthvi-gulla.jpg";

export const testimonials: { name: string; role: string; text: string; rating: number; image?: string }[] = [
  {
    name: "Gopakumar Ajith",
    role: "Client",
    text: "Elshadai Nursing Care provides excellent and reliable service. The nurses are well-trained, compassionate, and very patient with their work. They take great care of patients and ensure comfort, hygiene, and timely medication. Highly recommended for anyone looking for trustworthy nursing care.",
    rating: 5,
  },
  {
    name: "Rahul Khadpe",
    role: "Grandson • Navi Mumbai",
    text: "I booked home nursing care for my grandmother in seawoods, Navi Mumbai, and I’m really satisfied with the service. The staff provided were skilled, polite, and very patient. Thank you for the amazing support.",
    rating: 5,
    image: rahulPhoto,
  },
  {
    name: "Ashok Bagade",
    role: "Grandson • Navi Mumbai",
    text: "I availed home nursing services in Airoli, Navi Mumbai for my grandfather and was assisted by two highly experienced staff members. Their care and professionalism were exceptional. Thank you for your excellent service 🥰 I highly recommend it.",
    rating: 5,
    image: ashokPhoto,
  },
  {
    name: "Sandana Mali",
    role: "Granddaughter • Navi Mumbai",
    text: "Nursing care services booked for my grandmother in kalamboli, Navi Mumbai were outstanding. The nurses were well-trained, gentle, and very understanding of her needs. Really grateful for the support and the quality care provided.",
    rating: 5,
  },
  {
    name: "Deepak Suryawanshi",
    role: "Grandson",
    text: "I booked a nursing care taker for my grandmother and she was excellent in her work.. careful and polite . Im pleased to have a this type of worker to take care of my dear ones... I surely recommend Elshadai home health care team...",
    rating: 5,
  },
  {
    name: "Krishna Gupta",
    role: "Son • Navi Mumbai",
    text: "Used their home nursing service for my father here in Sanapada , Navi Mumbai. Both the nurses were well-trained and supportive. Great service and excellent coordination.",
    rating: 5,
    image: krishnaPhoto,
  },
  {
    name: "Pruthvi Gulla",
    role: "Son • Thane",
    text: "Nursing care booked for my mother in Rabodi Thane, and I’m truly satisfied with the service. The staff provided were skilled, polite, and extremely patient. Thank you for the amazing support.",
    rating: 5,
    image: pruthviPhoto,
  },
  {
    name: "Vijay Yadav",
    role: "Grandson • Bhiwandi",
    text: "I opted for their nursing service for my grandfather in bhiwandi , and the team did a fantastic job. The two nurses assigned were professional and experienced. Thank you for all the help. Strongly recommended",
    rating: 5,
    image: vijayPhoto,
  },
  {
    name: "Nayan Mandlik",
    role: "Son • Navi Mumbai",
    text: "Got nursing assistance for my father in Navi Mumbai smooth process, reliable service, and excellent caregivers. Really appreciate the support. Highly recommended",
    rating: 5,
    image: nayanPhoto,
  },
  {
    name: "Bhuwan Rai",
    role: "Son • Mumbai",
    text: "Best home nursing service provider in Mumbai. The care provided to my father was very professional and compassionate. Highly satisfied with their support.",
    rating: 5,
    image: bhuwanPhoto,
  },
  {
    name: "Justin Mathews",
    role: "Patient • Mumbai",
    text: "I took physiotherapy session for myself in Andheri West. Excellent home health care service! Very caring, reliable, and professional staff. Truly thankful for the support provided. Highly recommended.",
    rating: 5,
  },
  {
    name: "Ankit Mishra",
    role: "Grandson • Navi Mumbai",
    text: "Took home care service for my grandmother in Kharghar . The staff was very kind, attentive, and knew their work well. Really appreciate the support.",
    rating: 5,
  },
  {
    name: "jins k john",
    role: "Grandson • Mumbai",
    text: "I took home nursing services for my grandfather in Andheri, and I got two experienced staff members. Thank you for your support. I recommend it!",
    rating: 5,
    image: jinsPhoto,
  },
  {
    name: "Vipin Jose Jose",
    role: "Client • Mumbai",
    text: "Professional nurses and timely assistance..bast home care in Mumbai",
    rating: 5,
    image: vipinPhoto,
  },
];

export const faqs = [
  {
    q: "How quickly can a nurse reach my home?",
    a: "Once you share the patient's condition, our coordinator assesses the case and dispatches a matched caregiver as quickly as possible. Timing depends on your city, time of day and the type of care needed — for planned cases, you can book a specific date and time.",
  },
  {
    q: "Are your nurses qualified and verified?",
    a: "Yes — every caregiver is ANM / GNM / B.Sc Nursing certified, registered with the State Nursing Council, and background-verified before deployment.",
  },
  {
    q: "What if the caregiver isn't a good fit?",
    a: "We offer free replacement if you're not satisfied — no questions, no extra paperwork. Just call your coordinator.",
  },
  {
    q: "Do you provide medical equipment too?",
    a: "Yes. We deliver and install hospital beds, oxygen concentrators, BiPAP / CPAP ventilators, multi-para monitors, suction machines, wheelchairs, walkers, nebulizers and more — anywhere we serve.",
  },
  {
    q: "How is pricing decided?",
    a: "Every case is unique, so we share a transparent quote after a quick free assessment call — based on the type of care (nurse / attendant / ICU), shift length and any equipment needed. No hidden fees.",
  },
  {
    q: "Which cities do you serve?",
    a: "We currently serve Mumbai, Mumbai Suburban, Thane, Navi Mumbai and South Bombay — providing 24/7 care at your doorstep.",
  },
  {
    q: "Do you handle medical emergencies?",
    a: "Our coordinator is on-call 24×7. Our nurses are trained to stabilise patients and escalate to your physician or hospital. For life-threatening emergencies, please call 108 first.",
  },
  {
    q: "Can my doctor stay involved in the care plan?",
    a: "Absolutely. We coordinate with your treating physician and share daily nursing notes, vitals and progress updates with the family.",
  },
  {
    q: "How do I pay? Are there long-term contracts?",
    a: "We offer flexible daily, weekly and monthly options with no long-term lock-ins. You can pay online or directly to the coordinator — invoices are shared on request.",
  },
  {
    q: "Is the equipment new or refurbished?",
    a: "Equipment is sanitised, serviced and quality-checked before every deployment. New units are available on request — please ask your coordinator.",
  },
];

export const cities = ["Mumbai", "Mumbai Suburban", "Thane", "Navi Mumbai", "South Bombay"];

export const aboutContent = {
  mission:
    "To make hospital-grade healthcare accessible, affordable, and human — right where people heal best: at home.",
  story: [
    "✨ Elshadai home health care provides trusted nurse at home, patient care taker and physiotherapy services across Mumbai, Mumbai Suburban, Thane, Navi Mumbai and South Bombay. Our trained ANM/GNM and caretakers offer post surgery care injection care , elderly care catheter, rules tube and physiotherapy session at your doorstep . reliable, and affordable and available 24/7.",
    "compassionate, and professional home health care services tailored to meet your needs. From elderly care and post-surgery support to daily assistance and nursing services, our team ensures comfort, safety, and dignity at home. With trained caregivers and a personalized approach, we bring quality health care right to your doorstep."
  ],
  values: [
    { title: "Compassion first", body: "We hire for kindness as much as skill." },
    { title: "Radical transparency", body: "Honest pricing, honest updates, always." },
    { title: "Reliability", body: "When we commit, we follow through." },
    { title: "Dignity", body: "Every patient is treated like our own family." },
  ],
};
