"use client";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight, Maximize2 } from "lucide-react";
import ShapeGrid from "./ShapeGrid";

/**
 * Home hero + "Our Works" portfolio.
 * Every project is shown exactly once, in a responsive grid, fully visible on every screen.
 * Cards open an on-site preview (never the client's website).
 */
export const HeroParallax = ({ products }) => {
  const [active, setActive] = useState(null);

  return (
    <>
      <Header />

      <section aria-labelledby="our-works" className="relative mx-auto max-w-7xl px-4 pb-24 md:px-8 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-12 flex flex-col items-center text-center md:mb-14"
        >
          <span className="eyebrow">Portfolio</span>
          <h2 id="our-works" className="mt-5 font-display text-4xl font-bold tracking-tight text-navy-900 md:text-5xl">
            Our Works
          </h2>
        </motion.div>

        {/* Centered wrap: an odd last card sits in the middle instead of hanging left */}
        <ul className="flex flex-wrap justify-center gap-6 lg:gap-8">
          {products.map((product, i) => (
            <motion.li
              key={product.title}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-22px)]"
            >
              <ProductCard product={product} onOpen={() => setActive(product)} />
            </motion.li>
          ))}
        </ul>
      </section>

      <WorkPreview product={active} onClose={() => setActive(null)} />
    </>
  );
};

export const Header = () => {
  return (
    <div className="isolate max-w-7xl relative mx-auto pt-16 pb-20 md:pt-28 md:pb-28 px-4 md:px-8 w-full">
      {/* Interactive Shape Grid backdrop (React Bits): full-width, lights up in the Skiez logo
          blue wherever the cursor moves (kept subtle). Listens on window, so it reacts under the text too. */}
      <div className="pointer-events-none absolute -top-28 bottom-0 left-1/2 -z-10 w-screen -translate-x-1/2 md:-top-32">
        <ShapeGrid
          shape="square"
          cellSize={48}
          lineWidth={1}
          direction="diagonal"
          speed={0.2}
          lineColor="#e6eff9"
          hoverColor="#7db9ee"
          hoverFillColor="#29abe2"
          fillOpacity={0.06}
          radius={0.9}
          trail={0.45}
          glow={0.08}
          clickCascade={false}
          intro={false}
          fade={1}
          opacity={0.9}
          backgroundColor="#ffffff"
        />
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.025em] text-navy-900 sm:text-5xl md:text-7xl lg:text-[5.25rem]"
      >
        Elevate with Code <br />
        <span className="text-gradient">Dominate with Reach</span>
      </motion.h1>
      <div className="mt-8 h-1 w-20 rounded-full bg-navy-900 md:mt-10" />
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15 }}
        className="max-w-2xl text-base md:text-lg mt-6 md:mt-8 leading-relaxed text-slate-600"
      >
        At Skiez Technologies India Pvt Ltd, we build scalable tech-driven
        solutions across Full-Stack Development, Mobile App Frameworks and
        Database Management. We serve industries like E-Commerce, Healthcare,
        Education, Real Estate and B2B, delivering customized digital products
        that meet each business’s unique needs.
      </motion.p>
    </div>
  );
};

export const ProductCard = ({ product, onOpen }) => {
  return (
    <div className="group/product relative h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_24px_50px_-30px_rgba(11,31,58,0.35)] transition-all duration-500 hover:-translate-y-1.5 hover:border-navy-300 hover:shadow-[0_32px_60px_-28px_rgba(11,31,58,0.45)]">
      {/* Opens an on-site preview — never navigates to the client's website */}
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Preview ${product.title}`}
        className="flex h-full w-full flex-col text-left"
      >
        {/* Browser-window chrome */}
        <div className="flex h-8 w-full shrink-0 items-center gap-1.5 border-b border-slate-200 bg-slate-50 px-3.5">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
          <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
        </div>

        {/* Screenshot: always shown in full (object-contain); a blurred copy fills any spare space */}
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
          <img
            src={product.thumbnail}
            alt=""
            aria-hidden="true"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full scale-110 object-cover opacity-50 blur-2xl"
          />
          <img
            src={product.thumbnail}
            width="480"
            height="300"
            loading="lazy"
            decoding="async"
            className="relative h-full w-full object-contain transition-transform duration-700 group-hover/product:scale-[1.03]"
            alt={product.title}
          />
          <span className="absolute inset-0 flex items-center justify-center bg-navy-900/0 opacity-0 transition-all duration-500 group-hover/product:bg-navy-900/40 group-hover/product:opacity-100">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-navy-900 shadow-lg">
              <Maximize2 className="h-5 w-5" />
            </span>
          </span>
        </div>

        {/* Caption: always visible */}
        <div className="flex h-14 w-full shrink-0 items-center justify-between gap-3 border-t border-slate-200 bg-white px-5">
          <span className="truncate font-display text-[15px] font-semibold tracking-tight text-navy-900">
            {product.title}
          </span>
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-slate-200 text-navy-700 transition-all duration-300 group-hover/product:border-navy-900 group-hover/product:bg-navy-900 group-hover/product:text-white">
            <ArrowRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </button>
    </div>
  );
};

/* Full-size on-site preview of a project. Keeps visitors on the Skiez website. */
const WorkPreview = ({ product, onClose }) => {
  useEffect(() => {
    if (!product) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [product, onClose]);

  return (
    <AnimatePresence>
      {product && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-navy-950/70 p-4 backdrop-blur-sm md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label={product.title}
        >
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
            className="flex max-h-full w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between gap-4 border-b border-slate-200 px-5 py-4 md:px-6">
              <div className="min-w-0">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-navy-500">Our Works</p>
                <h3 className="truncate font-display text-lg font-bold text-navy-900 md:text-xl">{product.title}</h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close preview"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 text-navy-900 transition-colors hover:bg-slate-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-auto bg-slate-100">
              <img src={product.thumbnail} alt={product.title} className="mx-auto block h-auto w-full" />
            </div>

            <div className="flex flex-col items-start justify-between gap-3 border-t border-slate-200 px-5 py-4 sm:flex-row sm:items-center md:px-6">
              <p className="text-sm text-slate-600">Want something like this for your business?</p>
              <Link to="/contact" onClick={onClose} className="btn-primary !py-2.5">
                Start a Project <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
