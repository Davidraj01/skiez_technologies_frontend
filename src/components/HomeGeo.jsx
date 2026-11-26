import React from "react";
import { CalendarCheck, Sparkles } from "lucide-react";
import { geoDefinition, geoTakeaways, geoFaqs } from "../data/homeGeo";

/* global __BUILD_DATE__ */
export const LAST_UPDATED = typeof __BUILD_DATE__ !== "undefined" ? __BUILD_DATE__ : "";

/** Render "[text](url)" links inside an answer as real external links (citations). */
const RichText = ({ text }) => {
  const parts = [];
  const re = /\[([^\]]+)\]\((https?:[^)]+)\)/g;
  let last = 0;
  let m;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    parts.push(
      <a
        key={m.index}
        href={m[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="font-medium text-navy-700 underline decoration-navy-200 underline-offset-2 hover:decoration-navy-700"
      >
        {m[1]}
      </a>
    );
    last = re.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
};

/**
 * "What is Skiez Technologies?" — a definition, key takeaways and FAQs written so search
 * engines and AI assistants can understand and quote Skiez accurately (GEO / AEO).
 * The FAQ list is mirrored as FAQPage structured data on the home page.
 */
export default function HomeGeo() {
  const updated = LAST_UPDATED
    ? new Date(`${LAST_UPDATED}T00:00:00Z`).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" })
    : "";

  return (
    <section aria-labelledby="what-is-skiez" className="border-t border-slate-200 bg-white py-24 md:py-28">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
          {/* Definition */}
          <div>
            <span className="eyebrow">About us</span>
            <h2 id="what-is-skiez" className="mt-5 font-display text-3xl font-bold tracking-tight text-navy-900 md:text-5xl">
              What is Skiez Technologies?
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-slate-700">{geoDefinition}</p>
            {updated && (
              <p className="mt-6 inline-flex items-center gap-2 text-sm text-slate-500">
                <CalendarCheck className="h-4 w-4" />
                Last updated <time dateTime={LAST_UPDATED}>{updated}</time>
              </p>
            )}
          </div>

          {/* Key takeaways */}
          <aside aria-labelledby="key-takeaways" className="rounded-3xl border border-navy-100 bg-navy-50 p-7 md:p-8">
            <h3 id="key-takeaways" className="flex items-center gap-2 font-display text-xl font-bold text-navy-900">
              <Sparkles className="h-5 w-5" /> Key takeaways
            </h3>
            <ul className="mt-5 space-y-3">
              {geoTakeaways.map((t) => (
                <li key={t} className="flex gap-3 text-[15px] leading-relaxed text-slate-700">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-navy-900" />
                  {t}
                </li>
              ))}
            </ul>
          </aside>
        </div>

        {/* FAQ — question-format headings */}
        <div className="mt-20">
          <h2 className="font-display text-3xl font-bold tracking-tight text-navy-900 md:text-4xl">
            Frequently asked questions
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {geoFaqs.map((f) => (
              <article key={f.question} className="surface p-6 md:p-7">
                <h3 className="font-display text-lg font-bold text-navy-900">{f.question}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-slate-600">
                  <RichText text={f.answer} />
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
