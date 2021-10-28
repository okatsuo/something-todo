import { container } from 'tsyringe'
import { EmailValidator } from '../../../validation/usecases/email-validator-adapter'

const validation_containers = {
  email_validator: 'EmailValidator'
}

export const registerValidationContainer = (): void => {
  container.register(
    validation_containers.email_validator,
    EmailValidator
  )
}
