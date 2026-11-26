import React, { useMemo, useState, useEffect } from "react";
import { Seo } from "../lib/seo";

/** Skiez Technologies — Terms of Service (Professional Slate-900 Theme) */

const sections = [
  { id: "scope", label: "1) Scope of Services" },
  { id: "client", label: "2) Client Responsibilities" },
  { id: "payments", label: "3) Payments & Invoicing" },
  { id: "ip", label: "4) Intellectual Property" },
  { id: "confidentiality", label: "5) Confidentiality" },
  { id: "revisions", label: "6) Revisions & Changes" },
  { id: "liability", label: "7) Limitation of Liability" },
  { id: "warranty", label: "8) Service Warranties" },
  { id: "termination", label: "9) Termination" },
  { id: "law", label: "10) Governing Law" },
  { id: "force", label: "11) Force Majeure" },
  { id: "updates", label: "12) Updates to Terms" },
  { id: "contact", label: "13) Contact Information" },
];

const GlassBadge = ({ children }) => (
  <span className="inline-flex items-center rounded-md border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-xs font-medium text-navy-700 backdrop-blur-sm">
    {children}
  </span>
);

const H2 = ({ id, children }) => (
  <h2
    id={id}
    className="scroll-mt-28 text-2xl font-bold text-navy-900 mt-12 mb-6 flex items-center gap-3"
  >
    <span className="h-8 w-1 bg-navy-900 rounded-full" />
    {children}
  </h2>
);

const BackToTop = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-8 right-8 z-50 rounded-xl bg-navy-900 p-3 text-white shadow-2xl transition-all hover:bg-navy-800 hover:-translate-y-1"
    >
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 10l7-7m0 0l7 7m-7-7v18"
        />
      </svg>
    </button>
  );
};

