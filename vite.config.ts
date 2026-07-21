import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export defineConfig({
  plugins: [react()],
  base: '/BBDFAW/', // <-- Add this line right here
})