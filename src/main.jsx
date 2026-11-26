import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

const container = document.getElementById("root");
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Pages pre-rendered at build time (scripts/prerender.mjs) already contain their HTML:
// hydrate it in place. Other routes (blog posts, admin) start empty and render normally.
if (container.hasChildNodes()) {
  hydrateRoot(container, app, {
    // A mismatch makes React re-render on the client; log it instead of failing silently
    onRecoverableError: (err) => console.warn("Hydration fallback:", err?.message || err),
  });
} else {
  createRoot(container).render(app);
}
