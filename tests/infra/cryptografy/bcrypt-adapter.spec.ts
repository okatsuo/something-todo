import { BcryptAdapter } from '../../../src/infra/cryptografy/bcrypt-adapter'
import bcrypt from 'bcrypt'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return await Promise.resolve('hashed_value')
  }
}))
const salt = 12

interface SutType {
  sut: BcryptAdapter
}

const makeSut = (): SutType => {
  const sut = new BcryptAdapter()
  return {
    sut
  }
}

describe('Bcrypt adapter', () => {
  test('should call bcrypt with correct values', async () => {
    const { sut } = makeSut()
    const bcryptSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('valid_value')
    expect(bcryptSpy).toBeCalledWith('valid_value', salt)
  })

  test('should return hashed value on success', async () => {
    const { sut } = makeSut()
    const hashedValue = await sut.encrypt('valid_value')
    expect(hashedValue).toBe('hashed_value')
  })

  test('should throws if bcrypt lib throw', async () => {
    const { sut } = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => {
      throw new Error('')
    })
    const promise = sut.encrypt('valid_value')
    await expect(promise).rejects.toThrow()
  })
})
