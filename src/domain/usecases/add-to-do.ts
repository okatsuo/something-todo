import { Todo } from '.prisma/client'
import { Field, InputType, Int } from 'type-graphql'

@InputType()
export class IAddTodo {
  @Field(() => Int)
  account_id: number

  @Field()
  name: string

  @Field()
  active: boolean

  @Field()
  description: string
}

export interface IDbAddTodo {
  add: (todoData: IAddTodo) => Promise<Todo>
}
