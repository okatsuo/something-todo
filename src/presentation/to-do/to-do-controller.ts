import { IAddTodo } from '../../domain/usecases/add-to-do'

export class Todo {
  handle (todoData: IAddTodo): any {
    return { ...todoData }
  }
}
