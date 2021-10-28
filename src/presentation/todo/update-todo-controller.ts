import { Todo } from '.prisma/client'
import { inject, injectable } from 'tsyringe'
import { IUpdateTodo, IUpdateTodoDb } from '../../domain/usecases/update-todo'

@injectable()
export class UpdateTodoController {
  constructor (
    @inject('DatabaseUpdateTodo')
    private readonly updateTodo: IUpdateTodoDb
  ) {}

  async handle (id: number, todoData: IUpdateTodo): Promise<Todo> {
    return await this.updateTodo.update(id, todoData)
  }
}
