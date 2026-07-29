import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, CalendarDays, ArrowLeft } from "lucide-react";
import api from "../lib/api";

export default function BlogDetail() {
  const { slug } = useParams();
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
      <div className="bg-slate-900 min-h-screen flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-cyan-500" />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="bg-slate-900 min-h-screen flex flex-col items-center justify-center gap-4 text-slate-100">
        <p className="text-slate-400">{error}</p>
        <Link to="/blogs" className="text-cyan-400 hover:underline">
          Back to blog
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-900 min-h-screen text-slate-100 font-sans overflow-x-hidden selection:bg-cyan-500/30">
      <article className="max-w-3xl mx-auto px-6 py-16">
        <Link
          to="/blogs"
          className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors mb-8"
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
            {new Date(blog.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
            <span className="text-slate-700">&bull;</span>
            {blog.author}
          </div>

          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-8 text-white">
            {blog.title}
          </h1>

          {blog.coverImage && (
            <div className="rounded-3xl overflow-hidden border border-slate-700 mb-10">
              <img src={blog.coverImage} alt={blog.title} className="w-full h-auto" />
            </div>
          )}

          <div className="text-slate-300 text-lg leading-relaxed whitespace-pre-wrap">
            {blog.content}
          </div>

          {blog.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-slate-800">
              {blog.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-slate-800/60 border border-slate-700 text-xs text-slate-400"
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
