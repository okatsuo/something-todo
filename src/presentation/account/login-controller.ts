import { inject, injectable } from 'tsyringe'
import { ILoginModel } from '../../domain/models/login'
import { IAccountLogin, ILogin } from '../../domain/usecases/login'
import { IEmailValidator } from '../../validation/protocols/email-validator'

@injectable()
export class SigninController {
  constructor (
    @inject('EmailValidator')
    private readonly emailValidator: IEmailValidator,

    @inject('DatabaseAccountLogin')
    private readonly accountLogin: IAccountLogin
  ) {}

  async handle (values: ILogin): Promise<ILoginModel> {
    const isValidEmail = this.emailValidator.isValid(values.email)
    if (!isValidEmail) { throw new Error('invalid email') }
    return await this.accountLogin.login(values)
  }
}
