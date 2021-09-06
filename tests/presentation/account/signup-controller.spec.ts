import { IAccountModel } from '../../../src/domain/models/account'
import { IAddAccount, IDbAddAccount } from '../../../src/domain/usecases/add-account'
import { SignupController } from '../../../src/presentation/account/signup-controller'
import { IEmailValidator } from '../../../src/validation/protocols/email-validator'

const makeEmailValidatorStub = (): IEmailValidator => {
  class EmailValidatorStub implements IEmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeAddAccountStub = (): IDbAddAccount => {
  class DbAddAccountStub implements IDbAddAccount {
    async add (account: IAddAccount): Promise<IAccountModel> {
      return {
        id: 'valid_id',
        name: account.name,
        email: account.email,
        password: account.password
      }
    }
  }
  return new DbAddAccountStub()
}

interface ISutType {
  sut: SignupController
  emailValidatorStub: IEmailValidator
  dbAddAccountStub: IDbAddAccount
}

const makeSut = (): ISutType => {
  const emailValidatorStub = makeEmailValidatorStub()
  const dbAddAccountStub = makeAddAccountStub()
  const sut = new SignupController(emailValidatorStub, dbAddAccountStub)

  return {
    emailValidatorStub,
    dbAddAccountStub,
    sut
  }
}

describe('Sign Up', () => {
  test('should throw if invalid email is provided', async () => {
    const fakeAccount: IAddAccount = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }
    const { emailValidatorStub, sut } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    await expect(async () => { await sut.handle(fakeAccount) }).rejects.toThrow(Error('invalid email'))
  })

  test('shouldnt throw if valid email is provided', async () => {
    const fakeAccount: IAddAccount = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }
    const { sut } = makeSut()

    expect(async () => { await sut.handle(fakeAccount) }).not.toThrow()
  })

  test('should call dbAddAccount with correct values', async () => {
    const fakeAccount: IAddAccount = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }

    const { dbAddAccountStub, sut } = makeSut()
    const dbAddAccountSpy = jest.spyOn(dbAddAccountStub, 'add')

    await sut.handle(fakeAccount)
    expect(dbAddAccountSpy).toBeCalledWith(fakeAccount)
  })

  test('should return with correct values', async () => {
    const fakeAccount: IAddAccount = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }
    const { sut } = makeSut()
    const userAccount = await sut.handle(fakeAccount)
    expect(userAccount).toEqual(
      {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email@mail.com',
        password: 'valid_password'
      }
    )
  })
})
