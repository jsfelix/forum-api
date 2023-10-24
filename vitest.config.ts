import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
  },
  resolve: {
    alias: {
      '@test': path.resolve(__dirname, './test'),
      '@': path.resolve(__dirname, './src'),
    },
  },
})
