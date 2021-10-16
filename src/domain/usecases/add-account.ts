import { Account } from '.prisma/client'

export interface IAddAccount {
  name: string
  email: string
  password: string
  active: boolean | null
}

export interface IDbAddAccount {
  add: (account: IAddAccount) => Promise<Account>
}