const TermsTechnologies = () => {
  const lastUpdated = useMemo(() => "February 09, 2026", []);

  return (
    <div className="min-h-screen bg-white text-slate-600">
      <Seo title="Terms of Service | Skiez Technologies" description="Terms and conditions for using the Skiez Technologies website and services." />
      {/* Hero Header */}
      <header className="relative overflow-hidden border-b border-slate-200 bg-slate-50 py-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-navy-900/10 via-transparent to-transparent opacity-50" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="space-y-4 text-center lg:text-left">
            <GlassBadge>Legal Framework</GlassBadge>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-navy-900 lg:text-6xl">
              Terms of <span className="text-navy-700">Service.</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0">
              The foundational agreement governing the professional relationship
              between Skiez Technologies and our global clientele.
            </p>
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-4 text-sm font-medium text-slate-500">
              <span>Last Modified: {lastUpdated}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Sticky Navigation */}
          <aside className="lg:col-span-4 hidden lg:block">
            <div className="lg:sticky lg:top-24 space-y-6">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 backdrop-blur-md">
                <h3 className="text-xs font-bold uppercase tracking-widest text-navy-700 mb-6">
                  Article Sections
                </h3>
                <nav className="flex flex-col gap-1">
                  {sections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="group flex items-center py-2 text-sm transition-colors hover:text-navy-900"
                      onClick={(e) => {
                        e.preventDefault();
                        document
                          .getElementById(s.id)
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      <span className="mr-3 h-px w-4 bg-slate-300 transition-all group-hover:w-6 group-hover:bg-navy-900" />
                      {s.label}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </aside>

          {/* Legal Content */}
          <article className="lg:col-span-8 prose prose-slate max-w-none">
            <section className="bg-slate-50 border border-slate-200 rounded-2xl p-6 mb-12">
              <p className="m-0 leading-relaxed italic">
                By engaging Skiez Technologies India Pvt Ltd for any software
                development, consulting, or technical services, you hereby agree
                to be bound by these terms. This document constitutes a legally
                binding agreement between Skiez Technologies ("Company") and the
                Client.
              </p>
            </section>

            <H2 id="scope">1. Scope of Services</H2>
            <p>
              Skiez Technologies provides high-end technical solutions
              including:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Full-Stack Web & Enterprise Application Development.</li>
              <li>Mobile Application Development (Native & Flutter).</li>
              <li>IT Strategy and Cybersecurity Consulting.</li>
              <li>Cloud Infrastructure Management & Database Optimization.</li>
            </ul>

            <H2 id="client">2. Client Responsibilities</H2>
            <p>
              Project success is a collaborative effort. Clients are required
              to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Provide comprehensive project requirements and technical
                documentation.
              </li>
              <li>
                Ensure timely feedback on development milestones (within 48–72
                hours).
              </li>
              <li>
                Guarantee legal ownership of all assets (logos, content, media)
                provided for integration.
              </li>
            </ul>

            <H2 id="payments">3. Payments and Invoicing</H2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="text-navy-700 font-bold mb-2">
                  Milestone Payments
                </h4>
                <p className="text-sm">
                  Invoices are triggered upon completion of specific development
                  phases (e.g., Design, Beta, Final Release).
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <h4 className="text-navy-700 font-bold mb-2">
                  Service Suspension
                </h4>
                <p className="text-sm">
                  Payments delayed beyond 10 business days will result in an
                  automatic suspension of development activities.
                </p>
              </div>
            </div>

            <H2 id="ip">4. Intellectual Property (IP)</H2>
            <p>
              **A. Software Ownership:** Upon receipt of full and final payment,
              the primary source code and associated assets created specifically
              for the Client shall be transferred to the Client.
            </p>
            <p>
              **B. Proprietary Tools:** Skiez Technologies retains ownership of
              any pre-existing libraries, frameworks, or proprietary tools used
              during development.
            </p>

            <H2 id="confidentiality">5. Confidentiality</H2>
            <p>
              Both parties agree to a Mutual Non-Disclosure Agreement (MNDA). We
              protect your trade secrets, business logic, and project data with
              enterprise-level security protocols.
            </p>

            <H2 id="revisions">6. Revisions & Change Requests</H2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                **Standard Revisions:** Included within the initial project
                scope as defined in the Statement of Work (SOW).
              </li>
              <li>
                **Out-of-Scope:** Major logic changes or feature additions will
                require a separate Change Request (CR) and additional billing.
              </li>
            </ul>

            <H2 id="liability">7. Limitation of Liability</H2>
            <p>
              Skiez Technologies shall not be liable for any loss of profits,
              data, or indirect damages. Our total liability is strictly capped
              at the total amount paid by the Client for the specific service in
              dispute.
            </p>

            <H2 id="warranty">8. Service Warranties</H2>
            <p>
              We provide a 30-day "Bug-Free" warranty post-deployment. This does
              not cover issues arising from third-party server failures, OS
              updates, or unauthorized code changes by the Client.
            </p>

            <H2 id="termination">9. Termination of Services</H2>
            <p>
              Either party may terminate the contract with a 15-day written
              notice. In the event of termination, the Client is liable for all
              work hours and milestones completed up to the date of termination.
            </p>

            <H2 id="law">10. Governing Law</H2>
            <p>
              These terms are governed by the laws of India. All disputes are
              subject to the exclusive jurisdiction of the courts in
              **Chengalpattu/Chennai, Tamil Nadu**.
            </p>

            <H2 id="contact">13. Contact Information</H2>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 shadow-xl mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-xs font-bold uppercase text-navy-700 mb-1">
                    Legal Queries
                  </p>
                  <p className="text-navy-900 font-semibold">
                    Skiez Technologies India Pvt Ltd
                  </p>
                  <p className="text-sm text-slate-500">
                    No: 81/5, 6th street, Shanthi Nagar, Chengalpattu 603003.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-navy-700 mb-1">
                    Direct Contact
                  </p>
                  <p className="text-navy-900 break-all">skieztechnologies@gmail.com</p>
                  <p className="text-sm text-slate-500">
                    Phone: +91 9444958197
                  </p>
                </div>
              </div>
            </div>

            <footer className="mt-20 pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 pb-10">
              <p>
                © {new Date().getFullYear()} Skiez Technologies India Pvt Ltd.
                All Rights Reserved.
              </p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-navy-700">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-navy-700">
                  Compliance
                </a>
              </div>
            </footer>
          </article>
        </div>
      </main>
      <BackToTop />
    </div>
  );
};

export default TermsTechnologies;
