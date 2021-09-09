import { TodoModel } from '../../../../domain/models/to-do'
import { IAddTodo, IDbAddTodo } from '../../../../domain/usecases/add-to-do'
import { ILoadDbTodo, ILoadTodo } from '../../../../domain/usecases/loadTodo'
import { TodoEntity } from '../../entity/to-do'

export class TodoRepository implements IDbAddTodo, ILoadDbTodo {
  async add (todoData: IAddTodo): Promise<TodoModel> {
    const todo = TodoEntity.create(todoData)
    await todo.save()
    return todo
  }

  async loadTodoByUser (todoData: ILoadTodo): Promise<TodoModel[]> {
    const { user_id } = todoData
    const todo = await TodoEntity.find({ where: { user_id } })
    return todo
  }
}
