import { Todo } from '.prisma/client'
import { inject, injectable } from 'tsyringe'
import { ILoadUserTodo } from '../../domain/usecases/user-todo'

@injectable()
export class UserTodoController {
  constructor (
    @inject('DatabaseUserTodo')
    private readonly user_database: ILoadUserTodo
  ) {}

  async handle (user_id: number): Promise<Todo[]> {
    return await this.user_database.loadUserTodo(user_id)
  }
}
