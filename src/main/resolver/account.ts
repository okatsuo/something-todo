import { Account } from '.prisma/client'
import { container } from 'tsyringe'
import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { ILoginModel } from '../../domain/models/login'
import { SigninController } from '../../presentation/account/login-controller'
import { SignupController } from '../../presentation/account/signup-controller'
import { AccountSchema } from '../schema/account'
import { LoginSchema } from '../schema/login'

@Resolver()
export class AccountResolver {
  @Query(() => LoginSchema)
  async accountLogin (
    @Arg('email') email: string,
      @Arg('password') password: string
  ): Promise<ILoginModel> {
    return await container.resolve(SigninController).handle({ email, password })
  }

  @Mutation(() => AccountSchema)
  async userCreate (
    @Arg('name') name: string,
      @Arg('email') email: string,
      @Arg('password') password: string
  ): Promise<Account> {
    return await container.resolve(SignupController).handle({ name, email, password })
  }
}
