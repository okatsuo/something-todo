import { Todo } from '.prisma/client'
import { Field, InputType, Int } from 'type-graphql'

@InputType()
export class ILoadTodo {
  @Field(() => Int)
  account_id: number
}

export interface ILoadDbTodo {
  loadTodoByUser: (data: ILoadTodo) => Promise<Todo[]>
}
