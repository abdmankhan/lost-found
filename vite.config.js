import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base : '/lost-found/',
  plugins: [react()],
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
