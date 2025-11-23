import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// You do NOT need to import tailwindcss as a Vite plugin!
export default defineConfig({
  plugins: [react()],
})
