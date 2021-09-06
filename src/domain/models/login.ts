import { IAccountModel } from './account'

export interface ILoginModel {
  token: string
  account: IAccountModel
}
