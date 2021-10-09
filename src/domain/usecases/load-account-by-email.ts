import { Account } from '.prisma/client'

export interface ILoadAccountByEmail {
  loadAccountByEmail: (email: string) => Promise<Account | null>
}
