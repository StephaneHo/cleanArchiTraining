import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@foodsapp/domain": path.resolve("./src/domain"),
      "@foodsapp/models": path.resolve("./src/application/models"),
      "@foodsapp/usecases": path.resolve("./src/application/usecases"),
      "@foodsapp/infrastructure": path.resolve("./src/infrastructure"),
      "@foodsapp/components": path.resolve("./src/userinterface/components"),
      "@foodsapp/pages": path.resolve("./src/userinterface/pages"),
      "@foodsapp/di": path.resolve("./src/di"),
      "@foodsapp/store": path.resolve("./src/store/store"),
      "@foodsapp/utils": path.resolve("./src/utils"),
      "@foodsapp/adapters": path.resolve("./src/adapters"),
    },
  },
});
