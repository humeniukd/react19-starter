import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(async () => {
  const plugins = [react()]

  return {
    plugins,
    build: {
      rollupOptions: {
        output: {
          entryFileNames: `[name].mjs`,
        },
      },
    },
  }
})