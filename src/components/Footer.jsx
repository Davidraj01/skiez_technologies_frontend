import React from "react";
import { Link } from "react-router-dom";
import {
  FiInstagram,
  FiFacebook,
  FiLinkedin,
  FiArrowRight,
  FiArrowUp,
  FiPhone,
  FiMail,
  FiMapPin,
} from "react-icons/fi";
import logo from "../assets/optimized/Skiez-Tech.webp";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  // { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

const socialLinks = [
  { label: "Instagram", href: "https://www.instagram.com/skiez_technology/", icon: FiInstagram },
  { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61585777885464", icon: FiFacebook },
  // Public company page (the /admin/dashboard/ URL only works for page admins)
  { label: "LinkedIn", href: "https://www.linkedin.com/company/144174665/", icon: FiLinkedin },
];

// Same details as the Contact page
const contactItems = [
  { icon: FiPhone, label: "+91 82200 43041", href: "tel:+918220043041" },
  { icon: FiMail, label: "info@skiezdigital.com", href: "mailto:info@skiezdigital.com" },
  { icon: FiMapPin, label: "Chengalpattu / Chennai, Tamil Nadu, India" },
];

const ColumnTitle = ({ children }) => (
  <h3 className="mb-5 font-display text-sm font-bold uppercase tracking-[0.14em] text-navy-900">
    {children}
  </h3>
);

const FooterLink = ({ to, children }) => (
  <Link
    to={to}
    className="group inline-flex min-h-[40px] items-center text-[15px] text-slate-600 transition-colors hover:text-navy-900"
  >
    <span className="h-px w-0 bg-navy-900 transition-all duration-300 group-hover:mr-2 group-hover:w-3" />
    {children}
  </Link>
);

const SiteFooter = () => {
  return (
    <footer className="relative border-t border-slate-200 bg-slate-50">
      {/* ---------- Call-to-action band ---------- */}
      <div className="mx-auto max-w-7xl px-4 pt-16 md:px-8 md:pt-20">
        <div className="relative overflow-hidden rounded-3xl bg-navy-900 px-6 py-10 shadow-[0_30px_60px_-30px_rgba(11,31,58,0.6)] sm:px-10 md:px-14 md:py-14">
          <div className="pointer-events-none absolute inset-0 bg-grid-dark" />
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10" />
          <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full border border-white/10" />

          <div className="relative flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <div>
              <span className="eyebrow-dark">Direct Consultation</span>
              <h2 className="mt-5 max-w-xl font-display text-3xl font-bold leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
                Start your digital evolution.
              </h2>
            </div>
            <Link
              to="/contact"
              className="group inline-flex shrink-0 items-center gap-3 rounded-full bg-white py-2 pl-7 pr-2 text-sm font-bold tracking-[0.08em] text-navy-900 shadow-lg transition-transform duration-300 hover:-translate-y-0.5"
            >
              PITCH A PROJECT
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-navy-900 text-white transition-transform duration-300 group-hover:translate-x-0.5">
                <FiArrowRight className="h-4 w-4" />
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* ---------- Main columns ---------- */}
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-12 px-4 py-16 md:grid-cols-3 md:px-8 lg:grid-cols-12 lg:gap-8">
        {/* Brand */}
        <div className="col-span-2 md:col-span-3 lg:col-span-4">
          <Link to="/" aria-label="Home" className="inline-flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-[0_8px_20px_-10px_rgba(11,31,58,0.45)] ring-1 ring-slate-200">
            <img src={logo} alt="Company Logo" width="56" height="56" className="h-full w-full object-contain" />
          </Link>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.18em] text-navy-500">
            MERN • Flutter • Marketing • AI Solutions
          </p>

          <p className="mt-8 mb-3 text-xs font-semibold uppercase tracking-[0.14em] text-navy-900">
            Follow Us
          </p>
          <div className="flex gap-2.5">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                title={label}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-navy-900 transition-all duration-300 hover:-translate-y-0.5 hover:border-navy-900 hover:bg-navy-900 hover:text-white"
              >
                <Icon className="h-[18px] w-[18px]" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div className="lg:col-span-2 lg:col-start-6">
          <ColumnTitle>Quick Links</ColumnTitle>
          <ul className="space-y-0.5">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <FooterLink to={l.href}>{l.label}</FooterLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Legal */}
        <div className="lg:col-span-2">
          <ColumnTitle>Legal Info</ColumnTitle>
          <ul className="space-y-0.5">
            {legalLinks.map((l) => (
              <li key={l.href}>
                <FooterLink to={l.href}>{l.label}</FooterLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="col-span-2 md:col-span-1 lg:col-span-3">
          <ColumnTitle>Contact</ColumnTitle>
          <ul className="space-y-4">
            {contactItems.map(({ icon: Icon, label, href }) => {
              const body = (
                <>
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-navy-100 bg-white text-navy-900">
                    <Icon className="h-4 w-4" />
                  </span>
                  <span className="pt-1.5 text-[15px] leading-snug text-slate-600 transition-colors group-hover:text-navy-900">
                    {label}
                  </span>
                </>
              );
              return (
                <li key={label}>
                  {href ? (
                    <a href={href} className="group flex items-start gap-3">
                      {body}
                    </a>
                  ) : (
                    <div className="group flex items-start gap-3">{body}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* ---------- Bottom bar ---------- */}
      <div className="bg-navy-950">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-5 md:px-8">
          <span className="text-xs text-navy-200 sm:text-sm">
            © 2026 Skiez Technologies - All Rights Reserved
          </span>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            title="Back to top"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:text-navy-900"
          >
            <FiArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default SiteFooter;
