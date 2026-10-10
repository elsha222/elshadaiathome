import { business } from "@/content/site";

const SITE_URL = "https://www.elshadaihealthcare.com";

export function getMedicalBusinessSchema() {
  return {
    "@type": ["MedicalBusiness", "Organization"],
    "@id": `${SITE_URL}/#org`,
    name: business.fullName,
    alternateName: business.name,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.webp`,
    image: `${SITE_URL}/hero-nurse.webp`,
    description: business.shortDescription,
    telephone: business.phone,
    email: business.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Mumbai",
      addressRegion: "Maharashtra",
      addressCountry: "IN"
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 19.076,
      longitude: 72.8777
    },
    areaServed: ["Mumbai", "Thane", "Navi Mumbai", "South Bombay"].map(city => ({
      "@type": "City",
      name: city
    })),
    priceRange: "₹₹-₹₹₹",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "00:00",
      closes: "23:59"
    },
    sameAs: [
      business.social.instagram,
      business.social.facebook,
      business.social.linkedin
    ].filter(Boolean)
  };
}

export function getWebSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: business.fullName,
    publisher: { "@id": `${SITE_URL}/#org` }
  };
}

export function getWebPageSchema(title: string, path: string, description: string, type: string = "WebPage") {
  return {
    "@type": type,
    "@id": `${SITE_URL}${path}/#webpage`,
    url: `${SITE_URL}${path}`,
    name: title,
    description: description,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#org` }
  };
}

export function getBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}${items[items.length - 1].path}/#breadcrumb`,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`
    }))
  };
}

export function getArticleSchema(post: any) {
  return {
    "@type": ["Article", "MedicalWebPage"],
    "@id": `${SITE_URL}/blog/${post.slug}/#article`,
    headline: post.title,
    description: post.metaDescription,
    image: `${SITE_URL}${post.image}`,
    author: {
      "@type": "Person",
      name: post.author?.name || "Elshadai Expert",
      url: post.author?.url || SITE_URL
    },
    publisher: { "@id": `${SITE_URL}/#org` },
    datePublished: post.date,
    dateModified: post.date,
    mainEntityOfPage: { "@id": `${SITE_URL}/blog/${post.slug}/#webpage` },
    audience: {
      "@type": "MedicalAudience",
      audienceType: "Patients"
    },
    inLanguage: "en-IN"
  };
}

export function getFAQSchema(faqs: { q: string; a: string }[]) {
  if (!faqs || faqs.length === 0) return null;
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a
      }
    }))
  };
}

export function getMedicalServiceSchema(service: any) {
  return {
    "@type": ["MedicalTherapy", "Service"],
    "@id": `${SITE_URL}/services/${service.slug}/#service`,
    name: service.title,
    description: service.shortDescription,
    provider: { "@id": `${SITE_URL}/#org` },
    areaServed: ["Mumbai", "Thane", "Navi Mumbai"].map(city => ({
      "@type": "City",
      name: city
    })),
    url: `${SITE_URL}/services/${service.slug}`
  };
}

export function getMedicalDeviceSchema(equipment: any) {
  return {
    "@type": ["MedicalDevice", "Product"],
    "@id": `${SITE_URL}/equipment/${equipment.slug}/#product`,
    name: equipment.title,
    description: equipment.shortDescription,
    image: `${SITE_URL}${equipment.image}`,
    brand: {
      "@type": "Brand",
      name: business.name
    },
    offers: {
      "@type": "Offer",
      url: `${SITE_URL}/equipment/${equipment.slug}`,
      priceCurrency: "INR",
      price: equipment.price || "0",
      availability: "https://schema.org/InStock",
      seller: { "@id": `${SITE_URL}/#org` }
    }
  };
}

export function buildAdvancedSchema(schemas: any[]) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": schemas.filter(Boolean)
  });
}
