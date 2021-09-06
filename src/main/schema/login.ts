import { Field, ObjectType } from 'type-graphql'
import { IAccountModel } from '../../domain/models/account'
import { AccountSchema } from './account'

@ObjectType()
export class LoginSchema {
  @Field()
  token: string

  @Field(() => AccountSchema)
  account: IAccountModel
}
