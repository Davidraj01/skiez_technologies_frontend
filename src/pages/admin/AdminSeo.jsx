import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import {
  Loader2, Globe, FileText, Building2, Bot, Save, ExternalLink, AlertTriangle, CheckCircle2,
} from "lucide-react";
import api from "../../lib/api";
import AdminNav from "../../components/admin/AdminNav";
import { CharField, GooglePreview, inputClass } from "../../components/admin/SeoFields";
import { TITLE_RANGE, DESC_RANGE } from "../../lib/seoScore";

const PAGES = [
  { key: "home", label: "Home", path: "/" },
  { key: "services", label: "Services", path: "/services" },
  { key: "about", label: "About", path: "/about" },
  { key: "contact", label: "Contact", path: "/contact" },
  { key: "blogs", label: "Blog", path: "/blogs" },
  { key: "gallery", label: "Gallery", path: "/gallery" },
];

// Where the crawler files are served by the API (proxy them on the live domain; see README note)
const apiRoot = (api.defaults.baseURL || "").replace(/\/api\/?$/, "");

const Card = ({ icon: Icon, title, subtitle, children }) => (
  <section className="bg-slate-800/30 border border-slate-700 rounded-3xl p-6 md:p-7 space-y-5">
    <div>
      <h2 className="flex items-center gap-2 text-lg font-bold text-white">
        <Icon className="w-5 h-5 text-cyan-400" /> {title}
      </h2>
      {subtitle && <p className="text-sm text-slate-400 mt-1">{subtitle}</p>}
    </div>
    {children}
  </section>
);

const Field = ({ label, hint, ...props }) => (
  <div className="space-y-2">
    <label className="text-sm font-medium text-slate-300 ml-1">{label}</label>
    <input {...props} className={inputClass} />
    {hint && <p className="text-xs text-slate-500 ml-1">{hint}</p>}
  </div>
);

const lines = (arr) => (arr || []).join("\n");
const toList = (text) => text.split("\n").map((s) => s.trim()).filter(Boolean);

