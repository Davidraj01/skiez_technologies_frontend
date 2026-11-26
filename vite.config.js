import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  build: {
    target: "es2020",
    cssMinify: true,
    rollupOptions: {
      output: {
        // Split rarely-changing libraries into their own long-cached chunks so
        // repeat visits only re-download app code, and chunks load in parallel.
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (/[\/]node_modules[\/](react|react-dom|scheduler|react-router|react-router-dom)[\/]/.test(id)) return "react-vendor";
          if (/[\/]node_modules[\/](framer-motion|motion|motion-dom|motion-utils)[\/]/.test(id)) return "motion-vendor";
          if (/[\/]node_modules[\/](axios|@emailjs)[\/]/.test(id)) return "net-vendor";
        },
      },
    },
  },
});
