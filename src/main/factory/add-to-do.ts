import { Todo } from '../../data/usecases/to-do'
import { TodoRepository } from '../../infra/db/mongodb/todo-repository/todo'
import { TodoController } from '../../presentation/to-do/to-do-controller'

export const makeTodoController = (): TodoController => {
  const todoRepository = new TodoRepository()
  const todo = new Todo(todoRepository)
  return new TodoController(todo)
}
