import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Loader2, ArrowRight, CalendarDays } from "lucide-react";
import api from "../lib/api";
import { Seo, useSeoSettings, breadcrumbSchema } from "../lib/seo";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Blogs() {
  const settings = useSeoSettings();
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
    <div className="bg-white min-h-screen text-navy-900 font-sans overflow-x-hidden">
      <Seo page="blogs" fallbackTitle="Blog | Skiez Technologies" jsonLd={breadcrumbSchema(settings, [{ name: "Home", path: "/" }, { name: "Blog", path: "/blogs" }])} />
      <section className="relative py-20 px-6 overflow-hidden flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
           <div className="absolute inset-0 bg-grid" />
           <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[60rem] h-[30rem] rounded-full glow-brand" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="inline-block mb-4"
          >
            <span className="eyebrow">Insights &amp; Updates</span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-gradient-muted font-display !leading-[1.05] !tracking-[-0.035em]"
          >
            Our Blog
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed"
          >
            Thoughts, updates and ideas from the Skiez Technologies team.
          </motion.p>
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto pb-24 relative z-10">
        {loading && (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-10 h-10 animate-spin text-navy-700" />
          </div>
        )}

        {!loading && error && (
          <p className="text-center text-slate-600 py-16">{error}</p>
        )}

        {!loading && !error && blogs.length === 0 && (
          <p className="text-center text-slate-600 py-16">No blog posts yet. Check back soon.</p>
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
                  className="group flex flex-col h-full surface surface-hover rounded-3xl overflow-hidden hover:border-navy-300 transition-colors duration-300"
                >
                  <div className="aspect-[16/9] bg-slate-100 overflow-hidden">
                    {blog.coverImage ? (
                      <img
                        loading="lazy"
                        decoding="async"
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

                    <h2 className="text-xl font-bold text-navy-900 mb-2 group-hover:text-navy-900 transition-colors">
                      {blog.title}
                    </h2>

                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-3 mb-6">
                      {blog.excerpt}
                    </p>

                    <div className="mt-auto flex items-center gap-2 text-navy-700 text-sm font-semibold">
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
