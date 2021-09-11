import { TodoModel } from '../models/to-do'
import { IAddTodo } from './add-to-do'

export interface IUpdateTodo {
  todo_id: string
  fields: IAddTodo
}

export interface IUpdateTodoDb {
  update: (todoData: IUpdateTodo) => Promise<TodoModel>
}
