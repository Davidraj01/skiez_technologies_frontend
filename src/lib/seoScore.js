/**
 * Live SEO / AEO checklist for the admin blog editor.
 * Pure function: given the form values, returns { score (0-100), checks[] }.
 * Each check: { id, group: "SEO" | "AEO", label, status: "good" | "warn" | "bad", tip }
 */

const words = (text = "") => text.trim().split(/\s+/).filter(Boolean);
const norm = (s = "") => s.toLowerCase().normalize("NFKD").replace(/[^\p{L}\p{N}\s-]/gu, " ").replace(/\s+/g, " ").trim();
const containsKeyword = (text, keyword) => !!keyword && norm(text).includes(norm(keyword));
const slugify = (s = "") =>
  s.toLowerCase().normalize("NFKD").replace(/[^\p{L}\p{N}\s-]/gu, "").trim().replace(/[\s_-]+/g, "-").replace(/^-+|-+$/g, "");

export const TITLE_RANGE = [30, 60];
export const DESC_RANGE = [120, 160];

export function analyzeSeo(form) {
  const keyword = (form.focusKeyword || "").trim();
  const title = (form.metaTitle || form.title || "").trim();
  const description = (form.metaDescription || form.excerpt || "").trim();
  const slug = form.slug?.trim() ? slugify(form.slug) : slugify(form.title || "");
  const content = form.content || "";
  const wordCount = words(content).length;
  const firstWords = words(content).slice(0, 100).join(" ");
  const sentences = content.split(/[.!?]+\s/).filter((s) => words(s).length > 0);
  const avgSentence = sentences.length ? wordCount / sentences.length : 0;
  const takeaways = (form.keyTakeaways || []).filter((t) => t.trim());
  const faqs = (form.faqs || []).filter((f) => f.question?.trim() && f.answer?.trim());

  const checks = [];
  const add = (id, group, label, status, tip, weight = 1) => checks.push({ id, group, label, status, tip, weight });

  // ---------- SEO ----------
  add("keyword", "SEO", "Focus keyword is set", keyword ? "good" : "bad",
    "Pick the main search phrase people would type to find this post, e.g. “website cost in Chennai”.", 2);

  const tl = title.length;
  add("titleLength", "SEO", `SEO title length (${tl} characters)`,
    tl >= TITLE_RANGE[0] && tl <= TITLE_RANGE[1] ? "good" : tl > 0 && tl <= 70 ? "warn" : "bad",
    `Aim for ${TITLE_RANGE[0]}–${TITLE_RANGE[1]} characters so Google shows the whole title.`, 1.5);

  add("keywordTitle", "SEO", "Focus keyword appears in the SEO title",
    !keyword ? "bad" : containsKeyword(title, keyword) ? "good" : "bad",
    "Put the keyword near the start of the title.", 2);

  const dl = description.length;
  add("descLength", "SEO", `Meta description length (${dl} characters)`,
    dl >= DESC_RANGE[0] && dl <= DESC_RANGE[1] ? "good" : dl >= 70 && dl <= 180 ? "warn" : "bad",
    `Aim for ${DESC_RANGE[0]}–${DESC_RANGE[1]} characters: a one-sentence pitch for the post.`, 1.5);

  add("keywordDesc", "SEO", "Focus keyword appears in the meta description",
    !keyword ? "bad" : containsKeyword(description, keyword) ? "good" : "warn",
    "Mention the keyword naturally in the description.");

  add("keywordSlug", "SEO", "Web address (slug) contains the keyword",
    !keyword ? "bad" : slug.includes(slugify(keyword)) ? "good" : "warn",
    "Short slugs with the keyword work best, e.g. /blogs/website-cost-chennai.");

  add("keywordIntro", "SEO", "Keyword used in the first 100 words",
    !keyword ? "bad" : containsKeyword(firstWords, keyword) ? "good" : "warn",
    "Mention the keyword early so readers and search engines know the topic straight away.");

  add("length", "SEO", `Content length (${wordCount} words)`,
    wordCount >= 600 ? "good" : wordCount >= 300 ? "warn" : "bad",
    "Posts of 600+ words tend to rank better. Cover the topic fully.", 1.5);

  add("image", "SEO", "Cover image added", form.hasImage ? "good" : "warn",
    "A cover image improves clicks from Google and social shares.");

  add("tags", "SEO", "Tags added", (form.tags || "").trim() ? "good" : "warn",
    "Add 2–5 related topics as tags.", 0.5);

  add("readability", "SEO", `Readability (avg. ${Math.round(avgSentence) || 0} words per sentence)`,
    !wordCount ? "bad" : avgSentence <= 20 ? "good" : avgSentence <= 28 ? "warn" : "bad",
    "Keep sentences short (under 20 words) so people and AI can read them easily.");

  // ---------- AEO / GEO ----------
  add("takeaways", "AEO", `Key takeaways (${takeaways.length})`,
    takeaways.length >= 3 ? "good" : takeaways.length >= 1 ? "warn" : "bad",
    "Add 3–5 one-line answers. AI assistants (ChatGPT, Gemini, Perplexity) love quoting short, factual statements.", 1.5);

  add("faqs", "AEO", `FAQs (${faqs.length})`,
    faqs.length >= 3 ? "good" : faqs.length >= 1 ? "warn" : "bad",
    "Add 3+ real questions customers ask, with direct 1–3 sentence answers. These can appear in Google “People also ask” and AI answers.", 1.5);

  const shortAnswers = faqs.length > 0 && faqs.every((f) => words(f.answer).length <= 80);
  add("faqConcise", "AEO", "FAQ answers are concise",
    !faqs.length ? "warn" : shortAnswers ? "good" : "warn",
    "Start each answer with the direct answer, then add detail. Keep it under ~80 words.");

  const questionKeyword = faqs.some((f) => containsKeyword(f.question, keyword));
  add("faqKeyword", "AEO", "An FAQ question includes the focus keyword",
    !keyword || !faqs.length ? "warn" : questionKeyword ? "good" : "warn",
    "Phrase at least one question the way people ask it, e.g. “How much does a website cost in Chennai?”.");

  const hasNumbers = /\d/.test(content);
  add("facts", "AEO", "Content includes specific facts or numbers", hasNumbers ? "good" : "warn",
    "Concrete details (prices, timelines, stats, years of experience) make content more citable by AI engines.", 0.5);

  // Weighted score
  const value = { good: 1, warn: 0.5, bad: 0 };
  const total = checks.reduce((s, c) => s + c.weight, 0);
  const got = checks.reduce((s, c) => s + c.weight * value[c.status], 0);
  const score = Math.round((got / total) * 100);

  return { score, checks, slug };
}

export const scoreLabel = (score) =>
  score >= 80 ? { text: "Great", tone: "good" } : score >= 55 ? { text: "Needs work", tone: "warn" } : { text: "Poor", tone: "bad" };
