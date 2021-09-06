import { IGenerateAccessToken } from '../../src/data/protocols/access-token'
import { IHashComparer } from '../../src/data/protocols/hashComparer'
import { AccountLogin } from '../../src/data/usecases/account-login'
import { IAccountModel } from '../../src/domain/models/account'
import { ILoadAccountByEmail } from '../../src/domain/usecases/load-account-by-email'
import { ILogin } from '../../src/domain/usecases/login'
import { IAccessTokenInput } from '../../src/infra/auth/access-token-adapter'

const makeAccountRepository = (): ILoadAccountByEmail => {
  class AccountRepository implements ILoadAccountByEmail {
    async loadAccountByEmail (email: string): Promise<IAccountModel> {
      return {
        id: 'valid_id',
        email: 'valid_email@mail.com',
        name: 'valid_name',
        password: 'valid_password'
      }
    }
  }
  return new AccountRepository()
}

const makeHashComparerStub = (): IHashComparer => {
  class HashCompararStub implements IHashComparer {
    async compare (value: string): Promise<boolean> {
      return true
    }
  }
  return new HashCompararStub()
}

const makeAccessTokenStub = (): IGenerateAccessToken => {
  class AcessTokenStub implements IGenerateAccessToken {
    async generate (data: IAccessTokenInput): Promise<string> {
      return 'valid_token'
    }
  }
  return new AcessTokenStub()
}

interface SutType {
  sut: AccountLogin
  accountRepositoryStub: ILoadAccountByEmail
  hashComparer: IHashComparer
  accessToken: IGenerateAccessToken
}

const makeSut = (): SutType => {
  const accessToken = makeAccessTokenStub()
  const hashComparer = makeHashComparerStub()
  const accountRepositoryStub = makeAccountRepository()
  const sut = new AccountLogin(accountRepositoryStub, hashComparer, accessToken)
  return {
    sut,
    accountRepositoryStub,
    hashComparer,
    accessToken
  }
}

describe('Account login', () => {
  test('should call loadAccountByEmail with correct email', async () => {
    const fakeLogin: ILogin = {
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }
    const { sut, accountRepositoryStub } = makeSut()
    const accountRepositorySpy = jest.spyOn(accountRepositoryStub, 'loadAccountByEmail')
    await sut.login(fakeLogin)
    expect(accountRepositorySpy).toBeCalledWith(fakeLogin.email)
  })

  test('should throw if loadAccountByEmail throws', async () => {
    const fakeLogin: ILogin = {
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }
    const { sut, accountRepositoryStub } = makeSut()
    jest.spyOn(accountRepositoryStub, 'loadAccountByEmail').mockImplementationOnce(() => {
      throw new Error('')
    })
    const promise = sut.login(fakeLogin)
    await expect(promise).rejects.toThrow()
  })

  test('should call hashComparer with correct values', async () => {
    const fakeLogin: ILogin = {
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }
    const { sut, hashComparer, accountRepositoryStub } = makeSut()
    const hashComparerSpy = jest.spyOn(hashComparer, 'compare')
    const account = await accountRepositoryStub.loadAccountByEmail(fakeLogin.email)
    await sut.login(fakeLogin)
    expect(hashComparerSpy).toBeCalledWith(fakeLogin.password, account?.password)
  })

  test('should throw if hashComparer throws', async () => {
    const fakeLogin: ILogin = {
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }
    const { sut, hashComparer } = makeSut()
    jest.spyOn(hashComparer, 'compare').mockImplementationOnce(() => {
      throw new Error('')
    })
    const promise = sut.login(fakeLogin)
    await expect(promise).rejects.toThrow()
  })

  test('should call generate token with correct values', async () => {
    const fakeLogin: ILogin = {
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }
    const { sut, accountRepositoryStub, accessToken } = makeSut()
    const accessTokenSpy = jest.spyOn(accessToken, 'generate')
    const account = await accountRepositoryStub.loadAccountByEmail(fakeLogin.email)
    await sut.login(fakeLogin)
    expect(accessTokenSpy).toBeCalledWith({ id: account?.id, name: account?.name, email: fakeLogin.email })
  })

  test('should throw if accessToken throws', async () => {
    const fakeLogin: ILogin = {
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }
    const { sut, accessToken } = makeSut()
    jest.spyOn(accessToken, 'generate').mockImplementationOnce(() => {
      throw new Error('')
    })
    const promise = sut.login(fakeLogin)
    await expect(promise).rejects.toThrow()
  })

  test('should return login with a token and user data', async () => {
    const fakeLogin: ILogin = {
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }

    const { sut } = makeSut()
    const loginData = await sut.login(fakeLogin)
    expect(loginData).toEqual(
      {
        token: 'valid_token',
        account: {
          id: 'valid_id',
          email: 'valid_email@mail.com',
          name: 'valid_name',
          password: 'valid_password'
        }
      }
    )
  })
})
