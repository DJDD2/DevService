import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: false
  },
  server: {
    host: true,
    port: process.env.PORT,
    allowedHosts: [
      'devservice-zgns.onrender.com'
    ]
  }
})
