import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/lost-found/", // Ensure correct paths for GitHub Pages
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Lost & Found PWA",
        short_name: "LostFound",
        description: "Track lost and found items",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        start_url: "/lost-found/",
        scope: "/lost-found/",
        icons: [
          {
            src: "/lost-found/icon-192x192.png", // 🔥 Fixed path
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/lost-found/icon-512x512.png", // 🔥 Fixed path
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      workbox: {
        globPatterns: ["**/*.{js,css,html,png,svg,ico,json}"], // 🔥 Corrected pattern
      },
    }),
  ],
  server: {
    proxy: {
      "/api": {
        target: "https://6747017738c8741641d503ba.mockapi.io/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
