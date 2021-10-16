import { container } from 'tsyringe'
import { LoadTodo } from '../../data/usecases/todo/load-todo'
import { TodoPostgresRepository } from '../../infra/db/postgres/todo-repository/todo'

const registeredContainers = {
  repository_todo: 'RepositoryTodo',
  database_load_todo: 'DatabaseLoadTodo'
}

container.register(
  registeredContainers.repository_todo,
  TodoPostgresRepository
)

container.register(
  registeredContainers.database_load_todo,
  LoadTodo
)
