import { Todo } from '.prisma/client'
import { IUpdateTodo, IUpdateTodoDb } from '../../../domain/usecases/update-todo'

export class UpdateTodo implements IUpdateTodoDb {
  constructor (
    private readonly updateTodoRepository: IUpdateTodoDb
  ) {}

  async update (id: number, todoData: IUpdateTodo): Promise<Todo> {
    return await this.updateTodoRepository.update(id, todoData)
  }
}
