import { IAccountModel } from '../models/account'

export interface ILoadAccountByEmail {
  loadAccountByEmail: (email: string) => Promise<IAccountModel | undefined>
}
