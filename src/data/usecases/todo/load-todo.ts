import { Todo } from '.prisma/client'
import { ILoadDbTodo, ILoadTodo } from '../../../domain/usecases/loadTodo'

export class LoadTodo implements ILoadDbTodo {
  constructor (
    private readonly loadTodoRepository: ILoadDbTodo
  ) {}

  async loadTodoByUser (todoData: ILoadTodo): Promise<Todo[]> {
    return await this.loadTodoRepository.loadTodoByUser(todoData)
  }
}
