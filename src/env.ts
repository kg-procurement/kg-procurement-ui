export const API_BASE_URL =
  import.meta.vitest || process.env.NODE_ENV === 'test'
    ? 'https://www.kg-procurement-testing.com'
    : import.meta.env.VITE_API_BASE_URL
