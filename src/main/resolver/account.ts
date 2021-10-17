import { Account } from '.prisma/client'
import { container } from 'tsyringe'
import { Arg, Mutation, Query, Resolver } from 'type-graphql'
import { ILoginModel } from '../../domain/models/login'
import { SigninController } from '../../presentation/account/login-controller'
import { makeAddAccountController } from '../factory/add-account'
import { AccountSchema } from '../schema/account'
import { LoginSchema } from '../schema/login'

@Resolver()
export class AccountResolver {
  @Query(() => LoginSchema)
  async accountLogin (
    @Arg('email') email: string,
      @Arg('password') password: string
  ): Promise<ILoginModel> {
    // return await accountLogin.handle({ email, password })
    return await container.resolve(SigninController).handle({ email, password })
  }

  @Mutation(() => AccountSchema)
  async userCreate (
    @Arg('name') name: string,
      @Arg('email') email: string,
      @Arg('password') password: string
  ): Promise<Account> {
    const addAccount = makeAddAccountController()
    return await addAccount.handle({ name, email, password })
  }
}
