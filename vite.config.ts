/// <reference types="vitest/config" />
import path from 'node:path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig(() => ({
  base: process.env.GITHUB_PAGES === 'true' ? '/react-rich-text/' : '/',
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
  server: {
    port: 5011,
    strictPort: true,
  },
  test: {
    environment: 'node',
    globals: true,
  },
}))
