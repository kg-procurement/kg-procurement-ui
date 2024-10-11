import { TESTING_URL } from '@/utils/common.ts'

export const API_BASE_URL = import.meta.vitest
  ? TESTING_URL
  : import.meta.env.VITE_API_BASE_URL
