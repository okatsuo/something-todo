import { TodoModel } from '../../../domain/models/to-do'
import { IUpdateTodo, IUpdateTodoDb } from '../../../domain/usecases/update-todo'

export class UpdateTodo implements IUpdateTodoDb {
  constructor (
    private readonly updateTodoRepository: IUpdateTodoDb
  ) {}

  async update (todoData: IUpdateTodo): Promise<TodoModel> {
    return await this.updateTodoRepository.update(todoData)
  }
}
