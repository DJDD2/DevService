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
      'landing-zme2.onrender.com' // 👈 agrega tu dominio de Render aquí
    ]
  }
})
