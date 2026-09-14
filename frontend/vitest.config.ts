import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      setupFiles: ['./src/__tests__/setup.ts'],
      exclude: [...configDefaults.exclude, 'e2e/**'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      // Node's own global `localStorage` (stable since Node 24) shadows jsdom's
      // window.localStorage in the test worker, leaving it undefined. Disable it
      // so jsdom's implementation is used instead.
      execArgv: ['--no-experimental-webstorage'],
    },
  }),
)
