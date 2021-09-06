import { IAccessTokenInput } from '../../infra/auth/access-token-adapter'

export interface IGenerateAccessToken {
  generate: (data: IAccessTokenInput) => Promise<string>
}
