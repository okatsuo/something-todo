import { RemoveTodo } from '../../data/usecases/todo/remove-todo'
import { TodoRepository } from '../../infra/db/mongodb/todo-repository/todo'
import { RemoveTodoController } from '../../presentation/todo/remove-todo-controller'

export const makeRemoveTodoController = (): RemoveTodoController => {
  const removeTodoRepository = new TodoRepository()
  const removeTodo = new RemoveTodo(removeTodoRepository)
  return new RemoveTodoController(removeTodo)
}
