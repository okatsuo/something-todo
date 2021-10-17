import { Todo } from '.prisma/client'
import { inject, injectable } from 'tsyringe'
import { IUpdateTodo, IUpdateTodoDb } from '../../../domain/usecases/update-todo'

@injectable()
export class UpdateTodo implements IUpdateTodoDb {
  constructor (
    @inject('TodoRepository')
    private readonly updateTodoRepository: IUpdateTodoDb
  ) {}

  async update (id: number, todoData: IUpdateTodo): Promise<Todo> {
    return await this.updateTodoRepository.update(id, todoData)
  }
}
