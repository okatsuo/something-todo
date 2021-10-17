import { Todo } from '.prisma/client'
import { inject, injectable } from 'tsyringe'
import { ILoadUserTodo } from '../../../domain/usecases/user-todo'

@injectable()
export class UserTodo implements ILoadUserTodo {
  constructor (
    @inject('TodoRepository')
    private readonly todo_repository: ILoadUserTodo
  ) {}

  async loadUserTodo (user_id: number): Promise<Todo[]> {
    return await this.todo_repository.loadUserTodo(user_id)
  }
}
