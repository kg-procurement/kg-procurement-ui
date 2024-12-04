import Cookies from 'js-cookie'
import { create } from 'zustand'

import { decodeToken } from '@/utils/decode-token.ts'

export const AUTH_COOKIE_KEY = 'kg-procurement_access-token'

export interface AuthStore {
  userId?: string
  expiration?: number
  isAuthenticated?: boolean
  token?: string
  login: (token: string) => void
  logout: () => void
  _setUserIdTestOnly: (userId?: string) => void
}

const initialToken = Cookies.get(AUTH_COOKIE_KEY)
const decoded = initialToken ? decodeToken(initialToken) : undefined

export const useAuthStore = create<AuthStore>(set => ({
  userId: decoded?.sub,
  expiration: decoded?.exp,
  isAuthenticated: !!decoded,
  token: initialToken,
  login: (token) => {
    Cookies.set(AUTH_COOKIE_KEY, token)
    const decoded = decodeToken(token)
    if (decoded) {
      set({
        token,
        userId: decoded.sub,
        expiration: decoded.exp,
        isAuthenticated: true,
      })
    }
  },
  logout: () => {
    Cookies.remove(AUTH_COOKIE_KEY)
    set({
      userId: undefined,
      expiration: undefined,
      token: undefined,
      isAuthenticated: false,
    })
  },
  _setUserIdTestOnly: (userId?: string) => {
    set(prev => ({
      ...prev,
      userId,
    }))
  },
}))
