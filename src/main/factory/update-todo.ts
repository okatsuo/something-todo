import { UpdateTodo } from '../../data/usecases/todo/update-todo'
import { TodoPostgresRepository } from '../../infra/db/postgres/todo-repository/todo'
import { UpdateTodoController } from '../../presentation/todo/update-todo-controller'

export const makeUpdateTodoController = (): UpdateTodoController => {
  const updateTodoRepository = new TodoPostgresRepository()
  const updateTodo = new UpdateTodo(updateTodoRepository)
  return new UpdateTodoController(updateTodo)
}
