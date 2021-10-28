import { Account } from '.prisma/client'
import { inject, injectable } from 'tsyringe'
import { IAddAccount, IDbAddAccount } from '../../../domain/usecases/add-account'
import { IEncrypter } from '../../protocols/encrypter'

@injectable()
export class DbAddAccount implements IDbAddAccount {
  constructor (
    @inject('Encrypt')
    private readonly encrypter: IEncrypter,

    @inject('AccountRepository')
    private readonly addAccountRepository: IDbAddAccount
  ) {}

  async add (account: IAddAccount): Promise<Account> {
    const hashedValue = await this.encrypter.encrypt(account.password)
    const repoAccount = await this.addAccountRepository.add({ ...account, password: hashedValue })
    return repoAccount
  }
}
