import { Account } from '.prisma/client'

export interface IAddAccount {
  name: string
  email: string
  password: string
}
export interface IDbAddAccount {
  add: (account: IAddAccount) => Promise<Account>
}
