<<<<<<< HEAD
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({ plugins: [react()] })
=======
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// WebMuseum — Vite configuration
// Relative base so the static build works from any sub-path (e.g. GitHub Pages).
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './',
  build: {
    target: 'es2019',
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Keep the heavy 3D stack in its own lazily-loaded chunk.
        manualChunks: {
          three: ['three', '@react-three/fiber', '@react-three/drei'],
          animation: ['gsap', '@gsap/react'],
          vendor: ['react', 'react-dom', 'motion', 'lenis', 'lucide-react'],
        },
      },
    },
  },
});
>>>>>>> 10b01fe (Version 2.0)
