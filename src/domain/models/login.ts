import { Account } from '.prisma/client'

export interface ILoginModel {
  token: string
  account: Account
}
