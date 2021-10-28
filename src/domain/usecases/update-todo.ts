import { Todo } from '.prisma/client'
import { Field, InputType, Int } from 'type-graphql'

@InputType()
export class IUpdateTodo {
  @Field(() => Int, { nullable: true })
  account_id: number

  @Field({ nullable: true })
  name: string

  @Field({ nullable: true })
  active: boolean

  @Field({ nullable: true })
  description: string
}

export interface IUpdateTodoDb {
  update: (id: number, todoData: IUpdateTodo) => Promise<Todo>
}
