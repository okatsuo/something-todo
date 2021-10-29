import { Todo } from '.prisma/client'
import { Field, Int, ObjectType } from 'type-graphql'
import { TodoSchema } from './to-do'

@ObjectType()
export class AccountSchema {
  @Field(() => Int)
  id: number

  @Field()
  email: string

  @Field()
  name: string

  @Field()
  active: boolean

  @Field(() => [TodoSchema])
  todo: Todo[]
}
