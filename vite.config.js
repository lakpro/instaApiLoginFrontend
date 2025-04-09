import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { resolve } from "path";
import { copyFileSync } from "fs";

export default defineConfig({
  plugins: [tailwindcss(), react()],
  build: {
    rollupOptions: {
      // optional config
    },
    outDir: "dist",
  },
  // Copy _redirects after build
  closeBundle: () => {
    copyFileSync(resolve("public/_redirects"), resolve("dist/_redirects"));
  },
});
