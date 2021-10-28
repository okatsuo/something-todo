import { Todo } from '.prisma/client'
import { inject, injectable } from 'tsyringe'
import { IAddTodo, IDbAddTodo } from '../../domain/usecases/add-to-do'

@injectable()
export class AddTodoController {
  constructor (
    @inject('DatabaseAddTodo')
    private readonly addTodo: IDbAddTodo
  ) {}

  async handle (todoData: IAddTodo): Promise<Todo> {
    const todo = await this.addTodo.add(todoData)
    return todo
  }
}
