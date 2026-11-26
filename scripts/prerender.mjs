/**
 * Build-time pre-rendering (runs after `vite build` + the SSR build, see package.json "build").
 *
 * Why: the site is a React single-page app, so its raw HTML is an empty <div id="root">.
 * Google runs JavaScript, but most AI crawlers (GPTBot, ClaudeBot, PerplexityBot…) and many
 * SEO/GEO tools don't. Pre-rendering writes real HTML — full text, headings, per-page title,
 * description, canonical URL and JSON-LD — for every main page.
 *
 * Output (dist/):
 *   index.html, services.html, about.html, …  pre-rendered pages (served at /, /services … via
 *                                             "cleanUrls" in vercel.json)
 *   app-shell.html                            empty shell for all other routes (blog posts, admin)
 *
 * SEO settings come from the live API when reachable at build time, otherwise from the
 * committed snapshot src/seo/settings.snapshot.json (refresh it with
 * `python execution/generate_seo_files.py`).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrDir = path.join(root, "dist-ssr");

const ROUTES = ["/", "/services", "/about", "/contact", "/blogs", "/gallery", "/privacy", "/terms"];

function readEnvApiUrl() {
  if (process.env.VITE_API_URL) return process.env.VITE_API_URL;
  try {
    const env = fs.readFileSync(path.join(root, ".env"), "utf8");
    return env.match(/^\s*VITE_API_URL\s*=\s*(\S+)/m)?.[1]?.replace(/^["']|["']$/g, "");
  } catch {
    return undefined;
  }
}

async function loadSettings() {
  const api = (readEnvApiUrl() || "").replace(/\/+$/, "");
  if (api && !/localhost|127\.0\.0\.1/.test(api)) {
    try {
      const res = await fetch(`${api}/seo/settings`, { signal: AbortSignal.timeout(8000) });
      if (res.ok) {
        console.log(`[prerender] SEO settings: live API (${api})`);
        return res.json();
      }
    } catch {
      /* fall through to snapshot */
    }
  }
  const snap = path.join(root, "src", "seo", "settings.snapshot.json");
  if (fs.existsSync(snap)) {
    console.log("[prerender] SEO settings: snapshot (src/seo/settings.snapshot.json)");
    return JSON.parse(fs.readFileSync(snap, "utf8"));
  }
  console.warn("[prerender] SEO settings: none found, using built-in fallbacks");
  return null;
}

const safeJson = (obj) => JSON.stringify(obj).replace(/</g, "\\u003c");

async function main() {
  const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
  if (!template.includes("<!--seo-start-->") || !template.includes('<div id="root"></div>')) {
    throw new Error("dist/index.html is missing the <!--seo-start--> markers or the empty #root div");
  }

  // Empty shell for every route that isn't pre-rendered (SPA fallback in vercel.json)
  fs.writeFileSync(path.join(dist, "app-shell.html"), template);

  const settings = await loadSettings();
  const { render } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);

  for (const route of ROUTES) {
    const { html, head } = await render(route, settings);
    const page = template
      .replace(/<!--seo-start-->[\s\S]*?<!--seo-end-->/, `<!--seo-start-->\n    ${head}\n    <!--seo-end-->`)
      .replace("</head>", `  <script>window.__SEO_SETTINGS__=${safeJson(settings)}</script>\n  </head>`)
      .replace('<div id="root"></div>', `<div id="root">${html}</div>`);

    const file = route === "/" ? "index.html" : `${route.slice(1)}.html`;
    fs.writeFileSync(path.join(dist, file), page);
    const words = html.replace(/<[^>]+>/g, " ").split(/\s+/).filter(Boolean).length;
    console.log(`[prerender] ${route.padEnd(10)} -> dist/${file.padEnd(14)} ${(page.length / 1024).toFixed(1)} KB, ~${words} words`);
  }

  fs.rmSync(ssrDir, { recursive: true, force: true });
}

main().catch((err) => {
  // Never block a deploy: fall back to the plain single-page app
  console.warn("[prerender] FAILED, deploying without pre-rendered pages:", err);
  try {
    const shell = path.join(dist, "app-shell.html");
    if (!fs.existsSync(shell)) fs.copyFileSync(path.join(dist, "index.html"), shell);
    fs.rmSync(ssrDir, { recursive: true, force: true });
  } catch {
    /* ignore */
  }
});
