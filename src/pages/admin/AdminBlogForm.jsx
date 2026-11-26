import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Loader2, ArrowLeft, ImagePlus, Search, Sparkles, EyeOff } from "lucide-react";
import api from "../../lib/api";
import { analyzeSeo, TITLE_RANGE, DESC_RANGE } from "../../lib/seoScore";
import { useSeoSettings } from "../../lib/seo";
import {
  CharField,
  GooglePreview,
  SeoScorePanel,
  TakeawaysEditor,
  FaqEditor,
  inputClass,
} from "../../components/admin/SeoFields";

const emptyForm = {
  title: "",
  excerpt: "",
  content: "",
  tags: "",
  published: true,
  // SEO
  slug: "",
  metaTitle: "",
  metaDescription: "",
  focusKeyword: "",
  noindex: false,
  // AEO / GEO
  keyTakeaways: ["", "", ""],
  faqs: [{ question: "", answer: "" }],
};

const Section = ({ icon: Icon, title, subtitle, children }) => (
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

export default function AdminBlogForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const settings = useSeoSettings();

  const [form, setForm] = useState(emptyForm);
  const [coverFile, setCoverFile] = useState(null);
  const [coverPreview, setCoverPreview] = useState("");
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!isEdit) return;

    api
      .get(`/admin/blogs/${id}`)
      .then((res) => {
        const blog = res.data;
        setForm({
          title: blog.title,
          excerpt: blog.excerpt,
          content: blog.content,
          tags: (blog.tags || []).join(", "),
          published: blog.published,
          slug: blog.slug || "",
          metaTitle: blog.seo?.metaTitle || "",
          metaDescription: blog.seo?.metaDescription || "",
          focusKeyword: blog.seo?.focusKeyword || "",
          noindex: Boolean(blog.seo?.noindex),
          keyTakeaways: blog.keyTakeaways?.length ? blog.keyTakeaways : ["", "", ""],
          faqs: blog.faqs?.length ? blog.faqs : [{ question: "", answer: "" }],
        });
        setCoverPreview(blog.coverImage || "");
      })
      .catch(() => toast.error("Couldn't load blog"))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const analysis = useMemo(
    () => analyzeSeo({ ...form, hasImage: Boolean(coverPreview) }),
    [form, coverPreview]
  );

  const set = (name, value) => setForm((prev) => ({ ...prev, [name]: value }));

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    set(name, type === "checkbox" ? checked : value);
  };

  const handleFile = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCoverFile(file);
    setCoverPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);

    const data = new FormData();
    data.append("title", form.title);
    data.append("excerpt", form.excerpt);
    data.append("content", form.content);
    data.append("tags", form.tags);
    data.append("published", form.published);
    if (form.slug.trim()) data.append("slug", form.slug.trim());
    data.append(
      "seo",
      JSON.stringify({
        metaTitle: form.metaTitle,
        metaDescription: form.metaDescription,
        focusKeyword: form.focusKeyword,
        noindex: form.noindex,
      })
    );
    data.append("keyTakeaways", JSON.stringify(form.keyTakeaways.filter((t) => t.trim())));
    data.append("faqs", JSON.stringify(form.faqs.filter((f) => f.question.trim() && f.answer.trim())));
    if (coverFile) data.append("coverImage", coverFile);

    try {
      if (isEdit) {
        await api.put(`/admin/blogs/${id}`, data);
        toast.success("Blog updated");
      } else {
        await api.post("/admin/blogs", data);
        toast.success("Blog published");
      }
      navigate("/admin");
    } catch (err) {
      toast.error(err.response?.data?.message || "Couldn't save blog");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-slate-900 min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-cyan-500" />
      </div>
    );
  }

  const effectiveTitle = form.metaTitle || (form.title ? `${form.title} | Skiez Technologies` : "");
  const effectiveDesc = form.metaDescription || form.excerpt;

  return (
    <div className="bg-slate-900 min-h-screen text-slate-100 px-4 md:px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <Link
          to="/admin"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to dashboard
        </Link>

        <h1 className="text-3xl font-bold text-white mb-8">
          {isEdit ? "Edit Post" : "New Post"}
        </h1>

        <form onSubmit={handleSubmit} className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          {/* ---------------- Main column ---------------- */}
          <div className="space-y-8 min-w-0">
            <Section icon={ImagePlus} title="Post">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Cover Image</label>
                <label className="flex items-center justify-center gap-3 h-48 rounded-2xl border border-dashed border-slate-700 bg-slate-800/30 cursor-pointer hover:border-cyan-500/40 transition-colors overflow-hidden">
                  {coverPreview ? (
                    <img src={coverPreview} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <span className="flex flex-col items-center gap-2 text-slate-500">
                      <ImagePlus className="w-8 h-8" />
                      Click to upload
                    </span>
                  )}
                  <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
                </label>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Title</label>
                <input name="title" required value={form.title} onChange={handleChange} className={inputClass} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Excerpt</label>
                <textarea
                  name="excerpt"
                  required
                  rows={2}
                  value={form.excerpt}
                  onChange={handleChange}
                  placeholder="A short summary shown on the blog list"
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Content</label>
                <textarea
                  name="content"
                  required
                  rows={14}
                  value={form.content}
                  onChange={handleChange}
                  placeholder="Write the full post here"
                  className={`${inputClass} resize-y`}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Tags</label>
                <input
                  name="tags"
                  value={form.tags}
                  onChange={handleChange}
                  placeholder="comma, separated, tags"
                  className={inputClass}
                />
              </div>
            </Section>

            <Section
              icon={Search}
              title="SEO: how this post appears on Google"
              subtitle="Leave the SEO title or description empty to use the post title / excerpt."
            >
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Focus keyword</label>
                <input
                  name="focusKeyword"
                  value={form.focusKeyword}
                  onChange={handleChange}
                  placeholder="e.g. website development in Chennai"
                  className={inputClass}
                />
                <p className="text-xs text-slate-500 ml-1">The main phrase you want this post to rank for.</p>
              </div>

              <CharField
                label="SEO title"
                name="metaTitle"
                value={form.metaTitle}
                onChange={handleChange}
                range={TITLE_RANGE}
                placeholder={effectiveTitle || "Shown as the blue link in Google"}
              />

              <CharField
                label="Meta description"
                name="metaDescription"
                value={form.metaDescription}
                onChange={handleChange}
                range={DESC_RANGE}
                textarea
                placeholder={form.excerpt || "The grey text under the link in Google"}
              />

              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-300 ml-1">Web address (slug)</label>
                <div className="flex items-center rounded-xl border border-slate-700 bg-slate-900/50 focus-within:border-cyan-500 focus-within:ring-1 focus-within:ring-cyan-500">
                  <span className="pl-4 text-sm text-slate-500 whitespace-nowrap">/blogs/</span>
                  <input
                    name="slug"
                    value={form.slug}
                    onChange={handleChange}
                    placeholder={analysis.slug || "auto-from-title"}
                    className="w-full bg-transparent px-1 py-3 pr-4 text-white placeholder:text-slate-600 focus:outline-none"
                  />
                </div>
                <p className="text-xs text-slate-500 ml-1">
                  {isEdit
                    ? "Changing this on a live post breaks existing links. Only change it if you must."
                    : "Optional. Created from the title if left empty."}
                </p>
              </div>

              <label className="flex items-start gap-3 text-sm text-slate-300">
                <input
                  type="checkbox"
                  name="noindex"
                  checked={form.noindex}
                  onChange={handleChange}
                  className="mt-0.5 w-4 h-4 rounded accent-cyan-500"
                />
                <span>
                  <span className="inline-flex items-center gap-1.5 font-medium">
                    <EyeOff className="w-4 h-4" /> Hide from Google
                  </span>
                  <span className="block text-xs text-slate-500">
                    The post stays on the website but search engines won't list it.
                  </span>
                </span>
              </label>
            </Section>

            <Section
              icon={Sparkles}
              title="AEO / GEO: get quoted by Google & AI assistants"
              subtitle="Shown on the post and marked up so Google “People also ask”, ChatGPT, Gemini and Perplexity can use them as answers."
            >
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-300 ml-1">Key takeaways</p>
                <TakeawaysEditor items={form.keyTakeaways} onChange={(v) => set("keyTakeaways", v)} />
              </div>
              <div className="space-y-2">
                <p className="text-sm font-medium text-slate-300 ml-1">Frequently asked questions</p>
                <FaqEditor items={form.faqs} onChange={(v) => set("faqs", v)} />
              </div>
            </Section>

            <label className="flex items-center gap-3 text-sm text-slate-300">
              <input
                type="checkbox"
                name="published"
                checked={form.published}
                onChange={handleChange}
                className="w-4 h-4 rounded accent-cyan-500"
              />
              Published (visible on the public blog)
            </label>

            <button
              type="submit"
              disabled={saving}
              className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {saving && <Loader2 className="w-5 h-5 animate-spin" />}
              {saving ? "Saving..." : isEdit ? "Save Changes" : "Publish Post"}
            </button>
          </div>

          {/* ---------------- Sidebar: live score + preview ---------------- */}
          <aside className="space-y-5 lg:sticky lg:top-6 lg:self-start">
            <GooglePreview
              siteUrl={settings?.siteUrl}
              path={`/blogs/${form.slug.trim() || analysis.slug}`}
              title={effectiveTitle}
              description={effectiveDesc}
            />
            <SeoScorePanel analysis={analysis} />
          </aside>
        </form>
      </div>
    </div>
  );
}
