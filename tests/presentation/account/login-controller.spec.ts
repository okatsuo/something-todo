import { ILoginModel } from '../../../src/domain/models/login'
import { IAccountLogin, ILogin } from '../../../src/domain/usecases/login'
import { SigninController } from '../../../src/presentation/account/login-controller'
import { IEmailValidator } from '../../../src/validation/protocols/email-validator'

const makeEmailValidatorStub = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeAccountLoginStub = (): IAccountLogin => {
  class AccountLoginStub implements IAccountLogin {
    async login (values: ILogin): Promise<ILoginModel> {
      return {
        token: 'valid_token',
        account: {
          id: 'valid_id',
          name: 'valid_name',
          email: 'valid_email',
          password: 'hashed_password'
        }
      }
    }
  }
  return new AccountLoginStub()
}

interface SutTypes {
  sut: SigninController
  emailValidatorStub: IEmailValidator
  accountLoginStub: IAccountLogin
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidatorStub()
  const accountLoginStub = makeAccountLoginStub()
  const sut = new SigninController(emailValidatorStub, accountLoginStub)
  return {
    sut,
    accountLoginStub,
    emailValidatorStub
  }
}

describe('Login', () => {
  test('should calls emailValidator with correct values', async () => {
    const fakeLogin: ILogin = {
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }
    const { sut, emailValidatorStub } = makeSut()
    const emailValidatorSpy = jest.spyOn(emailValidatorStub, 'isValid')
    await sut.handle(fakeLogin)
    expect(emailValidatorSpy).toBeCalledWith('valid_email@mail.com')
  })

  test('should throw if email is invalid', async () => {
    const fakeLogin: ILogin = {
      email: 'invalid_email@mail.com',
      password: 'valid_password'
    }
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const promise = sut.handle(fakeLogin)
    await expect(promise).rejects.toThrow(Error('invalid email'))
  })

  test('should call the login with correct values ', async () => {
    const fakeLogin: ILogin = {
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }
    const { sut, accountLoginStub } = makeSut()
    const accountLoginSpy = jest.spyOn(accountLoginStub, 'login')
    await sut.handle(fakeLogin)
    expect(accountLoginSpy).toBeCalledWith(fakeLogin)
  })

  test('should throw if accountLogin throws', async () => {
    const fakeLogin: ILogin = {
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }
    const { sut, accountLoginStub } = makeSut()
    jest.spyOn(accountLoginStub, 'login').mockImplementationOnce(() => { throw new Error('') })
    const promise = sut.handle(fakeLogin)
    await expect(promise).rejects.toThrow()
  })

  test('should return an token and account if is valid mail', async () => {
    const fakeLogin: ILogin = {
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }
    const { sut } = makeSut()
    const loginData = await sut.handle(fakeLogin)
    expect(loginData).toEqual({
      token: 'valid_token',
      account: {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email',
        password: 'hashed_password'
      }
    })
  })
})
