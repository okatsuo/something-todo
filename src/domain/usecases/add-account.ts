import { Account } from '.prisma/client'

export interface IAddAccount {
  name: string
  email: string
  password: string
  active: boolean
}

export interface IDbAddAccount {
  add: (account: IAddAccount) => Promise<Account>
}
