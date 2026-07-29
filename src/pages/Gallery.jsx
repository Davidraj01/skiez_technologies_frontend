import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, X } from "lucide-react";
import api from "../lib/api";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [active, setActive] = useState(null);

  useEffect(() => {
    api
      .get("/gallery")
      .then((res) => setImages(res.data))
      .catch(() => setError("Couldn't load the gallery right now. Please try again later."))
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
            <span className="text-sm font-medium text-cyan-400">A Look Inside</span>
          </motion.div>

          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-white via-slate-200 to-slate-500 bg-clip-text text-transparent"
          >
            Gallery
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed"
          >
            Moments and work from Skiez Technologies.
          </motion.p>
        </div>
      </section>

      <section className="px-6 max-w-7xl mx-auto pb-24 relative z-10">
        {loading && (
          <div className="flex items-center justify-center py-24">
            <Loader2 className="w-10 h-10 animate-spin text-cyan-500" />
          </div>
        )}

        {!loading && error && <p className="text-center text-slate-400 py-16">{error}</p>}

        {!loading && !error && images.length === 0 && (
          <p className="text-center text-slate-400 py-16">No images yet. Check back soon.</p>
        )}

        {!loading && !error && images.length > 0 && (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {images.map((img, i) => (
              <motion.button
                key={img._id}
                type="button"
                onClick={() => setActive(img)}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (i % 6) * 0.08 }}
                className="group block w-full break-inside-avoid rounded-3xl overflow-hidden border border-slate-700 hover:border-cyan-500/40 transition-colors duration-300"
              >
                <img
                  src={img.imageUrl}
                  alt={img.title}
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                />
                <div className="p-4 bg-slate-800/40 text-left">
                  <p className="font-semibold text-white">{img.title}</p>
                  {img.caption && (
                    <p className="text-sm text-slate-400 mt-1 line-clamp-2">{img.caption}</p>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        )}
      </section>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
          >
            <button
              onClick={() => setActive(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-slate-800/80 text-white hover:bg-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
              className="max-w-4xl w-full"
            >
              <img
                src={active.imageUrl}
                alt={active.title}
                className="w-full h-auto rounded-2xl border border-slate-700"
              />
              <div className="mt-4 text-center">
                <p className="text-xl font-bold text-white">{active.title}</p>
                {active.caption && <p className="text-slate-400 mt-1">{active.caption}</p>}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
