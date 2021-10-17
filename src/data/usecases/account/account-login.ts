import { inject, injectable } from 'tsyringe'
import { ILoginModel } from '../../../domain/models/login'
import { ILoadAccountByEmail } from '../../../domain/usecases/load-account-by-email'
import { IAccountLogin, ILogin } from '../../../domain/usecases/login'
import { IGenerateAccessToken } from '../../protocols/access-token'
import { IHashComparer } from '../../protocols/hashComparer'

@injectable()
export class AccountLogin implements IAccountLogin {
  constructor (
    @inject('AccountRepository')
    private readonly accountRepository: ILoadAccountByEmail,

    @inject('Encrypt')
    private readonly hashComparer: IHashComparer,

    @inject('AccessToken')
    private readonly acessToken: IGenerateAccessToken
  ) {}

  async login (accountData: ILogin): Promise<ILoginModel> {
    const account = await this.accountRepository.loadAccountByEmail((accountData.email))
    if (account) {
      const isValidPassword = await this.hashComparer.compare(accountData.password, account.password)
      if (isValidPassword) {
        const token = await this.acessToken.generate({ id: account.id, name: account.name, email: account.email })
        return {
          token,
          account
        }
      }
    }
    throw new Error('email or password incorrect')
  }
}
