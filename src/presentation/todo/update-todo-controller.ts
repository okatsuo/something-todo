import { Todo } from '.prisma/client'
import { IUpdateTodo, IUpdateTodoDb } from '../../domain/usecases/update-todo'

export class UpdateTodoController {
  constructor (
    private readonly updateTodo: IUpdateTodoDb
  ) {}

  async handle (id: number, todoData: IUpdateTodo): Promise<Todo> {
    return await this.updateTodo.update(id, todoData)
  }
}
