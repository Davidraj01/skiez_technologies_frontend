"use client";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { X, ArrowRight, Maximize2 } from "lucide-react";
import ShapeGrid from "./ShapeGrid";

/**
 * Home hero + "Our Works" portfolio.
 * Projects slide right-to-left in a black & white marquee (pauses on hover), so new works never crowd the page.
 * Cards open an on-site preview (never the client's website).
 */
export const HeroParallax = ({ products }) => {
  const [active, setActive] = useState(null);

  return (
    <>
      <Header />

      {/* Black & white section. Works slide right-to-left in rows; hovering a row pauses it,
          so the list can keep growing without crowding the page. */}
      <section
        aria-labelledby="our-works"
        className="relative overflow-hidden bg-black py-20 text-white md:py-28"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-12 flex max-w-7xl flex-col items-center px-4 text-center md:mb-16 md:px-8"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/80">
            <span className="h-1.5 w-1.5 rounded-full bg-white" /> Portfolio
          </span>
          <h2 id="our-works" className="mt-5 font-display text-4xl font-bold tracking-tight text-white md:text-5xl">
            Our Works
          </h2>
          <p className="mt-4 max-w-xl text-sm text-white/60 md:text-base">
            Websites and mobile apps we've built. Hover to pause, click any work to preview it.
          </p>
        </motion.div>

        <div className="flex flex-col gap-6 md:gap-8">
          {splitIntoRows(products).map((row, r) => (
            <MarqueeRow key={r} items={row} onOpen={setActive} slower={r % 2 === 1} />
          ))}
        </div>
      </section>

      <WorkPreview product={active} onClose={() => setActive(null)} />
    </>
  );
};

/* One row while the list is short; two rows (items alternated) once it grows. */
const splitIntoRows = (items) =>
  items.length < 8 ? [items] : [items.filter((_, i) => i % 2 === 0), items.filter((_, i) => i % 2 === 1)];

/* A row that slides right-to-left forever. The list is rendered twice for a seamless loop;
   the copy is hidden from screen readers and keyboard. Speed stays constant as works are added. */
const MarqueeRow = ({ items, onOpen, slower }) => {
  const duration = `${items.length * (slower ? 7 : 6)}s`;
  return (
    <div
      className="works-row relative w-full overflow-hidden"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
      }}
    >
      <ul className="works-track flex w-max py-3" style={{ "--works-duration": duration }}>
        {[0, 1].map((copy) =>
          items.map((product) => (
            <li
              key={`${copy}-${product.title}`}
              aria-hidden={copy === 1 || undefined}
              className="w-[280px] shrink-0 pr-6 sm:w-[340px] md:w-[380px] md:pr-8"
            >
              <ProductCard product={product} onOpen={() => onOpen(product)} inert={copy === 1} />
            </li>
          ))
        )}
      </ul>
    </div>
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

