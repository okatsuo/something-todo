import { AccountLogin } from '../../data/usecases/account/account-login'
import { AccessToken } from '../../infra/auth/access-token-adapter'
import { BcryptAdapter } from '../../infra/cryptografy/bcrypt-adapter'
import { AccountPostgresRepository } from '../../infra/db/postgres/account-repository/account'
import { SigninController } from '../../presentation/account/login-controller'
import { EmailValidator } from '../../validation/usecases/email-validator-adapter'

export const makeLoginController = (): SigninController => {
  const accessToken = new AccessToken()
  const hashComparer = new BcryptAdapter()
  const accountRepository = new AccountPostgresRepository()
  const accountLogin = new AccountLogin(accountRepository, hashComparer, accessToken)
  const emailValidator = new EmailValidator()
  return new SigninController(emailValidator, accountLogin)
}
