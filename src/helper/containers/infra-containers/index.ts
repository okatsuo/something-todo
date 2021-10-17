import { container } from 'tsyringe'
import { AccessToken } from '../../../infra/auth/access-token-adapter'
import { BcryptAdapter } from '../../../infra/cryptografy/bcrypt-adapter'
import { AccountPostgresRepository } from '../../../infra/db/postgres/account-repository/account'
import { TodoPostgresRepository } from '../../../infra/db/postgres/todo-repository/todo'

const infra_containers = {
  todo_repository: 'TodoRepository',
  account_repository: 'AccountRepository',
  encrypter: 'Encrypt',
  access_token: 'AccessToken'
}

export const registerInfraContainers = (): void => {
  container.register(
    infra_containers.todo_repository,
    TodoPostgresRepository
  )

  container.register(
    infra_containers.account_repository,
    AccountPostgresRepository
  )

  container.register(
    infra_containers.encrypter,
    BcryptAdapter
  )

  container.register(
    infra_containers.access_token,
    AccessToken
  )
}
