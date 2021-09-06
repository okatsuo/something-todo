import jwt from 'jsonwebtoken'
import { AccessToken } from '../../../src/infra/auth/access-token-adapter'

jest.mock('jsonwebtoken', () => ({
  async sign (): Promise<string> {
    return await Promise.resolve('valid_access_token')
  }
}))

interface SutType {
  sut: AccessToken
}

const makeSut = (): SutType => {
  const sut = new AccessToken()
  return {
    sut
  }
}

describe('AcessToken', () => {
  test('should calls JWT with correct values ', async () => {
    const fakeData = {
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_mail@mail.com'
    }
    const { sut } = makeSut()
    const jwtSpy = jest.spyOn(jwt, 'sign')
    await sut.generate(fakeData)
    expect(jwtSpy).toBeCalledWith({ id: fakeData.id, name: fakeData.name, email: fakeData.email }, process.env.AUTH_KEY as string)
  })

  test('should return an AccessToken value on success', async () => {
    const fakeData = {
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_mail@mail.com'
    }
    const { sut } = makeSut()
    const accessToken = await sut.generate(fakeData)
    expect(accessToken).toBe('valid_access_token')
  })

  test('should throws if JWT lib throw', async () => {
    const fakeData = {
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_mail@mail.com'
    }
    const { sut } = makeSut()
    jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
      throw new Error('')
    })
    const promise = sut.generate(fakeData)
    await expect(promise).rejects.toThrow()
  })
})
