import { Field, InputType } from 'type-graphql'
import { TodoModel } from '../models/to-do'

@InputType()
export class IAddTodo {
  @Field()
  user_id: string

  @Field()
  name: string

  @Field()
  active: boolean

  @Field()
  description: string
}

export interface IDbAddTodo {
  add: (todoData: IAddTodo) => Promise<TodoModel>
}
