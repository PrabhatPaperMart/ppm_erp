import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteMockServe } from 'vite-plugin-mock';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  plugins: [
    react(),
    viteMockServe({
      mockPath: 'mock',
      localEnabled: true,
    })
  ],
  css: {
    postcss: './postcss.config.js',
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
