import { validate } from 'email-validator'
import { IEmailValidator } from '../protocols/email-validator'

export class EmailValidator implements IEmailValidator {
  isValid (email: string): boolean {
    return validate(email)
  }
}
