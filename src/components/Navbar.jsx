import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import logo from "../assets/optimized/Skiez-Tech.webp";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  // { label: "Career", href: "/careers" },
  { label: "Blog", href: "/blogs" },
  { label: "Gallery", href: "/gallery" },
];

const ctaItem = { label: "Contact", href: "/contact" };

const isActive = (pathname, href) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href);

const Header = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile menu whenever the route changes
  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-[1000] px-4 pt-4 md:pt-5">
      <nav
        aria-label="Primary"
        className={`mx-auto flex max-w-6xl items-center justify-between rounded-2xl border px-3 py-2.5 transition-all duration-500 md:px-4 ${
          scrolled
            ? "border-slate-200 bg-white/85 shadow-[0_16px_40px_-20px_rgba(11,31,58,0.35)] backdrop-blur-2xl"
            : "border-slate-200/70 bg-white/70 backdrop-blur-xl"
        }`}
      >
        {/* Logo */}
        <Link
          to="/"
          aria-label="Home"
          className="group flex h-11 w-11 items-center justify-center overflow-hidden rounded-xl bg-white shadow-[0_6px_18px_-8px_rgba(11,31,58,0.45)] ring-1 ring-slate-200 transition-transform duration-500 hover:scale-105"
        >
          <img
            src={logo}
            alt="Company Logo"
            className="h-full w-full object-contain transition-transform duration-700 group-hover:rotate-[120deg]"
          />
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => {
            const active = isActive(location.pathname, item.href);
            return (
              <li key={item.href} className="relative">
                <Link
                  to={item.href}
                  className={`relative z-10 block rounded-full px-4 py-2 text-[13px] font-medium tracking-wide transition-colors duration-300 ${
                    active ? "text-white" : "text-slate-600 hover:text-navy-900"
                  }`}
                >
                  {item.label}
                </Link>
                {active && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-full bg-navy-900"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            to={ctaItem.href}
            className="btn-primary hidden !px-5 !py-2.5 text-[13px] md:inline-flex"
          >
            {ctaItem.label}
            <ArrowUpRight className="h-4 w-4" />
          </Link>

          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="flex h-11 w-11 flex-col items-center justify-center gap-1.5 rounded-xl border border-slate-200 bg-white md:hidden"
          >
            <span
              className={`h-0.5 w-5 rounded bg-navy-900 transition-transform duration-300 ${
                open ? "translate-y-[4px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-0.5 w-5 rounded bg-navy-900 transition-transform duration-300 ${
                open ? "-translate-y-[4px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 max-w-6xl overflow-hidden rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-[0_24px_48px_-20px_rgba(11,31,58,0.4)] backdrop-blur-2xl md:hidden"
          >
            <ul className="flex flex-col">
              {[...navItems, ctaItem].map((item) => {
                const active = isActive(location.pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-[15px] font-medium transition-colors ${
                        active
                          ? "bg-navy-900 text-white"
                          : "text-navy-900 hover:bg-navy-50"
                      }`}
                    >
                      {item.label}
                      <ArrowUpRight
                        className={`h-4 w-4 ${active ? "text-white" : "text-slate-400"}`}
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
