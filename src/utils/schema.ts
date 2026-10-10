import { business, testimonials, howItWorks } from "@/content/site";

const SITE_URL = "https://www.elshadaihealthcare.com";

// ─────────────────────────────────────────────
// 1. ORGANIZATION + LOCAL BUSINESS + MEDICAL BUSINESS
// ─────────────────────────────────────────────
export function getMedicalBusinessSchema() {
  return {
    "@type": ["MedicalBusiness", "LocalBusiness", "Organization"],
    "@id": `${SITE_URL}/#org`,
    name: business.fullName,
    alternateName: [business.name, "Elshadai Healthcare", "Elshadai Nursing"],
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      "@id": `${SITE_URL}/#logo`,
      url: `${SITE_URL}/favicon.png`,
      contentUrl: `${SITE_URL}/favicon.png`,
      width: 512,
      height: 512,
      caption: business.fullName,
    },
    image: [`${SITE_URL}/og-image.webp`, `${SITE_URL}/hero-nurse.webp`],
    description: business.shortDescription,
    telephone: business.phone,
    email: business.email,
    foundingDate: "2020",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      minValue: 100,
      maxValue: 500,
    },
    address: {
      "@type": "PostalAddress",
      streetAddress: "2nd Floor, Opp Fire Brigade, 6 Kasar Ali",
      addressLocality: "Bhiwandi",
      addressRegion: "Maharashtra",
      postalCode: "421308",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 19.076,
      longitude: 72.8777,
    },
    hasMap: "https://maps.google.com/?q=Elshadai+Home+Healthcare+Bhiwandi",
    areaServed: [
      "Mumbai", "Navi Mumbai", "Thane", "Bhiwandi",
      "Mulund", "Ghatkopar", "Vikhroli", "Kurla",
      "Dadar", "Mahim", "Bandra", "Khar", "Santacruz", "Andheri", "Jogeshwari", "Goregaon", "Malad", "Kandivali", "Borivali", "Dahisar",
      "Mira Road", "Bhayandar", "Naigaon", "Vasai", "Nalasopara", "Virar",
      "Churchgate", "Colaba", "Fort", "Nariman Point", "Marine Lines", "Charni Road", "Girgaon", "Grant Road", "Malabar Hill", "Tardeo", "Mahalaxmi", "Mumbai Central", "Lower Parel", "Prabhadevi",
      "Kalher", "Kashimira", "Vashi"
    ].map((city) => ({ "@type": "City", name: city })),
    priceRange: "₹₹",
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, Online Transfer, UPI",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
      opens: "00:00",
      closes: "23:59",
    },
    aggregateRating: _getAggregateRatingData(),
    sameAs: [
      business.social.instagram,
      business.social.facebook,
      business.social.linkedin,
    ].filter(Boolean),
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: business.phone,
        contactType: "customer service",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi", "Marathi"],
        contactOption: "TollFree",
      },
      {
        "@type": "ContactPoint",
        telephone: business.phone,
        contactType: "emergency",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi", "Marathi"],
      },
    ],
    medicalSpecialty: [
      "Nursing", "Geriatrics", "Physical Therapy",
      "Critical Care", "Wound Care", "Neonatology",
    ],
  };
}

// ─────────────────────────────────────────────
// 2. WEBSITE + SITELINKS SEARCHBOX
// ─────────────────────────────────────────────
export function getWebSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: business.fullName,
    alternateName: business.name,
    description: business.shortDescription,
    inLanguage: "en-IN",
    publisher: { "@id": `${SITE_URL}/#org` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/services?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// ─────────────────────────────────────────────
// 3. WEBPAGE
// ─────────────────────────────────────────────
export function getWebPageSchema(
  title: string,
  path: string,
  description: string,
  type: string = "WebPage",
  imageUrl?: string,
  datePublished?: string,
  dateModified?: string
) {
  return {
    "@type": type,
    "@id": `${SITE_URL}${path}/#webpage`,
    url: `${SITE_URL}${path}`,
    name: title,
    description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#org` },
    inLanguage: "en-IN",
    ...(imageUrl && {
      primaryImageOfPage: { "@type": "ImageObject", url: imageUrl },
    }),
    ...(datePublished && { datePublished }),
    ...(dateModified && { dateModified: dateModified || datePublished }),
    potentialAction: {
      "@type": "ReadAction",
      target: [`${SITE_URL}${path}`],
    },
  };
}

// ─────────────────────────────────────────────
// 4. BREADCRUMB
// ─────────────────────────────────────────────
export function getBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}${items[items.length - 1].path}/#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

