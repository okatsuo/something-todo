import { TodoModel } from '../../../domain/models/to-do'
import { ILoadDbTodo, ILoadTodo } from '../../../domain/usecases/loadTodo'

export class LoadTodo implements ILoadDbTodo {
  constructor (
    private readonly loadTodoRepository: ILoadDbTodo
  ) {}

  async loadTodoByUser (todoData: ILoadTodo): Promise<TodoModel> {
    return await this.loadTodoRepository.loadTodoByUser(todoData)
  }
}
