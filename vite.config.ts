import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    dts({
      tsconfigPath: "./tsconfig.build.json",
    }),
  ],

  build: {
    lib: {
      entry: "lib/index.ts",
      fileName: (format) =>
          format === "es"
              ? "naria-ui.es.js"
              : "naria-ui.cjs",
      formats: ["es", "cjs"],
    },

    rollupOptions: {
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
      ],
    },

    emptyOutDir: true,
    copyPublicDir: true,
    minify: true,
  },
});