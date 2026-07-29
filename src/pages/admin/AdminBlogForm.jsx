import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Loader2, ArrowLeft, ImagePlus } from "lucide-react";
import api from "../../lib/api";

const emptyForm = {
  title: "",
  excerpt: "",
  content: "",
  tags: "",
  published: true,
};

export default function AdminBlogForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

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
        });
        setCoverPreview(blog.coverImage || "");
      })
      .catch(() => toast.error("Couldn't load blog"))
      .finally(() => setLoading(false));
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
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

  return (
    <div className="bg-slate-900 min-h-screen text-slate-100 px-6 py-12">
      <div className="max-w-3xl mx-auto">
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

        <form onSubmit={handleSubmit} className="space-y-6">
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
            <input
              name="title"
              required
              value={form.title}
              onChange={handleChange}
              className="w-full px-5 py-3 rounded-2xl bg-slate-900/50 border border-slate-700 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
            />
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
              className="w-full px-5 py-3 rounded-2xl bg-slate-900/50 border border-slate-700 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none"
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
              className="w-full px-5 py-3 rounded-2xl bg-slate-900/50 border border-slate-700 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300 ml-1">Tags</label>
            <input
              name="tags"
              value={form.tags}
              onChange={handleChange}
              placeholder="comma, separated, tags"
              className="w-full px-5 py-3 rounded-2xl bg-slate-900/50 border border-slate-700 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
            />
          </div>

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
            className="w-full py-4 mt-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold rounded-2xl transition-all flex items-center justify-center gap-2 disabled:opacity-70"
          >
            {saving && <Loader2 className="w-5 h-5 animate-spin" />}
            {saving ? "Saving..." : isEdit ? "Save Changes" : "Publish Post"}
          </button>
        </form>
      </div>
    </div>
  );
}
