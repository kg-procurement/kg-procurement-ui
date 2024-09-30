import { defineConfig, mergeConfig } from 'vitest/config'

import viteConfig from './vite.config.ts'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      globals: true,
      setupFiles: './vitest.setup.ts',
      coverage: {
        reporter: ['text', 'json', 'html', 'lcov'],
        reportsDirectory: 'coverage',
        provider: 'v8',
        all: true,
        exclude: [
          '{postcss,tailwind,eslint,vite,vitest}.{config,setup}.{js,ts}',
          'src/vite-env.d.ts',
          'src/main.tsx',
        ],
      },
      include: ['**/*.{spec,test}.{ts,tsx}'],
      reporters: ['default'],
    },
  }),
)
