import React from "react";

// Note: Ensure Skiez font is loaded in your global CSS or tailwind.config.js
const SuperfluidFooter = () => {
  return (
    <footer className="bg-sky-400 text-black p-8 font-sans selection:bg-black selection:text-[#FFF500]">
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 uppercase text-[11px] font-bold leading-tight">
        {/* Newsletter Section */}
        <div className="md:col-span-4 space-y-6">
          {/* Branding Title */}
          <h2 className="text-2xl leading-[0.9] tracking-tighter max-w-[200px] text-black uppercase">
            Start your digital evolution.
          </h2>

          {/* Action Area */}
          <div className="group relative border-b-2 border-indigo-500/50 pb-2 max-w-[280px] transition-all focus-within:border-indigo-400">
            <p className="text-[10px] uppercase tracking-[0.2em] text-indigo-400 mb-1">
              Direct Consultation
            </p>
            <a
              href="/contact"
              className="flex justify-between items-center text-sm font-bold tracking-tighter text-slate-900 hover:text-black transition-colors"
            >
              <span>PITCH A PROJECT</span>
              <span className="text-xl group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
          </div>

          {/* Trust Factor / Tagline */}
          <p className="text-[10px] leading-tight tracking-tight text-slate-900 uppercase">
            MERN • Flutter • Marketing • AI Solutions
          </p>
        </div>

        {/* Links Columns */}
        <div className="md:col-span-2 md:col-start-7 space-y-2">
          <h3 className="opacity-50 mb-4">Quick Links</h3>
          <ul className="space-y-1">
            <li>
              <a href="/" className="cursor-pointer hover:underline">
                Home
              </a>
            </li>

            <li>
              <a href="/services" className="cursor-pointer hover:underline">
                Services
              </a>
            </li>

            <li>
              <a href="/about" className="cursor-pointer hover:underline">
                About
              </a>
            </li>

            {/* <li>
              <a href="/careers" className="cursor-pointer hover:underline">
                Careers
              </a>
            </li> */}

            <li>
              <a href="/contact" className="cursor-pointer hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2 space-y-2">
          <h3 className="opacity-50 mb-4">Legal Info</h3>
          <ul className="space-y-1">
            <li>
              <a href="/privacy" className="cursor-pointer hover:underline">
                Privacy Policy
              </a>
            </li>

            <li>
              <a href="/terms" className="cursor-pointer hover:underline">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2 space-y-2">
          <h3 className="opacity-50 mb-4">Follow Us</h3>
          <ul className="space-y-1">
            <li>
              <a
                href="https://www.instagram.com/skiez_technology/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Instagram
              </a>
            </li>

            <li>
              <a
                href="https://www.facebook.com/profile.php?id=61585777885464"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                Facebook
              </a>
            </li>

            <li>
              <a
                href="https://www.linkedin.com/in/skiez-technologies-6526a7389/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Hero Logo */}
      <div className="mt-12 mb-8 overflow-hidden">
        <h1 className="font-['Skiez'] text-[24vw] leading-[0.75] tracking-[-0.06em] text-center italic select-none">
          SKIEZ
        </h1>
      </div>

      {/* Bottom Bar */}
      <div className="flex flex-wrap justify-between items-end border-t border-black/10 pt-4 text-[9px] font-bold uppercase">
        <div className="flex gap-6">
          
        </div>
        <div className="flex items-center gap-4">
          <span>© 2026 Skiez Technologies - All Rights Reserved</span>
          <div className="flex gap-2 grayscale opacity-80">
            <div className="w-6 h-4 bg-black/20 rounded-sm" />{" "}
            {/* Amex Icon Placeholder */}
            <div className="w-6 h-4 bg-black/20 rounded-sm" />{" "}
            {/* MC Icon Placeholder */}
            <div className="w-6 h-4 bg-black/20 rounded-sm" />{" "}
            {/* Visa Icon Placeholder */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default SuperfluidFooter;
