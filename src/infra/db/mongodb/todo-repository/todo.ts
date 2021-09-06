import { TodoModel } from '../../../../domain/models/to-do'
import { IAddTodo, IDbAddTodo } from '../../../../domain/usecases/add-to-do'
import { TodoEntity } from '../../entity/to-do'

export class TodoRepository implements IDbAddTodo {
  async add (todoData: IAddTodo): Promise<TodoModel> {
    const todo = TodoEntity.create(todoData)
    await todo.save()
    return todo
  }
}
