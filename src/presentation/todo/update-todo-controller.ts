import { Todo } from '.prisma/client'
import { IUpdateTodo, IUpdateTodoDb } from '../../domain/usecases/update-todo'
import { Controller } from '../protocols/controllers'

export class UpdateTodoController implements Controller {
  constructor (
    private readonly updateTodo: IUpdateTodoDb
  ) {}

  async handle (todoData: IUpdateTodo): Promise<Todo> {
    return await this.updateTodo.update(todoData)
  }
}
