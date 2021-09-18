import { ObjectID } from 'typeorm'
import { TodoModel } from '../../../../domain/models/to-do'
import { IAddTodo, IDbAddTodo } from '../../../../domain/usecases/add-to-do'
import { ILoadDbTodo, ILoadTodo } from '../../../../domain/usecases/loadTodo'
import { IRemoveTodo, IRemoveTodoDb } from '../../../../domain/usecases/remove-todo'
import { IUpdateTodo, IUpdateTodoDb } from '../../../../domain/usecases/update-todo'
import { TodoEntity } from '../../entity/to-do'

export class TodoRepository implements IDbAddTodo, ILoadDbTodo, IUpdateTodoDb, IRemoveTodoDb {
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

  async update (todoData: IUpdateTodo): Promise<TodoModel> {
    const { todo_id, fields } = todoData
    await TodoEntity.update(todo_id, { ...fields })
    const todo = await TodoEntity.find(
      {
        where:
         {
           name: fields.name,
           user_id: fields.user_id,
           description: fields.description // TODO refatorar
         }
      })
    return todo[0]
  }

  async remove (data: IRemoveTodo): Promise<boolean> {
    const { id } = data
    const removed = await TodoEntity.delete(id)
    return !!removed.affected
  }
}
