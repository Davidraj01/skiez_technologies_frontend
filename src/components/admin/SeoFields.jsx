import React from "react";
import { CheckCircle2, AlertTriangle, XCircle, Plus, Trash2, Globe } from "lucide-react";
import { scoreLabel } from "../../lib/seoScore";

export const inputClass =
  "w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700 text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all";

const tone = {
  good: { text: "text-green-400", bar: "bg-green-500", ring: "#22c55e" },
  warn: { text: "text-amber-400", bar: "bg-amber-500", ring: "#f59e0b" },
  bad: { text: "text-red-400", bar: "bg-red-500", ring: "#ef4444" },
};

/** Text input / textarea with a live character counter coloured against an ideal range. */
export function CharField({ label, hint, value, onChange, range, placeholder, textarea, rows = 3, name }) {
  const len = (value || "").length;
  const [min, max] = range || [0, Infinity];
  const status = !range ? null : len >= min && len <= max ? "good" : len === 0 ? "bad" : "warn";
  const pct = range ? Math.min(100, (len / max) * 100) : 0;
  const Tag = textarea ? "textarea" : "input";

  return (
    <div className="space-y-2">
      <div className="flex items-end justify-between gap-3">
        <label className="text-sm font-medium text-slate-300 ml-1">{label}</label>
        {range && (
          <span className={`text-xs font-semibold ${tone[status].text}`}>
            {len} / {min}–{max}
          </span>
        )}
      </div>
      <Tag
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={textarea ? rows : undefined}
        className={`${inputClass} ${textarea ? "resize-none" : ""}`}
      />
      {range && (
        <div className="h-1 rounded-full bg-slate-800 overflow-hidden">
          <div className={`h-full ${tone[status].bar} transition-all`} style={{ width: `${pct}%` }} />
        </div>
      )}
      {hint && <p className="text-xs text-slate-500 ml-1">{hint}</p>}
    </div>
  );
}

