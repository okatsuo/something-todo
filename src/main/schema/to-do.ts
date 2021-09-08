import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class TodoSchema {
  @Field()
  id: string

  @Field()
  user_id: string

  @Field()
  name: string

  @Field()
  description: string

  @Field()
  active: boolean
}
