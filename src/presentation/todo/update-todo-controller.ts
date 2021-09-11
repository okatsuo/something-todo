import { TodoModel } from '../../domain/models/to-do'
import { IUpdateTodo, IUpdateTodoDb } from '../../domain/usecases/update-todo'
import { Controller } from '../protocols/controllers'

export class UpdateTodoController implements Controller {
  constructor (
    private readonly updateTodo: IUpdateTodoDb
  ) {}

  async handle (todoData: IUpdateTodo): Promise<TodoModel> {
    return await this.updateTodo.update(todoData)
  }
}
