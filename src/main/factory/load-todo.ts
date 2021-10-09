import { LoadTodo } from '../../data/usecases/todo/load-todo'
import { TodoPostgresRepository } from '../../infra/db/postgres/todo-repository/todo'
import { LoadTodoController } from '../../presentation/todo/load-todo-controller'

export const makeLoadTodoByUserIdController = (): LoadTodoController => {
  const loadTodoRepository = new TodoPostgresRepository()
  const loadTodo = new LoadTodo(loadTodoRepository)
  return new LoadTodoController(loadTodo)
}