// ─────────────────────────────────────────────
// 5. ARTICLE — Blog post (enhanced MedicalWebPage)
// ─────────────────────────────────────────────
export function getArticleSchema(post: any) {
  const wordCount = Array.isArray(post.content)
    ? post.content.join(" ").split(/\s+/).length
    : 500;
  return {
    "@type": ["Article", "MedicalWebPage"],
    "@id": `${SITE_URL}/blog/${post.slug}/#article`,
    headline: post.title,
    name: post.title,
    description: post.metaDescription,
    abstract: post.excerpt,
    image: {
      "@type": "ImageObject",
      url: `${SITE_URL}${post.image}`,
      contentUrl: `${SITE_URL}${post.image}`,
      width: 1200,
      height: 630,
    },
    author: {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: post.author?.name || "Elshadai Health Team",
      url: post.author?.url || `${SITE_URL}/about`,
    },
    publisher: { "@id": `${SITE_URL}/#org` },
    datePublished: post.date,
    dateModified: post.dateModified || post.date,
    mainEntityOfPage: { "@id": `${SITE_URL}/blog/${post.slug}/#webpage` },
    url: `${SITE_URL}/blog/${post.slug}`,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#org` },
    keywords: Array.isArray(post.keywords) ? post.keywords.join(", ") : "",
    wordCount,
    inLanguage: "en-IN",
    audience: {
      "@type": "MedicalAudience",
      audienceType: "Patients and Caregivers",
      healthCondition: {
        "@type": "MedicalCondition",
        name: "Home Healthcare",
      },
    },
    specialty: "Nursing",
  };
}

// ─────────────────────────────────────────────
// 6. FAQ PAGE
// ─────────────────────────────────────────────
export function getFAQSchema(faqs: { q: string; a: string }[]) {
  if (!faqs || faqs.length === 0) return null;
  return {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };
}

// ─────────────────────────────────────────────
// 7. MEDICAL SERVICE
// ─────────────────────────────────────────────
export function getMedicalServiceSchema(service: any) {
  return {
    "@type": ["MedicalTherapy", "Service"],
    "@id": `${SITE_URL}/services/${service.slug}/#service`,
    name: service.title,
    alternateName: service.short,
    description: service.long || service.short,
    url: `${SITE_URL}/services/${service.slug}`,
    provider: { "@id": `${SITE_URL}/#org` },
    serviceType: "Home Healthcare",
    category: "Medical Services",
    areaServed: ["Mumbai", "Thane", "Navi Mumbai", "South Bombay"].map((city) => ({
      "@type": "City",
      name: city,
    })),
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${SITE_URL}/book`,
      servicePhone: business.phone,
      availableLanguage: ["English", "Hindi", "Marathi"],
    },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/services/${service.slug}`,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      seller: { "@id": `${SITE_URL}/#org` },
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${service.title} Plans`,
      itemListElement: (service.highlights || []).map((h: string) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: h },
      })),
    },
  };
}

// ─────────────────────────────────────────────
// 8. MEDICAL DEVICE / EQUIPMENT
// ─────────────────────────────────────────────
export function getMedicalDeviceSchema(equip: any) {
  return {
    "@type": ["MedicalDevice", "Product"],
    "@id": `${SITE_URL}/equipment/${equip.slug}/#product`,
    name: equip.title,
    alternateName: equip.short,
    description: equip.long || equip.short,
    url: `${SITE_URL}/equipment/${equip.slug}`,
    image: {
      "@type": "ImageObject",
      url: `${SITE_URL}${equip.image || "/og-image.webp"}`,
    },
    brand: { "@type": "Brand", name: business.name },
    manufacturer: { "@id": `${SITE_URL}/#org` },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/equipment/${equip.slug}`,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock",
      seller: { "@id": `${SITE_URL}/#org` },
      itemCondition: "https://schema.org/RefurbishedCondition",
    },
    aggregateRating: _getAggregateRatingData(),
  };
}

// ─────────────────────────────────────────────
// 9. AGGREGATE RATING (internal helper + export)
// ─────────────────────────────────────────────
function _getAggregateRatingData() {
  const allRatings = testimonials.map((t) => t.rating);
  const avg = allRatings.reduce((a, b) => a + b, 0) / allRatings.length;
  return {
    "@type": "AggregateRating",
    ratingValue: avg.toFixed(1),
    bestRating: "5",
    worstRating: "1",
    ratingCount: allRatings.length,
    reviewCount: allRatings.length,
  };
}

export function getAggregateRatingSchema() {
  return {
    "@type": "LocalBusiness",
    "@id": `${SITE_URL}/#org`,
    aggregateRating: _getAggregateRatingData(),
  };
}

// ─────────────────────────────────────────────
// 10. REVIEW SCHEMA
// ─────────────────────────────────────────────
export function getReviewSchema() {
  return testimonials.slice(0, 6).map((t) => ({
    "@type": "Review",
    reviewRating: {
      "@type": "Rating",
      ratingValue: t.rating,
      bestRating: 5,
    },
    author: { "@type": "Person", name: t.name },
    reviewBody: t.text,
    itemReviewed: { "@id": `${SITE_URL}/#org` },
    datePublished: "2024-06-01",
    publisher: { "@id": `${SITE_URL}/#org` },
  }));
}

