import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Calendar, Clock, MapPin } from "lucide-react";
import { PageLayout } from "@/components/layout/PageLayout";
import { CtaBanner } from "@/components/home/CtaBanner";
import { blogPosts, blogCategories } from "@/content/blog";
import { useState, useMemo } from "react";

const SITE_URL = "https://elshadaihealthcare.com";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Home Healthcare Blog & Nursing Guide Mumbai | ELSHADAI" },
      {
        name: "description",
        content:
          "Read our expert blog on home healthcare, nursing, elderly care, and recovery in Mumbai. Practical guides and advice for families caring for loved ones at home.",
      },
      {
        name: "keywords",
        content:
          "home healthcare blog, nursing guide Mumbai, elderly care tips, stroke recovery at home, dementia care guide, home nursing articles, health blog India",
      },
      { name: "robots", content: "index, follow, max-image-preview:large" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Home Healthcare Blog | ELSHADAI" },
      {
        property: "og:description",
        content: "Expert advice on nursing, elderly care, and recovery at home in Mumbai.",
      },
      { property: "og:url", content: SITE_URL + "/blog" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: SITE_URL + "/blog" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Home Healthcare Blog",
          description: "Articles and guides on home nursing and elderly care.",
          url: SITE_URL + "/blog",
          hasPart: blogPosts.map((post) => ({
            "@type": "BlogPosting",
            headline: post.title,
            url: SITE_URL + "/blog/" + post.slug,
            datePublished: post.date,
            author: { "@type": "Organization", name: post.author },
          })),
        }),
      },
    ],
  }),
  component: BlogIndexPage,
});

function BlogIndexPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") return blogPosts;
    return blogPosts.filter((post) => post.category === activeCategory);
  }, [activeCategory]);

  const featuredPost = blogPosts.find((p) => p.featured) || blogPosts[0];
  const regularPosts = filteredPosts.filter((p) => p.slug !== featuredPost.slug || activeCategory !== "All");

  return (
    <PageLayout>
      <section className="relative overflow-hidden bg-gradient-hero pt-16 pb-12 md:pt-24 md:pb-16">
        <div className="blob bg-primary/30 h-72 w-72 -top-20 right-0" />
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary flex items-center gap-2">
            <BookOpen className="h-4 w-4" /> Journal & Guides
          </span>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-balance md:text-6xl">
            Insights on care, recovery & aging with dignity.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            Practical advice, local area guides, and expert knowledge to help your family navigate the journey of home healthcare in Mumbai.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        {/* Category Filter */}
        <div className="flex flex-wrap items-center gap-2 mb-12">
          {blogCategories.map((cat: string) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground shadow-soft"
                  : "bg-card border border-border text-foreground hover:border-primary/40 hover:bg-primary-soft"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post (Only show if 'All' is selected and there is a featured post) */}
        {activeCategory === "All" && featuredPost && (
          <div className="mb-16 rounded-3xl border border-border bg-card overflow-hidden shadow-soft group hover:shadow-lg transition-all duration-300">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative h-64 md:h-auto overflow-hidden bg-muted">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-xs font-medium text-muted-foreground mb-4">
                  <span className="bg-primary-soft text-primary px-3 py-1 rounded-full">{featuredPost.category}</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {featuredPost.readTime}</span>
                </div>
                <h2 className="font-display text-2xl md:text-4xl font-bold tracking-tight mb-4 group-hover:text-primary transition-colors">
                  <Link to="/blog/$slug" params={{ slug: featuredPost.slug }}>
                    {featuredPost.title}
                  </Link>
                </h2>
                <p className="text-muted-foreground mb-8 text-sm md:text-base line-clamp-3">
                  {featuredPost.excerpt}
                </p>
                <Link
                  to="/blog/$slug" params={{ slug: featuredPost.slug }}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 transition-colors"
                >
                  Read full article <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Regular Posts Grid */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {regularPosts.map((post) => (
            <Link
              key={post.slug}
              to="/blog/$slug"
              params={{ slug: post.slug }}
              className="group flex flex-col rounded-3xl border border-border bg-card overflow-hidden shadow-soft hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-48 overflow-hidden bg-muted">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-col flex-1 p-6">
                <div className="flex items-center gap-3 text-xs font-medium text-muted-foreground mb-3">
                  <span className="text-primary">{post.category}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="font-display text-xl font-bold tracking-tight mb-3 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-3 mb-6 flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 mt-auto text-sm font-semibold text-primary">
                  Read more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-20">
            <h3 className="font-display text-2xl font-bold text-foreground">No articles found</h3>
            <p className="text-muted-foreground mt-2">Check back later for more content in this category.</p>
          </div>
        )}
      </section>

      <CtaBanner />
    </PageLayout>
  );
}
