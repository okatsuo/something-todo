import { EmailValidator } from '../../src/validation/usecases/email-validator-adapter'

describe('Email validator', () => {
  test('should return false if invalid email is provided', () => {
    const sut = new EmailValidator()
    expect(sut.isValid('invalid_email')).toBe(false)
    expect(sut.isValid('invalid_email@')).toBe(false)
    expect(sut.isValid('invalid_email@hotmail')).toBe(false)
    expect(sut.isValid('invalid_email@.com')).toBe(false)
    expect(sut.isValid('invalid_email.com')).toBe(false)
    expect(sut.isValid('@mail.com')).toBe(false)
  })
  test('should return true if valid email is provided', () => {
    const sut = new EmailValidator()
    const isValid = sut.isValid('valid_email@mail.com')
    expect(isValid).toBe(true)
  })
})