// ─────────────────────────────────────────────
// 11. HOW-TO SCHEMA
// ─────────────────────────────────────────────
export function getHowToSchema() {
  return {
    "@type": "HowTo",
    "@id": `${SITE_URL}/#howto`,
    name: "How to Book Home Healthcare with Elshadai",
    description:
      "Book a certified home nurse, caregiver or medical equipment in 3 simple steps.",
    totalTime: "PT5M",
    estimatedCost: {
      "@type": "MonetaryAmount",
      currency: "INR",
      value: "0",
    },
    tool: [
      { "@type": "HowToTool", name: "Phone or WhatsApp" },
      { "@type": "HowToTool", name: "Online Booking Form" },
    ],
    step: howItWorks.map((step, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: step.title,
      text: step.body,
      url: `${SITE_URL}/#how-it-works`,
    })),
  };
}

// ─────────────────────────────────────────────
// 12. SERVICE LIST (for /services page)
// ─────────────────────────────────────────────
export function getServiceListSchema(servicesList: any[]) {
  return {
    "@type": "ItemList",
    "@id": `${SITE_URL}/services/#servicelist`,
    name: "Home Healthcare Services by Elshadai",
    description: "Complete list of certified home healthcare services available in Mumbai.",
    url: `${SITE_URL}/services`,
    numberOfItems: servicesList.length,
    itemListOrder: "https://schema.org/ItemListUnordered",
    itemListElement: servicesList.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/services/${s.slug}`,
      name: s.title,
    })),
  };
}

// ─────────────────────────────────────────────
// 13. EQUIPMENT LIST (for /equipment page)
// ─────────────────────────────────────────────
export function getEquipmentListSchema(equipmentList: any[]) {
  return {
    "@type": "ItemList",
    "@id": `${SITE_URL}/equipment/#equipmentlist`,
    name: "Home Medical Equipment Rental by Elshadai",
    description:
      "Rent hospital beds, oxygen concentrators, BiPAP, wheelchairs and more in Mumbai.",
    url: `${SITE_URL}/equipment`,
    numberOfItems: equipmentList.length,
    itemListOrder: "https://schema.org/ItemListUnordered",
    itemListElement: equipmentList.map((e, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/equipment/${e.slug}`,
      name: e.title,
    })),
  };
}

// ─────────────────────────────────────────────
// 14. BOOKING SERVICE (for /book page)
// ─────────────────────────────────────────────
export function getBookingServiceSchema() {
  return {
    "@type": ["ProfessionalService", "Service"],
    "@id": `${SITE_URL}/book/#booking-service`,
    name: "Book Home Healthcare — Elshadai",
    description:
      "Book certified home nurses, ICU caregivers, physiotherapists and medical equipment in 60 seconds.",
    url: `${SITE_URL}/book`,
    provider: { "@id": `${SITE_URL}/#org` },
    serviceType: "Home Healthcare Booking",
    areaServed: ["Mumbai", "Thane", "Navi Mumbai"].map((c) => ({
      "@type": "City",
      name: c,
    })),
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${SITE_URL}/book`,
      servicePhone: business.phone,
    },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/book`,
      availability: "https://schema.org/InStock",
      priceCurrency: "INR",
      seller: { "@id": `${SITE_URL}/#org` },
    },
  };
}

// ─────────────────────────────────────────────
// 15. BLOG LIST (for /blog page)
// ─────────────────────────────────────────────
export function getBlogListSchema(posts: any[]) {
  return {
    "@type": "ItemList",
    "@id": `${SITE_URL}/blog/#bloglist`,
    name: "Home Healthcare Blog — Elshadai",
    description: "Expert guides on home nursing, elderly care and recovery in Mumbai.",
    url: `${SITE_URL}/blog`,
    numberOfItems: posts.length,
    itemListElement: posts.map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${SITE_URL}/blog/${p.slug}`,
      name: p.title,
    })),
  };
}

// ─────────────────────────────────────────────
// 16. ABOUT PAGE
// ─────────────────────────────────────────────
export function getAboutPageSchema() {
  return {
    "@type": "AboutPage",
    "@id": `${SITE_URL}/about/#aboutpage`,
    url: `${SITE_URL}/about`,
    name: "About Elshadai Home Healthcare",
    description:
      "Mumbai's trusted home healthcare company with 200+ certified caregivers and 5,000+ families served.",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#org` },
    mainEntity: { "@id": `${SITE_URL}/#org` },
  };
}

// ─────────────────────────────────────────────
// 17. CONTACT PAGE
// ─────────────────────────────────────────────
export function getContactPageSchema() {
  return {
    "@type": "ContactPage",
    "@id": `${SITE_URL}/contact/#contactpage`,
    url: `${SITE_URL}/contact`,
    name: "Contact Elshadai Home Healthcare",
    description:
      "Reach Elshadai 24x7 by phone, WhatsApp or email for home nursing in Mumbai.",
    isPartOf: { "@id": `${SITE_URL}/#website` },
    mainEntity: {
      "@type": "ContactPoint",
      telephone: business.phone,
      email: business.email,
      contactType: "customer service",
      areaServed: "IN",
      availableLanguage: ["English", "Hindi", "Marathi"],
    },
  };
}

// ─────────────────────────────────────────────
// 18. BUILD FINAL JSON-LD
// ─────────────────────────────────────────────
export function buildAdvancedSchema(schemas: any[]) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": schemas.flat().filter(Boolean),
  });
}