export default function AdminSeo() {
  const [s, setS] = useState(null);
  const [activePage, setActivePage] = useState("home");
  const [saving, setSaving] = useState(false);
  // multi-line text areas are edited as text, converted to arrays on save
  const [servicesText, setServicesText] = useState("");
  const [sameAsText, setSameAsText] = useState("");

  useEffect(() => {
    api
      .get("/admin/seo/settings")
      .then((res) => {
        setS(res.data);
        setServicesText(lines(res.data.business?.services));
        setSameAsText(lines(res.data.business?.sameAs));
      })
      .catch(() => toast.error("Couldn't load SEO settings"));
  }, []);

  const setTop = (k, v) => setS((p) => ({ ...p, [k]: v }));
  const setBiz = (k, v) => setS((p) => ({ ...p, business: { ...p.business, [k]: v } }));
  const setPage = (page, k, v) =>
    setS((p) => ({ ...p, pages: { ...p.pages, [page]: { ...p.pages[page], [k]: v } } }));

  const save = async () => {
    setSaving(true);
    try {
      const payload = {
        ...s,
        business: { ...s.business, services: toList(servicesText), sameAs: toList(sameAsText) },
      };
      const res = await api.put("/admin/seo/settings", payload);
      setS(res.data);
      toast.success("SEO settings saved");
    } catch (err) {
      toast.error(err.response?.data?.message || "Couldn't save settings");
    } finally {
      setSaving(false);
    }
  };

  if (!s) {
    return (
      <div className="bg-slate-900 min-h-screen text-slate-100 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <AdminNav />
          <div className="flex justify-center py-24">
            <Loader2 className="w-10 h-10 animate-spin text-cyan-500" />
          </div>
        </div>
      </div>
    );
  }

  const page = s.pages[activePage];
  const pageMeta = PAGES.find((p) => p.key === activePage);

  return (
    <div className="bg-slate-900 min-h-screen text-slate-100 px-4 md:px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <AdminNav />

        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">SEO, AEO &amp; GEO</h1>
            <p className="text-sm text-slate-400 mt-1">
              Control how Skiez Technologies appears on Google, in social shares and in AI assistants.
            </p>
          </div>
          <button
            onClick={save}
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-2xl transition-all disabled:opacity-70"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save changes
          </button>
        </div>

        {!s.siteUrl && (
          <div className="mb-8 flex items-start gap-3 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-200">
            <AlertTriangle className="w-5 h-5 shrink-0 text-amber-400" />
            <p>
              <b>Add your website address</b> below. It's needed for the sitemap, canonical links and AI
              summaries. Until then, sitemap.xml is switched off.
            </p>
          </div>
        )}

        <div className="space-y-8">
          {/* ---------- Basics ---------- */}
          <Card icon={Globe} title="Website basics">
            <div className="grid gap-5 md:grid-cols-2">
              <Field
                label="Website address"
                value={s.siteUrl}
                onChange={(e) => setTop("siteUrl", e.target.value)}
                placeholder="https://www.yourdomain.com"
                hint="Your live domain, starting with https://"
              />
              <Field label="Site name" value={s.siteName} onChange={(e) => setTop("siteName", e.target.value)} />
            </div>
            <Field
              label="Default social share image (URL)"
              value={s.defaultOgImage}
              onChange={(e) => setTop("defaultOgImage", e.target.value)}
              placeholder="https://… (1200 × 630 px works best)"
              hint="Shown when a page is shared on WhatsApp, LinkedIn or Facebook. Blog posts use their cover image."
            />
          </Card>

          {/* ---------- Page SEO ---------- */}
          <Card
            icon={FileText}
            title="Page titles & descriptions"
            subtitle="What Google shows for each main page. Blog posts are edited in the post editor."
          >
            <div className="flex flex-wrap gap-2">
              {PAGES.map((p) => (
                <button
                  key={p.key}
                  type="button"
                  onClick={() => setActivePage(p.key)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
                    activePage === p.key
                      ? "bg-cyan-600 text-white"
                      : "bg-slate-900/60 border border-slate-700 text-slate-400 hover:text-white"
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
              <div className="space-y-5 min-w-0">
                <CharField
                  label="SEO title"
                  value={page.title}
                  onChange={(e) => setPage(activePage, "title", e.target.value)}
                  range={TITLE_RANGE}
                />
                <CharField
                  label="Meta description"
                  value={page.description}
                  onChange={(e) => setPage(activePage, "description", e.target.value)}
                  range={DESC_RANGE}
                  textarea
                />
                <Field
                  label="Keywords (optional)"
                  value={page.keywords}
                  onChange={(e) => setPage(activePage, "keywords", e.target.value)}
                  placeholder="comma, separated"
                  hint="Google ignores this tag, but it helps you stay focused when writing titles."
                />
              </div>
              <GooglePreview siteUrl={s.siteUrl} path={pageMeta.path} title={page.title} description={page.description} />
            </div>
          </Card>

          {/* ---------- Business profile (GEO entity) ---------- */}
          <Card
            icon={Building2}
            title="Business profile"
            subtitle="Tells Google and AI engines exactly who you are. Keep it identical to your Google Business Profile."
          >
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Legal name" value={s.business.legalName} onChange={(e) => setBiz("legalName", e.target.value)} />
              <Field label="Founder" value={s.business.founder} onChange={(e) => setBiz("founder", e.target.value)} />
              <Field label="Founded (year)" value={s.business.foundingYear} onChange={(e) => setBiz("foundingYear", e.target.value)} />
              <Field label="Area served" value={s.business.areaServed} onChange={(e) => setBiz("areaServed", e.target.value)} placeholder="India" />
              <Field label="Phone" value={s.business.phone} onChange={(e) => setBiz("phone", e.target.value)} />
              <Field label="Email" type="email" value={s.business.email} onChange={(e) => setBiz("email", e.target.value)} />
              <Field label="Street address" value={s.business.streetAddress} onChange={(e) => setBiz("streetAddress", e.target.value)} />
              <Field label="City" value={s.business.city} onChange={(e) => setBiz("city", e.target.value)} />
              <Field label="State" value={s.business.region} onChange={(e) => setBiz("region", e.target.value)} />
              <Field label="PIN code" value={s.business.postalCode} onChange={(e) => setBiz("postalCode", e.target.value)} />
            </div>
            <CharField
              label="Short description"
              value={s.business.description}
              onChange={(e) => setBiz("description", e.target.value)}
              textarea
            />
            <div className="grid gap-5 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Services (one per line)</label>
                <textarea rows={7} value={servicesText} onChange={(e) => setServicesText(e.target.value)} className={`${inputClass} resize-none`} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Official profiles (one URL per line)</label>
                <textarea rows={7} value={sameAsText} onChange={(e) => setSameAsText(e.target.value)} className={`${inputClass} resize-none`}
                  placeholder="https://www.linkedin.com/company/…" />
                <p className="text-xs text-slate-500 ml-1">LinkedIn, Instagram, Facebook, Google Business Profile, Clutch, JustDial…</p>
              </div>
            </div>
          </Card>

          {/* ---------- AI search ---------- */}
          <Card
            icon={Bot}
            title="AI search (GEO)"
            subtitle="Make it easy for ChatGPT, Gemini, Claude and Perplexity to read, understand and recommend Skiez."
          >
            <label className="flex items-start gap-3 text-sm text-slate-300">
              <input
                type="checkbox"
                checked={s.allowAiCrawlers}
                onChange={(e) => setTop("allowAiCrawlers", e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded accent-cyan-500"
              />
              <span>
                <span className="font-medium">Allow AI crawlers</span>
                <span className="block text-xs text-slate-500">
                  Lets GPTBot, ClaudeBot, PerplexityBot, Google-Extended and others read the site. Turn off only if you
                  don't want to appear in AI answers.
                </span>
              </span>
            </label>

            <CharField
              label="AI summary (top of llms.txt)"
              hint="One or two factual sentences: who you are, where you are, what you do. AI assistants often reuse this wording."
              value={s.llmsIntro}
              onChange={(e) => setTop("llmsIntro", e.target.value)}
              textarea
              rows={3}
            />

            <div className="flex flex-wrap gap-3">
              {[
                ["sitemap.xml", "List of pages for Google"],
                ["robots.txt", "Crawler rules"],
                ["llms.txt", "Summary for AI assistants"],
              ].map(([file, desc]) => (
                <a
                  key={file}
                  href={`${apiRoot}/${file}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 rounded-xl border border-slate-700 bg-slate-900/50 px-4 py-3 hover:border-cyan-500/40"
                >
                  <div>
                    <p className="text-sm font-semibold text-white">{file}</p>
                    <p className="text-xs text-slate-500">{desc}</p>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-cyan-400" />
                </a>
              ))}
            </div>
          </Card>

          {/* ---------- Checklist ---------- */}
          <Card icon={CheckCircle2} title="Do these once (outside this website)">
            <ol className="list-decimal space-y-2 pl-5 text-sm text-slate-300">
              <li>Add the site to <b>Google Search Console</b> and submit <code className="text-cyan-300">/sitemap.xml</code>.</li>
              <li>Add the site to <b>Bing Webmaster Tools</b>. ChatGPT search and Copilot use Bing's index.</li>
              <li>Create or complete your <b>Google Business Profile</b> with the same name, phone and address as above.</li>
              <li>Publish posts that answer real customer questions, each with key takeaways and FAQs.</li>
              <li>Get listed on trusted directories (Clutch, GoodFirms, JustDial) and add them under “Official profiles”.</li>
            </ol>
          </Card>
        </div>
      </div>
    </div>
  );
}
