import { IAccountModel } from '../../domain/models/account'
import { IAddAccount, IDbAddAccount } from '../../domain/usecases/add-account'
import { IEmailValidator } from '../../validation/protocols/email-validator'

export class SignupController {
  constructor (
    private readonly emailValidator: IEmailValidator,
    private readonly addAccount: IDbAddAccount
  ) {}

  async handle (account: IAddAccount): Promise<IAccountModel> {
    const isValidEmail = this.emailValidator.isValid(account.email)
    if (!isValidEmail) { throw new Error('invalid email') }
    const user = await this.addAccount.add(account)
    return user
  }
}
