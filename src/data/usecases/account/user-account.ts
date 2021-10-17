import { Account } from '.prisma/client'
import { inject, injectable } from 'tsyringe'
import { ILoadAccountByEmail } from '../../../domain/usecases/load-account-by-email'

@injectable()
export class UserAccount implements ILoadAccountByEmail {
  constructor (
    @inject('AccountRepository')
    private readonly account_repository: ILoadAccountByEmail
  ) {}

  async loadAccountByEmail (email: string): Promise<Account | null> {
    return await this.account_repository.loadAccountByEmail(email)
  }
}
