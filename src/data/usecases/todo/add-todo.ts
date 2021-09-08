import { TodoModel } from '../../../domain/models/to-do'
import { IAddTodo, IDbAddTodo } from '../../../domain/usecases/add-to-do'

export class AddTodo implements IDbAddTodo {
  constructor (
    private readonly addTodoRepository: IDbAddTodo
  ) {}

  async add (todoData: IAddTodo): Promise<TodoModel> {
    const todo = await this.addTodoRepository.add(todoData)
    return todo
  }
}
