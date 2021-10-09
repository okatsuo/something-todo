import { PrismaClient, Todo } from '.prisma/client'
import { IAddTodo, IDbAddTodo } from '../../../../domain/usecases/add-to-do'
import { ILoadDbTodo, ILoadTodo } from '../../../../domain/usecases/loadTodo'
import { IRemoveTodo, IRemoveTodoDb } from '../../../../domain/usecases/remove-todo'
import { IUpdateTodo, IUpdateTodoDb } from '../../../../domain/usecases/update-todo'
const prisma = new PrismaClient()

export class TodoPostgresRepository implements IDbAddTodo, ILoadDbTodo, IUpdateTodoDb, IRemoveTodoDb {
  async add (todoData: IAddTodo): Promise<Todo> {
    const todo = await prisma.todo.create({ data: todoData })
    return todo
  }

  async loadTodoByUser (todoData: ILoadTodo): Promise<Todo[]> {
    const { account_id } = todoData
    const todo = await prisma.todo.findMany({ where: { account_id } })
    return todo
  }

  async update (todoData: IUpdateTodo): Promise<Todo> {
    const { todo_id, ...rest } = todoData

    const todo = await prisma.todo.update({ where: { id: todo_id }, data: rest })

    return todo
  }

  async remove (data: IRemoveTodo): Promise<boolean> {
    try {
      const { id } = data
      const removed = await prisma.todo.delete({ where: { id } })
      return !!removed
    } catch (error) {
      return false
    }
  }
}
