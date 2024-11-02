export interface Claims {
  sub: string
  exp: number
}

export function decodeToken(token: string): Claims | null {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]))
    return {
      sub: payload.sub,
      exp: payload.exp,
    }
  }
  catch (error) {
    console.error('Failed to decode token:', error)
    throw error
  }
}
