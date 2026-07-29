import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, ArrowRight, CalendarDays } from "lucide-react";
import api from "../lib/api";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/blogs")
      .then((res) => setBlogs(res.data))
      .catch(() => setError("Couldn't load blogs right now. Please try again later."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-slate-900 min-h-screen text-slate-100 font-sans overflow-x-hidden selection:bg-cyan-500/30">
      <section className="relative py-20 px-6 overflow-hidden flex flex-col items-center justify-center text-center">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-cyan-500/10 rounded-full blur-[120px]" />
          <div className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="inline-block mb-4 px-4 py-1.5 rounded-full border border-slate-700 bg-slate-800/50 backdrop-blur-sm"
          >
            <span className="text-sm font-medium text-cyan-400">Insights &amp; Updates</span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent"
          >
            Our Blog
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            Thoughts, updates and ideas from the Skiez Technologies team.
          </motion.p>
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto pb-24 relative z-10">
        {loading && (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-10 h-10 animate-spin text-cyan-500" />
          </div>
        )}

        {!loading && error && (
          <p className="text-center text-slate-400 py-16">{error}</p>
        )}

        {!loading && !error && blogs.length === 0 && (
          <p className="text-center text-slate-400 py-16">No blog posts yet. Check back soon.</p>
        )}

        {!loading && !error && blogs.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog, i) => (
              <motion.div
                key={blog._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 3) * 0.1 }}
              >
                <Link
                  to={`/blogs/${blog.slug}`}
                  className="group flex flex-col h-full bg-slate-800/40 border border-slate-700 rounded-3xl overflow-hidden hover:border-cyan-500/40 transition-colors duration-300"
                >
                  <div className="aspect-[16/9] bg-slate-800 overflow-hidden">
                    {blog.coverImage ? (
                      <img
                        src={blog.coverImage}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-600">
                        No image
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col flex-1 p-6">
                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                      <CalendarDays className="w-4 h-4" />
                      {new Date(blog.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </div>

                    <h2 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {blog.title}
                    </h2>

                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-3 mb-6">
                      {blog.excerpt}
                    </p>

                    <div className="mt-auto flex items-center gap-2 text-cyan-400 text-sm font-semibold">
                      Read more
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
