import { defineConfig, mergeConfig } from 'vitest/config'

import viteConfig from './vite.config.ts'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      css: true,
      environment: 'happy-dom',
      globals: true,
      setupFiles: './vitest.setup.ts',
      coverage: {
        reporter: ['text', 'json', 'html', 'lcov'],
        reportsDirectory: 'coverage',
        provider: 'v8',
        all: true,
        exclude: [
          '**/*.{spec,test}.{ts,tsx}',
          '{postcss,tailwind,eslint,vite,vitest}.{config,setup}.{js,ts}',
          // Ignore chart from tests, since it uses a third part library anyway
          'src/components/atoms/chart.tsx',
          'src/vite-env.d.ts',
          'src/main.tsx',
          // TODO: ignore schema for now
          '**/schemas/*',
          'vite.config.ts',
          'sentry.config.ts',
          'mixpanel.config.ts',
        ],
      },
      include: ['**/*.{spec,test}.{ts,tsx}'],
      reporters: ['default'],
    },
  }),
)
