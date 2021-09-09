import { TodoModel } from '../../domain/models/to-do'
import { ILoadDbTodo, ILoadTodo } from '../../domain/usecases/loadTodo'
import { Controller } from '../protocols/controllers'

export class LoadTodoController implements Controller {
  constructor (
    private readonly loadTodo: ILoadDbTodo
  ) {}

  async handle (data: ILoadTodo): Promise<TodoModel> {
    return await this.loadTodo.loadTodoByUser(data)
  }
}
