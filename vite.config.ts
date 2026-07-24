import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: './', // Ensures relative asset paths work on GitHub Pages subfolder (/BBDFAW/)
  plugins: [react()],
  server: {
    host: true, // Expose app for container / dev server
    strictPort: true,
    port: 5173,
  }
})