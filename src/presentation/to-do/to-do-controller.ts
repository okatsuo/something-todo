import { TodoModel } from '../../domain/models/to-do'
import { IAddTodo, IDbAddTodo } from '../../domain/usecases/add-to-do'

export class TodoController {
  constructor (
    private readonly addTodo: IDbAddTodo
  ) {}

  async handle (todoData: IAddTodo): Promise<TodoModel> {
    const todo = await this.addTodo.add(todoData)
    return todo
  }
}
