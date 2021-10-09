import { Todo } from '.prisma/client'
import { IAddTodo, IDbAddTodo } from '../../domain/usecases/add-to-do'

export class AddTodoController {
  constructor (
    private readonly addTodo: IDbAddTodo
  ) {}

  async handle (todoData: IAddTodo): Promise<Todo> {
    const todo = await this.addTodo.add(todoData)
    return todo
  }
}
