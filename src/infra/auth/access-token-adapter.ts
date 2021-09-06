
import jwt from 'jsonwebtoken'
import { IGenerateAccessToken } from '../../data/protocols/access-token'

export interface IAccessTokenInput {
  id: string
  name: string
  email: string
}

export class AccessToken implements IGenerateAccessToken {
  async generate (data: IAccessTokenInput): Promise<string> {
    return jwt.sign(data, process.env.AUTH_KEY as string)
  }
}
