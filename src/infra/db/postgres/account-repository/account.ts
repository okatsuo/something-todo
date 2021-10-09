import { Account, PrismaClient } from '.prisma/client'
import { IAddAccount, IDbAddAccount } from '../../../../domain/usecases/add-account'
import { ILoadAccountByEmail } from '../../../../domain/usecases/load-account-by-email'

const prisma = new PrismaClient()
export class AccountPostgresRepository implements IDbAddAccount, ILoadAccountByEmail {
  async add (accountData: IAddAccount): Promise<Account> {
    const account = await prisma.account.create({ data: { ...accountData, active: false } })
    return account
  }

  async loadAccountByEmail (email: string): Promise<Account | null> {
    return await prisma.account.findFirst({ where: { email } })
  }
}
