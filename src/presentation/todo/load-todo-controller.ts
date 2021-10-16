import { Todo } from '.prisma/client'
import { inject, injectable } from 'tsyringe'
import { ILoadDbTodo, ILoadTodo } from '../../domain/usecases/loadTodo'
import { Controller } from '../protocols/controllers'

@injectable()
export class LoadTodoController implements Controller {
  constructor (
    @inject('DatabaseLoadTodo')
    private readonly loadTodo: ILoadDbTodo
  ) {}

  async handle (data: ILoadTodo): Promise<Todo[]> {
    return await this.loadTodo.loadTodoByUser(data)
  }
}
