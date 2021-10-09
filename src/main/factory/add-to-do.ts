import { AddTodo } from '../../data/usecases/todo/add-todo'
import { TodoPostgresRepository } from '../../infra/db/postgres/todo-repository/todo'
import { AddTodoController } from '../../presentation/todo/todo-controller'

export const makeTodoController = (): AddTodoController => {
  const todoRepository = new TodoPostgresRepository()
  const todo = new AddTodo(todoRepository)
  return new AddTodoController(todo)
}
