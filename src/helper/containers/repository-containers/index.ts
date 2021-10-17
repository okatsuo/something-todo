import { container } from 'tsyringe'
import { TodoPostgresRepository } from '../../../infra/db/postgres/todo-repository/todo'

export const repositoryContainers = {
  todo_repository: 'TodoRepository'
}

export const registerRepositoryContainers = (): void => {
  container.register(
    repositoryContainers.todo_repository,
    TodoPostgresRepository
  )
}
