import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'https://my-portfolio-backend-nilc.onrender.com', // Update with your backend server URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '') // Remove '/api' prefix
      }
    }
  }
});
