import { LoadTodo } from '../../data/usecases/todo/load-todo'
import { TodoRepository } from '../../infra/db/mongodb/todo-repository/todo'
import { LoadTodoController } from '../../presentation/todo/load-todo-controller'

export const makeLoadTodoByUserIdController = (): LoadTodoController => {
  const loadTodoRepository = new TodoRepository()
  const loadTodo = new LoadTodo(loadTodoRepository)
  return new LoadTodoController(loadTodo)
}
