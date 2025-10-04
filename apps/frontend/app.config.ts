import { defineConfig } from '@solidjs/start/config'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // @ts-expect-error - types are wrong
  vite({ router }) {
    return {
      plugins: [tailwindcss()],
      server: router === 'client' ? {
        hmr: {
          port: 24678,
        },
      } : undefined,
    }
  },
})
