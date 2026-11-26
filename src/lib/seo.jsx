/**
 * SEO / AEO / GEO helpers.
 *
 * - <SeoProvider> loads the site-wide settings edited in Admin → SEO (once per visit).
 * - <Seo> sets <title>, meta description, Open Graph/Twitter tags, canonical URL and
 *   JSON-LD structured data in <head>, updating the defaults from index.html in place.
 */
import React, { createContext, useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "./api";

const SeoContext = createContext(null);

export function SeoProvider({ children }) {
  const [settings, setSettings] = useState(null);

  useEffect(() => {
    api
      .get("/seo/settings")
      .then((res) => setSettings(res.data))
      .catch(() => setSettings(null)); // site still works with built-in fallbacks
  }, []);

  return <SeoContext.Provider value={settings}>{children}</SeoContext.Provider>;
}

export const useSeoSettings = () => useContext(SeoContext);

const siteBase = (settings) => (settings?.siteUrl || "").replace(/\/+$/, "");

/** Absolute URL for a path or asset (needed by Open Graph and structured data). */
export const absoluteUrl = (settings, pathOrUrl) => {
  if (!pathOrUrl) return "";
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const base = siteBase(settings) || (typeof window !== "undefined" ? window.location.origin : "");
  return base + (pathOrUrl.startsWith("/") ? pathOrUrl : `/${pathOrUrl}`);
};

/** Organization / LocalBusiness entity — tells search & AI engines who Skiez is (GEO). */
export const organizationSchema = (settings) => {
  const b = settings?.business || {};
  const url = siteBase(settings) || undefined;
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": url ? `${url}/#organization` : undefined,
    name: settings?.siteName || "Skiez Technologies",
    legalName: b.legalName || undefined,
    description: b.description || undefined,
    url,
    logo: absoluteUrl(settings, "/skiez-tech-logo.webp"),
    image: settings?.defaultOgImage || absoluteUrl(settings, "/skiez-tech-logo.webp"),
    telephone: b.phone || undefined,
    email: b.email || undefined,
    foundingDate: b.foundingYear || undefined,
    founder: b.founder ? { "@type": "Person", name: b.founder } : undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: b.streetAddress || undefined,
      addressLocality: b.city || undefined,
      addressRegion: b.region || undefined,
      postalCode: b.postalCode || undefined,
      addressCountry: b.country || undefined,
    },
    areaServed: b.areaServed || undefined,
    knowsAbout: b.services?.length ? b.services : undefined,
    hasOfferCatalog: b.services?.length
      ? {
          "@type": "OfferCatalog",
          name: "Services",
          itemListElement: b.services.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s },
          })),
        }
      : undefined,
    sameAs: b.sameAs?.length ? b.sameAs : undefined,
  };
};

export const websiteSchema = (settings) => {
  const url = siteBase(settings);
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: settings?.siteName || "Skiez Technologies",
    url: url || undefined,
    publisher: url ? { "@id": `${url}/#organization` } : undefined,
  };
};

export const breadcrumbSchema = (settings, items) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: items.map((it, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: it.name,
    item: absoluteUrl(settings, it.path),
  })),
});

export const faqSchema = (faqs) =>
  faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      }
    : null;

// Prevent "</script>" inside data from breaking out of the JSON-LD script tag
const safeJson = (obj) => JSON.stringify(obj).replace(/</g, "\\u003c");

/** Create or update a single <meta>/<link> in <head> (no duplicates with index.html defaults). */
const upsertTag = (tag, keyAttr, keyValue, attrs) => {
  let el = document.head.querySelector(`${tag}[${keyAttr}="${keyValue}"]`);
  if (!attrs) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement(tag);
    el.setAttribute(keyAttr, keyValue);
    document.head.appendChild(el);
  }
  Object.entries(attrs).forEach(([k, v]) => el.setAttribute(k, v));
};

/**
 * Per-page SEO tags.
 * @param page        key of a page in Admin → SEO (home, services, about, contact, blogs, gallery)
 * @param title/description/keywords/image  explicit values (override page settings)
 * @param fallbackTitle  used when settings haven't loaded / are empty
 * @param jsonLd      object or array of structured-data objects
 */
export function Seo({
  page,
  title,
  description,
  keywords,
  image,
  type = "website",
  noindex = false,
  fallbackTitle,
  jsonLd,
  publishedTime,
  modifiedTime,
}) {
  const settings = useSeoSettings();
  const { pathname } = useLocation();
  const pageSeo = (page && settings?.pages?.[page]) || {};
  const siteName = settings?.siteName || "Skiez Technologies";

  const finalTitle = title || pageSeo.title || fallbackTitle || siteName;
  const finalDescription = description || pageSeo.description || settings?.business?.description || "";
  const finalKeywords = keywords || pageSeo.keywords || "";
  const finalImage = absoluteUrl(settings, image || settings?.defaultOgImage || "/skiez-tech-logo.webp");
  const base = siteBase(settings);
  const canonical = base ? base + (pathname === "/" ? "/" : pathname.replace(/\/+$/, "")) : "";
  const schemaJson = JSON.stringify((Array.isArray(jsonLd) ? jsonLd : [jsonLd]).filter(Boolean));

  useEffect(() => {
    document.title = finalTitle;
    const name = (n, content) => upsertTag("meta", "name", n, content ? { content } : null);
    const prop = (p, content) => upsertTag("meta", "property", p, content ? { content } : null);

    name("description", finalDescription);
    name("keywords", finalKeywords);
    name("robots", noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large");
    upsertTag("link", "rel", "canonical", canonical ? { href: canonical } : null);

    // Social previews (WhatsApp, LinkedIn, Facebook, X)
    prop("og:type", type);
    prop("og:site_name", siteName);
    prop("og:title", finalTitle);
    prop("og:description", finalDescription);
    prop("og:url", canonical);
    prop("og:image", finalImage);
    prop("og:locale", "en_IN");
    prop("article:published_time", publishedTime);
    prop("article:modified_time", modifiedTime);
    name("twitter:card", "summary_large_image");
    name("twitter:title", finalTitle);
    name("twitter:description", finalDescription);
    name("twitter:image", finalImage);

    // Structured data (JSON-LD) for this page — replaced on every route change
    document.head.querySelectorAll('script[data-seo="jsonld"]').forEach((el) => el.remove());
    JSON.parse(schemaJson).forEach((schema) => {
      const el = document.createElement("script");
      el.type = "application/ld+json";
      el.dataset.seo = "jsonld";
      el.textContent = safeJson(schema);
      document.head.appendChild(el);
    });
  }, [finalTitle, finalDescription, finalKeywords, noindex, canonical, type, siteName, finalImage, publishedTime, modifiedTime, schemaJson]);

  return null;
}
