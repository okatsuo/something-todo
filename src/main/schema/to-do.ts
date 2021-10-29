import { Field, Int, ObjectType } from 'type-graphql'

@ObjectType()
export class TodoSchema {
  @Field(() => Int)
  id: number

  @Field(() => Int)
  account_id: number

  @Field()
  name: string

  @Field()
  description: string

  @Field()
  active: boolean
}
