import { Account } from '.prisma/client'
import { inject, injectable } from 'tsyringe'
import { ILoadAccountByEmail } from '../../domain/usecases/load-account-by-email'

@injectable()
export class UserController {
  constructor (
    @inject('DatabaseUserAccount')
    private readonly user_account: ILoadAccountByEmail
  ) {}

  async handle (email: string): Promise<Account | null> {
    return await this.user_account.loadAccountByEmail(email)
  }
}
