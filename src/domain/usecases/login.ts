import { ILoginModel } from '../models/login'

export interface ILogin {
  email: string
  password: string
}

export interface IAccountLogin {
  login: (values: ILogin) => Promise<ILoginModel>
}