/** How the page will look in Google search results. */
export function GooglePreview({ siteUrl, path, title, description }) {
  const host = (siteUrl || "").replace(/^https?:\/\//, "").replace(/\/+$/, "") || "yourwebsite.com";
  const crumbs = path.split("/").filter(Boolean).join(" › ");
  const cut = (s, n) => (s.length > n ? s.slice(0, n - 1).trimEnd() + "…" : s);

  return (
    <div className="rounded-2xl bg-white p-5 text-left shadow-inner">
      <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">Google preview</p>
      <div className="flex items-center gap-2">
        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100">
          <Globe className="h-4 w-4 text-slate-500" />
        </span>
        <div className="min-w-0 leading-tight">
          <p className="truncate text-sm text-[#202124]">{host}</p>
          <p className="truncate text-xs text-[#4d5156]">
            {host}
            {crumbs && ` › ${crumbs}`}
          </p>
        </div>
      </div>
      <p className="mt-2 text-xl leading-snug text-[#1a0dab] hover:underline">{cut(title || "Page title", 60)}</p>
      <p className="mt-1 text-sm leading-snug text-[#4d5156]">
        {cut(description || "Add a meta description to control the text shown here.", 160)}
      </p>
    </div>
  );
}

/** Score ring + grouped checklist. */
export function SeoScorePanel({ analysis }) {
  const { score, checks } = analysis;
  const label = scoreLabel(score);
  const r = 34;
  const c = 2 * Math.PI * r;
  const Icon = { good: CheckCircle2, warn: AlertTriangle, bad: XCircle };

  return (
    <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-5">
      <div className="flex items-center gap-4">
        <svg width="84" height="84" viewBox="0 0 84 84" className="shrink-0 -rotate-90">
          <circle cx="42" cy="42" r={r} fill="none" stroke="#1e293b" strokeWidth="8" />
          <circle
            cx="42" cy="42" r={r} fill="none" stroke={tone[label.tone].ring} strokeWidth="8" strokeLinecap="round"
            strokeDasharray={c} strokeDashoffset={c - (score / 100) * c} className="transition-all duration-500"
          />
          <text x="42" y="42" textAnchor="middle" dominantBaseline="central" transform="rotate(90 42 42)"
            className="fill-white text-xl font-bold">{score}</text>
        </svg>
        <div>
          <p className="text-xs uppercase tracking-wider text-slate-500">SEO &amp; AEO score</p>
          <p className={`text-lg font-bold ${tone[label.tone].text}`}>{label.text}</p>
          <p className="text-xs text-slate-500 mt-0.5">Updates as you type. Aim for 80+.</p>
        </div>
      </div>

      {["SEO", "AEO"].map((group) => (
        <div key={group} className="mt-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
            {group === "SEO" ? "Search engines (SEO)" : "AI answers & featured snippets (AEO / GEO)"}
          </p>
          <ul className="space-y-1.5">
            {checks.filter((ch) => ch.group === group).map((ch) => {
              const I = Icon[ch.status];
              return (
                <li key={ch.id} className="group/check">
                  <details>
                    <summary className="flex cursor-pointer list-none items-start gap-2 text-sm text-slate-300 [&::-webkit-details-marker]:hidden">
                      <I className={`mt-0.5 h-4 w-4 shrink-0 ${tone[ch.status].text}`} />
                      <span>{ch.label}</span>
                    </summary>
                    {ch.status !== "good" && <p className="ml-6 mt-1 text-xs text-slate-500">{ch.tip}</p>}
                  </details>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** Editable list of one-line key takeaways. */
export function TakeawaysEditor({ items, onChange }) {
  const update = (i, v) => onChange(items.map((t, idx) => (idx === i ? v : t)));
  return (
    <div className="space-y-2">
      {items.map((t, i) => (
        <div key={i} className="flex gap-2">
          <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-500" />
          <input
            value={t}
            onChange={(e) => update(i, e.target.value)}
            placeholder="One clear, factual sentence, e.g. A business website takes 2–4 weeks to build."
            className={inputClass}
          />
          <button type="button" onClick={() => onChange(items.filter((_, idx) => idx !== i))}
            aria-label="Remove takeaway"
            className="p-3 rounded-xl border border-slate-700 text-slate-400 hover:text-red-400 hover:border-red-500/40">
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      ))}
      {items.length < 10 && (
        <button type="button" onClick={() => onChange([...items, ""])}
          className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300">
          <Plus className="w-4 h-4" /> Add takeaway
        </button>
      )}
    </div>
  );
}

/** Editable list of FAQ question/answer pairs. */
export function FaqEditor({ items, onChange }) {
  const update = (i, field, v) => onChange(items.map((f, idx) => (idx === i ? { ...f, [field]: v } : f)));
  return (
    <div className="space-y-3">
      {items.map((f, i) => (
        <div key={i} className="rounded-xl border border-slate-700 bg-slate-900/40 p-4 space-y-2">
          <div className="flex gap-2">
            <input
              value={f.question}
              onChange={(e) => update(i, "question", e.target.value)}
              placeholder="Question, as customers ask it (e.g. How much does a website cost in Chennai?)"
              className={inputClass}
            />
            <button type="button" onClick={() => onChange(items.filter((_, idx) => idx !== i))}
              aria-label="Remove FAQ"
              className="p-3 rounded-xl border border-slate-700 text-slate-400 hover:text-red-400 hover:border-red-500/40">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
          <textarea
            value={f.answer}
            onChange={(e) => update(i, "answer", e.target.value)}
            rows={2}
            placeholder="Direct answer first, then a little detail (1–3 sentences)."
            className={`${inputClass} resize-none`}
          />
        </div>
      ))}
      {items.length < 20 && (
        <button type="button" onClick={() => onChange([...items, { question: "", answer: "" }])}
          className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-400 hover:text-cyan-300">
          <Plus className="w-4 h-4" /> Add question
        </button>
      )}
    </div>
  );
}
