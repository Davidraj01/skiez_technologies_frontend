import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, CalendarDays, ArrowLeft, Sparkles, ChevronDown } from "lucide-react";
import api from "../lib/api";
import { Seo, useSeoSettings, absoluteUrl, breadcrumbSchema, faqSchema } from "../lib/seo";

export default function BlogDetail() {
  const { slug } = useParams();
  const settings = useSeoSettings();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    api
      .get(`/blogs/${slug}`)
      .then((res) => setBlog(res.data))
      .catch(() => setError("This post doesn't exist or has been removed."))
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="bg-white min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-navy-700" />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="bg-white min-h-screen flex flex-col items-center justify-center gap-4 text-navy-900">
        <Seo title="Post not found | Skiez Technologies" noindex />
        <p className="text-slate-600">{error}</p>
        <Link to="/blogs" className="text-navy-700 hover:underline">
          Back to blog
        </Link>
      </div>
    );
  }

  const seo = blog.seo || {};
  const metaTitle = seo.metaTitle || `${blog.title} | Skiez Technologies`;
  const metaDescription = seo.metaDescription || blog.excerpt;
  const takeaways = blog.keyTakeaways || [];
  const faqs = blog.faqs || [];
  const postPath = `/blogs/${blog.slug}`;

  // Article structured data — helps Google and AI engines understand and cite the post
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: metaDescription,
    image: blog.coverImage ? [blog.coverImage] : undefined,
    datePublished: blog.createdAt,
    dateModified: blog.updatedAt,
    author: { "@type": "Organization", name: blog.author || "Skiez Technologies" },
    publisher: {
      "@type": "Organization",
      name: settings?.siteName || "Skiez Technologies",
      logo: { "@type": "ImageObject", url: absoluteUrl(settings, "/skiez-tech-logo.webp") },
    },
    mainEntityOfPage: absoluteUrl(settings, postPath),
    keywords: [seo.focusKeyword, ...(blog.tags || [])].filter(Boolean).join(", ") || undefined,
    abstract: takeaways.length ? takeaways.join(" ") : undefined,
  };

  return (
    <div className="bg-white min-h-screen text-navy-900 font-sans overflow-x-hidden">
      <Seo
        title={metaTitle}
        description={metaDescription}
        keywords={[seo.focusKeyword, ...(blog.tags || [])].filter(Boolean).join(", ")}
        image={blog.coverImage}
        type="article"
        noindex={seo.noindex}
        publishedTime={blog.createdAt}
        modifiedTime={blog.updatedAt}
        jsonLd={[
          articleSchema,
          faqSchema(faqs),
          breadcrumbSchema(settings, [
            { name: "Home", path: "/" },
            { name: "Blog", path: "/blogs" },
            { name: blog.title, path: postPath },
          ]),
        ]}
      />

      <article className="max-w-3xl mx-auto px-6 py-16">
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-navy-700 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to blog
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-4">
            <CalendarDays className="w-4 h-4" />
            <time dateTime={blog.createdAt}>
              {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </time>
            <span className="text-slate-300">&bull;</span>
            {blog.author}
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 text-navy-900">
            {blog.title}
          </h1>

          {blog.coverImage && (
            <div className="rounded-3xl overflow-hidden border border-slate-200 mb-10">
              <img fetchpriority="high" decoding="async" src={blog.coverImage} alt={blog.title} className="w-full h-auto" />
            </div>
          )}

          {/* Key takeaways — short, quotable answers for readers and AI assistants */}
          {takeaways.length > 0 && (
            <section aria-labelledby="takeaways" className="mb-10 rounded-2xl border border-navy-100 bg-navy-50 p-6 md:p-7">
              <h2 id="takeaways" className="flex items-center gap-2 text-lg font-bold text-navy-900">
                <Sparkles className="h-5 w-5" /> Key takeaways
              </h2>
              <ul className="mt-4 space-y-2.5">
                {takeaways.map((t, i) => (
                  <li key={i} className="flex gap-3 text-[15px] leading-relaxed text-slate-700">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-navy-900" />
                    {t}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <div className="text-slate-600 text-lg leading-relaxed whitespace-pre-wrap">
            {blog.content}
          </div>

          {/* FAQ — visible on the page and mirrored in FAQPage structured data */}
          {faqs.length > 0 && (
            <section aria-labelledby="faq" className="mt-14">
              <h2 id="faq" className="text-2xl md:text-3xl font-bold tracking-tight text-navy-900">
                Frequently asked questions
              </h2>
              <div className="mt-6 divide-y divide-slate-200 rounded-2xl border border-slate-200">
                {faqs.map((f, i) => (
                  <details key={i} className="group p-5 md:p-6" open={i === 0}>
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-4 font-semibold text-navy-900 [&::-webkit-details-marker]:hidden">
                      <h3 className="text-base md:text-lg">{f.question}</h3>
                      <ChevronDown className="mt-1 h-5 w-5 shrink-0 text-slate-500 transition-transform group-open:rotate-180" />
                    </summary>
                    <p className="mt-3 text-[15px] leading-relaxed text-slate-600 whitespace-pre-wrap">{f.answer}</p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {blog.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-slate-200">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-xs text-slate-600"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </motion.div>
      </article>
    </div>
  );
}
