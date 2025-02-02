import react from '@vitejs/plugin-react'
import { viteMockServe } from 'vite-plugin-mock';
import { defineConfig } from 'vite'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';


export default defineConfig({
  plugins: [
    react(),
    viteMockServe({
      mockPath: 'mock',
      localEnabled: true,
      prodEnabled: false,
      supportTs: false,
      logger: true,
      injectCode: `
        import { setupProdMockServer } from './mock/index';
        setupProdMockServer();
      `,
    }),
  ],
  server: {
    port: 3000,
  },
  css: {
    postcss: './postcss.config.js',
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
})
