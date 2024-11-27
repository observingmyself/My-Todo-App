import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true, // Adjust the Origin header to match the target URL
        rewrite: (path) => path.replace(/^\/api/, ""), // Optional: Remove `/api` prefix before forwarding
      },
    },
  },
});
