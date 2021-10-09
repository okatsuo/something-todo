import { RemoveTodo } from '../../data/usecases/todo/remove-todo'
import { TodoPostgresRepository } from '../../infra/db/postgres/todo-repository/todo'
import { RemoveTodoController } from '../../presentation/todo/remove-todo-controller'

export const makeRemoveTodoController = (): RemoveTodoController => {
  const removeTodoRepository = new TodoPostgresRepository()
  const removeTodo = new RemoveTodo(removeTodoRepository)
  return new RemoveTodoController(removeTodo)
}
