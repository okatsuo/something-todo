import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class TodoSchema {
  @Field()
  id: string

  @Field()
  userId: string

  @Field()
  name: string

  @Field()
  description: string

  @Field()
  active: boolean
}
