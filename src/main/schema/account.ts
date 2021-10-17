import { Todo } from '.prisma/client'
import { Field, ObjectType } from 'type-graphql'
import { TodoSchema } from './to-do'

@ObjectType()
export class AccountSchema {
  @Field()
  id: string

  @Field()
  email: string

  @Field()
  name: string

  @Field()
  active: boolean

  @Field(() => [TodoSchema])
  todo: Todo[]
}
