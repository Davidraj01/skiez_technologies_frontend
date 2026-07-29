import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Loader2, ImagePlus, Trash2 } from "lucide-react";
import api from "../../lib/api";
import AdminNav from "../../components/admin/AdminNav";

export default function AdminGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [saving, setSaving] = useState(false);

  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");

  const loadImages = () => {
    setLoading(true);
    api
      .get("/admin/gallery")
      .then((res) => setImages(res.data))
      .catch(() => toast.error("Couldn't load gallery"))
      .finally(() => setLoading(false));
  };

  useEffect(loadImages, []);

  const handleFile = (e) => {
    const selected = e.target.files?.[0];
    if (!selected) return;
    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const resetForm = () => {
    setTitle("");
    setCaption("");
    setFile(null);
    setPreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      toast.error("Please choose an image");
      return;
    }

    const data = new FormData();
    data.append("title", title);
    data.append("caption", caption);
    data.append("image", file);

    setSaving(true);
    try {
      const res = await api.post("/admin/gallery", data);
      setImages((prev) => [res.data, ...prev]);
      resetForm();
      toast.success("Image added");
    } catch (err) {
      toast.error(err.response?.data?.message || "Couldn't add image");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this image? This can't be undone.")) return;

    setDeletingId(id);
    try {
      await api.delete(`/admin/gallery/${id}`);
      setImages((prev) => prev.filter((img) => img._id !== id));
      toast.success("Image deleted");
    } catch (err) {
      toast.error(err.response?.data?.message || "Couldn't delete image");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen text-slate-100 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <AdminNav />

        <h1 className="text-2xl font-bold text-white mb-6">Gallery</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-slate-800/40 border border-slate-700 rounded-3xl p-6 mb-10 grid md:grid-cols-[200px_1fr] gap-6"
        >
          <label className="flex items-center justify-center h-40 md:h-full rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 cursor-pointer hover:border-cyan-500/40 transition-colors overflow-hidden">
            {preview ? (
              <img src={preview} alt="" className="w-full h-full object-cover" />
            ) : (
              <span className="flex flex-col items-center gap-2 text-slate-500 text-sm">
                <ImagePlus className="w-7 h-7" />
                Choose image
              </span>
            )}
            <input type="file" accept="image/*" onChange={handleFile} className="hidden" />
          </label>

          <div className="space-y-4">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              placeholder="Title"
              className="w-full px-5 py-3 rounded-2xl bg-slate-900/50 border border-slate-700 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
            />
            <input
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Caption (optional)"
              className="w-full px-5 py-3 rounded-2xl bg-slate-900/50 border border-slate-700 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
            />
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-2xl transition-all disabled:opacity-70"
            >
              {saving && <Loader2 className="w-4 h-4 animate-spin" />}
              {saving ? "Uploading..." : "Add Image"}
            </button>
          </div>
        </form>

        {loading && (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-10 h-10 animate-spin text-cyan-500" />
          </div>
        )}

        {!loading && images.length === 0 && (
          <p className="text-center text-slate-400 py-16">No images yet. Add your first one above.</p>
        )}

        {!loading && images.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {images.map((img) => (
              <div
                key={img._id}
                className="bg-slate-800/40 border border-slate-700 rounded-2xl overflow-hidden group"
              >
                <div className="aspect-square bg-slate-900 overflow-hidden">
                  <img src={img.imageUrl} alt={img.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-4 flex items-center justify-between gap-2">
                  <p className="font-medium text-white truncate">{img.title}</p>
                  <button
                    onClick={() => handleDelete(img._id)}
                    disabled={deletingId === img._id}
                    className="p-2 rounded-lg bg-slate-900 border border-slate-700 text-slate-300 hover:text-red-400 hover:border-red-500/40 transition-colors disabled:opacity-50 flex-shrink-0"
                  >
                    {deletingId === img._id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
