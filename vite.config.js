import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@fonts": path.resolve(__dirname, "src/assets/fonts"),
    },
  },
  // server: {
  //   hmr: false,
  // },
});