export const ProductCard = ({ product, onOpen, inert = false }) => {
  return (
    <div className="group/product relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white shadow-[0_24px_50px_-30px_rgba(0,0,0,0.8)] transition-all duration-500 hover:-translate-y-1.5 hover:border-white hover:shadow-[0_32px_60px_-20px_rgba(255,255,255,0.25)]">
      {/* Opens an on-site preview — never navigates to the client's website */}
      <button
        type="button"
        tabIndex={inert ? -1 : undefined}
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
          {product.type === "app" ? (
            <AppThumbnail product={product} />
          ) : (
          <>
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
          </>
          )}
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
          {product.type === "app" && (
            <span className="ml-auto flex shrink-0 items-center gap-1.5 rounded-full border border-slate-200 px-2.5 py-1 text-[11px] font-semibold text-navy-700">
              <PlayStoreLogo className="h-3.5 w-3.5" /> Google Play
            </span>
          )}
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
              {product.type === "app" ? (
                <AppPreviewBody product={product} />
              ) : (
                <img src={product.thumbnail} alt={product.title} className="mx-auto block h-auto w-full" />
              )}
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

/* Google Play logo (decorative — the apps are shown, never linked). */
export const PlayStoreLogo = ({ className = "h-5 w-5" }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <path fill="#4285F4" d="M3.61 1.81C3.24 2 3 2.4 3 2.9v18.2c0 .5.24.9.61 1.09L13.79 12 3.61 1.81z" />
    <path fill="#34A853" d="M3.61 1.81 13.79 12l3.01-3.02L5.1 2.04c-.5-.29-1.07-.44-1.49-.23z" />
    <path fill="#EA4335" d="M3.61 22.19c.42.21.99.06 1.49-.23l11.7-6.94L13.79 12 3.61 22.19z" />
    <path fill="#FBBC04" d="M16.8 8.98 13.79 12l3.01 3.02 3.4-1.99c1.07-.63 1.07-1.43 0-2.06l-3.4-1.99z" />
  </svg>
);

/* Non-clickable "Get it on Google Play" badge. */
const PlayStoreBadge = () => (
  <span className="inline-flex items-center gap-2.5 rounded-xl bg-black px-4 py-2 text-white">
    <PlayStoreLogo className="h-6 w-6" />
    <span className="flex flex-col leading-none">
      <span className="text-[9px] font-medium uppercase tracking-wider">Get it on</span>
      <span className="text-base font-semibold">Google Play</span>
    </span>
  </span>
);

/* Phone-framed screenshot. */
const PhoneFrame = ({ src, alt, className = "" }) => (
  <div className={`overflow-hidden rounded-[14px] border-[3px] border-navy-900 bg-navy-900 shadow-xl ${className}`}>
    <img src={src} alt={alt} loading="lazy" decoding="async" className="block h-full w-full object-cover object-top" />
  </div>
);

/* Card thumbnail for a mobile app: three fanned phone screenshots + the app icon. */
const AppThumbnail = ({ product }) => {
  const [a, b, c] = product.screenshots;
  return (
    <>
      <img
        src={product.thumbnail}
        alt=""
        aria-hidden="true"
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full scale-110 object-cover opacity-50 blur-2xl"
      />
      <div className="relative flex h-full w-full items-end justify-center gap-0 pt-5 transition-transform duration-700 group-hover/product:scale-[1.03]">
        <PhoneFrame src={b} alt="" className="z-0 -mr-4 mb-3 aspect-[1/2] h-[72%] -rotate-6" />
        <PhoneFrame src={a} alt={product.title} className="z-10 -mb-2 aspect-[1/2] h-[90%]" />
        <PhoneFrame src={c} alt="" className="z-0 -ml-4 mb-3 aspect-[1/2] h-[72%] rotate-6" />
      </div>
      <img
        src={product.icon}
        alt=""
        aria-hidden="true"
        className="absolute left-3 top-3 z-20 h-11 w-11 rounded-xl shadow-md ring-2 ring-white"
      />
    </>
  );
};

/* Modal body for a mobile app: icon, description, Play badge and all screenshots. */
const AppPreviewBody = ({ product }) => (
  <div className="p-5 md:p-8">
    <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
      <img src={product.icon} alt={`${product.title} icon`} className="h-20 w-20 shrink-0 rounded-2xl shadow-md" />
      <div className="min-w-0 flex-1">
        <h4 className="font-display text-xl font-bold text-navy-900">{product.title}</h4>
        <p className="mt-1 text-sm text-slate-600">{product.description}</p>
      </div>
      <PlayStoreBadge />
    </div>
    <div className="mt-6 flex gap-4 overflow-x-auto pb-2">
      {product.screenshots.map((src, i) => (
        <PhoneFrame
          key={src}
          src={src}
          alt={`${product.title} screenshot ${i + 1}`}
          className="aspect-[1/2] w-40 shrink-0 md:w-48"
        />
      ))}
    </div>
  </div>
);
