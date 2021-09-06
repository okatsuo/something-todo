import { ILoginModel } from '../../domain/models/login'
import { IAccountLogin, ILogin } from '../../domain/usecases/login'
import { IEmailValidator } from '../../validation/protocols/email-validator'

export class SigninController {
  constructor (
    private readonly emailValidator: IEmailValidator,
    private readonly accountLogin: IAccountLogin
  ) {}

  async handle (values: ILogin): Promise<ILoginModel> {
    const isValidEmail = this.emailValidator.isValid(values.email)
    if (!isValidEmail) { throw new Error('invalid email') }
    return await this.accountLogin.login(values)
  }
}
