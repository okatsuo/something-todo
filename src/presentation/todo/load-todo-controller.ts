import { Todo } from '.prisma/client'
import { ILoadDbTodo, ILoadTodo } from '../../domain/usecases/loadTodo'
import { Controller } from '../protocols/controllers'

export class LoadTodoController implements Controller {
  constructor (
    private readonly loadTodo: ILoadDbTodo
  ) {}

  async handle (data: ILoadTodo): Promise<Todo[]> {
    return await this.loadTodo.loadTodoByUser(data)
  }
}
