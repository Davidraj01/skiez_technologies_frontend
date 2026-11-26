/**
 * Build-time pre-rendering entry (used by scripts/prerender.mjs, never shipped to browsers).
 * Renders a route to static HTML and returns the head tags the page asked for,
 * so crawlers that don't run JavaScript (most AI crawlers) still get full content.
 */
import React from "react";
import { prerenderToNodeStream } from "react-dom/static";
import { StaticRouter } from "react-router-dom";
import { AppProviders } from "./App.jsx";
import { headTagsToHtml } from "./lib/seo.jsx";

export async function render(url, seoSettings) {
  const collector = { head: null };
  const { prelude } = await prerenderToNodeStream(
    <StaticRouter location={url}>
      <AppProviders seoSettings={seoSettings} seoCollector={collector} />
    </StaticRouter>
  );

  let html = "";
  for await (const chunk of prelude) html += chunk;
  return { html, head: headTagsToHtml(collector.head) };
}
