import { UpdateTodo } from '../../data/usecases/todo/update-todo'
import { TodoRepository } from '../../infra/db/mongodb/todo-repository/todo'
import { UpdateTodoController } from '../../presentation/todo/update-todo-controller'

export const makeUpdateTodoController = (): UpdateTodoController => {
  const updateTodoRepository = new TodoRepository()
  const updateTodo = new UpdateTodo(updateTodoRepository)
  return new UpdateTodoController(updateTodo)
}
