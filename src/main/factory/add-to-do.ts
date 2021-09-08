import { AddTodo } from '../../data/usecases/todo/add-todo'
import { TodoRepository } from '../../infra/db/mongodb/todo-repository/todo'
import { AddTodoController } from '../../presentation/todo/todo-controller'

export const makeTodoController = (): AddTodoController => {
  const todoRepository = new TodoRepository()
  const todo = new AddTodo(todoRepository)
  return new AddTodoController(todo)
}
