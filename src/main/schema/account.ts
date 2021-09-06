import { Field, ObjectType } from 'type-graphql'

@ObjectType()
export class AccountSchema {
  @Field()
  id: string

  @Field()
  email: string

  @Field()
  name: string
}
