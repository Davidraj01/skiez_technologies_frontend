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
// Set only during build-time pre-rendering: collects the head tags each page wants
const SeoCollectorContext = createContext(null);

/**
 * @param initialSettings  settings snapshot used while pre-rendering (and embedded in the
 *                         page as window.__SEO_SETTINGS__ so the browser starts with the same data)
 * @param collector        { head: null } object filled by <Seo> during pre-rendering
 */
export function SeoProvider({ children, initialSettings = null, collector = null }) {
  const [settings, setSettings] = useState(
    () => initialSettings ?? (typeof window !== "undefined" ? window.__SEO_SETTINGS__ ?? null : null)
  );

  useEffect(() => {
    // Refresh with the latest admin settings (site keeps working on built-in fallbacks if offline)
    api
      .get("/seo/settings")
      .then((res) => setSettings(res.data))
      .catch(() => {});
  }, []);

  return (
    <SeoCollectorContext.Provider value={collector}>
      <SeoContext.Provider value={settings}>{children}</SeoContext.Provider>
    </SeoCollectorContext.Provider>
  );
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

const escapeAttr = (v = "") =>
  String(v).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/** Compute every head tag for a page. Used by the browser and by build-time pre-rendering. */
export function computeSeo(props, settings, pathname) {
  const { page, title, description, keywords, image, type = "website", noindex = false, fallbackTitle, jsonLd, publishedTime, modifiedTime } = props;
  const pageSeo = (page && settings?.pages?.[page]) || {};
  const siteName = settings?.siteName || "Skiez Technologies";
  const finalTitle = title || pageSeo.title || fallbackTitle || siteName;
  const finalDescription = description || pageSeo.description || settings?.business?.description || "";
  const finalImage = absoluteUrl(settings, image || settings?.defaultOgImage || "/skiez-tech-logo.webp");
  const base = siteBase(settings);
  const canonical = base ? base + (pathname === "/" ? "/" : pathname.replace(/\/+$/, "")) : "";

  return {
    title: finalTitle,
    names: {
      description: finalDescription,
      keywords: keywords || pageSeo.keywords || "",
      robots: noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large",
      "twitter:card": "summary_large_image",
      "twitter:title": finalTitle,
      "twitter:description": finalDescription,
      "twitter:image": finalImage,
    },
    properties: {
      "og:type": type,
      "og:site_name": siteName,
      "og:title": finalTitle,
      "og:description": finalDescription,
      "og:url": canonical,
      "og:image": finalImage,
      "og:locale": "en_IN",
      "article:published_time": publishedTime,
      "article:modified_time": modifiedTime,
    },
    canonical,
    jsonLd: (Array.isArray(jsonLd) ? jsonLd : [jsonLd]).filter(Boolean),
  };
}

/** Serialize computed tags to HTML for the pre-rendered <head>. */
export function headTagsToHtml(seo) {
  if (!seo) return "";
  const out = [`<title>${escapeAttr(seo.title)}</title>`];
  for (const [k, v] of Object.entries(seo.names)) if (v) out.push(`<meta name="${k}" content="${escapeAttr(v)}" />`);
  for (const [k, v] of Object.entries(seo.properties)) if (v) out.push(`<meta property="${k}" content="${escapeAttr(v)}" />`);
  if (seo.canonical) out.push(`<link rel="canonical" href="${escapeAttr(seo.canonical)}" />`);
  for (const schema of seo.jsonLd) out.push(`<script type="application/ld+json" data-seo="jsonld">${safeJson(schema)}</script>`);
  return out.join("\n    ");
}

/**
 * Per-page SEO tags.
 * @param page        key of a page in Admin → SEO (home, services, about, contact, blogs, gallery)
 * @param title/description/keywords/image  explicit values (override page settings)
 * @param fallbackTitle  used when settings haven't loaded / are empty
 * @param jsonLd      object or array of structured-data objects
 */
export function Seo(props) {
  const settings = useSeoSettings();
  const collector = useContext(SeoCollectorContext);
  const { pathname } = useLocation();
  const seo = computeSeo(props, settings, pathname);

  // Build-time pre-rendering: hand the tags to the prerender script (no DOM on the server)
  if (collector) collector.head = seo;

  const key = JSON.stringify(seo);
  useEffect(() => {
    const s = JSON.parse(key);
    document.title = s.title;
    for (const [k, v] of Object.entries(s.names)) upsertTag("meta", "name", k, v ? { content: v } : null);
    for (const [k, v] of Object.entries(s.properties)) upsertTag("meta", "property", k, v ? { content: v } : null);
    upsertTag("link", "rel", "canonical", s.canonical ? { href: s.canonical } : null);

    // Structured data (JSON-LD) for this page — replaced on every route change
    document.head.querySelectorAll('script[data-seo="jsonld"]').forEach((el) => el.remove());
    s.jsonLd.forEach((schema) => {
      const el = document.createElement("script");
      el.type = "application/ld+json";
      el.dataset.seo = "jsonld";
      el.textContent = safeJson(schema);
      document.head.appendChild(el);
    });
  }, [key]);

  return null;
}
