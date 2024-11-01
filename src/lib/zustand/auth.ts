import { create } from 'zustand'
import Cookies from 'js-cookie'
import { decodeToken } from '@/utils/decode-token'

export interface AuthStore {
  user_id: string | null
  expiration: number | null
  isAuthenticated: boolean
  token: string | null
  setToken: (token: string | null) => void
  login: (token: string) => void
  logout: () => void
}

const initialToken = Cookies.get('authToken')
const decoded = initialToken ? decodeToken(initialToken) : null

export const useAuthStore = create<AuthStore>((set) => ({
  user_id: decoded ? decoded.sub : null,
  expiration: decoded ? decoded.exp : null,
  isAuthenticated: !!decoded,
  token: initialToken || null,

  setToken: (token) => {
    if (token) {
      Cookies.set('authToken', token)
      const decoded = decodeToken(token)
      if (decoded) {
        set({
          token,
          user_id: decoded.sub,
          expiration: decoded.exp,
          isAuthenticated: true
        })
      }
    } else {
      Cookies.remove('authToken')
      set({
        token: null,
        user_id: null,
        expiration: null,
        isAuthenticated: false
      })
    }
  },

  login: (token) => {
    Cookies.set('authToken', token)
    const decoded = decodeToken(token)
    if (decoded) {
      set({
        token,
        user_id: decoded.sub,
        expiration: decoded.exp,
        isAuthenticated: true
      })
    }
  },

  logout: () => {
    Cookies.remove('authToken')
    set({
      user_id: null,
      expiration: null,
      token: null,
      isAuthenticated: false
    })
  }
}))
