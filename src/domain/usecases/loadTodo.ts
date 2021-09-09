import { TodoModel } from '../models/to-do'

export interface ILoadTodo {
  user_id: string
}

export interface ILoadDbTodo {
  loadTodoByUser: (data: ILoadTodo) => Promise<TodoModel>
}
