import { IEncrypter } from '../../src/data/protocols/encrypter'
import { DbAddAccount } from '../../src/data/usecases/db-add-account'
import { IAccountModel } from '../../src/domain/models/account'
import { IAddAccount, IDbAddAccount } from '../../src/domain/usecases/add-account'

const makeEncrypterStub = (): IEncrypter => {
  class EncrypterStub implements IEncrypter {
    async encrypt (value: string): Promise<string> {
      return await Promise.resolve('hashed_password')
    }
  }
  return new EncrypterStub()
}

const makeDbAddAccountRepoStub = (): IDbAddAccount => {
  class AddAccountRepoStub implements IDbAddAccount {
    async add (account: IAddAccount): Promise<IAccountModel> {
      return await Promise.resolve({ ...account, id: 'valid_id' })
    }
  }
  return new AddAccountRepoStub()
}

interface SutType {
  sut: DbAddAccount
  encrypterStub: IEncrypter
  DbAddAccountRepoStub: IDbAddAccount
}

const makeSut = (): SutType => {
  const encrypterStub = makeEncrypterStub()
  const DbAddAccountRepoStub = makeDbAddAccountRepoStub()
  const sut = new DbAddAccount(encrypterStub, DbAddAccountRepoStub)
  return {
    sut,
    encrypterStub,
    DbAddAccountRepoStub
  }
}

describe('DbAddAccount', () => {
  test('should call encrypter with correct values', async () => {
    const { sut, encrypterStub } = makeSut()
    const encrypterSpy = jest.spyOn(encrypterStub, 'encrypt')
    const fakeAccount: IAddAccount = {
      name: 'valid_name',
      email: 'valid_mail@mail.com',
      password: 'valid_password'
    }
    await sut.add(fakeAccount)
    expect(encrypterSpy).toBeCalledWith('valid_password')
  })

  test('it should throws if Encrypter throws', async () => {
    const { sut, encrypterStub } = makeSut()
    jest.spyOn(encrypterStub, 'encrypt').mockReturnValueOnce(
      Promise.reject(new Error())
    )
    const account = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }
    const promise = sut.add(account)
    await expect(promise).rejects.toThrow()
  })

  test('should throws if dbAddAccountRepo throws', async () => {
    const { sut, DbAddAccountRepoStub } = makeSut()
    jest.spyOn(DbAddAccountRepoStub, 'add').mockReturnValueOnce(
      Promise.reject(new Error())
    )

    const account: IAddAccount = {
      name: 'valid_name',
      email: 'valid_email@mail.com',
      password: 'valid_password'
    }
    const promise = sut.add(account)
    await expect(promise).rejects.toThrow()
  })

  test('should call addAccountRepo with correct values', async () => {
    const { sut, DbAddAccountRepoStub } = makeSut()
    const addAccountRepoSpy = jest.spyOn(DbAddAccountRepoStub, 'add')
    const fakeAccount: IAddAccount = {
      name: 'valid_name',
      email: 'valid_mail@mail.com',
      password: 'valid_password'
    }
    await sut.add(fakeAccount)
    expect(addAccountRepoSpy).toBeCalledWith({ ...fakeAccount, password: 'hashed_password' })
  })

  test('should return with correct values', async () => {
    const { sut } = makeSut()
    const fakeAccount: IAddAccount = {
      name: 'valid_name',
      email: 'valid_mail@mail.com',
      password: 'valid_password'
    }
    const repoAccount = await sut.add(fakeAccount)
    expect(repoAccount).toEqual({ ...fakeAccount, id: 'valid_id', password: 'hashed_password' })
  })
})
