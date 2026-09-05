import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Calendar, Clock, MapPin, User, CheckCircle2 } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { CtaBanner } from "@/components/home/CtaBanner";
import { blogPosts, BlogPost } from "@/content/blog";

const SITE_URL = "https://elshadaihealthcare.com";

export const Route = createFileRoute("/blog_/$slug")({
  loader: ({ params }) => {
    const post = blogPosts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {};
    const { post } = loaderData;
    
    // Generate Schema.org JSON-LD
    const schemas = [];

    // 1. BlogPosting Schema
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.metaDescription,
      image: SITE_URL + post.image,
      author: { "@type": "Organization", name: post.author.name, url: post.author.url },
      publisher: {
        "@type": "Organization",
        name: "Elshadai Home Healthcare",
        logo: { "@type": "ImageObject", url: SITE_URL + "/logo.png" }
      },
      datePublished: post.date,
      mainEntityOfPage: { "@type": "WebPage", "@id": SITE_URL + "/blog/" + post.slug }
    });

    // 2. BreadcrumbList Schema
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
        { "@type": "ListItem", position: 2, name: "Blog", item: SITE_URL + "/blog" },
        { "@type": "ListItem", position: 3, name: post.title, item: SITE_URL + "/blog/" + post.slug }
      ]
    });

    // 3. FAQPage Schema (if FAQS exist)
    if (post.faqs && post.faqs.length > 0) {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: post.faqs.map((faq: { q: string; a: string }) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a }
        }))
      });
    }

    return {
      meta: [
        { title: post.metaTitle },
        { name: "description", content: post.metaDescription },
        { name: "keywords", content: post.keywords.join(", ") },
        { name: "robots", content: "index, follow, max-image-preview:large" },
        { property: "og:type", content: "article" },
        { property: "og:title", content: post.metaTitle },
        { property: "og:description", content: post.metaDescription },
        { property: "og:image", content: SITE_URL + post.image },
        { property: "og:url", content: SITE_URL + "/blog/" + post.slug },
        { property: "article:published_time", content: post.date },
        { property: "article:author", content: post.author.name },
        { property: "article:section", content: post.category },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: SITE_URL + "/blog/" + post.slug }],
      scripts: schemas.map(schema => ({
        type: "application/ld+json",
        children: JSON.stringify(schema)
      })),
    };
  },
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post } = Route.useLoaderData();
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  return (
    <PageLayout>
      <article className="pt-24 pb-20">
        {/* Header Section */}
        <header className="mx-auto max-w-4xl px-4 md:px-8 mb-12">
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary mb-8 hover:text-primary/80 transition-colors group"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to journal
          </Link>
          
          <div className="flex items-center gap-3 mb-6">
            <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              {post.category}
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground leading-[1.1] mb-8 text-balance">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-y border-border py-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground shadow-md">
                <User className="h-5 w-5" />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold text-foreground">{post.author.name}</span>
                <span className="text-xs">Care Expert</span>
              </div>
            </div>
            <div className="hidden sm:block w-px h-8 bg-border"></div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-primary" /> {formattedDate}</span>
              <span className="flex items-center gap-1.5"><Clock className="h-4 w-4 text-primary" /> {post.readTime}</span>
            </div>
          </div>
        </header>

        {/* Hero Image */}
        <div className="mx-auto max-w-5xl px-4 md:px-8 mb-16">
          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full rounded-2xl md:rounded-[2rem] overflow-hidden bg-muted shadow-xl ring-1 ring-border/50">
            <img 
              src={post.image} 
              alt={post.title}
              className="absolute inset-0 w-full h-full object-cover"
              loading="eager"
            />
          </div>
        </div>

        {/* Content Body */}
        <div className="mx-auto max-w-3xl px-4 md:px-8">
          <div className="prose prose-lg prose-blue max-w-none">
            <p className="text-xl md:text-2xl font-medium text-foreground leading-snug mb-12 border-l-4 border-primary pl-6 py-2">
              {post.excerpt}
            </p>
            
            <div className="space-y-6 text-[1.125rem] leading-[1.8] text-foreground/80">
              {post.content.map((paragraph: string, index: number) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Service Areas */}
          {post.areas && post.areas.length > 0 && (
            <div className="mt-16 p-8 bg-muted/30 rounded-3xl border border-border">
              <h3 className="font-display text-xl font-bold mb-6 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" /> Service Areas Covered
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {post.areas.map((area: string) => (
                  <span key={area} className="inline-flex items-center gap-2 px-4 py-2 bg-background border border-border text-foreground rounded-full text-sm font-medium shadow-sm">
                    <CheckCircle2 className="h-4 w-4 text-primary" /> {area}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* FAQs */}
          {post.faqs && post.faqs.length > 0 && (
            <div className="mt-16 border-t border-border pt-16">
              <h2 className="font-display text-3xl font-bold tracking-tight mb-8">
                Common Questions
              </h2>
              <div className="grid gap-4">
                {post.faqs.map((faq: { q: string; a: string }, index: number) => (
                  <div key={index} className="bg-background border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <h4 className="font-bold text-lg mb-3 text-foreground">{faq.q}</h4>
                    <p className="text-muted-foreground leading-relaxed">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="mt-16 bg-gradient-to-br from-primary-soft to-background border border-primary/20 rounded-3xl p-8 md:p-12 text-center shadow-lg">
            <h3 className="font-display text-3xl font-bold mb-4">Need professional care at home?</h3>
            <p className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto">
              Our care coordinators are available 24/7 to design a personalized care plan for your loved ones.
            </p>
            <Link
              to="/book"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 transition-all hover:-translate-y-1"
            >
              Book an Assessment <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </article>

      <CtaBanner />
    </PageLayout>
  );
}

