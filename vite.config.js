import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@fonts": path.resolve(__dirname, "src/assets/fonts"),
      "@app": path.resolve(__dirname, "src/App"),
      "@core": path.resolve(__dirname, "src/App/core"),
      "@world": path.resolve(__dirname, "src/App/world"),
      "@house": path.resolve(__dirname, "src/App/world/housePlot/house"),
      "@styles": path.resolve(__dirname, "src/styles"),
    },
  },
  // server: {
  //   hmr: false,
  // },
});
