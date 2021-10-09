import { Account } from '.prisma/client'
import { Field, ObjectType } from 'type-graphql'
import { AccountSchema } from './account'

@ObjectType()
export class LoginSchema {
  @Field()
  token: string

  @Field(() => AccountSchema)
  account: Account
}
