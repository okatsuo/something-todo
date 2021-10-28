import { Account } from '.prisma/client'
import { inject, injectable } from 'tsyringe'
import { IAddAccount, IDbAddAccount } from '../../domain/usecases/add-account'
import { IEmailValidator } from '../../validation/protocols/email-validator'

@injectable()
export class SignupController {
  constructor (
    @inject('EmailValidator')
    private readonly emailValidator: IEmailValidator,

    @inject('DatabaseAddAccount')
    private readonly addAccount: IDbAddAccount
  ) {}

  async handle (account: IAddAccount): Promise<Account> {
    const isValidEmail = this.emailValidator.isValid(account.email)
    if (!isValidEmail) { throw new Error('invalid email') }
    const user = await this.addAccount.add(account)
    return user
  }
}
