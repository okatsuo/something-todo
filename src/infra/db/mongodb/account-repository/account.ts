import { IAccountModel } from '../../../../domain/models/account'
import { IAddAccount, IDbAddAccount } from '../../../../domain/usecases/add-account'
import { ILoadAccountByEmail } from '../../../../domain/usecases/load-account-by-email'
import { AccountEntity } from '../../entity/account'

export class AccountMongoRepository implements IDbAddAccount, ILoadAccountByEmail {
  async add (accountData: IAddAccount): Promise<IAccountModel> {
    const account = AccountEntity.create(accountData)
    await account.save()
    return account
  }

  async loadAccountByEmail (email: string): Promise<IAccountModel | undefined> {
    return await AccountEntity.findOne({ where: { email } })
  }
}
