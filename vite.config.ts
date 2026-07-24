import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // This is the magic line! It tells Docker to expose the app to the browser.
    strictPort: true,
    port: 5173,
  }
})