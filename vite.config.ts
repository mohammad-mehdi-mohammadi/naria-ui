import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  // Configure plugins for Vite
  plugins: [
    // React plugin for Vite
    react(),
    // Plugin to generate TypeScript declaration files (d.ts)
    dts({
      // Specify the path to the build-specific tsconfig file
      tsconfigPath: "./tsconfig.build.json",
    }),
  ],
  // Build configuration options
  build: {
    // Library build options
    lib: {
      // Entry point for the library build
      entry: "lib/index.ts",
      // Function to determine the output file name based on the format
      fileName: (format) => `naria-ui.${format}.js`,
      // Output formats for the library
      formats: ["es", "cjs"],
    },
    // Rollup specific options (used under the hood by Vite)
    rollupOptions: {
      // Specify dependencies that should not be bundled into the library
      external: ["react", "react-dom"],
      // Output options for Rollup
      output: {
        // Configure global variables for external dependencies
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    // Empty the output directory before building
    emptyOutDir: true,
    // Do not copy the public directory to the output directory
    copyPublicDir: false,
    // Minify the output code
    minify: true,
  },
});
