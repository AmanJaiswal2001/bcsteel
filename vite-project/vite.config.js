import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/', // Relative paths use karo
  
  build: {
    outDir: 'dist', // Build folder name
    assetsDir: 'assets', // Assets folder name
    sourcemap: false, // Production mein sourcemap nahi chahiye
    minify: 'terser', // Code minify karo
    rollupOptions: {
      output: {
        // Asset file names consistent rakho
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      }
    }
  },
  
  // Development server settings (optional)
  server: {
    port: 8000,
    host: true // Network access ke liye
  },
  
  // Preview server settings (optional)
  preview: {
    port: 4173,
    host: true
  }
})
