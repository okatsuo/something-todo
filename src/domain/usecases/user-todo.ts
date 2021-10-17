import { Todo } from '.prisma/client'

export interface ILoadUserTodo {
  loadUserTodo: (user_id: number) => Promise<Todo[]>
}
