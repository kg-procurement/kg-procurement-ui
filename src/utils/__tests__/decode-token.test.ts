import { decodeToken } from '../decode-token.ts'
describe('decodeToken()', () => {
  it('should throw when given an invalid token', () => {
    const invalidToken = 'invalidToken'
    expect(() => decodeToken(invalidToken)).toThrowErrorMatchingInlineSnapshot(
      `[InvalidCharacterError: The string to be decoded is not correctly encoded.]`,
    )
  })
  it('should throw when given an invalid jwt', () => {
    const invalidJwt = 'some.invalid.jwt'
    expect(() => decodeToken(invalidJwt)).toThrowErrorMatchingInlineSnapshot(
      `[SyntaxError: Unexpected token  in JSON at position 0]`,
    )
  })
})
