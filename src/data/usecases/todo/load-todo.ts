import { Todo } from '.prisma/client'
import { inject, injectable } from 'tsyringe'
import { ILoadDbTodo, ILoadTodo } from '../../../domain/usecases/loadTodo'

@injectable()
export class LoadTodo implements ILoadDbTodo {
  constructor (
    @inject('RepositoryTodo')
    private readonly loadTodoRepository: ILoadDbTodo
  ) {}

  async loadTodoByUser (todoData: ILoadTodo): Promise<Todo[]> {
    return await this.loadTodoRepository.loadTodoByUser(todoData)
  }
}
