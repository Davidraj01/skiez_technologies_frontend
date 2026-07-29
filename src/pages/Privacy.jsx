import React, { useMemo, useState, useEffect } from "react";

/** Skiez Technologies — Complete Privacy Policy (Full Content + Slate-900 UI) */

const sections = [
  { id: "applicability", label: "1) Applicability" },
  { id: "data-we-collect", label: "2) Data We Collect" },
  { id: "purpose", label: "3) Purpose" },
  { id: "consent-rights", label: "4) User Rights" },
  { id: "disclosure", label: "5) Disclosure" },
  { id: "security", label: "6) Data Security" },
  { id: "retention", label: "7) Retention" },
  { id: "cookies", label: "8) Cookies" },
  { id: "grievance", label: "9) Grievance Officer" },
  { id: "updates", label: "10) Policy Updates" },
];

const GlassBadge = ({ children }) => (
  <span className="inline-flex items-center rounded-md border border-slate-700 bg-slate-800/50 px-2.5 py-0.5 text-xs font-medium text-indigo-300 backdrop-blur-sm">
    {children}
  </span>
);

const H2 = ({ id, children }) => (
  <h2
    id={id}
    className="scroll-mt-28 text-2xl font-bold text-white mt-12 mb-6 flex items-center gap-3"
  >
    <span className="h-8 w-1 bg-indigo-500 rounded-full" />
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
      className="fixed bottom-8 right-8 z-50 rounded-xl bg-indigo-600 p-3 text-white shadow-2xl transition-all hover:bg-indigo-500 hover:-translate-y-1"
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

const PrivacyTechnologies = () => {
  const lastUpdated = useMemo(() => "February 09, 2026", []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 selection:bg-indigo-500/30">
      {/* Visual Header */}
      <header className="relative overflow-hidden border-b border-slate-800 bg-slate-900/50 py-20">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent opacity-50" />
        <div className="relative mx-auto max-w-7xl px-6">
          <div className="space-y-4 text-center lg:text-left">
            <GlassBadge>Legal Compliance</GlassBadge>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white lg:text-6xl">
              Privacy <span className="text-indigo-500">Policy.</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0">
              Skiez Technologies India Pvt Ltd transparency guidelines for
              software development and IT consulting.
            </p>
            <div className="flex items-center justify-center lg:justify-start gap-4 pt-4 text-sm font-medium">
              <span className="text-slate-500">Effective: {lastUpdated}</span>
              <span className="h-4 w-px bg-slate-800" />
              <span className="text-indigo-400">v2.1.0</span>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Sidebar */}
          <aside className="lg:col-span-4 hidden lg:block">
            <div className="lg:sticky lg:top-24 space-y-6">
              <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 backdrop-blur-md">
                <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-6">
                  Navigation
                </h3>
                <nav className="flex flex-col gap-1">
                  {sections.map((s) => (
                    <a
                      key={s.id}
                      href={`#${s.id}`}
                      className="group flex items-center py-2 text-sm transition-colors hover:text-white"
                      onClick={(e) => {
                        e.preventDefault();
                        document
                          .getElementById(s.id)
                          ?.scrollIntoView({ behavior: "smooth" });
                      }}
                    >
                      <span className="mr-3 h-px w-4 bg-slate-700 transition-all group-hover:w-6 group-hover:bg-indigo-500" />
                      {s.label}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </aside>

          {/* Full Content */}
          <article className="lg:col-span-8 prose prose-invert prose-indigo max-w-none">
            <section className="bg-indigo-500/5 border border-indigo-500/10 rounded-2xl p-6 mb-12">
              <p className="m-0 text-slate-300 leading-relaxed">
                Skiez Technologies India Pvt Ltd (“we”, “us”) is a premier
                digital solutions provider specializing in **Full-Stack
                Development, Mobile Frameworks (Flutter), and IT Consulting**.
                This policy explains how we collect, use, and safeguard your
                personal data under the Information Technology Act, 2000, and
                DPDP Act 2023.
              </p>
            </section>

            <H2 id="applicability">1. Applicability</H2>
            <p>
              This policy governs all digital interactions, services, and
              software repositories provided by Skiez Technologies, including:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4 list-none p-0">
              {[
                "Custom Software Ecosystems",
                "IT & Cybersecurity Consulting",
                "Database Management Services",
                "B2B SaaS Solutions",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2 text-slate-400 bg-slate-900/50 p-3 rounded-lg border border-slate-800"
                >
                  <div className="h-1.5 w-1.5 rounded-full bg-indigo-500" />{" "}
                  {item}
                </li>
              ))}
            </ul>

            <H2 id="data-we-collect">2. Data We Collect</H2>
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-900/30 border border-slate-800">
                <h4 className="text-white font-bold mb-1">
                  A. Personal Identifiers
                </h4>
                <p className="text-sm">
                  Name, official email address, professional contact number, and
                  designation for business communication.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/30 border border-slate-800">
                <h4 className="text-white font-bold mb-1">
                  B. Technical Footprints
                </h4>
                <p className="text-sm">
                  IP addresses, browser engine details, and system interaction
                  logs required for testing environments and platform
                  optimization.
                </p>
              </div>
              <div className="p-4 rounded-xl bg-slate-900/30 border border-slate-800">
                <h4 className="text-white font-bold mb-1">
                  C. Transactional Data
                </h4>
                <p className="text-sm">
                  GST details and billing information for B2B service contracts.
                </p>
              </div>
            </div>

            <H2 id="purpose">3. Purpose of Collection</H2>
            <p>
              We process your data exclusively for high-performance service
              delivery:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Facilitating custom software development and project deployment.
              </li>
              <li>Executing IT consulting and strategy sessions.</li>
              <li>
                Ensuring the security of codebases and preventing unauthorized
                access.
              </li>
              <li>Legal compliance with Indian tax and corporate laws.</li>
            </ul>

            <H2 id="consent-rights">4. Consent & User Rights</H2>
            <p>
              Under the DPDP Act 2023, you retain absolute authority over your
              data:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                **Right to Access:** Request a summary of personal data held by
                us.
              </li>
              <li>
                **Right to Correction:** Ensure your professional records are
                accurate.
              </li>
              <li>
                **Right to Erasure:** Request deletion of data once the project
                lifecycle ends (subject to legal retention).
              </li>
              <li>
                **Consent Withdrawal:** You may stop data processing by
                terminating service agreements.
              </li>
            </ul>

            <H2 id="disclosure">5. Disclosure of Information</H2>
            <p>
              Skiez Technologies maintains a strict non-disclosure policy. Data
              is only shared with:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Verified Third-party Cloud Infrastructure (e.g., AWS, Google
                Cloud) for hosting.
              </li>
              <li>Payment Aggregators for secure transaction processing.</li>
              <li>
                Law enforcement agencies when mandated by a valid judicial
                order.
              </li>
            </ul>

            <H2 id="security">6. Data Security Measures</H2>
            <p>
              We deploy industrial-grade security to protect your intellectual
              and personal property:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                End-to-End Encryption for all client-server communications.
              </li>
              <li>
                Strict Multi-Factor Authentication (MFA) for development
                internal access.
              </li>
              <li>
                Regular Vulnerability Assessment and Penetration Testing (VAPT).
              </li>
            </ul>

            <H2 id="retention">7. Data Retention</H2>
            <p>
              Data is retained only for the duration of the service contract
              plus a standard archival period of 2 years for technical
              troubleshooting and tax auditing, unless otherwise requested by
              the client.
            </p>

            <H2 id="cookies">8. Cookies & Analytics</H2>
            <p>
              Our website uses essential and analytical cookies to monitor site
              performance. These cookies do not extract sensitive personal files
              from your hardware.
            </p>

            <H2 id="grievance">9. Grievance Officer</H2>
            <div className="rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-xl mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-xs font-bold uppercase text-indigo-500 mb-1">
                    Appointed Officer
                  </p>
                  <p className="text-white font-semibold">
                    Dr. S. S. David Raj
                  </p>
                  <p className="text-sm text-slate-500">
                    PhD, M.Phil, Grievance Lead
                  </p>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase text-indigo-500 mb-1">
                    Electronic Contact
                  </p>
                  <p className="text-white">skieztechnologies@gmail.com</p>
                  <p className="text-sm text-slate-500">
                    Response Window: 15 Business Days
                  </p>
                </div>
              </div>
            </div>

            <H2 id="updates">10. Policy Updates</H2>
            <p>
              We reserve the right to modify this policy to align with new
              technologies or legislative changes. The latest version will
              always be accessible at **skieztechnologies.org/privacy**.
            </p>

            <footer className="mt-20 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 pb-10">
              <p>
                © {new Date().getFullYear()} Skiez Technologies India Pvt Ltd.
              </p>
              <div className="flex gap-6">
                <a href="#" className="hover:text-indigo-400">
                  Security Audit
                </a>
                <a href="#" className="hover:text-indigo-400">
                  Terms of Service
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

export default PrivacyTechnologies;
