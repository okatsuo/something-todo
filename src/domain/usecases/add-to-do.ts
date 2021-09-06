import { TodoModel } from '../models/to-do'

export interface IAddTodo {
  user_id: string
  name: string
  active?: boolean
  description?: string
}

export interface IDbAddTodo {
  add: (todoData: IAddTodo) => Promise<TodoModel>
}
