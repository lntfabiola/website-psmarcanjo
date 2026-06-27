import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/liturgia-diaria': {
        target: 'https://api-liturgia-diaria.vercel.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/liturgia-diaria/, '')
      }
    }
  }
})
