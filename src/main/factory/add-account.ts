import { DbAddAccount } from '../../data/usecases/account/db-add-account'
import { BcryptAdapter } from '../../infra/cryptografy/bcrypt-adapter'
import { AccountPostgresRepository } from '../../infra/db/postgres/account-repository/account'
import { SignupController } from '../../presentation/account/signup-controller'
import { EmailValidator } from '../../validation/usecases/email-validator-adapter'

export const makeAddAccountController = (): SignupController => {
  const addAccountPostgres = new AccountPostgresRepository()
  const bcryptAdapter = new BcryptAdapter()
  const dbAddAccount = new DbAddAccount(bcryptAdapter, addAccountPostgres)
  const emailValidator = new EmailValidator()
  return new SignupController(emailValidator, dbAddAccount)
}
