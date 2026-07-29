import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Loader2, Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import api from "../../lib/api";
import AdminNav from "../../components/admin/AdminNav";

export default function AdminDashboard() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const loadBlogs = () => {
    setLoading(true);
    api
      .get("/admin/blogs")
      .then((res) => setBlogs(res.data))
      .catch(() => toast.error("Couldn't load blogs"))
      .finally(() => setLoading(false));
  };

  useEffect(loadBlogs, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this blog post? This can't be undone.")) return;

    setDeletingId(id);
    try {
      await api.delete(`/admin/blogs/${id}`);
      setBlogs((prev) => prev.filter((b) => b._id !== id));
      toast.success("Blog deleted");
    } catch (err) {
      toast.error(err.response?.data?.message || "Couldn't delete blog");
    } finally {
      setDeletingId(null);
    }
  };

  return (
    <div className="bg-slate-900 min-h-screen text-slate-100 px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <AdminNav />

        <div className="flex items-center justify-between gap-4 mb-6">
          <h1 className="text-2xl font-bold text-white">Blog Posts</h1>
          <Link
            to="/admin/blogs/new"
            className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-2xl transition-all"
          >
            <Plus className="w-4 h-4" />
            New Post
          </Link>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-10 h-10 animate-spin text-cyan-500" />
          </div>
        )}

        {!loading && blogs.length === 0 && (
          <p className="text-center text-slate-400 py-16">
            No blog posts yet. Create your first one.
          </p>
        )}

        {!loading && blogs.length > 0 && (
          <div className="bg-slate-800/40 border border-slate-700 rounded-3xl overflow-hidden">
            {blogs.map((blog) => (
              <div
                key={blog._id}
                className="flex flex-wrap items-center justify-between gap-4 px-6 py-5 border-b border-slate-800 last:border-b-0"
              >
                <div className="flex items-center gap-4 min-w-0">
                  <div className="w-16 h-16 rounded-xl bg-slate-900 border border-slate-700 overflow-hidden flex-shrink-0">
                    {blog.coverImage ? (
                      <img src={blog.coverImage} alt="" className="w-full h-full object-cover" />
                    ) : null}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-white truncate">{blog.title}</p>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                      {blog.published ? (
                        <span className="inline-flex items-center gap-1 text-green-400">
                          <Eye className="w-3 h-3" /> Published
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-slate-500">
                          <EyeOff className="w-3 h-3" /> Draft
                        </span>
                      )}
                      <span>&bull;</span>
                      {new Date(blog.createdAt).toLocaleDateString("en-IN")}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link
                    to={`/admin/blogs/edit/${blog._id}`}
                    className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                  >
                    <Pencil className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(blog._id)}
                    disabled={deletingId === blog._id}
                    className="p-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-red-400 hover:border-red-500/40 transition-colors disabled:opacity-50"
                  >
                    {deletingId === blog._id ? (
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
